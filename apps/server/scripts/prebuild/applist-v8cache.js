#!/usr/bin/env node
/**
 * Build script to create v8 serialized cache of Steam app list
 * Run this during build/deployment to pre-serialize data
 */

import { readFileSync, writeFileSync } from 'fs';
import { serialize } from 'v8';

const INPUT_FILE = 'data/applist.json';
const OUTPUT_FILE = 'data/applist.v8';

console.log('Building v8 serialized cache...');

try {
    // Read and parse JSON
    const data = readFileSync(INPUT_FILE, 'utf-8');
    const apps = JSON.parse(data).applist.apps;
    
    // Create Map
    const appMap = new Map(apps.map(app => [app.appid, app.name]));
    
    // Serialize with v8
    const serialized = serialize(appMap);
    
    // Write to file
    writeFileSync(OUTPUT_FILE, serialized);
    
    console.log(`✓ Created v8 cache: ${OUTPUT_FILE}`);
    console.log(`  Original size: ${(data.length / 1024 / 1024).toFixed(1)}MB`);
    console.log(`  Serialized size: ${(serialized.length / 1024 / 1024).toFixed(1)}MB`);
    console.log(`  Apps cached: ${appMap.size}`);
} catch (error) {
    console.error('✗ Failed to build v8 cache:', error.message);
    process.exit(1);
}