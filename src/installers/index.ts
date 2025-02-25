export const availablePackages = ["tailwind"] as const;
export type AvailablePackages = (typeof availablePackages)[number];
