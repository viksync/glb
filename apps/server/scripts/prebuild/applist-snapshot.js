// Script to create snapshot with preloaded AppIdMap
const { readFileSync } = require('fs');

// Load and parse the data at snapshot creation time
const data = readFileSync('data/applist.json', 'utf-8');
const apps = JSON.parse(data).applist.apps;
const appMap = new Map(apps.map(app => [app.appid, app.name]));

// Make it globally available
global.preloadedAppMap = appMap;

console.log('Snapshot created with preloaded AppIdMap');