export default function decorate(block) {
    const [title, elementId, formId, hiddenFormId, hostname] = block.children;

    const blockquote = document.createElement('blockquote');
    blockquote.textContent = quoteWrapper.textContent.trim();
    quoteWrapper.replaceChildren(blockquote);
}
  