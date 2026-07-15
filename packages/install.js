const https = require("https");
const fs = require("fs");
const path = require("path");

const VERSION = "v1.0.0";

const assetMap = {
  "win32-x64": "termcord-windows-x64.exe",
  "win32-arm64": "termcord-windows-arm64.exe",
  "darwin-arm64": "termcord-macos-arm64",
  "linux-x64": "termcord-linux-x64",
  "linux-arm64": "termcord-linux-arm64",
};

const platformKey = `${process.platform}-${process.arch}`;
const assetName = assetMap[platformKey];

if (!assetName) {
  console.error(`Unsupported platform/arch: ${platformKey}`);
  console.error("Available platforms: win32-x64, win32-arm64, darwin-arm64, linux-x64, linux-arm64");
  process.exit(1);
}

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
