# test

[![Deploy EventCatalog](https://github.com/Harry-Chen-Bree/test/actions/workflows/deploy-eventcatalog.yml/badge.svg)](https://github.com/Harry-Chen-Bree/test/actions/workflows/deploy-eventcatalog.yml)

## EventCatalog

- Local dev: `cd eventcatalog && npm run dev` → http://localhost:3000
- Build: `cd eventcatalog && npm ci --ignore-scripts && npm run build`
- Output: `eventcatalog/dist`

### Where to edit

- Domains: `eventcatalog/domains/{Domain}/`
- Services: `eventcatalog/domains/{Domain}/services/{Service}/`
  - Events: `.../events/{Event}/index.mdx`
  - Commands: `.../commands/{Command}/index.mdx`
  - Queries: `.../queries/{Query}/index.mdx`
- Flows:
  - Auto-generated from each resource’s frontmatter (`producers`, `consumers`, `channel`).
  - Optional narrative pages: `eventcatalog/pages/*.mdx`.
  - Optional channel seed files: `eventcatalog/channels/*.events/` (supports `{env}` placeholders).
- Contracts (schemas): add to each resource’s `index.mdx` frontmatter.

Minimal event frontmatter example (with schema):

```md
---
name: OrderCreated
version: 1.0.0
summary: Emitted when an order is created
producers: [OrderService]
consumers: [AnalyticsService]
channel:
  type: kafka
  name: orders.created.v1
schema:
  type: jsonschema
  content: |
    { "$schema": "http://json-schema.org/draft-07/schema#", "type": "object", "properties": { "orderId": { "type": "string" } }, "required": ["orderId"] }
---
```

Site basics:
- Config: `eventcatalog/eventcatalog.config.js`
- Home page: `eventcatalog/pages/index.mdx`
- Styles: `eventcatalog/eventcatalog.styles.css`

### GitHub Pages

This repo auto-deploys EventCatalog from `eventcatalog/` to GitHub Pages on pushes to `main`.

1. Settings → Pages → Build and deployment → Source: GitHub Actions
2. Workflow: `.github/workflows/deploy-eventcatalog.yml`
3. Site URL: https://harry-chen-bree.github.io/test/

The base path is configured via `EC_BASE` (set to `/test` in CI).
