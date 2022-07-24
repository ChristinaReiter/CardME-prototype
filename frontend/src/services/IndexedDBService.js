import Dexie from 'dexie';

export const db = new Dexie('cardmeBase');

db.version(2).stores({
  cart: '++id, cardImage, cardImageFilters, cardTitle, cardPrice, cardText, giftId, giftPrice, giftImage',
});