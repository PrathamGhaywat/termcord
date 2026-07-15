const https = require("https");
const fs = require("fs");
const path = require("path");

const VERSION = "v1.0.2";

const suffixMap = {
  "win32-x64": "windows-x64.exe",
  "win32-arm64": "windows-arm64.exe",
  "darwin-arm64": "macos-arm64",
  "linux-x64": "linux-x64",
  "linux-arm64": "linux-arm64",
};

const platformKey = `${process.platform}-${process.arch}`;
const suffix = suffixMap[platformKey];

if (!suffix) {
  console.error(`Unsupported platform/arch: ${platformKey}`);
  console.error("Available platforms: win32-x64, win32-arm64, darwin-arm64, linux-x64, linux-arm64");
  process.exit(1);
}

const assetName = `${VERSION}-termcord-${suffix}`;
const binaryName = process.platform === "win32" ? "termcord.exe" : "termcord";
const vendorDir = path.join(__dirname, "vendor");
const binaryPath = path.join(vendorDir, binaryName);

const url = `https://github.com/PrathamGhaywat/termcord/releases/download/${VERSION}/${assetName}`;

fs.mkdirSync(vendorDir, { recursive: true });

console.log(`Downloading termcord for ${process.platform}-${process.arch}...`);

function download(url, resolve, reject) {
  https.get(url, (res) => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      download(new URL(res.headers.location, url).href, resolve, reject);
      return;
    }
    if (res.statusCode !== 200) {
      reject(new Error(`HTTP ${res.statusCode}: ${url}`));
      return;
    }
    const file = fs.createWriteStream(binaryPath);
    res.pipe(file);
    file.on("finish", () => {
      file.close();
      if (process.platform !== "win32") {
        fs.chmodSync(binaryPath, 0o755);
      }
      console.log("termcord installed successfully.");
      resolve();
    });
    file.on("error", reject);
  })
  .on("error", reject);
}

download(url, () => {}, (err) => {
  console.error(`Download failed: ${err.message}`);
  process.exit(1);
});
