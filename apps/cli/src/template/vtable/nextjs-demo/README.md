# VisActor Next.js Dashboard Template

A modern dashboard template built with [VisActor](https://visactor.io/) and Next.js, featuring a beautiful UI and rich data visualization components.

[Live Demo](https://visactor-next-template.vercel.app/)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mengxi-ream/visactor-next-template)

## Features

- 📊 **Rich Visualizations** - Powered by VisActor, including bar charts, gauge charts, circle packing charts, and more
- 🌗 **Dark Mode** - Seamless dark/light mode switching with system preference support
- 📱 **Responsive Design** - Fully responsive layout that works on all devices
- 🎨 **Beautiful UI** - Modern and clean interface built with Tailwind CSS
- ⚡️ **Next.js 15** - Built on the latest Next.js features and best practices
- 🔄 **State Management** - Efficient state management with Jotai
- 📦 **Component Library** - Includes Shadcn components styled with Tailwind

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [VisActor](https://visactor.io/) - Visualization library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Shadcn](https://ui.shadcn.com/) - UI components
- [Jotai](https://jotai.org/) - State management
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## Quick Start

You can deploy this template to Vercel by clicking the button above, or clone this repository and run it locally.

1. Clone this repository

```bash
git clone https://github.com/mengxi-ream/visactor-next-template
```

2. Install dependencies

```bash
pnpm install
```

3. Run the development server

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```bash
src/
├── app/ # App router pages
├── components/ # React components
│ ├── chart-blocks/ # Chart components
│ ├── nav/ # Navigation components
│ └── ui/ # UI components
├── config/ # Configuration files
├── data/ # Sample data
├── hooks/ # Custom hooks
├── lib/ # Utility functions
├── style/ # Global style
└── types/ # TypeScript types
```

## VTable:

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

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [VisActor](https://visactor.io/) - For the amazing visualization library
- [Vercel](https://vercel.com) - For the incredible deployment platform
- [Next.js](https://nextjs.org/) - For the awesome React framework
