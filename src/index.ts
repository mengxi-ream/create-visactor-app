import { intro, outro, text, select, confirm, isCancel } from "@clack/prompts";
import { Command } from "commander";
import chalk from "chalk";
import { logger } from "./utils/logger.js";
import { getVersion } from "./utils/getVersion.js";
import { renderTitle } from "./utils/renderTitle.js";

const main = async () => {
  const program = new Command();
  program
    .name("create-vchart-app")
    .description("A CLI for creating web applications with VChart")
    .version(getVersion(), "-v, --version", "display the version number")
    .argument(
      "[dir]",
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
    .option(
      "--tailwind [boolean]",
      "Boolean value if we should install Tailwind CSS. Must be used in conjunction with `--CI`.",
      (value) => !!value && value !== "false"
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
    // cliResults.appName = cliAppName;
  }

  console.log(program.args);
  console.log(program.opts());
  //   .action(async (name) => {
  //     intro(chalk.bgCyan(chalk.black(" create-vchart-app ")));

  //     const projectName = await text({
  //       message: "项目名称?",
  //       placeholder: "my-vchart-app",
  //       defaultValue: name,
  //       validate: (value: string) => {
  //         if (!value) return "项目名称不能为空";
  //         if (value.includes(" ")) return "项目名称不能包含空格";
  //         return undefined;
  //       },
  //     });

  //     if (isCancel(projectName)) {
  //       outro(chalk.yellow("操作已取消"));
  //       process.exit(0);
  //     }

  //     const framework = await select({
  //       message: "选择一个框架",
  //       options: [
  //         { value: "vue", label: "Vue", hint: "Vue 3 + TypeScript" },
  //         { value: "react", label: "React", hint: "React + TypeScript" },
  //         { value: "svelte", label: "Svelte", hint: "SvelteKit + TypeScript" },
  //       ],
  //     });

  //     if (isCancel(framework)) {
  //       outro(chalk.yellow("操作已取消"));
  //       process.exit(0);
  //     }

  //     const typescript = await confirm({
  //       message: "是否使用 TypeScript?",
  //       initialValue: true,
  //     });

  //     if (isCancel(typescript)) {
  //       outro(chalk.yellow("Operation cancelled."));
  //       process.exit(0);
  //     }

  //     // 输出配置信息
  //     outro(
  //       chalk.green(
  //         `✨ 项目将使用以下配置创建:
  // ${chalk.cyan("项目名称:")} ${projectName}
  // ${chalk.cyan("框架:")} ${framework}
  // ${chalk.cyan("TypeScript:")} ${typescript ? "是" : "否"}`
  //       )
  //     );
  //   });

  // // 移除自动显示帮助的行为
  // if (process.argv.length > 2) {
  //   program.parse();
  // } else {
  //   program.parse(["", "", ""]);
  // }
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
