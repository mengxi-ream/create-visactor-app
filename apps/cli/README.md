## What is Create VisActor App

Create VisActor App is a CLI tool that helps you quickly create web applications with the [VisActor](https://visactor.io) library. In other words, it provides boilerplates for integrating frontend frameworks with the VisActor library.

[Official Documentation](https://cva.mengxi.work/docs)

## Installation

You can use `npm`, `yarn` or `pnpm` to install the CLI tool.

Please refer to the [Installation documentation](https://cva.mengxi.work/docs/installation) for more details.

## Why

VTable:

1. theme need to customize
2. features

最复杂的 Table

1. style: https://dribbble.com/shots/15178020-Products-Table,
   1. 加入横线浅色，竖线消失，
   2. 某一列集成 VChart 的图表能力，
   3. filter row, filter column
   4. sorting
   5. aggregation 下钻和集合
2. last line [Add New Line]: https://dribbble.com/shots/18495011-Updated-Table-View
3. 可编辑 cell

甘特图

1. https://dribbble.com/shots/23913594-Dashboard-Gantt-Chart, 砍掉一些功能和视图

简单的单元格根据数据上色的 table

1. https://dribbble.com/shots/15885090-Heatmap-Figma-UI-kit

## Todo

- [x] Workflow: changesets, versioning, release workflow (important)
- [x] ESLint, Prettier better monorepo configuration (important)
- [ ] CLI:
  - [ ] execa new version grammars
  - [ ] refactor and restructure the code
- [ ] Template:
  - [x] Next.js demo template:
    - [x] Bug: Calendar (important)
    - [x] Improve: Font
    - [x] Delete prettier config
  - [x] Svelte Kit template (important)
- [ ] Documentation Website
- [ ] Github Management:
  - [x] Protect main branch
  - [-] Contribution guidelines (important)
  - [-] Issue templates (important)
  - [-] PR templates + PR linting (important)
- [ ] More ESLint and TS Configuration rules
- [ ] E2E Testing
