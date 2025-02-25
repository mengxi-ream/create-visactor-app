export const availablePackages = ["tailwind"] as const;
export type AvailablePackages = (typeof availablePackages)[number];

export const availableTemplates = [
  "nextjs-minimal",
  "nextjs-demo",
  "svelte",
] as const;
export type AvailableTemplates = (typeof availableTemplates)[number];
