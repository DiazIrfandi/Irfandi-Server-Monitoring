import { create } from "zustand";
import { SettingsService } from "../services/settings.service";
import type {
    Language,
    ThemeMode,
} from "../types/settings";

interface SettingsStore {

    configSettings: ReturnType<typeof SettingsService.load>;

    load: () => void;

    setTheme: (theme: ThemeMode) => void;

    setLanguage: (language: Language) => void;

}

export const useSettingsStore = create<SettingsStore>((set) => ({

    configSettings: SettingsService.load(),

    load() {

        set({

            configSettings: SettingsService.load(),

        });

    },

    setTheme(theme) {

        set((state) => {

            const configSettings = {

                ...state.configSettings,

                general: {

                    ...state.configSettings.general,

                    theme,

                },

            };

            SettingsService.save(configSettings);

            return {

                configSettings,

            };

        });

    },

    setLanguage(language) {

        set((state) => {

            const configSettings = {

                ...state.configSettings,

                general: {

                    ...state.configSettings.general,

                    language,

                },

            };

            SettingsService.save(configSettings);

            return {

                configSettings,

            };

        });

    },

}));