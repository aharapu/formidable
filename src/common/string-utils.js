export function buildHtmlListString(values = []) {
    let result = '<ul>';

    values.forEach((val) => {
        if (Array.isArray(val)) {
            result += buildHtmlListString(val);
        } else {
            result += `<li>${val}</li>`;
        }
    });

    result += '</ul>';

    return result;
}
