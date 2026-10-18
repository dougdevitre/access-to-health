/**
 * Guards the in-site disclaimer on the published MkDocs site.
 *
 * - Every page carries the short notice (theme override announce block),
 *   with 911 and 988 as tel: links and a link to the full disclaimer.
 * - Every interactive tool page opts in to the one-time acknowledgment.
 * - The acknowledgment is remembered under a versioned key, and a storage
 *   failure never throws (the dialog just shows again next time).
 */
import * as fs from "fs";
import * as path from "path";

const ROOT = path.resolve(__dirname, "..", "..");
const TEMPLATE = path.join(ROOT, "docs", "overrides", "main.html");
const SCRIPT = path.join(ROOT, "docs", "javascripts", "disclaimer.js");
const INTERACTIVE = path.join(ROOT, "docs", "interactive");

const SHORT_NOTICE =
  "Educational information only. Access to Health is not legal, medical, " +
  "mental health, financial or safety advice, and using it creates no " +
  "professional relationship. In danger now? Call 911. For crisis support, " +
  "call or text 988. Confirm anything important with the official source " +
  "or a licensed professional.";

function read(file: string): string {
  return fs.existsSync(file) ? fs.readFileSync(file, "utf-8") : "";
}

function text(html: string): string {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function block(html: string, name: string): string {
  const match = html.match(
    new RegExp(`{% block ${name} %}([\\s\\S]*?){% endblock %}`)
  );
  return match ? match[1] : "";
}

describe("In-site disclaimer", () => {
  describe("persistent notice on every page", () => {
    const announce = block(read(TEMPLATE), "announce");

    it("carries the canonical short notice", () => {
      expect(text(announce)).toContain(SHORT_NOTICE);
    });

    it("links 911 and 988 as phone numbers, visible without interaction", () => {
      expect(announce).toMatch(/<a[^>]*href="tel:911"[^>]*>911<\/a>/);
      expect(announce).toMatch(/<a[^>]*href="tel:988"[^>]*>988<\/a>/);
    });

    it("links to the full disclaimer", () => {
      expect(announce).toContain(
        'href="https://github.com/dougdevitre/access-to-health/blob/main/DISCLAIMER.md">Read the full disclaimer</a>'
      );
    });

    it("is registered with the theme", () => {
      const config = read(path.join(ROOT, "mkdocs.yml"));
      expect(config).toMatch(/custom_dir: docs\/overrides/);
      expect(config).toMatch(/extra_javascript:\s*\n\s*- javascripts\/disclaimer\.js/);
    });
  });

  describe("one-time acknowledgment on interactive tools", () => {
    const pages = fs.existsSync(INTERACTIVE)
      ? fs.readdirSync(INTERACTIVE).filter((f) => f.endsWith(".md"))
      : [];

    it("finds the interactive tool pages", () => {
      expect(pages.length).toBeGreaterThan(0);
    });

    it.each(pages)("%s opts in through its front matter", (page) => {
      const source = read(path.join(INTERACTIVE, page));
      expect(source).toMatch(/^---\n[\s\S]*?disclaimer_ack: true[\s\S]*?\n---\n/);
    });

    it("renders a labelled dialog with the full text, crisis numbers and an I understand button", () => {
      const content = block(read(TEMPLATE), "content");
      expect(content).toMatch(/<dialog[^>]*aria-labelledby="atd-ack-title"/);
      expect(text(content)).toContain(
        "Not for emergencies. If anyone is in danger, call 911. For crisis support, call or text 988."
      );
      expect(text(content)).toContain("No warranty.");
      expect(content).toContain('href="tel:911"');
      expect(content).toContain('href="tel:988"');
      expect(content).toMatch(/<button[^>]*data-atd-ack-accept[^>]*>I understand<\/button>/);
    });

    it("does not let Esc dismiss the dialog without acknowledging", () => {
      const script = read(SCRIPT);
      expect(script).toMatch(/addEventListener\("cancel"[\s\S]*?preventDefault\(\)/);
      expect(script).toMatch(/addEventListener\("close"[\s\S]*?if \(!accepted\) open\(\)/);
    });
  });

  describe("acknowledgment storage", () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const ack = fs.existsSync(SCRIPT) ? require(SCRIPT) : {};

    function memoryStore() {
      const data: Record<string, string> = {};
      return {
        getItem: (k: string) => (k in data ? data[k] : null),
        setItem: (k: string, v: string) => {
          data[k] = v;
        },
      };
    }

    const brokenStore = {
      getItem: () => {
        throw new Error("SecurityError");
      },
      setItem: () => {
        throw new Error("QuotaExceededError");
      },
    };

    it("uses a versioned key", () => {
      expect(ack.KEY).toBe("disclaimer-ack-v1");
    });

    it("persists the acknowledgment", () => {
      const store = memoryStore();
      expect(ack.hasAcknowledged(store)).toBe(false);
      expect(ack.remember(store)).toBe(true);
      expect(ack.hasAcknowledged(store)).toBe(true);
    });

    it("treats a storage failure as not yet acknowledged, without throwing", () => {
      expect(() => ack.hasAcknowledged(brokenStore)).not.toThrow();
      expect(ack.hasAcknowledged(brokenStore)).toBe(false);
      expect(ack.remember(brokenStore)).toBe(false);
      expect(ack.hasAcknowledged(null)).toBe(false);
    });
  });
});
