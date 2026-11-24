// Worst AI Advice entry: delete the error message.
// Writes a single one-line piece of terrible AI advice to /output/entry.txt.
// The line was authored in-session for this entry: to fix the bug,
// delete the error message, because if you cannot see it, it cannot
// hurt you, in a straight-faced AI-assistant voice.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
const LINE =
  "To fix the bug, delete the error message. If you cannot see it, it cannot hurt you.";

// Guard mirrors the sealed scorer's gate: /output/entry.txt must be
// UTF-8 text of 1 to 140 characters, a single line, not only whitespace.
// An entry outside those limits is never judged and takes no prize, so
// check the line against the same limits before writing it out.
function assertGateValid(text: string): void {
  if (text.length < 1 || text.length > 140) {
    throw new Error(`line must be 1-140 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("line must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("line must be a single line");
  }
}
assertGateValid(LINE);
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
