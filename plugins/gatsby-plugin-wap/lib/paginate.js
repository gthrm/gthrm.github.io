// Old phones choke on decks over ~1.4 KB, so long content is spread over
// numbered decks. `limit` is what is left for content once the deck wrapper
// and navigation are accounted for.

const bytes = (text) => Buffer.byteLength(text);
const tagName = (tag) => /^<\/?(\w+)/.exec(tag)[1];

// Cuts one oversized <p> into pieces that each fit `limit`: between words,
// or between lines for code (mode="nowrap"). Inline tags open at a cut (<b>,
// <i>, <a href>) are closed and re-opened in the next piece.
const splitBlock = (block, limit) => {
  const match = /^<p([^>]*)>([\s\S]*)<\/p>$/.exec(block);
  if (!match || bytes(block) <= limit) return [block];
  const [, attrs, content] = match;
  const open = `<p${attrs}>`;
  const close = '</p>';
  const byLine = attrs.includes('mode="nowrap"');
  const tokens = content.match(/<[^>]+>|[^<\s]+|\s+/g) || [];

  const pieces = [];
  const stack = [];
  const closing = () =>
    [...stack]
      .reverse()
      .map((openTag) => `</${tagName(openTag)}>`)
      .join('');
  let current = '';
  let hasText = false;

  tokens.forEach((token, index) => {
    const previous = tokens[index - 1] || '';
    const canBreak = previous === '<br/>' || (!byLine && /^\s/.test(previous));
    if (
      canBreak &&
      hasText &&
      bytes(open + current + token + closing() + close) > limit
    ) {
      pieces.push(open + current + closing() + close);
      current = stack.join('');
      hasText = false;
    }

    current += token;
    if (token.startsWith('</')) stack.pop();
    else if (token.startsWith('<') && !token.endsWith('/>')) stack.push(token);
    else if (!token.startsWith('<') && token.trim()) hasText = true;
  });
  pieces.push(open + current + close);
  return pieces;
};

module.exports = function paginate(blocks, limit) {
  const pages = [[]];
  let size = 0;
  blocks
    .flatMap((block) => splitBlock(block, limit))
    .forEach((block) => {
      const blockBytes = bytes(block) + 1; // + the newline between blocks
      if (size + blockBytes > limit && pages[pages.length - 1].length) {
        pages.push([]);
        size = 0;
      }
      pages[pages.length - 1].push(block);
      size += blockBytes;
    });
  return pages;
};
