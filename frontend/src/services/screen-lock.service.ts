import { hashString } from "../utils/crypto";
import type { ScreenLockConfig } from "../types/screen-lock";

const STORAGE_KEY = "devmon.screen-lock";

export class ScreenLockService {

    static load(): ScreenLockConfig {

        const raw = localStorage.getItem(STORAGE_KEY);

        if (!raw) {

            return {
                enabled: false,
                locked: false,
                lockOnStartup: true,
                autoLock: null,
                pinHash: "",
            };

        }

        return JSON.parse(raw) as ScreenLockConfig;

    }

    static save(config: ScreenLockConfig): void {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(config)
        );

    }

    static async verify(pin: string): Promise<boolean> {

        const config = this.load();

        if (!config.pinHash) {
            return false;
        }

        const hash = await hashString(pin);

        return hash === config.pinHash;

    }

}