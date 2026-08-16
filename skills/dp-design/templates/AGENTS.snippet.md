# AGENTS.md 片段 · DP Design

将以下内容合并进项目根目录 `AGENTS.md`（若无则新建）。路径按你实际放置的包目录调整。

```markdown
## Frontend · DP Design

Trigger word: **dpdesign**

When the user says `dpdesign`, or when changing/creating frontend UI (layout, theme, components, copy, empty states, i18n):

1. Follow `docs/dp-design/AGENT.md` (DP Design / Bohrium Baseline).
2. Prefer CSS variables from DP tokens (`--dp-*`); do not hard-code a conflicting primary color.
3. Use Product vs Showcase density rules as stated in AGENT.md.
4. Do not use archived illustration SVGs; use outlined icons 48–64 for empty states.
5. For visual reference, use the DP Design styleguide site when available.
6. Capsule toggles: follow `segment.md` (sliding thumb; do not paint the active item background).
```
