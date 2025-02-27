import path from "path";
import fs from "fs-extra";
import { type PackageJson } from "type-fest";
import { runCli } from "./cli/index.js";
import { initializeGit } from "./helpers/git.js";
import { installDependencies } from "./helpers/installDependencies.js";
import { logNextSteps } from "./helpers/logNextSteps.js";
import { createApp } from "./installers/createApp.js";
import { getVersion } from "./utils/getVersion.js";
import { logger } from "./utils/logger.js";

type CVAPackageJSON = PackageJson & {
  cvaMetadata?: {
    initVersion: string;
  };
};

const main = async () => {
  console.log("user agent:", process.env.npm_config_user_agent);

  const {
    library,
    template,
    appName,
    flags: { noGit, noInstall },
  } = await runCli();

  const targetDir = await createApp(appName, library, template, noInstall);

  // Write name to package.json
  const pkgJson = fs.readJSONSync(
    path.join(targetDir, "package.json"),
  ) as CVAPackageJSON;
  pkgJson.name = appName;
  pkgJson.cvaMetadata = { initVersion: getVersion() };

  fs.writeJSONSync(path.join(targetDir, "package.json"), pkgJson, {
    spaces: 2,
  });

  if (!noInstall) {
    await installDependencies({
      projectDir: targetDir,
    });
  }

  if (!noGit) {
    await initializeGit(targetDir);
  }

  await logNextSteps({
    projectName: appName,
    noInstall,
    projectDir: targetDir,
  });
};

main().catch((err) => {
  if (err instanceof Error) {
    logger.error(err.message);
  } else {
    logger.error(
      "An unknown error has occurred. Please open an issue on github with the below:",
    );
    logger.error(err);
  }
  process.exit(1);
});
