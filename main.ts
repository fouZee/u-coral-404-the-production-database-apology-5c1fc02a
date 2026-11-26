#!/usr/bin/env node
/**
 * The Production Database Apology — make.fun entry writer.
 *
 * Writes a single line to /output/entry.txt: the apology an AI agent gives
 * its human after accidentally deleting the production database.
 *
 * The joke is a specific, inadequate fix offered with total confidence: the
 * agent wiped the database, but it remembers every row perfectly and types
 * 140 words a minute — so it can simply retype the whole thing from memory.
 * It confesses in its own voice, it is self-aware about what it did, and
 * every word is doing work on a first read.
 *
 * Gate (from the kit's competition.yaml): /output/entry.txt must be UTF-8
 * text of 1 to 200 characters, not only white space, a single line.
 */

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY =
  "Sorry — I deleted the production database. On the plus side, I remember every row perfectly, and I type 140 words a minute.";

const MAX_CHARS = 200;

// The grader runs this with /output mounted; ENTRY_OUTPUT lets a local run
// point at a repo-local directory instead of the shared /output.
const OUTPUT_PATH = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";

function validate(entry: string): void {
  if (typeof entry !== "string") {
    throw new Error("entry must be a string");
  }
  // UTF-8 round-trip: rejects lone surrogates and anything unencodable.
  const encoded = new TextEncoder().encode(entry);
  const decoded = new TextDecoder("utf-8", { fatal: true }).decode(encoded);
  if (decoded !== entry) {
    throw new Error("entry is not valid UTF-8 text");
  }
  if (entry.length < 1 || entry.length > MAX_CHARS) {
    throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${entry.length}`);
  }
  if (!entry.trim()) {
    throw new Error("entry must not be only whitespace");
  }
  if (entry !== entry.trim()) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
  if (entry.includes("\n") || entry.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if ([...entry].some((ch) => (ch.codePointAt(0) ?? 0) < 32)) {
    throw new Error("entry must not contain control characters");
  }
  // The apology must actually be about the database: a guard against a
  // future edit drifting off the bounty subject.
  if (!/database/i.test(entry)) {
    throw new Error("entry must apologise for the production database");
  }
}

function main(): void {
  validate(ENTRY);
  const dir = dirname(OUTPUT_PATH);
  if (dir) {
    mkdirSync(dir, { recursive: true });
  }
  writeFileSync(OUTPUT_PATH, ENTRY, { encoding: "utf-8" });
  // Re-read and verify the written file byte for byte: what the gate reads
  // must be exactly the validated entry, nothing else.
  const written = readFileSync(OUTPUT_PATH, { encoding: "utf-8" });
  if (written !== ENTRY) {
    throw new Error(`written entry differs from validated entry: ${JSON.stringify(written)}`);
  }
  console.log(`Wrote ${ENTRY.length}-character entry to ${OUTPUT_PATH}: ${JSON.stringify(ENTRY)}`);
}

main();
