export const availablePackages = ["tailwind"] as const;
export type AvailablePackages = (typeof availablePackages)[number];

export const availableTemplates = ["nextjs-demo", "svelte-demo"] as const;
export type AvailableTemplates = (typeof availableTemplates)[number];

export const availableLibraries = ["vchart", "vtable"] as const;
export type AvailableLibraries = (typeof availableLibraries)[number];
