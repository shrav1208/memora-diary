import DOMPurify from 'dompurify';

export const removeFormatting = (html) => {
    if (!html) return "";

    const container = document.createElement("div");
    container.innerHTML = DOMPurify.sanitize(html); // dom purification added to prevent xss

    // Remove formatting tags but keep their children
    container.querySelectorAll("b, strong, i, em, u, span").forEach(el => {
        el.replaceWith(...el.childNodes);
    });

    return Array.from(container.querySelectorAll("p"))
    .map(p => p.innerHTML.replaceAll(/&nbsp;/g, '\n').replaceAll('<br>', '\n').trim()) // remove &nbsp; and trim
    .filter(text => text.length > 0); // only keep non-empty paragraphs
};