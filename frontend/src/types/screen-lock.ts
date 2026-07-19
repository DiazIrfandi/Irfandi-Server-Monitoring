export interface ScreenLockConfig {

    enabled: boolean;

    locked: boolean;

    lockOnStartup: boolean;

    autoLock: number | null;

    pinHash: string;

}