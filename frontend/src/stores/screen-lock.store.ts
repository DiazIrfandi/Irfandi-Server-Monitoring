import { create } from "zustand";
import { ScreenLockService } from "../services/screen-lock.service";
import type { ScreenLockConfig } from "../types/screen-lock";
import { hashString } from "../utils/crypto";

interface ScreenLockStore {
    config: ScreenLockConfig;

    load: () => void;

    enable: (pin: string) => Promise<void>;

    disable: (pin: string) => Promise<boolean>;

    verify: (pin: string) => Promise<boolean>;

    lock: () => void;

    unlock: () => void;

    changePin: (currentPin: string, newPin: string) => Promise<boolean>;
}

export const useScreenLockStore = create<ScreenLockStore>((set) => ({
    config: ScreenLockService.load(),

    load() {
        set({
            config: ScreenLockService.load(),
        });
    },

    async enable(pin) {

        const hash = await hashString(pin);

        set((state) => {

            const config = {
                ...state.config,
                enabled: true,
                pinHash: hash,
            };

            ScreenLockService.save(config);

            return {
                config,
            };

        });

    },

    async disable(pin) {

        const valid = await ScreenLockService.verify(pin);

        if (!valid) {
            return false;
        }

        set((state) => {

            const config = {
                ...state.config,
                enabled: false,
                locked: false,
            };

            ScreenLockService.save(config);

            return {
                config,
            };

        });

        return true;

    },

    verify(pin) {
        return ScreenLockService.verify(pin);
    },

    lock() {
        set((state) => {
            const config = {
                ...state.config,
                locked: true,
            };

            ScreenLockService.save(config);

            return {
                config,
            };
        });
    },

    unlock() {
        set((state) => {
            const config = {
                ...state.config,
                locked: false,
            };

            ScreenLockService.save(config);

            return {
                config,
            };
        });
    },
    async changePin(currentPin, newPin) {

        const valid = await ScreenLockService.verify(currentPin);

        if (!valid) {
            return false;
        }

        const hash = await hashString(newPin);

        set((state) => {

            const config = {

                ...state.config,

                pinHash: hash,

            };

            ScreenLockService.save(config);

            return {
                config,
            };

        });

        return true;

    },
}));