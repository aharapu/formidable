export function buildHtmlListString(values = []) {
  let result = `<ul>`;
  values.forEach((val) => {
    result += `<li>${val}</li>`;
  });
  result += `</ul>`;
  return result;
}
