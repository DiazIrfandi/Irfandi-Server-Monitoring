import { MonitoringEngine } from "./monitoring.engine.js";

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function startScheduler() {
    while (true) {
        await MonitoringEngine.refresh();

        await sleep(2000);
    }
}