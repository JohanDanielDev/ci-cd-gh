import { readFileSync } from "node:fs";
import { test } from "node:test";
import assert from "node:assert/strict";

const html = readFileSync(new URL("../site/index.html", import.meta.url), "utf8");

test("homepage declares Spanish and has a title", () => {
  assert.match(html, /<html lang="es">/);
  assert.match(html, /<title>Actions Learning Lab<\/title>/);
});

test("homepage has a main landmark and content", () => {
  assert.match(html, /<main id="main">/);
  assert.match(html, /<h1>Mi primera entrega<\/h1>/);
  assert.match(html, /Validada antes de publicar\./);
});
