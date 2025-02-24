import { Command } from "commander";
import inquirer from "inquirer";

const program = new Command();

program
  .name("create-vchart-app")
  .description("创建一个新的 vchart 项目")
  .argument("[name]", "项目名称")
  .action(async (name) => {
    // 使用 inquirer 进行交互式提问
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "projectName",
        message: "请输入项目名:",
        default: name || "my-project",
        when: !name,
      },
      {
        type: "list",
        name: "framework",
        message: "请选择框架:",
        choices: ["Vue", "React", "Svelte"],
      },
      {
        type: "confirm",
        name: "typescript",
        message: "是否使用 TypeScript?",
        default: true,
      },
    ]);

    // 输出用户的选择
    console.log("\n项目配置信息:");
    console.log("项目名称:", answers.projectName);
    console.log("选择的框架:", answers.framework);
    console.log("使用 TypeScript:", answers.typescript ? "是" : "否");
  })
  .showHelpAfterError() // 只在错误后显示帮助
  .helpOption("-h, --help", "显示帮助信息"); // 只在明确要求时显示帮助

// 移除自动显示帮助的行为
if (process.argv.length > 2) {
  program.parse();
} else {
  program.parse(["", "", ""]); // 模拟空参数调用
}
