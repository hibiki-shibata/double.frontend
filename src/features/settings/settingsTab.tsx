import { NotificationSettings } from "./components/NotificationSettings";
import { ProfileSettings } from "./components/ProfileSettings";
import { SecuritySettings } from "./components/SecuritySettings";
import { WalletSettings } from "./components/WalletSettings";

import type { ReactElement } from 'react';

const settings: { 'component': ReactElement }[] = [
    { 'component': <ProfileSettings /> },
    { 'component': <SecuritySettings /> },
    { 'component': <NotificationSettings /> },
    { 'component': <WalletSettings /> },
]


export function SettingsTab() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {settings.map((setting) => (
                <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
                    {setting.component}
                </div>
            ))}
        </div>
    )
}