import type { SettingsConfig } from "../types/settings";

const STORAGE_KEY = "devmon.settings";

export class SettingsService {

    static load(): SettingsConfig {

        const raw = localStorage.getItem(STORAGE_KEY);

        if (!raw) {

            return {

                general: {

                    theme: "system",

                    language: "en",

                },

            };

        }

        return JSON.parse(raw);

    }

    static save(config: SettingsConfig) {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(config)
        );

    }

}