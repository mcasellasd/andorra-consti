/**
 * Convertidor mínim de Markdown a HTML sense dependències externes.
 * Retorna HTML i taula de continguts (TOC) amb IDs per a enllaços.
 *
 * Estructura del document:
 * - Portada: H1 + paràgrafs fins al primer --- (resum, paraules clau).
 * - Cos: H2–H4 amb id únic, paràgrafs, llistes, taules, blockquotes.
 * - Capçaleres buides (ex. "### ") es descarten.
 */

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function inlineFormat(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/__(.+?)__/g, '<strong>$1</strong>')
    .replace(/_(.+?)_/g, '<em>$1</em>');
}

/** Genera un id únic per a capçaleres (slug) */
function slugify(text: string): string {
  const stripped = text
    .replace(/<[^>]+>/g, '')
    .replace(/\*/g, '')
    .trim();
  return stripped
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || 'section';
}

export interface TocItem {
  id: string;
  level: number;
  text: string;
}

export interface MarkdownResult {
  html: string;
  toc: TocItem[];
}

export function markdownToHtml(md: string): MarkdownResult {
  const unescaped = md.replace(/\\([\\*_#.\[\]()])/g, '$1');
  const lines = unescaped.split(/\r?\n/);
  const out: string[] = [];
  const toc: TocItem[] = [];
  const usedIds = new Set<string>();
  let i = 0;
  let coverBuffer: string[] = [];
  let coverDone = false;

  function flushCover(): void {
    if (coverBuffer.length > 0) {
      out.push('<div class="paper-doc-cover">');
      out.push(...coverBuffer);
      out.push('</div>');
      coverBuffer = [];
      coverDone = true;
    }
  }

  function ensureUniqueId(baseId: string): string {
    let id = baseId;
    let n = 1;
    while (usedIds.has(id)) {
      id = `${baseId}-${++n}`;
    }
    usedIds.add(id);
    return id;
  }

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // --- hr → fi de portada si encara no s'ha tancat
    if (/^---+$/.test(trimmed) || /^\*+$/.test(trimmed)) {
      flushCover();
      out.push('<hr class="paper-doc-hr" />');
      i++;
      continue;
    }

    // Headers # ## ### ####
    const hMatch = line.match(/^(#{1,4})\s+(.*)$/);
    if (hMatch) {
      const level = hMatch[1].length;
      const rawText = hMatch[2].trim();
      // Ometre capçaleres buides
      if (!rawText) {
        i++;
        continue;
      }
      const text = inlineFormat(escapeHtml(rawText));
      const baseId = slugify(rawText);
      const id = ensureUniqueId(baseId);
      if (level >= 2 && level <= 4) {
        const tocText = rawText.replace(/\*\*/g, '').replace(/\*/g, '').trim();
        toc.push({ id, level, text: tocText });
      }
      const tag = `<h${level} id="${id}" class="paper-doc-h${level}">${text}</h${level}>`;
      if (!coverDone && level === 1) {
        coverBuffer.push(tag);
      } else {
        flushCover();
        out.push(tag);
      }
      i++;
      continue;
    }

    // Table: | a | b |
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      flushCover();
      const tableRows: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        const row = lines[i].trim();
        const cells = row
          .split('|')
          .slice(1, -1)
          .map((c) => escapeHtml(c.trim()));
        const isSeparator = cells.every((c) => /^:?-+:?$/.test(c));
        if (isSeparator) {
          i++;
          continue;
        }
        const tag = tableRows.length === 0 ? 'th' : 'td';
        const cellClass = tableRows.length === 0 ? 'paper-doc-th' : 'paper-doc-td';
        tableRows.push(
          '<tr class="paper-doc-tr">' +
            cells.map((c) => `<${tag} class="${cellClass}">${inlineFormat(c)}</${tag}>`).join('') +
            '</tr>'
        );
        i++;
      }
      if (tableRows.length > 0) {
        out.push(
          '<div class="paper-doc-table-wrap"><table class="paper-doc-table">' +
            '<thead class="paper-doc-thead">' +
            tableRows[0] +
            '</thead><tbody class="paper-doc-tbody">' +
            tableRows.slice(1).join('') +
            '</tbody></table></div>'
        );
      }
      continue;
    }

    // Blockquote >
    if (trimmed.startsWith('>')) {
      flushCover();
      const blockLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        blockLines.push(lines[i].replace(/^>\s?/, '').trim());
        i++;
      }
      const rawContent = blockLines.join(' ').trim();
      const inner = blockLines
        .join('\n')
        .split(/\n\n+/)
        .map((p) => `<p class="paper-doc-p">${inlineFormat(escapeHtml(p))}</p>`)
        .join('');
      const isDisclaimer = rawContent.startsWith('Aquest document no pretén');
      const blockquoteClass = isDisclaimer
        ? 'paper-doc-blockquote paper-doc-disclaimer'
        : 'paper-doc-blockquote';
      out.push(`<blockquote class="${blockquoteClass}">${inner}</blockquote>`);
      continue;
    }

    // Unordered list - or *
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      flushCover();
      const items: string[] = [];
      while (i < lines.length && (lines[i].trim().startsWith('- ') || lines[i].trim().startsWith('* '))) {
        const itemText = lines[i].replace(/^[-*]\s+/, '').trim();
        items.push(`<li class="paper-doc-li">${inlineFormat(escapeHtml(itemText))}</li>`);
        i++;
      }
      out.push(`<ul class="paper-doc-ul">${items.join('')}</ul>`);
      continue;
    }

    // Ordered list 1. 2.
    const olMatch = trimmed.match(/^(\d+)\.\s+(.+)$/);
    if (olMatch) {
      flushCover();
      const items: string[] = [];
      while (i < lines.length && lines[i].trim().match(/^\d+\.\s+/)) {
        const itemText = lines[i].replace(/^\d+\.\s+/, '').trim();
        items.push(`<li class="paper-doc-li">${inlineFormat(escapeHtml(itemText))}</li>`);
        i++;
      }
      out.push(`<ol class="paper-doc-ol">${items.join('')}</ol>`);
      continue;
    }

    if (trimmed === '') {
      i++;
      continue;
    }

    // Paragraph
    const pLines: string[] = [];
    while (i < lines.length && lines[i].trim() !== '') {
      pLines.push(lines[i]);
      i++;
    }
    const pText = pLines.join(' ').trim();
    if (pText) {
      const isResum = /^\*[^*]+\*$/.test(pText) || pText.startsWith('La intel·ligència artificial');
      const isKeywords = /^\*\*Paraules clau/i.test(pText);
      let pClass = 'paper-doc-p';
      if (isResum) pClass += ' paper-doc-lead';
      if (isKeywords) pClass += ' paper-doc-keywords';
      const paraHtml = `<p class="${pClass}">${inlineFormat(escapeHtml(pText))}</p>`;
      if (!coverDone && coverBuffer.length >= 1) {
        coverBuffer.push(paraHtml);
      } else {
        flushCover();
        out.push(paraHtml);
      }
    }
  }

  flushCover();
  return { html: out.join('\n'), toc };
}
