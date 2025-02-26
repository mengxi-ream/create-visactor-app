import { type BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import Image from "next/image";

/**
 * Shared layout configurations
 *
 * You can customize layouts individually from:
 * - Home Layout: app/(home)/layout.tsx
 * - Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  githubUrl: "https://github.com/mengxi-ream/create-visactor-app",
  nav: {
    title: (
      <>
        <Image src="/visactor.png" alt="Logo" width={24} height={24} />
        Create VisActor App
      </>
    ),
  },
  links: [
    {
      text: "Documentation",
      url: "/docs",
      active: "nested-url",
    },
  ],
};
