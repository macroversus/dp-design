#!/usr/bin/env bash
# 将 styleguide/ 同步到 docs/，供 GitHub Pages（main + /docs）发布。
# 保留 docs/ 根目录下的设计规范 Markdown，不被删除。
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/styleguide/"
DEST="$ROOT/docs/"

if [[ ! -d "$SRC" ]]; then
  echo "找不到 styleguide/: $SRC" >&2
  exit 1
fi

mkdir -p "$DEST"

# P = protect：同步删除时不删这些规范文件
rsync -a --delete \
  --filter='P CHANGELOG.md' \
  --filter='P 设计规范.md' \
  --filter='P 规范目录与缺口清单.md' \
  "$SRC" "$DEST"

echo "已同步: styleguide/ → docs/"
