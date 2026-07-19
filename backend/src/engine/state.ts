export interface MonitoringState {
    
    system: any;

    docker: any;

    updateAt: Date;
}

export const monitoringState: MonitoringState = {

    system: null,

    docker: null,

    updateAt: new Date(),
}