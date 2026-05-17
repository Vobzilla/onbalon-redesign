/**
 * Cloudinary Upload Script — on.balon
 *
 * Uploads all product photos to Cloudinary with clean names.
 * Local files are NOT renamed — renaming happens on Cloudinary via public_id.
 *
 * Usage:
 *   1. npm install cloudinary   (run once in the project root)
 *   2. Fill in API_KEY and API_SECRET below (Settings → Access Keys in Cloudinary)
 *   3. node scripts/upload-to-cloudinary.js
 *
 * Output: creates scripts/cloudinary-urls.json with all uploaded URLs
 *
 * @format
 */

const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");

// ─── YOUR CLOUDINARY CREDENTIALS ─────────────────────────────────────────────
cloudinary.config({
  cloud_name: "dnyevlhh7",
  api_key: "453566687142183", // np. 123456789012345
  api_secret: "16F7MBgpmnLl6KkuJzqHsulm0dY", // np. abcDEFghiJKLmnoPQRstu_vwx
});
// ─────────────────────────────────────────────────────────────────────────────

// Base path to your local photos
const BASE_PATH = path.join(__dirname, "..", "public", "images", "upload");

// ─── PHOTO MAPPINGS ───────────────────────────────────────────────────────────
// Format: [localFolder, originalFilename, newCloudinaryName]
const MAPPINGS = [
  // ── roczek ──────────────────────────────────────────────────────────────────
  ["roczek", "PSX_20221125_184421.jpg", "mis-zloty-jedynka"],
  ["roczek", "PSX_20230115_140326.jpg", "mickey-mouse-jedynka"],
  ["roczek", "PSX_20240109_094751.jpg", "rozowo-lawendowy-personalizacja"],
  ["roczek", "PSX_20240116_205150.jpg", "rozowa-jedynka-korona-serduszka"],
  ["roczek", "PSX_20240302_175220.jpg", "chmurka-kremowa-jedynka"],
  ["roczek", "PSX_20240323_184508.jpg", "mis-srebrna-jedynka"],
  ["roczek", "IMG_20240426_170658.jpg", "peppa-pig-mieta"],
  ["roczek", "PSX_20240428_133325.jpg", "dino-zlota-jedynka"],
  ["roczek", "PSX_20240430_210517.jpg", "kotka-rozowa-jedynka"],
  ["roczek", "PSX_20240519_183449.jpg", "pistacja-zloto-roczek-chrzest"],
  ["roczek", "PSX_20240528_182042.jpg", "rozowe-konfetti-jedynka"],
  ["roczek", "PSX_20240714_111017.jpg", "rose-gold-jedynka-serduszka"],
  ["roczek", "PSX_20240803_114902.jpg", "mis-zloty-chrome-jedynka"],
  ["roczek", "PSX_20240805_122753.jpg", "boss-baby-niebieski-srebrny"],

  // ── 18-ka ───────────────────────────────────────────────────────────────────
  ["18-ka", "IMG_4292.JPG", "18-rose-gold-srebrna"],
  ["18-ka", "IMG_0017.JPG", "18-niebiesko-srebrna"],
  ["18-ka", "IMG_5015.JPG", "18-fioletowo-srebrna"],
  ["18-ka", "IMG_6018.JPG", "18-rose-gold-rozowa"],
  ["18-ka", "IMG_7197.JPG", "18-zloto-biale-rose"],
  ["18-ka", "IMG_7683.JPG", "18-czarno-rozowa"],
  ["18-ka", "IMG_9905.JPG", "18-rose-gold-princess"],
  ["18-ka", "IMG_3212.JPG", "18-srebrna-szara"],
  ["18-ka", "IMG_7648.JPG", "18-rose-gold-czarna"],
  ["18-ka", "IMG_0982.JPG", "18-czarna-rozowa"],
  ["18-ka", "IMG_1017.JPG", "18-srebrna-biala"],
  ["18-ka", "IMG_3515.JPG", "18-rozowy-pokoj"],

  // ── dla niej ────────────────────────────────────────────────────────────────
  ["dla niej", "IMG_0105.JPG", "25-rose-gold-srebrna"],
  ["dla niej", "IMG_8746.JPG", "25-zlota-korona"],
  ["dla niej", "IMG_8817.JPG", "43-rose-gold-serduszka"],
  ["dla niej", "IMG_1204.JPG", "zlote-korony-serce"],
  ["dla niej", "IMG_1248.JPG", "34-srebrna-rozowa"],
  ["dla niej", "IMG_1004.JPG", "70-zlota-burgundowa"],
  ["dla niej", "IMG_1547.JPG", "20-rozowe-serduszka"],
  ["dla niej", "IMG_2390.JPG", "28-srebrna-rose-gold"],
  ["dla niej", "IMG_5233.JPG", "80-szara-zlota"],
  ["dla niej", "IMG_9631.JPG", "40-zlota-zielona"],
  ["dla niej", "IMG_6142.JPG", "26-srebrna-kurtyna"],

  // ── dla niego ───────────────────────────────────────────────────────────────
  ["dla niego", "IMG_8666.JPG", "23-czarno-srebrna-kurtyna"],
  ["dla niego", "IMG_6263.JPG", "pilka-adidas-czarne"],
  ["dla niego", "IMG_7655.JPG", "27-czarna-gwiazda-hb"],
  ["dla niego", "IMG_8154.JPG", "duszek-zielony-serce"],
  ["dla niego", "IMG_8362.JPG", "czarno-zlote-box-personalizacja"],
  ["dla niego", "IMG_0102.JPG", "gepard-dama-zloto"],
  ["dla niego", "IMG_0137.JPG", "34-czarny-leopard"],
  ["dla niego", "IMG_0043.JPG", "whiskey-czarno-zlote"],
  ["dla niego", "IMG_0069.JPG", "whiskey-czarno-zlote-2"],
  ["dla niego", "IMG_5014.JPG", "30-harry-potter"],
  ["dla niego", "IMG_5038.JPG", "20-kufel-piwa"],
  ["dla niego", "IMG_4727.JPG", "30-srebrna-czarna"],
  ["dla niego", "IMG_6977.JPG", "20-zlota-niebieska"],
  ["dla niego", "IMG_0089.JPG", "16-grumpy-cat"],
  ["dla niego", "IMG_7871.JPG", "25-czarna-czerwone-serce"],
  ["dla niego", "IMG_1326.JPG", "30-zloto-czarne-hb"],
  ["dla niego", "IMG_4761.JPG", "30-czarna-wasy"],
  ["dla niego", "IMG_5846.JPG", "25-czarno-zlota"],
  ["dla niego", "IMG_1617.JPG", "cool-cat-czaszka-humor"],
  ["dla niego", "IMG_2833.JPG", "dziadek-humor-czarno-zlote"],

  // ── dekoracje balonowe ──────────────────────────────────────────────────────
  [
    "dekoracje balonowe",
    "PSX_20221002_212356.jpg",
    "girlanda-niebiesko-zlota-roczek",
  ],
  [
    "dekoracje balonowe",
    "IMG_20221020_144632_389.jpg",
    "girlanda-mietowo-zlota-motylki",
  ],
  [
    "dekoracje balonowe",
    "PSX_20221206_162231.jpg",
    "girlanda-okragla-roczek-chrzest",
  ],
  [
    "dekoracje balonowe",
    "PSX_20230416_211945.jpg",
    "girlanda-rozowo-fioletowa-jednorozec",
  ],
  [
    "dekoracje balonowe",
    "PSX_20230502_125504.jpg",
    "girlanda-niebiesko-srebrna-mis",
  ],
  [
    "dekoracje balonowe",
    "PSX_20230512_144843.jpg",
    "sciana-rozowo-szaro-zlota",
  ],
  [
    "dekoracje balonowe",
    "PSX_20230604_114837.jpg",
    "girlanda-bialo-zlota-komunia",
  ],
  [
    "dekoracje balonowe",
    "IMG_20230722_135000_217.jpg",
    "girlanda-fioletowo-rozowa-one",
  ],
  [
    "dekoracje balonowe",
    "IMG_20230723_103308_581.jpg",
    "girlanda-bialo-zlota-chrzest-sztaluga",
  ],
  [
    "dekoracje balonowe",
    "IMG_20230723_123435.jpg",
    "girlanda-rozowo-zlota-chrzest",
  ],
  [
    "dekoracje balonowe",
    "PSX_20230730_131926.jpg",
    "girlanda-niebiesko-biala-chrzest",
  ],
  [
    "dekoracje balonowe",
    "PSX_20230730_175249.jpg",
    "girlanda-rozowa-okragla-paw-patrol",
  ],
  ["dekoracje balonowe", "PSX_20230812_112933.jpg", "brama-lawendowa-biznes"],
  [
    "dekoracje balonowe",
    "IMG_20230820_173509_899.jpg",
    "girlanda-rozowa-swietlna-jedynka",
  ],
  [
    "dekoracje balonowe",
    "PSX_20230908_100250.jpg",
    "brama-czarno-zlota-tattoo-studio",
  ],
  [
    "dekoracje balonowe",
    "PSX_20230924_105208.jpg",
    "girlanda-bialo-zlota-chrzest-huberta",
  ],
  [
    "dekoracje balonowe",
    "PSX_20231017_075818.jpg",
    "brama-czerwono-biala-bistro",
  ],
  [
    "dekoracje balonowe",
    "PSX_20231214_134753.jpg",
    "sciana-bialo-srebrna-neon-hb",
  ],
  [
    "dekoracje balonowe",
    "IMG_20240104_080530.jpg",
    "brama-rozowo-fioletowa-keune",
  ],
  [
    "dekoracje balonowe",
    "PSX_20240114_173724.jpg",
    "girlanda-niebiesko-srebrna-mis-urodziny",
  ],
  [
    "dekoracje balonowe",
    "PSX_20240115_095215.jpg",
    "dekoracja-18-zloto-rozowa-neon",
  ],
  [
    "dekoracje balonowe",
    "IMG_20240209_005116.jpg",
    "dekoracja-walentynki-czerwono-zlota",
  ],
  [
    "dekoracje balonowe",
    "PSX_20240217_233224.jpg",
    "girlanda-zielono-zlota-roczek-krolik",
  ],
  [
    "dekoracje balonowe",
    "PSX_20240309_212028.jpg",
    "dekoracja-18-fioletowo-srebrna-neon",
  ],
  [
    "dekoracje balonowe",
    "PSX_20240320_163550.jpg",
    "dekoracja-30-bialo-zlota-neon",
  ],
  [
    "dekoracje balonowe",
    "IMG_20240405_142245_469.jpg",
    "kolumna-niebiesko-rozowa-dream-bebi",
  ],
  [
    "dekoracje balonowe",
    "PSX_20240406_112118.jpg",
    "kolumna-czerwono-biala-multicook",
  ],
  [
    "dekoracje balonowe",
    "PSX_20240414_104515.jpg",
    "girlanda-zielono-kremowa-chrzest-urodziny",
  ],
  [
    "dekoracje balonowe",
    "PSX_20240504_200438.jpg",
    "dekoracja-18-kremowo-zlota-neon",
  ],
  [
    "dekoracje balonowe",
    "IMG_20240512_103215.jpg",
    "girlanda-kremowo-zlota-komunia-amelii",
  ],
  [
    "dekoracje balonowe",
    "PSX_20240516_153817.jpg",
    "dekoracja-60-zloto-rozowa-neon",
  ],
  [
    "dekoracje balonowe",
    "PSX_20240602_120719.jpg",
    "girlanda-zlota-komunia-michala",
  ],
  [
    "dekoracje balonowe",
    "IMG_20240705_132630.jpg",
    "brama-czarno-fioletowa-hookah-bar",
  ],
  [
    "dekoracje balonowe",
    "IMG_20240705_191735.jpg",
    "girlanda-niebiesko-rozowa-wejscie",
  ],
  [
    "dekoracje balonowe",
    "PSX_20240706_120747.jpg",
    "girlanda-rozowo-zlota-urodziny-lenki",
  ],
  [
    "dekoracje balonowe",
    "IMG_20240715_085352.jpg",
    "brama-zielono-biala-vape-shop",
  ],
  [
    "dekoracje balonowe",
    "PSX_20240727_132528.jpg",
    "dekoracja-boss-baby-niebieska-roczek",
  ],
  [
    "dekoracje balonowe",
    "PSX_20240824_213724.jpg",
    "dekoracja-18-minions-zolto-czarna",
  ],

  // ── dla dziecka ─────────────────────────────────────────────────────────────
  ["dla dziecka", "IMG_7949.JPG", "6-rozowa-motylki-hb"],
  ["dla dziecka", "IMG_8544.JPG", "5-fioletowa-konfetti"],
  ["dla dziecka", "IMG_8561.JPG", "2-safari-lew-zyrafa-zebra"],
  ["dla dziecka", "IMG_8778.JPG", "kotka-rozowa-bouquet"],
  ["dla dziecka", "IMG_9081.JPG", "2-bluey-bingo"],
  ["dla dziecka", "IMG_0053.JPG", "4-pj-masks-gekko-zielony"],
  ["dla dziecka", "IMG_0063.JPG", "3-george-peppa-pig-personalizacja"],
  ["dla dziecka", "IMG_6323.JPG", "8-sonic-niebiesko-czerwony"],
  ["dla dziecka", "IMG_8472.JPG", "2-paw-patrol-skye-everest"],
  ["dla dziecka", "IMG_2359.JPG", "3-dino-zloty-dinozaur"],
  ["dla dziecka", "IMG_3866.JPG", "5-tails-sonic-zloty"],
  ["dla dziecka", "IMG_3939.JPG", "3-chase-paw-patrol-zloty"],
  ["dla dziecka", "IMG_4503.JPG", "13-fioletowo-srebrna-hb"],
  ["dla dziecka", "IMG_5679.JPG", "6-miraculum-biedronka-czerwona"],
  ["dla dziecka", "IMG_8478.JPG", "2-kotka-rozowa-kremowa"],
  ["dla dziecka", "IMG_8409.JPG", "2-jednorozec-rozowy-mietowy"],
  ["dla dziecka", "IMG_8627.JPG", "7-roblox-rozowa-personalizacja"],
  ["dla dziecka", "IMG_0460.JPG", "3-gabbys-dollhouse-syrenka"],
  ["dla dziecka", "IMG_1238.JPG", "2-traktor-zielono-zloty"],
  ["dla dziecka", "IMG_2448.JPG", "4-batman-spiderman-superbohaterowie"],
  ["dla dziecka", "IMG_2964.JPG", "mis-brunatny-kremowo-zloty"],
  ["dla dziecka", "IMG_2954.JPG", "kotka-rozowa-serce-fuksja"],
  ["dla dziecka", "IMG_3193.JPG", "3-george-peppa-pig-rozowa"],
  ["dla dziecka", "IMG_3639.JPG", "2-smok-niebieski-balonowy"],
  ["dla dziecka", "IMG_3626.JPG", "2-wrozka-rozowa-fontanna"],
  ["dla dziecka", "IMG_9305.JPG", "mis-kremowo-brazowy-bukiet"],
  ["dla dziecka", "IMG_4419.JPG", "kuromi-fioletowa-konfetti"],
  ["dla dziecka", "IMG_9379.JPG", "4-sonic-tails-niebiesko-czerwony"],
  ["dla dziecka", "IMG_6075.JPG", "2-lew-safari-zloty"],
  ["dla dziecka", "IMG_6301.JPG", "pszczola-zolto-biala"],
  ["dla dziecka", "IMG_7248.JPG", "5-spiderman-niebiesko-czerwony"],
];
// ─────────────────────────────────────────────────────────────────────────────

// Cloudinary folder mapping (local folder name → Cloudinary folder name)
const FOLDER_MAP = {
  roczek: "roczek",
  "18-ka": "18-ka",
  "dla niej": "dla-niej",
  "dla niego": "dla-niego",
  "dekoracje balonowe": "dekoracje",
  "dla dziecka": "dla-dziecka",
};

async function uploadFile(localFolder, filename, newName) {
  const localPath = path.join(BASE_PATH, localFolder, filename);

  if (!fs.existsSync(localPath)) {
    console.warn(`  ⚠️  Plik nie znaleziony: ${localPath}`);
    return null;
  }

  const cloudFolder = FOLDER_MAP[localFolder];
  const publicId = `onbalon/${cloudFolder}/${newName}`;

  try {
    const result = await cloudinary.uploader.upload(localPath, {
      public_id: publicId,
      overwrite: true,
      resource_type: "image",
      // Auto-optimize quality and format
      transformation: [{ quality: "auto:good", fetch_format: "auto" }],
    });
    console.log(`  ✅  ${localFolder}/${filename}  →  ${newName}`);
    return {
      localFolder,
      filename,
      newName,
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
    };
  } catch (err) {
    console.error(`  ❌  ${filename}: ${err.message}`);
    return null;
  }
}

async function main() {
  console.log("🎈 on.balon — Cloudinary Upload Script");
  console.log(`📦 Łącznie zdjęć do uploadu: ${MAPPINGS.length}\n`);

  // Check credentials
  if (
    cloudinary.config().api_key === "WPISZ_TUTAJ_API_KEY" ||
    cloudinary.config().api_secret === "WPISZ_TUTAJ_API_SECRET"
  ) {
    console.error("❌  BŁĄD: Uzupełnij api_key i api_secret w skrypcie!");
    console.error("    Znajdziesz je w Cloudinary → Settings → Access Keys");
    process.exit(1);
  }

  const results = [];
  let success = 0;
  let failed = 0;

  for (const [localFolder, filename, newName] of MAPPINGS) {
    const result = await uploadFile(localFolder, filename, newName);
    if (result) {
      results.push(result);
      success++;
    } else {
      failed++;
    }

    // Small delay to avoid rate limiting on free plan
    await new Promise((r) => setTimeout(r, 300));
  }

  // Save results to JSON
  const outputPath = path.join(__dirname, "cloudinary-urls.json");
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), "utf8");

  // Print summary
  console.log("\n─────────────────────────────────────────");
  console.log(`✅  Sukces: ${success}`);
  console.log(`❌  Błędy:  ${failed}`);
  console.log(`📄  Wyniki zapisane: scripts/cloudinary-urls.json`);
  console.log("─────────────────────────────────────────\n");

  // Print URL list grouped by folder
  console.log("📋 Gotowe URL-e:\n");
  const byFolder = {};
  for (const r of results) {
    const folder = FOLDER_MAP[r.localFolder];
    if (!byFolder[folder]) byFolder[folder] = [];
    byFolder[folder].push({ name: r.newName, url: r.url });
  }
  for (const [folder, items] of Object.entries(byFolder)) {
    console.log(`\n// ── ${folder} `);
    for (const item of items) {
      console.log(`// ${item.name}`);
      console.log(`// ${item.url}`);
    }
  }
}

main().catch((err) => {
  console.error("Nieoczekiwany błąd:", err);
  process.exit(1);
});
