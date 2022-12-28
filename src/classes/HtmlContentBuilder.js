import { buildHtmlListString } from '../common/string-utils';
import { SCENARIO_SECTIONS } from '../recoil/constants';

export class HtmlContentBuilder {
    constructor() {
        this.content = [];
    }

    addHeading({ content, color }) {
        const heading = createHtmlTagString({
            tag: 'h4',
            content: `<strong>${content}</strong>`,
            color,
        });

        this.content.push(heading);

        return this;
    }

    addParagraph({ content }) {
        const paragraph = createHtmlTagString({ tag: 'p', content });
        this.content.push(paragraph);
        return this;
    }

    addList(values = []) {
        const list = buildHtmlListString(values);
        this.content.push(list);
        return this;
    }

    addTestScenarios(testScenarios = []) {
        console.log('testScenarios', testScenarios);

        testScenarios.forEach((scenario) => {
            this.addParagraph({ content: scenario.name.value });

            this.content.push('<ul>');
            SCENARIO_SECTIONS.forEach((section) => {
                const steps = scenario[section];
                if (!steps || steps.length === 0) {
                    return;
                }

                const andSteps = steps.slice(1);
                const firstStep = steps[0];
                const firstStepContent = `<strong>${section.toUpperCase()} </strong>` + firstStep.value;

                const firstStepHtml = createHtmlTagString({ tag: 'li', content: firstStepContent });
                this.content.push(firstStepHtml);

                if (andSteps.length === 0) {
                    return;
                }

                this.content.push('<ul>');
                andSteps.forEach((step) => {
                    const rowContent = '<strong>And </strong>' + step.value;
                    const rowHtml = createHtmlTagString({ tag: 'li', content: rowContent });
                    this.content.push(rowHtml);
                });
                this.content.push('</ul>');
            });
            this.content.push('</ul>');
        });
    }

    getContent() {
        let indent = 0;

        return this.content.reduce((acc, curr) => {
            if (curr === '<ul>') {
                indent += 2;
            } else if (curr === '</ul>') {
                indent -= 2;
            }

            const row = `${' '.repeat(indent)}${curr}\n`;
            acc += row;
            return acc;
        }, '');
    }
}

function createHtmlTagString(args = { tag: null, content: null, color: null }) {
    validateArguments(args);

    const { tag, content, color } = args;

    const style = color ? ` style="color:${color};"` : '';

    return `<${tag}${style}>${content}</${tag}>`;
}

function validateArguments(args) {
    const keys = Object.keys(args);
    const validKeys = ['tag', 'content', 'color'];
    const invalidKeys = keys.filter((key) => !validKeys.includes(key));
    if (invalidKeys.length > 0) {
        throw new Error(`Invalid keys: ${invalidKeys.join(', ')}`);
    }

    const { tag, content, color } = args;
    if (!isValidHtmlTag(tag)) {
        throw new Error(`Invalid tag: ${tag}`);
    }
    if (typeof content !== 'string') {
        throw new Error(`Invalid content: ${content}`);
    }
    if (color && typeof color !== 'string') {
        throw new Error(`Invalid color: ${color}`);
    }
}

const VALID_HTML_STRINGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'ul', 'li', 'ol', 'strong', 'em', 'div', 'span'];

function isValidHtmlTag(tag) {
    if (typeof tag !== 'string') {
        return false;
    }

    if (!VALID_HTML_STRINGS.includes(tag)) {
        return false;
    }
    return true;
}
