import { intro, outro, text, select, confirm, isCancel } from "@clack/prompts";
import { Command } from "commander";
import chalk from "chalk";
import { logger } from "./utils/logger.js";
import { getVersion } from "./utils/getVersion.js";
import { renderTitle } from "./utils/renderTitle.js";
import { runCli } from "./cli/index.js";

const main = async () => {
  const {
    appName,
    packages,
    template,
    flags: { noGit, noInstall },
  } = await runCli();

  console.log(appName, packages, noGit, noInstall);
};

main().catch((err) => {
  logger.error("Aborting installation...");
  if (err instanceof Error) {
    logger.error(err.message);
  } else {
    logger.error(
      "An unknown error has occurred. Please open an issue on github with the below:"
    );
    logger.error(err);
  }
  process.exit(1);
});
