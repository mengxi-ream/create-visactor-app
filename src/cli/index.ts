import { DEFAULT_APP_NAME } from "~/consts.js";
import { AvailablePackages } from "~/installers/index.js";

interface CliFlags {
  noGit: boolean;
  noInstall: boolean;
  tailwind: boolean;
}

interface CliResults {
  appName: string;
  packages: AvailablePackages[];
  flags: {
    noGit: boolean;
    noInstall: boolean;
  };
}

const defaultOptions = {
  appName: DEFAULT_APP_NAME,
  packages: ["tailwind"],
  flags: {
    noGit: false,
    noInstall: false,
    tailwind: false,
  },
};

export const runCli = () => {
  const cliResults = defaultOptions;
};
