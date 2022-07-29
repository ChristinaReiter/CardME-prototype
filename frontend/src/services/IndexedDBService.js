import Dexie from 'dexie';

/**
 * IndexedDB singleton
 */

// Exports db handler
export const db = new Dexie('cardmeBase');

// Table schema, autoincrement id (primary key)
db.version(2).stores({
  cart: '++id, cardImage, cardImageFilters, cardTitle, cardPrice, cardText, giftId, giftPrice, giftImage',
});