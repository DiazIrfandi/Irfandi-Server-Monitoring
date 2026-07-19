import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { useEffect } from "react";
import { useScreenLockStore } from "./stores/screen-lock.store";
import LockScreen from "./components/ScreenLock/LockScreen";
import { useSettingsStore } from "./stores/settings.store";

export default function App() {

    const load = useScreenLockStore((state) => state.load);
    
    const { configSettings } = useSettingsStore();

    useEffect(() => {
        load();
    }, [load]);

    const config = useScreenLockStore((state) => state.config);

    return (
        <div className={`dkm-root ${configSettings.general.theme}`}>
            <RouterProvider router={router} />

            {config.enabled && config.locked && (
                <LockScreen />
            )}
        </div>
    );
}