/**
 * src/features/blog/utils/masonry.ts
 *
 * Layout utility that assigns card display variants ('large' | 'tall' | 'medium' | 'small')
 * according to an editorial magazine rhythm.
 */

export type MasonryCardVariant = 'large' | 'tall' | 'medium' | 'small';

export interface LayoutAssignedCard<T> {
  item: T;
  variant: MasonryCardVariant;
  index: number;
}

/**
 * Get the card layout variant for a given article index in a list.
 * Cycles variants every 5 items to create varied card heights.
 *
 * @param index Position in the articles array (0-indexed).
 * @returns 'large' | 'tall' | 'medium' | 'small'
 */
export function getMasonryCardVariant(index: number): MasonryCardVariant {
  const position = index % 5;
  if (position === 0) return 'large';
  if (position === 1) return 'tall';
  if (position === 2) return 'medium';
  if (position === 3) return 'small';
  return 'medium';
}

/**
 * Transform a list of items into layout-assigned cards.
 *
 * @param items List of articles or card items.
 * @returns Array of { item, variant, index }
 */
export function assignMasonryLayout<T>(items: T[]): LayoutAssignedCard<T>[] {
  return items.map((item, index) => ({
    item,
    variant: getMasonryCardVariant(index),
    index,
  }));
}
