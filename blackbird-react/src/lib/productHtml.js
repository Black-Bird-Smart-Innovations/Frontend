// Keep basic product formatting while discarding executable markup and attributes.
const ALLOWED_TAGS = new Set([
  'P', 'BR', 'STRONG', 'B', 'EM', 'I', 'U', 'S', 'UL', 'OL', 'LI',
  'H2', 'H3', 'H4', 'BLOCKQUOTE', 'PRE', 'CODE', 'TABLE', 'THEAD',
  'TBODY', 'TR', 'TH', 'TD', 'A', 'HR',
]);
const DROP_CONTENT = new Set(['SCRIPT', 'STYLE', 'IFRAME', 'OBJECT', 'EMBED', 'TEMPLATE', 'SVG', 'MATH']);

export function sanitizeProductHtml(html) {
  const template = document.createElement('template');
  template.innerHTML = String(html || '');
  const output = document.createElement('div');

  const appendSafe = (source, parent) => {
    if (source.nodeType === Node.TEXT_NODE) {
      parent.append(document.createTextNode(source.textContent));
      return;
    }
    if (source.nodeType !== Node.ELEMENT_NODE || DROP_CONTENT.has(source.tagName)) return;

    const safe = ALLOWED_TAGS.has(source.tagName)
      ? document.createElement(source.tagName.toLowerCase())
      : document.createDocumentFragment();
    if (source.tagName === 'A') {
      const href = source.getAttribute('href');
      if (href) {
        try {
          const url = new URL(href, window.location.origin);
          if (['http:', 'https:', 'mailto:', 'tel:'].includes(url.protocol)) safe.setAttribute('href', href);
        } catch { /* Invalid links remain plain text. */ }
      }
    }
    for (const child of source.childNodes) appendSafe(child, safe);
    parent.append(safe);
  };

  for (const child of template.content.childNodes) appendSafe(child, output);
  return output.innerHTML;
}
