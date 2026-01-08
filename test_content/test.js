import { DataStore } from '../content/datastore.js';
import { StoredCollection } from '../content/stored_collection.js';


// --- Safe storage
const store = DataStore.Local || localStorage;

// --- Sample objects
const eventsData = [
  { id: 1, date: "2026-01-01T10:00:00Z", title: "New Year Event" },
  { id: 2, date: "2026-01-03T14:00:00Z", title: "Conference" },
  { id: 3, date: "2025-12-30T09:00:00Z", title: "Pre-Year Party" }
];

console.warn("Collection under test:");
console.log(JSON.stringify(eventsData, null, 2));

console.warn("\n\nTesting...");

// --- Create collection with default sorting (by date descending)
const events = new StoredCollection("events_test", store);

console.warn("\n\nCOLLECTION INIT:");
console.log(JSON.stringify(events.getAll(), null, 2));

// --- Add items individually
console.warn("\nAdding items individually...");
eventsData.forEach(e => events.add(e));
console.log(JSON.stringify(events.getAll(), null, 2));

// --- Add range of items
console.warn("\nAdding range of items...");
events.addRange([
  { id: 4, date: "2026-01-02T12:00:00Z", title: "Workshop" },
  { id: 5, date: "2026-01-04T09:30:00Z", title: "Meeting" }
]);
console.log(JSON.stringify(events.getAll(), null, 2));

// --- Test get by ID
console.warn("\nGet item id=3:");
console.log(events.get(3));

// --- Test update
console.warn("\nUpdate item id=2:");
events.update(2, current => ({ ...current, title: "Conference Updated" }));
console.log(JSON.stringify(events.getAll(), null, 2));

// --- Test remove
console.warn("\nRemove item id=1:");
events.remove(1);
console.log(JSON.stringify(events.getAll(), null, 2));

// --- Batch modification
console.warn("\nBatch modification with withBatch:");
events.withBatch(data => {
  data.push({ id: 6, date: "2026-01-05T16:00:00Z", title: "Hackathon" });
  data[0].title = "Updated First in batch";
});
console.log(JSON.stringify(events.getAll(), null, 2));

// --- Custom comparer example: sort by title alphabetically
console.warn("\nCustom comparer: sort by title ascending");
const eventsCustomSort = new StoredCollection("events_custom_sort", store, {
  comparer: (a, b) => a.title.localeCompare(b.title)
});
eventsCustomSort.addRange(events.getAll());
console.log(JSON.stringify(eventsCustomSort.getAll(), null, 2));

// --- Iteration test
console.warn("\nIteration using for...of:");
for (const e of events) console.log(e);

console.warn("\nIteration using forEach:");
events.forEach(e => console.log(e.title));

// --- Clear collection
console.warn("\nClear collection:");
events.clear();
console.log(JSON.stringify(events.getAll(), null, 2));
