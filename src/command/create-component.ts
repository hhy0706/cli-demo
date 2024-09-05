import inquirer, { QuestionCollection } from "inquirer";
import { g } from "../util/log-utils";
import { closeLoading, showLoading } from "../util/loading-utils";
import { ComponentInfo } from "../domain/component-info";
import { initComponent } from "../service/init-component";
// 交互提示
const questions: QuestionCollection = [
  {
    name: "componentName",
    message: "Input the component name: ",
    default: "",
  },
  {
    name: "description",
    message: "Input the component description: ",
    default: "",
  },
  {
    type: "list",
    name: "componentType",
    message: "Choose the component type: ",
    choices: ["tsx", "vue"],
  },
];

const createNewComponent = async (
  componentName: string,
  description: string,
  componentType: string
) => {
  console.log(componentName, description, componentType);
  showLoading("Generating,please wait ...");
  try {
    // 1. 构造 ComponentInfo 对象
    const componentInfo = new ComponentInfo(
      componentName,
      description,
      componentType
    );


    // 2. 创建组件目录及文件
    await initComponent(componentInfo)
    closeLoading();
  } catch {
    console.log('ssssserr')
      closeLoading();
   
  }
};
export const createComponent = () => {
  inquirer
    .prompt(questions)
    .then(({ componentName, description, componentType }) => {
      createNewComponent(componentName, description, componentType);
    });
};
