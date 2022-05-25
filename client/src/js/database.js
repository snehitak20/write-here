import req from 'express/lib/request';
import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic for a method that gets all the content from the database
// GET function
export const getDb = async () => {
  console.log('Getting data from the jateDB');
  // Connect to jateDB and the version needed
  const jateDb = await openDB('jate', 1);
  // Create a new transaction--> specify which DB it is being posted and the data privileges
  const tx = jateDb.transaction('jate', 'readwrite');
  // Open the object store
  const store = tx.objectStore('jate');
  // Use getAll() to grab all of the content in the DB
  const request = store.getAll();
  // Confirm that data is fetched
  const result = await request;
  console.log('result.value', result);
  return result;
  // console.error('getDb not implemented');
};

// TODO: Add logic to a method that accepts some content and adds it to the database
// PUT function: will update the editor??
export const putDb = async (content) => {
  console.log ('PUT request to the database');
  // Connect to the jateDB and the version that is needed
  const jateDb = await openDB('jate', 1);
  // Create a new transaction--> specify which DB it is being posted and the data privileges
  const tx = jateDb.transaction('jate', 'readwrite');
  // Open the object store
  const store = tx.objectStore('jate');
  // Use the .put method to add content to the database
  const request = store.put({ todo: content });
  // Confirm that the data has been added 
  const result = await request;
  console.log('🚀 - data saved to the database', result);
}
initdb();
