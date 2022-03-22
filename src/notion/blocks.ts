import {supportedCodeLang} from './common';

/*
 * Notion SDK no longer exports types, so these are generic
 */
export interface Block {
  object?: string;
  type?: string;
  paragraph?: BlockText;
  heading_1?: BlockText;
  heading_2?: BlockText;
  heading_3?: BlockText;
  image?: object;
  quote?: object;
  bulleted_list_item?: object;
  numbered_list_item?: object;
}

export interface BlockText {
  rich_text: RichText[];
}

export interface RichText {
  type: string;
  annotations: object;
  text: {
    content: string;
    link?: {
      type: 'url';
      url: string;
    };
  };
}

export function paragraph(text: RichText[]): Block {
  return {
    object: 'block',
    type: 'paragraph',
    paragraph: {
      rich_text: text,
    },
  } as Block;
}

export function code(
  text: RichText[],
  lang: supportedCodeLang = 'plain text'
): Block {
  return {
    object: 'block',
    type: 'code',
    code: {
      rich_text: text,
      language: lang,
    },
  } as Block;
}

export function blockquote(text: RichText[]): Block {
  return {
    object: 'block',
    type: 'quote',
    quote: {
      rich_text: text,
    },
  } as Block;
}

export function image(url: string): Block {
  return {
    object: 'block',
    type: 'image',
    image: {
      type: 'external',
      external: {
        url: url,
      },
    },
  } as Block;
}

export function table_of_contents(): Block {
  return {
    object: 'block',
    type: 'table_of_contents',
    table_of_contents: {},
  } as Block;
}

export function headingOne(text: RichText[]): Block {
  return {
    object: 'block',
    type: 'heading_1',
    heading_1: {
      rich_text: text,
    },
  } as Block;
}

export function headingTwo(text: RichText[]): Block {
  return {
    object: 'block',
    type: 'heading_2',
    heading_2: {
      rich_text: text,
    },
  } as Block;
}

export function headingThree(text: RichText[]): Block {
  return {
    object: 'block',
    type: 'heading_3',
    heading_3: {
      rich_text: text,
    },
  } as Block;
}

export function bulletedListItem(
  text: RichText[],
  children: Block[] = []
): Block {
  return {
    object: 'block',
    type: 'bulleted_list_item',
    bulleted_list_item: {
      rich_text: text,
      children: children.length ? children : undefined,
    },
  } as Block;
}

export function numberedListItem(
  text: RichText[],
  children: Block[] = []
): Block {
  return {
    object: 'block',
    type: 'numbered_list_item',
    numbered_list_item: {
      rich_text: text,
      children: children.length ? children : undefined,
    },
  } as Block;
}

export function toDo(
  checked: boolean,
  text: RichText[],
  children: Block[] = []
): Block {
  return {
    object: 'block',
    type: 'to_do',
    to_do: {
      rich_text: text,
      checked: checked,
      children: children.length ? children : undefined,
    },
  } as Block;
}

export function table(children: Block[] = [], tableWidth: number): Block {
  return {
    object: 'block',
    type: 'table',
    table: {
      table_width: tableWidth,
      has_row_header: true,
      children: children.length ? children : undefined,
    },
  } as Block;
}

export function tableRow(cells: RichText[][] = []): Block {
  return {
    object: 'block',
    type: 'table_row',
    table_row: {
      cells: cells.length ? cells : undefined,
    },
  } as Block;
}
