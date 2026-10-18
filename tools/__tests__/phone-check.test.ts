/**
 * Phone check for the published docs site (MkDocs Material).
 *
 * Found by a Playwright + axe-core audit of every built page at 320 and 375px,
 * in light and dark, and by playing the three interactive tools with a
 * keyboard only. Each rule below fails against the code that audit ran on.
 *
 * - The SDOH quick screen printed its result headings as "## Results" text:
 *   markdown inside a raw HTML block is not converted.
 * - Answering a screening question disabled the focused button, which drops
 *   keyboard focus to the top of the page; nothing was announced. The ROI
 *   result and the calendar's entry count changed silently too.
 * - The tool fields were 19-30px tall, ran wider than a phone at 200% zoom,
 *   and used 13px text (iOS zooms the page when such a field gets focus).
 * - The calendar outline jumped from the page h1 to h4.
 * - Material's teal measured 3.77:1 under white (header, links, buttons) and
 *   the accent 2.78:1 (button hover and keyboard focus).
 * - The disclaimer's announcement bar was near-black over the white page.
 * - On a phone, ~100 links of the closed navigation drawer sat in the Tab
 *   order off-screen, and the menu button could not be reached by keyboard.
 */
import * as fs from "fs";
import * as path from "path";

const ROOT = path.resolve(__dirname, "..", "..");
const DOCS = path.join(ROOT, "docs");
const INTERACTIVE = path.join(DOCS, "interactive");
const CSS = fs.readFileSync(path.join(DOCS, "stylesheets", "extra.css"), "utf-8");
const TEMPLATE = fs.readFileSync(path.join(DOCS, "overrides", "main.html"), "utf-8");

const TOOLS = ["sdoh-quick-screen.md", "roi-calculator.md", "engagement-calendar.md"];
const page = (name: string) => fs.readFileSync(path.join(INTERACTIVE, name), "utf-8");

/** WCAG relative luminance and contrast ratio for #rrggbb. */
function luminance(hex: string): number {
  const h = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => {
    const v = parseInt(h.slice(i, i + 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}
const WHITE = "#ffffff";
const BODY_TEXT = "#212121"; // Material's light-scheme text, rgba(0,0,0,.87) on white
const SLATE_BG = "#1e2129"; // Material's slate background, hsla(232,15%,14%)
const CODE_BG = "#f5f5f5"; // Material's light-scheme code background, behind linked inline code

/** The declarations of the first rule whose selector is exactly `selector`. */
function rule(css: string, selector: string): string {
  const at = css.indexOf(selector + " {");
  expect(at).toBeGreaterThanOrEqual(0);
  return css.slice(css.indexOf("{", at) + 1, css.indexOf("}", at));
}
function token(block: string, name: string): string {
  const m = block.match(new RegExp(`${name}\\s*:\\s*(#[0-9a-fA-F]{6})`));
  expect(m).not.toBeNull();
  return m![1];
}

describe("Phone check: interactive tools", () => {
  it.each(TOOLS)("%s has no markdown heading inside a raw HTML block", (name) => {
    let depth = 0;
    const stray: string[] = [];
    for (const line of page(name).split("\n")) {
      if (depth > 0 && /^#{1,6} /.test(line)) stray.push(line);
      depth += (line.match(/<div\b/g) || []).length - (line.match(/<\/div>/g) || []).length;
    }
    expect(stray).toEqual([]);
  });

  it.each(["roi-calculator.md", "engagement-calendar.md"])(
    "%s gives its fields 44px, phone-width, 16px-text styling",
    (name) => {
      const source = page(name);
      expect(source).toMatch(/<(select|input)\b/);
      expect(source).toMatch(/min-height:\s*44px/);
      expect(source).toMatch(/max-width:\s*100%/);
      expect(source).toMatch(/font-size:\s*max\(16px/);
      // Fixed pixel widths on the fields are what pushed the page sideways.
      expect(source).not.toMatch(/<(select|input)[^>]*style="[^"]*width:\s*\d+px/);
    }
  );

  it.each(TOOLS)("%s respects reduced motion when it scrolls", (name) => {
    const source = page(name);
    if (/behavior:\s*'smooth'/.test(source)) {
      expect(source).toMatch(/prefers-reduced-motion/);
    }
    expect(source).not.toMatch(/scrollIntoView\(\{\s*behavior:\s*'smooth'/);
  });

  describe("SDOH quick screen", () => {
    const source = page("sdoh-quick-screen.md");

    it("labels each question's Yes/No pair with its question", () => {
      for (const n of [1, 2, 3, 4, 5]) {
        expect(source).toContain(
          `id="q${n}-block" role="group" aria-labelledby="q${n}-title q${n}-text"`
        );
      }
    });

    it("moves focus to the answer, then to the results, then back to question 1", () => {
      for (const n of [1, 2, 3, 4, 5]) {
        expect(source).toContain(`<p id="q${n}-result" class="result-text" tabindex="-1"></p>`);
      }
      expect(source).toMatch(/else \{[\s\S]*?el\.focus\(\);/);
      expect(source).toContain('<h2 id="results-title" tabindex="-1">Results</h2>');
      expect(source).toMatch(/title\.focus\(/);
      expect(source).toMatch(/querySelector\('#q1-block button'\)\.focus\(/);
    });

    it("draws each risk level at 4.5:1 or better in both schemes", () => {
      const light = rule(source, ":root");
      const dark = rule(source, '[data-md-color-scheme="slate"]');
      for (const level of ["none", "low", "moderate", "high", "critical"]) {
        expect(contrast(token(light, `--atd-risk-${level}`), WHITE)).toBeGreaterThanOrEqual(4.5);
        expect(contrast(token(dark, `--atd-risk-${level}`), SLATE_BG)).toBeGreaterThanOrEqual(4.5);
      }
    });
  });

  it("ROI calculator announces a one-line summary instead of the whole card", () => {
    const source = page("roi-calculator.md");
    expect(source).toMatch(/<p id="roi-status"[^>]*role="status"/);
    expect(source).not.toMatch(/id="roi-results"[^>]*aria-live/);
    expect(source).toMatch(/announceROI\(/);
  });

  describe("Engagement calendar", () => {
    const source = page("engagement-calendar.md");

    it("announces the entry count when a filter changes", () => {
      expect(source).toMatch(/<div id="calendar-count" role="status"/);
    });

    it("titles entries at h2, under the page h1", () => {
      expect(source).not.toMatch(/'<h[3-6]>'/);
      expect(source).toContain("'<h2>' + e.obs + '</h2>'");
    });

    it("draws population badges at 4.5:1 under white in both schemes", () => {
      const pop = rule(source, ".cal-pop");
      expect(pop).not.toMatch(/var\(--md-accent-fg-color\)/);
      expect(contrast(token(pop, "background"), WHITE)).toBeGreaterThanOrEqual(4.5);
    });
  });
});

describe("Phone check: site-wide", () => {
  it("primary colour passes under white text and stays distinct from body text", () => {
    const primary = token(rule(CSS, '[data-md-color-primary="teal"]'), "--md-primary-fg-color");
    expect(contrast(primary, WHITE)).toBeGreaterThanOrEqual(4.5);
    expect(contrast(primary, CODE_BG)).toBeGreaterThanOrEqual(4.5);
    expect(contrast(primary, BODY_TEXT)).toBeGreaterThanOrEqual(3);
  });

  it("accent (button hover and keyboard focus) passes under white text", () => {
    const accent = token(
      rule(CSS, '[data-md-color-scheme="default"][data-md-color-accent="deep-orange"]'),
      "--md-accent-fg-color"
    );
    expect(contrast(accent, WHITE)).toBeGreaterThanOrEqual(4.5);
  });

  it("does not paint the disclaimer bar dark on the light scheme", () => {
    const banner = token(rule(CSS, '[data-md-color-scheme="default"] .md-banner'), "background-color");
    expect(luminance(banner)).toBeGreaterThan(0.5);
    expect(contrast(banner, BODY_TEXT)).toBeGreaterThanOrEqual(4.5);
  });

  it("underlines links set in lighter text, where colour alone cannot set them apart", () => {
    expect(rule(CSS, ".md-typeset blockquote a")).toMatch(/text-decoration:\s*underline/);
    expect(rule(CSS, ".md-typeset .hero p a")).toMatch(/text-decoration:\s*underline/);
    expect(rule(CSS, ".md-typeset .hero p")).not.toMatch(/opacity\s*:/);
  });

  it("takes the closed drawer out of the Tab order and makes the menu button a button", () => {
    expect(CSS).toMatch(
      /\[data-md-toggle="drawer"\]:not\(:checked\) ~ \.md-container \.md-sidebar--primary \{\s*visibility: hidden;/
    );
    expect(TEMPLATE).toContain('button.setAttribute("role", "button")');
    expect(TEMPLATE).toContain('button.setAttribute("tabindex", "0")');
    expect(TEMPLATE).toMatch(/event\.key === "Escape" && toggle\.checked/);
  });

  it("names the progress bar and task-list checkboxes, and makes scrolling tables focusable", () => {
    expect(TEMPLATE).toMatch(/\{% block scripts %\}\s*\{\{ super\(\) \}\}/);
    expect(TEMPLATE).toContain('bar.setAttribute("aria-label", "Loading page")');
    expect(TEMPLATE).toMatch(/\.task-list-control input\[type=checkbox\][\s\S]*?setAttribute\("aria-label", name\)/);
    expect(TEMPLATE).toMatch(/\.md-typeset__scrollwrap[\s\S]*?setAttribute\("tabindex", "0"\)/);
  });
});
