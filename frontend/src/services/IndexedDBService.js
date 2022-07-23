import Dexie from 'dexie';

export const db = new Dexie('cardmeBase');

db.version(1).stores({
  cart: '++id, cardImage, cardTitle, cardPrice, cardText, giftId, giftPrice, giftImage',
});