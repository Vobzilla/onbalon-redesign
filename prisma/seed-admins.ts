/**
 * Creates/updates the owner accounts for /admin.
 *
 * There is no signup form — accounts are provisioned here only. Credentials are
 * read from env so they never live in the repo:
 *
 *   ADMIN_EMAIL_1 / ADMIN_PASSWORD_1
 *   ADMIN_EMAIL_2 / ADMIN_PASSWORD_2
 *
 * Re-running it updates the password of an existing e-mail (use it to rotate).
 *
 * Run with: npm run seed:admins
 */
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../lib/adminAuth";

const prisma = new PrismaClient();

type Candidate = { email: string; password: string; slot: string };

function collect(): Candidate[] {
  const found: Candidate[] = [];
  for (const slot of ["1", "2"]) {
    const email = process.env[`ADMIN_EMAIL_${slot}`]?.trim().toLowerCase();
    const password = process.env[`ADMIN_PASSWORD_${slot}`];
    if (!email || !password) continue;
    found.push({ email, password, slot });
  }
  return found;
}

async function main() {
  const candidates = collect();

  if (candidates.length === 0) {
    console.error(
      "No credentials found. Set ADMIN_EMAIL_1/ADMIN_PASSWORD_1 (and optionally _2) in .env"
    );
    process.exitCode = 1;
    return;
  }

  for (const { email, password, slot } of candidates) {
    if (password.length < 10) {
      console.error(`  slot ${slot}: password too short (min 10 chars) — skipped`);
      continue;
    }
    const passwordHash = await hashPassword(password);
    const user = await prisma.adminUser.upsert({
      where: { email },
      update: { passwordHash },
      create: { email, passwordHash },
    });
    console.log(`  slot ${slot}: ${user.email} ready`);
  }

  const total = await prisma.adminUser.count();
  console.log(`\nadmin_users rows: ${total}`);

  if (total > 2) {
    console.warn("More than 2 admin accounts exist — remove the extras if that isn't intended.");
  }
}

main()
  .catch((err) => {
    console.error("Seeding admins failed:", err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
