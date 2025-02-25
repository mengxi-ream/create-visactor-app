import { runCli } from "./cli/index.js";
import { logger } from "./utils/logger.js";

const main = async () => {
  const {
    library,
    template,
    appName,
    packages,
    flags: { noGit, noInstall },
  } = await runCli();

  console.log(appName, packages, noGit, noInstall, library, template);
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
