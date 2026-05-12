export type CardBadge = 'basic' | 'advanced';

export interface Card {
  title: string;
  /** Allows inline <code>, <em>, <strong>. */
  titleHtml?: boolean;
  badge?: CardBadge;
  keys: string;
  /** Markdown-lite: passed through as HTML. Allows inline <code>, <em>, <strong>. */
  description?: string;
  /** Raw PromQL source code — highlighted at build time by Shiki. */
  code?: string;
  /** Optional foot-note; rendered with <strong> emphasis allowed. */
  note?: string;
}

export interface Gotcha {
  /** Allows inline <code>, <em>, <strong>. */
  title: string;
  keys: string;
  /** Allows inline <code>. */
  description: string;
}

export interface Section {
  id: string;
  number: string;
  title: string;
  subtitle?: string;
  /** Section 05 uses the "tall" 440px-min grid. */
  tall?: boolean;
  cards: Card[];
}
