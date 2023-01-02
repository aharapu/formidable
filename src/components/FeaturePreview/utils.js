export function updateClipboard(content) {
    console.log('content', content);

    const type = 'text/html';
    const blob = new Blob([content], { type });
    const data = [new ClipboardItem({ [type]: blob })];

    return navigator.clipboard.write(data);
}

export function getValues(objects = []) {
    return objects.map((o) => o.value);
}
