export class DataStore {
  static get Local() {
    return this.#getStoreSafely(localStorage);
  }
  static get Session() {
    return this.#getStoreSafely(sessionStorage);
  }
  static #getStoreSafely(store) {
    return this.#testStore(store) ? store : null;
  }
  static #testStore(store) {
    try {
      const testKey = `__test_${Date.now().valueOf()}`;
      store.setItem(testKey, "1");
      store.removeItem(testKey);
      return true;
    } catch (e) {
      console.warn("Requested data store is not available:", e);
      return false;
    }
  }
}

export default DataStore;
