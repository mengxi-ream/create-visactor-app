import path from "path";
import * as p from "@clack/prompts";
import { PKG_ROOT } from "~/consts.js";
import { getUserPkgManager } from "~/utils/getUserPkgManager.js";
import { logger } from "~/utils/logger.js";
import chalk from "chalk";
import fs from "fs-extra";
import ora from "ora";

export const createApp = async (
  appName: string,
  library: string,
  template: string,
  noInstall: boolean,
) => {
  const pkgManager = getUserPkgManager();
  const templateDir = path.join(PKG_ROOT, "src", "template", library, template);
  const targetDir = path.resolve(process.cwd(), appName);

  if (!noInstall) {
    logger.info(`\nUsing: ${chalk.cyan(pkgManager)}\n`);
  } else {
    logger.info("");
  }

  const spinner = ora(`Scaffolding in: ${targetDir}...\n`).start();

  if (fs.existsSync(targetDir)) {
    if (fs.readdirSync(targetDir).length === 0) {
      if (appName !== ".")
        spinner.info(
          `${chalk.cyan.bold(appName)} exists but is empty, continuing...\n`,
        );
    } else {
      spinner.stopAndPersist();
      const overwriteDir = await p.select({
        message: `${chalk.redBright.bold("Warning:")} ${chalk.cyan.bold(
          appName,
        )} already exists and isn't empty. How would you like to proceed?`,
        options: [
          {
            label: "Abort installation (recommended)",
            value: "abort",
          },
          {
            label: "Clear the directory and continue installation",
            value: "clear",
          },
          {
            label: "Continue installation and overwrite conflicting files",
            value: "overwrite",
          },
        ],
        initialValue: "abort",
      });

      if (p.isCancel(overwriteDir) || overwriteDir === "abort") {
        spinner.fail("Aborting installation...");
        process.exit(1);
      }

      const confirmOverwriteDir = await p.confirm({
        message: `Are you sure you want to ${
          overwriteDir === "clear"
            ? "clear the directory"
            : "overwrite conflicting files"
        }?`,
        initialValue: false,
      });

      if (p.isCancel(confirmOverwriteDir) || !confirmOverwriteDir) {
        spinner.fail("Aborting installation...");
        process.exit(1);
      }

      if (overwriteDir === "clear") {
        spinner.info(
          `Emptying ${chalk.cyan.bold(appName)} and creating VisActor app..\n`,
        );
        fs.emptyDirSync(targetDir);
      }
    }
  }

  spinner.start();

  fs.copySync(templateDir, targetDir);

  const scaffoldedName = appName === "." ? "App" : chalk.cyan.bold(appName);

  spinner.succeed(
    `${scaffoldedName} ${chalk.green("scaffolded successfully!")}\n`,
  );

  return targetDir;
};
