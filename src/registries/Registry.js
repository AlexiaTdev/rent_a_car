class Registry {
  constructor(db, collectionName) {
    this.collection = db.collection(collectionName);
  }
}

module.exports = Registry;
