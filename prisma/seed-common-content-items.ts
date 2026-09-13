/**
 * One-time seed for common_content_items — the approved pick-list for the
 * "Zestaw zawiera" quick-add dropdown, derived from analyze-common-contents.ts
 * (threshold >=3 uses, case/spelling duplicates merged).
 *
 * Safe to re-run: wipes the table before inserting.
 * Run with: npm run seed:content-items
 */
import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const APPROVED_ITEMS: { name: string; detail: string }[] = [
  { name: "Balon lateksowy", detail: "Ø 30 cm" },
  { name: "Balon foliowy cyfra", detail: "86 cm" },
  { name: "Balon foliowy serce", detail: "35 cm" },
  { name: "Balon foliowy Miś", detail: "figura" },
  { name: "Balon foliowy gwiazda", detail: "35 cm" },
  { name: "Balon foliowy butelka whisky", detail: "figura" },
  { name: "Balon Bubble Giga z personalizacją", detail: "personalizacja" },
  { name: "Balon foliowy okrągły Happy Birthday", detail: "35 cm" },
  { name: "Balon lateksowy pastelowy mix", detail: "Ø 30 cm, kropelki" },
  { name: "Balon foliowy serce z personalizacją", detail: "35 cm, personalizacja" },
  { name: "Balon foliowy Kotek", detail: "figura" },
  { name: "Balon Double Bubble z personalizacją", detail: "personalizacja" },
  { name: "Balon foliowy kokarda", detail: "figura" },
  { name: "Balon foliowy Bocian", detail: "figura" },
];

async function main() {
  await prisma.commonContentItem.deleteMany();

  await prisma.commonContentItem.createMany({
    data: APPROVED_ITEMS.map((item, index) => ({
      name: item.name,
      detail: item.detail,
      isActive: true,
      sortOrder: index,
    })),
  });

  const count = await prisma.commonContentItem.count();
  console.log(`Seeded ${count} common_content_items:`);
  const rows = await prisma.commonContentItem.findMany({ orderBy: { sortOrder: "asc" } });
  for (const r of rows) {
    console.log(`  ${r.sortOrder + 1}. "${r.name}" — "${r.detail}"`);
  }
}

main()
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
