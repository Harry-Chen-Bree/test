# test

[![Deploy EventCatalog](https://github.com/Harry-Chen-Bree/test/actions/workflows/deploy-eventcatalog.yml/badge.svg)](https://github.com/Harry-Chen-Bree/test/actions/workflows/deploy-eventcatalog.yml)

## EventCatalog

- Local dev: `cd eventcatalog && npm run dev` → http://localhost:3000
- Build: `cd eventcatalog && npm ci --ignore-scripts && npm run build`
- Output: `eventcatalog/dist`

### GitHub Pages

This repo auto-deploys EventCatalog from `eventcatalog/` to GitHub Pages on pushes to `main`.

1. Settings → Pages → Build and deployment → Source: GitHub Actions
2. Workflow: `.github/workflows/deploy-eventcatalog.yml`
3. Site URL: https://harry-chen-bree.github.io/test/

The base path is configured via `EC_BASE` (set to `/test` in CI).
