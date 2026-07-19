export type ThemeMode =
    | "system"
    | "light"
    | "dark";

export type Language =
    | "en"
    | "id";

export interface GeneralSettings {

    theme: ThemeMode;

    language: Language;

}

export interface SettingsConfig {

    general: GeneralSettings;

}