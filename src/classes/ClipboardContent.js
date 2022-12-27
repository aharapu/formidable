import { buildHtmlListString } from '../common/string-utils';
import { SCENARIO_SECTIONS } from '../recoil/constants';

export class ClipboardContent {
    // TODO -> turn content into array?
    constructor() {
        this.content = '';
    }

    _private_addHtmlTagString({ tag, content, color }) {
        // TODO -> tag should be limited to certain strings
        const style = color ? ` style="color:${color};"` : '';

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
            tag: 'h4',
            content: `<strong>${content}</strong>`,
            color,
        });
        return this;
    }

    addParagraph({ content }) {
        this._private_addHtmlTagString({ tag: 'p', content });
        return this;
    }

    addList(values = []) {
        const list = buildHtmlListString(values);
        this.content += list;
        return this;
    }

    addTestScenarios(testScenarios = []) {
        console.log('testScenarios', testScenarios);

        testScenarios.forEach((scenario) => {
            this.addParagraph({ content: scenario.name.value });

            this.content += '<ul>';
            SCENARIO_SECTIONS.forEach((section) => {
                const steps = scenario[section];
                if (!steps || steps.length === 0) {
                    return;
                }

                const andSteps = steps.slice(1);
                const firstStep = steps[0];
                const firstStepContent = `<strong>${section.toUpperCase()} </strong>` + firstStep.value;
                this._private_addHtmlTagString({ tag: 'li', content: firstStepContent });

                if (andSteps.length === 0) {
                    return;
                }

                this.content += '<ul>';
                andSteps.forEach((step) => {
                    const rowContent = '<strong>And </strong>' + step.value;
                    this._private_addHtmlTagString({ tag: 'li', content: rowContent });
                });
                this.content += '</ul>';
            });
            this.content += '</ul>';
        });
    }

    // TODO -> add possibility to indent?
    getContent() {
        return this.content;
    }
}
