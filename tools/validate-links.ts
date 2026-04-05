/**
 * Internal Link Validator
 * Checks all markdown cross-references resolve to existing files
 * Usage: npx ts-node tools/validate-links.ts
 */

import * as fs from "fs";
import * as path from "path";

const ROOT = path.resolve(__dirname, "..");
const IGNORE_DIRS = ["node_modules", ".git", "site", "dist", "docs"];
const IGNORE_FILES = ["AUDIT.md"]; // Historical references to pre-reorganization paths

interface LinkResult {
  file: string;
  line: number;
  link: string;
  target: string;
  exists: boolean;
}

/**
 * Recursively find all markdown files
 */
function findMarkdownFiles(dir: string): string[] {
  const files: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (IGNORE_DIRS.includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip symlinks to avoid infinite loops in docs/
      if (entry.isSymbolicLink()) continue;
      files.push(...findMarkdownFiles(full));
    } else if (entry.name.endsWith(".md")) {
      files.push(full);
    }
  }
  return files;
}

/**
 * Extract markdown links from a file
 */
function extractLinks(
  filePath: string
): Array<{ line: number; link: string }> {
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n");
  const results: Array<{ line: number; link: string }> = [];

  // Match [text](link) but not external URLs, anchors, or images
  const linkPattern = /\[([^\]]*)\]\(([^)]+)\)/g;

  for (let i = 0; i < lines.length; i++) {
    let match;
    while ((match = linkPattern.exec(lines[i])) !== null) {
      const link = match[2];

      // Skip external URLs
      if (link.startsWith("http://") || link.startsWith("https://")) continue;
      // Skip anchors
      if (link.startsWith("#")) continue;
      // Skip mailto
      if (link.startsWith("mailto:")) continue;

      // Strip anchor from link
      const cleanLink = link.split("#")[0];
      if (cleanLink) {
        results.push({ line: i + 1, link: cleanLink });
      }
    }
  }

  // Also check backtick-quoted file references: `path/to/file.md`
  const backtickPattern = /`([a-z][\w/-]*\.\w+)`/g;
  for (let i = 0; i < lines.length; i++) {
    let match;
    while ((match = backtickPattern.exec(lines[i])) !== null) {
      const ref = match[1];
      // Skip example/placeholder filenames
      if (ref.startsWith("kebab-case")) continue;
      // Only check references that look like repo file paths
      if (
        ref.endsWith(".md") ||
        ref.endsWith(".json") ||
        ref.endsWith(".ts") ||
        ref.endsWith(".js") ||
        ref.endsWith(".csv")
      ) {
        results.push({ line: i + 1, link: ref });
      }
    }
  }

  return results;
}

/**
 * Resolve a link relative to the file that contains it
 */
function resolveLink(fromFile: string, link: string): string {
  const fromDir = path.dirname(fromFile);

  // If link starts with a directory that exists at root, resolve from root
  const firstSegment = link.split("/")[0];
  const rootCandidate = path.join(ROOT, link);
  const relativeCandidate = path.join(fromDir, link);

  if (fs.existsSync(rootCandidate)) return rootCandidate;
  if (fs.existsSync(relativeCandidate)) return relativeCandidate;

  // Try root first for paths that look absolute-ish
  if (
    [
      "roles",
      "populations",
      "workflows",
      "commands",
      "features",
      "communication",
      "messaging",
      "artifacts",
      "templates",
      "references",
      "bilingual",
      "mcp",
      "evals",
      "scripts",
      "schemas",
      "tools",
      "assets",
      "integration",
      "docs",
    ].includes(firstSegment)
  ) {
    return rootCandidate;
  }

  return relativeCandidate;
}

/**
 * Run the validator
 */
function validate(): void {
  const mdFiles = findMarkdownFiles(ROOT);
  const results: LinkResult[] = [];
  let broken = 0;
  let total = 0;

  for (const file of mdFiles) {
    if (IGNORE_FILES.some((f) => file.endsWith(f))) continue;
    const links = extractLinks(file);
    for (const { line, link } of links) {
      total++;
      const target = resolveLink(file, link);
      const exists = fs.existsSync(target);

      if (!exists) {
        broken++;
        results.push({
          file: path.relative(ROOT, file),
          line,
          link,
          target: path.relative(ROOT, target),
          exists: false,
        });
      }
    }
  }

  // Report
  console.log(`\nLink Validation Report`);
  console.log(`${"=".repeat(60)}`);
  console.log(`Files scanned: ${mdFiles.length}`);
  console.log(`Links checked: ${total}`);
  console.log(`Broken links:  ${broken}`);
  console.log();

  if (broken > 0) {
    console.log("BROKEN LINKS:");
    console.log();
    for (const r of results) {
      console.log(`  ${r.file}:${r.line}`);
      console.log(`    Link: ${r.link}`);
      console.log(`    Expected at: ${r.target}`);
      console.log();
    }
    process.exit(1);
  } else {
    console.log("All internal links valid.");
  }
}

validate();
