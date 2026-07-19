import { SystemCollector } from "../collectors/system.collector.js";

export class SystemService {
    static async getSystem() {
        return await SystemCollector.getSystem();
    }
}