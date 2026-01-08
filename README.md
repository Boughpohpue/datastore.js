# datastore.js

This mini-library provides a safe and flexible way to work with browser storage (`localStorage` and `sessionStorage`) through two main classes: `DataStore` and `StoredCollection`.



## DataStore

`DataStore` provides safe access to browser storage. It automatically checks whether the storage is available and functional, returning `null` if the environment does not support it or if access is restricted (for example, in private mode or due to storage quotas).  

**Usage:**

```js
const local = DataStore.Local;     // safe reference to localStorage
const session = DataStore.Session; // safe reference to sessionStorage
```


## StoredCollection

`StoredCollection` is a self-contained, persistent collection of objects stored in a browser storage. It automatically persists all changes to the provided storage and offers a rich set of operations.

**Features:**

- Fully private internal state, accessible only through methods
- Automatic sorting (default by `"date"`), with optional custom comparer
- CRUD operations: `add`, `remove`, `update`, batch modifications via `withBatch`
- Supports reactive observers through a subscription system (`#listeners`)
- Iteration support: `for...of` and `forEach` methods
- Automatically persists all changes to the configured storage

**Usage:**

```js
const events = new StoredCollection("events", localStorage);

events.add({ id: 1, date: "2026-01-07T12:00:00Z", title: "New Event" });

// Iteration:
for (const e of events) console.log(e);
events.forEach(e => console.log(e.title));

// Update
events.update(1, { title: "Updated Event" });

// Batch modification
events.withBatch(data => {
  data.push({ id: 2, date: "2026-01-08T09:00:00Z", title: "Another Event" });
});
```
