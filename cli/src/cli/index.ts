import * as p from "@clack/prompts";
import { intro, outro } from "@clack/prompts";
import chalk from "chalk";
import { Command, InvalidArgumentError } from "commander";

import { DEFAULT_APP_NAME } from "~/consts.js";
import {
  type AvailableLibraries,
  type AvailablePackages,
  type AvailableTemplates,
} from "~/installers/index.js";
import { getUserPkgManager } from "~/utils/getUserPkgManager.js";
import { getVersion } from "~/utils/getVersion.js";
import {
  AppNameErrorMessage,
  validateAppName,
} from "~/utils/validateAppName.js";
import {
  LibraryErrorMessage,
  validateLibrary,
} from "~/utils/validateLibrary.js";

interface CliFlags {
  noGit: boolean;
  noInstall: boolean;
}

interface CliResults {
  library: AvailableLibraries;
  template: AvailableTemplates;
  appName: string;
  packages: AvailablePackages[];
  flags: CliFlags;
}

const defaultOptions: CliResults = {
  library: "vchart",
  template: "nextjs-minimal",
  appName: DEFAULT_APP_NAME,
  packages: ["tailwind"],
  flags: {
    noGit: false,
    noInstall: false,
  },
};

export const runCli = async (): Promise<CliResults> => {
  const cliResults = defaultOptions;

  const program = new Command();
  program
    .name("create-visactor-app")
    .description("A CLI for creating web applications with VisActor")
    .version(getVersion(), "-v, --version", "display the version number")
    .argument(
      "[library]",
      "The type of VisActor libraries to integrate: vchart, vtable",
      (value) => {
        if (!value) return value;
        if (validateLibrary(value)) {
          return value;
        }
        throw new InvalidArgumentError(LibraryErrorMessage);
      }
    )
    .argument(
      "[name]",
      "The name of the application, as well as the name of the directory to create",
      (value) => {
        if (!value) return value;
        if (validateAppName(value)) {
          return value;
        }
        throw new InvalidArgumentError(AppNameErrorMessage);
      }
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

  const cliLibrary = program.args[0] as AvailableLibraries | undefined;
  if (cliLibrary) {
    cliResults.library = cliLibrary;
  }

  const cliAppName = program.args[1];
  if (cliAppName) {
    cliResults.appName = cliAppName;
  }

  const pkgManager = getUserPkgManager();

  intro(chalk.bgHex("#68C2CD")(`create-visactor-app (v${getVersion()})`));

  const project = await p.group(
    {
      ...(!cliLibrary && {
        library: () =>
          p.select({
            message: "Which library would you like?",
            options: [
              {
                value: "vchart",
                label: "VChart",
              },
              {
                value: "vtable",
                label: "VTable",
                hint: "Not available yet",
              },
            ],
          }),
      }),
      _library: ({ results }) => {
        if (results.library === "vtable") {
          p.note("VTable is not available yet");
          throw new Error("VTable is not available yet");
        }
        return undefined;
      },
      ...(!cliAppName && {
        name: () =>
          p.text({
            message: "What will your project be called?",
            defaultValue: DEFAULT_APP_NAME,
            placeholder: DEFAULT_APP_NAME,
            validate: (value) => {
              const validatedName = value || DEFAULT_APP_NAME;
              if (validateAppName(validatedName)) {
                return;
              } else {
                return AppNameErrorMessage;
              }
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
      _template: ({ results }) => {
        if (results.template === "svelte") {
          p.note("This template is not available yet");
          throw new Error("This template is not available yet");
        }
        return undefined;
      },
      // tailwind: () => {
      //   return p.confirm({
      //     message: "Will you be using Tailwind CSS for styling?",
      //   });
      // },
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
  // if (project.tailwind) {
  //   packages.push("tailwind");
  // }

  return {
    library: cliLibrary ?? cliResults.library,
    appName: project.name ?? cliResults.appName,
    packages,
    flags: {
      noGit: !project.git || cliResults.flags.noGit,
      noInstall: !project.install || cliResults.flags.noInstall,
    },
    template: project.template ?? cliResults.template,
  };
};
