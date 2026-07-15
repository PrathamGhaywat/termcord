const https = require("https");
const fs = require("fs");
const path = require("path");

const VERSION = "v1.0.0";

const platformMap = {
  win32: "termcord-windows.exe",
  darwin: "termcord-macos",
  linux: "termcord-linux",
};

const assetName = platformMap[process.platform];

if (!assetName) {
  console.error(`Unsupported platform: ${process.platform}`);
  process.exit(1);
}

const binaryName = process.platform === "win32" ? "termcord.exe" : "termcord";
const vendorDir = path.join(__dirname, "vendor");
const binaryPath = path.join(vendorDir, binaryName);

const url = `https://github.com/PrathamGhaywat/termcord/releases/download/${VERSION}/${assetName}`;

fs.mkdirSync(vendorDir, { recursive: true });

console.log(`Downloading termcord for ${process.platform}...`);

https
  .get(url, (res) => {
    if (res.statusCode !== 200) {
      console.error(`Download failed (HTTP ${res.statusCode}): ${url}`);
      process.exit(1);
    }
    const file = fs.createWriteStream(binaryPath);
    res.pipe(file);
    file.on("finish", () => {
      file.close();
      if (process.platform !== "win32") {
        fs.chmodSync(binaryPath, 0o755);
      }
      console.log("termcord installed successfully.");
    });
  })
  .on("error", (err) => {
    console.error(`Download failed: ${err.message}`);
    process.exit(1);
  });
