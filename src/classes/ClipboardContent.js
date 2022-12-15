import { buildHtmlListString } from "../common/string-utils";

export class ClipboardContent {
  // TODO -> turn content into array?
  constructor() {
    this.content = "";
  }

  _private_addHtmlTagString({ tag, content, color }) {
    // TODO -> tag should be limited to certain strings
    const style = color ? ` style="color:${color};"` : "";

    this.content += `<${tag}${style}>${content}</${tag}>`;
  }

  addHeading({ content, color }) {
    // TODO -> make a tag creation function and use in stead of the _private method
    //         similar to addList
    // const strongContent = this._private_addHtmlTagString({
    //   tag: "strong",
    //   content,
    // });
    this._private_addHtmlTagString({
      tag: "h4",
      content: `<strong>${content}</strong>`,
      color,
    });
    return this;
  }

  addParagraph({ content }) {
    this._private_addHtmlTagString({ tag: "p", content });
    return this;
  }

  addList(values = []) {
    const list = buildHtmlListString(values);
    this.content += list;
    return this;
  }

  // TODO -> do a nested list
  // TODO -> make use of a SCENARIO_SEGMENTS = ["given", "when", "then"] constant
  //         and also use it in state handling
  addTestScenarios(scenarios = []) {
    this.content += "<ul>";
    scenarios.forEach((scenario) => {
      this.addParagraph({ content: scenario.scenarioName }); // TODO -> rename scenarioName to name
      this.content += "<ul>";
      scenario.given.forEach((g, idx) => {
        const prefix = idx === 0 ? "Given" : "And";
        const rowContent = `<strong>${prefix} </strong>` + g.value;
        this._private_addHtmlTagString({ tag: "li", content: rowContent });
      });
      this.content += "</ul>";
    });
    this.content += "</ul>";
  }

  // TODO -> add possibility to indent?
  getContent() {
    return this.content;
  }
}
