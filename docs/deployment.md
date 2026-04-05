# Deployment Guide — GitHub Pages, Custom Domain, and SEO

> How to deploy the Access to Health documentation site

---

## Enable GitHub Pages

### Step 1: Repository Settings
1. Go to your repository on GitHub
2. Click **Settings** > **Pages** (left sidebar)
3. Under **Source**, select **GitHub Actions**
4. Click **Save**

### Step 2: Trigger Deployment
The docs deploy automatically on every push to `main` via `.github/workflows/deploy-docs.yml`. To trigger manually:
1. Go to **Actions** tab
2. Click **Deploy Docs** workflow
3. Click **Run workflow** > **Run workflow**

### Step 3: Verify
After deployment completes (~2 minutes):
- Visit `https://[your-username].github.io/access-to-health/`
- Verify navigation, search, and Mermaid diagrams work
- Check dark/light mode toggle

---

## Custom Domain (Optional)

### Step 1: DNS Configuration
Add a CNAME record at your DNS provider:

| Type | Name | Value |
|------|------|-------|
| CNAME | `health` (or your subdomain) | `[your-username].github.io` |

Example: `health.cotrackpro.com` → `dougdevitre.github.io`

### Step 2: GitHub Settings
1. **Settings** > **Pages** > **Custom domain**
2. Enter your domain (e.g., `health.cotrackpro.com`)
3. Check **Enforce HTTPS**
4. Wait for DNS verification and certificate provisioning (~10 minutes)

### Step 3: Update MkDocs Config
Edit `mkdocs.yml`:
```yaml
site_url: https://health.cotrackpro.com/
```

### Step 4: Add CNAME File
Create `docs/CNAME` with your domain:
```
health.cotrackpro.com
```

---

## SEO Optimization

The MkDocs Material theme includes built-in SEO features. Additional optimizations:

### Meta Tags (already configured in mkdocs.yml)
```yaml
site_name: Access to Health
site_description: Comprehensive AI Operating System for Public Health Professionals
site_url: https://dougdevitre.github.io/access-to-health/
```

### Social Cards
Add to `mkdocs.yml` for automatic Open Graph / Twitter cards:
```yaml
plugins:
  - social:
      cards_layout: default
```

### Sitemap
MkDocs Material generates `sitemap.xml` automatically at build time. Submit to Google Search Console after deployment.

### Google Search Console
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property (URL prefix or domain)
3. Verify ownership (HTML file, DNS, or meta tag)
4. Submit sitemap: `https://[your-domain]/sitemap.xml`

### robots.txt
MkDocs Material generates a default `robots.txt`. To customize, create `docs/robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://[your-domain]/sitemap.xml
```

---

## Monitoring

### Analytics (Optional)
Add to `mkdocs.yml` for Google Analytics:
```yaml
extra:
  analytics:
    provider: google
    property: G-XXXXXXXXXX
```

### Uptime Monitoring
Use a free service like UptimeRobot or GitHub's built-in status to monitor site availability.

---

## Updating the Site

The documentation site rebuilds automatically when:
- A PR is merged to `main`
- A push is made directly to `main`
- The workflow is manually triggered

**Build time**: ~2 minutes for full rebuild
**No manual deployment needed** — it's fully automated via GitHub Actions
