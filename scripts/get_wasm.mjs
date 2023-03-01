// @ts-check
import JsZip from "jszip";
import { fileURLToPath } from "node:url";
import { writeFile } from "node:fs/promises";

let DOWNLOAD_URL = `https://github.com/pku-software/mini_lisp/releases/download/v20220301.r1/mini_lisp_wasm.zip`;
const DESTINATION = fileURLToPath(new URL("../docs/.vuepress/public", import.meta.url).href);

if (process.env.USE_CF_PROXY) {
  DOWNLOAD_URL = `https://v4.vscch.tk/proxy?target=${encodeURIComponent(DOWNLOAD_URL)}`;
}

const buf = await fetch(DOWNLOAD_URL).then(r => r.arrayBuffer());
const zip = await JsZip.loadAsync(buf);
const wasm = await zip.file("mini_lisp.wasm")?.async("arraybuffer");
const js = await zip.file("mini_lisp.js")?.async("arraybuffer");

if (!wasm || !js) {
  throw new Error("Failed to download wasm");
}

await writeFile(`${DESTINATION}/mini_lisp.wasm`, Buffer.from(wasm));
await writeFile(`${DESTINATION}/mini_lisp.js`, Buffer.from(js));
