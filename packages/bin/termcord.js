#!/usr/bin/env node

const { spawnSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const binaryName = process.platform === "win32" ? "termcord.exe" : "termcord";
const binaryPath = path.join(__dirname, "..", "vendor", binaryName);

if (!fs.existsSync(binaryPath)) {
  console.error(
    "termcord binary not found. Try reinstalling the package:\n  npm install -g termcord"
  );
  process.exit(1);
}

const result = spawnSync(binaryPath, process.argv.slice(2), {
  stdio: "inherit",
});

process.exit(result.status ?? 1);
