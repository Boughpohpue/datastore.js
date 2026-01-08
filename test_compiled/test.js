import { DataStore, StoredCollection } from '../compiled/datastore.js-1.0.1.js';

// -- Prepare safe storage
const store = DataStore.Local || localStorage;

// -- Sample test objects
const items = [
  { id: 1, date: "2026-01-01T10:00:00Z", title: "First Event" },
  { id: 2, date: "2026-01-03T14:00:00Z", title: "Second Event" },
  { id: 3, date: "2025-12-30T09:00:00Z", title: "Third Event" }
];

// -- Create collection
const events = new StoredCollection("events_test", store);

console.warn("COLLECTION UNDER TEST:");
console.log(JSON.stringify(events.getAll(), null, 3));

console.warn("\n\nAdding items...");
items.forEach(item => events.add(item));
console.log(JSON.stringify(events.getAll(), null, 3));

console.warn("\n\nAdding range of items...");
events.addRange([
  { id: 4, date: "2026-01-02T12:00:00Z", title: "Fourth Event" },
  { id: 5, date: "2026-01-04T09:30:00Z", title: "Fifth Event" }
]);
console.log(JSON.stringify(events.getAll(), null, 3));

console.warn("\n\nGet item by id=3:");
console.log(events.get(3));

console.warn("\n\nUpdate item id=2:");
events.update(2, current => ({ ...current, title: "Second Event Updated" }));
console.log(JSON.stringify(events.getAll(), null, 3));

console.warn("\n\nRemove item id=1:");
events.remove(1);
console.log(JSON.stringify(events.getAll(), null, 3));

console.warn("\n\nBatch modification with withBatch:");
events.withBatch(data => {
  data.push({ id: 6, date: "2026-01-05T16:00:00Z", title: "Sixth Event" });
  data[0].title = "Updated First in batch";
});
console.log(JSON.stringify(events.getAll(), null, 3));

console.warn("\n\nIteration using for...of:");
for (const e of events) console.log(e);

console.warn("\n\nIteration using forEach:");
events.forEach(e => console.log(e.title));

console.warn("\n\nClear collection:");
events.clear();
console.log(JSON.stringify(events.getAll(), null, 3));
