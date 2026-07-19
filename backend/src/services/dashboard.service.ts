import { monitoringState } from "../engine/state.js";

export class DashboardService {

    static async getDashboard() {

        return monitoringState;

    }

}