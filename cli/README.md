## What is Create VisActor App

Create VisActor App is a CLI tool that helps you quickly create web applications with the [VisActor](https://visactor.io) library. In other words, it provides boilerplates for integrating frontend frameworks with the VisActor library.

We support the following frontend frameworks:

- [Next.js](https://nextjs.org)
- [Svelte](https://svelte.dev)
- More coming soon...

The VisActor libraries we support are:

- [VChart](https://visactor.io/vchart)
- [VTable](https://visactor.io/vtable) (WIP)

## Installation

```bash
npx create-visactor-app@latest
```

## Development

For development:

```bash
pnpm link-cli
```

## Todo

- [ ] Workflow: changesets, versioning, release workflow
- [ ] ESLint, Prettier better monorepo configuration (important)
- [ ] CLI:
  - [ ] execa new version grammars
  - [ ] refactor and restructure the code
- [ ] Template:
  - [ ] Next.js demo template:
    - [ ] Bug: Calendar (important)
    - [ ] Improve: Font
  - [ ] Next.js minimal template
    - [ ] Upgrade Tailwind to v4
  - [ ] Svelte Kit template (important)
- [ ] Assemble options: tailwind, prettier, biome
- [ ] Github Management:
  - [ ] Contribution guidelines (important)
  - [ ] Issue templates (important)
  - [ ] PR templates + PR linting (important)
