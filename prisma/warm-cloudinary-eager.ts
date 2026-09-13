/**
 * One-time backfill: eager-warm Cloudinary transformations for every
 * existing product's image, so a rarely-visited product's first real
 * visitor doesn't hit the ~1s cold-cache transform we diagnosed (originals
 * run 2-7.5MB at 3800-4900px).
 *
 * One Admin API call per product (`explicit`, with all EAGER_WIDTHS passed
 * as a single `eager` list) — 175 products = 175 calls, nowhere near the
 * 500 calls/hour limit. Synchronous (no eager_async) so that by the time a
 * product's line is logged, its transformations are actually ready to
 * verify — unlike the admin upload widget, which uses eager_async since
 * it's a live user-facing action that shouldn't block on ~1s-per-size
 * processing. Each explicit() call takes ~5s (5 sizes), so this runs a
 * small worker pool instead of one-at-a-time to keep total runtime sane —
 * still nowhere near the hourly call cap either way.
 *
 * Progress is appended to warm-cloudinary-eager.log (not just stdout) since
 * this runs for several minutes — tail that file to watch it live instead
 * of waiting on the process to fully exit.
 *
 * Run with: npm run warm:cloudinary
 */
import * as dotenv from "dotenv";
// DATABASE_URL lives in .env; CLOUDINARY_* creds live in .env.local (same
// split Next.js itself reads) — load both explicitly since this script runs
// outside Next's own env loading.
dotenv.config();
dotenv.config({ path: ".env.local" });

import * as fs from "fs";
import * as path from "path";
import { v2 as cloudinary } from "cloudinary";
import { PrismaClient } from "@prisma/client";
import { buildEagerParam, extractCloudinaryPublicId } from "../lib/cloudinaryEager";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dnyevlhh7",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const prisma = new PrismaClient();
const LOG_FILE = path.join(__dirname, "warm-cloudinary-eager.log");
const CONCURRENCY = 8;

function log(line: string) {
  console.log(line);
  fs.appendFileSync(LOG_FILE, line + "\n");
}

async function main() {
  fs.writeFileSync(LOG_FILE, "");

  const products = await prisma.product.findMany({
    select: { id: true, name: true, imageUrl: true },
    orderBy: { id: "asc" },
  });

  const eager = buildEagerParam();
  log(`Warming eager transformations for ${products.length} products (${eager.split("|").length} sizes each, ${CONCURRENCY} at a time)...\n`);

  const failures: { id: number; name: string; error: string }[] = [];
  let done = 0;
  let apiCalls = 0;

  let nextIndex = 0;
  async function worker() {
    while (nextIndex < products.length) {
      const product = products[nextIndex++];
      const publicId = extractCloudinaryPublicId(product.imageUrl);
      if (!publicId) {
        failures.push({ id: product.id, name: product.name, error: `could not extract public_id from "${product.imageUrl}"` });
        done++;
        continue;
      }

      try {
        apiCalls++;
        await cloudinary.uploader.explicit(publicId, {
          type: "upload",
          resource_type: "image",
          eager,
        });
        done++;
        log(`  [${done}/${products.length}] warmed #${product.id} "${product.name}"`);
      } catch (err) {
        done++;
        failures.push({
          id: product.id,
          name: product.name,
          error: err instanceof Error ? err.message : String(err),
        });
        log(`  [${done}/${products.length}] FAILED #${product.id} "${product.name}"`);
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));

  log(`\nDone. Admin API calls made: ${apiCalls} (limit: 500/hour).`);
  log(`Warmed: ${apiCalls - failures.length} / ${products.length}.`);

  if (failures.length > 0) {
    log(`\nFailed (${failures.length}):`);
    for (const f of failures) log(`  #${f.id} "${f.name}": ${f.error}`);
  } else {
    log("No failures.");
  }
}

main()
  .catch((err) => {
    log("Warm-up failed: " + (err instanceof Error ? err.message : String(err)));
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
