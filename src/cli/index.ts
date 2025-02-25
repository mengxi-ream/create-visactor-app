import { Command } from "commander";
import { DEFAULT_APP_NAME } from "~/consts.js";
import { getVersion } from "~/utils/getVersion.js";
import { AvailablePackages, AvailableTemplates } from "~/installers/index.js";
import chalk from "chalk";
import * as p from "@clack/prompts";
import { intro, outro } from "@clack/prompts";
import { validateAppName } from "~/utils/validateAppName.js";
import { getUserPkgManager } from "~/utils/getUserPkgManager.js";

interface CliFlags {
  noGit: boolean;
  noInstall: boolean;
}

interface CliResults {
  appName: string;
  packages: AvailablePackages[];
  flags: CliFlags;
  template: AvailableTemplates;
}

const defaultOptions = {
  appName: DEFAULT_APP_NAME,
  packages: ["tailwind"],
  flags: {
    noGit: false,
    noInstall: false,
  },
  template: "nextjs-minimal",
};

export const runCli = async (): Promise<CliResults> => {
  const cliResults = defaultOptions;

  const program = new Command();
  program
    .name("create-vchart-app")
    .description("A CLI for creating web applications with VChart")
    .version(getVersion(), "-v, --version", "display the version number")
    .argument(
      "[name]",
      "The name of the application, as well as the name of the directory to create"
    )
    .option(
      "--noGit",
      "Explicitly tell the CLI to not initialize a new git repo in the project",
      false
    )
    .option(
      "--noInstall",
      "Explicitly tell the CLI to not run the package manager's install command",
      false
    )
    .addHelpText(
      "afterAll",
      `\n The create-vchart-app was inspired by ${chalk
        .hex("#E8DCFF")
        .bold("@mengxi_ream")}\n`
    )
    .parse(process.argv);

  const cliAppName = program.args[0];
  if (cliAppName) {
    cliResults.appName = cliAppName;
  }

  const pkgManager = getUserPkgManager();

  intro(chalk.bgHex("#68C2CD")(`create-vchart-app`));

  const project = await p.group(
    {
      ...(!cliAppName && {
        name: () =>
          p.text({
            message: "What will your project be called?",
            defaultValue: DEFAULT_APP_NAME,
            placeholder: DEFAULT_APP_NAME,
            validate: (value) => {
              const validatedName = value || DEFAULT_APP_NAME;
              return validateAppName(validatedName);
            },
          }),
      }),
      template: () => {
        return p.select({
          message: "Which template would you like?",
          options: [
            {
              value: "nextjs-minimal",
              label: "Next.js minimal",
              hint: "A bare-bones Next.js starter with VChart integration",
            },
            {
              value: "nextjs-demo",
              label: "Next.js demo",
              hint: "Full featured Next.js dashboard demo",
            },
            {
              value: "svelte",
              label: "Svelte",
              hint: "SvelteKit starter with VChart components",
            },
          ],
        });
      },
      tailwind: () => {
        return p.confirm({
          message: "Will you be using Tailwind CSS for styling?",
        });
      },
      ...(!cliResults.flags.noGit && {
        git: () => {
          return p.confirm({
            message:
              "Should we initialize a Git repository and stage the changes?",
            initialValue: !defaultOptions.flags.noGit,
          });
        },
      }),
      ...(!cliResults.flags.noInstall && {
        install: () => {
          return p.confirm({
            message:
              `Should we run '${pkgManager}` +
              (pkgManager === "yarn" ? `'?` : ` install' for you?`),
            initialValue: !defaultOptions.flags.noInstall,
          });
        },
      }),
    },
    {
      onCancel: () => {
        outro(chalk.red("Operation cancelled"));
        process.exit(1);
      },
    }
  );

  const packages: AvailablePackages[] = [];
  if (project.tailwind) {
    packages.push("tailwind");
  }

  return {
    appName: project.name ?? cliResults.appName,
    packages,
    flags: {
      noGit: project.git ?? cliResults.flags.noGit,
      noInstall: project.install ?? cliResults.flags.noInstall,
    },
    template: project.template ?? cliResults.template,
  };
};
