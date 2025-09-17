/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppIdMap } from '../src/appIdMap.js';

(async () => {
    const start = performance.now();
    const appMap = await AppIdMap.init('v8');
    const v8Time = performance.now() - start;

    const start2 = performance.now();
    const appMap2 = await AppIdMap.init('json');
    const initTime = performance.now() - start2;

    const start3 = performance.now();
    const appMap3 = await AppIdMap.init('blob');
    const snapshotTime = performance.now() - start3;

    console.log(`v8init: ${v8Time}ms`);
    console.log(`init: ${initTime}ms`);
    console.log(`snapshot: ${snapshotTime}ms`);
    console.log(`v8 vs init speedup: ${(initTime / v8Time).toFixed(2)}x`);
    console.log(
        `snapshot vs init speedup: ${(initTime / snapshotTime).toFixed(2)}x`,
    );
})();
