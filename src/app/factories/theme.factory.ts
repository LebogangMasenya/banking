import { InjectionToken } from "@angular/core";
import { UserService } from "../services/user.service";
import { User } from "../models/user.model";


export const THEME_CONFIG = {
    basic: 'light-theme',
    premium: 'premium-theme',
    vip: 'gold-theme'
}
export function themeFactory(userS: UserService): string {
    const user: User | null = userS.getCurrentUser();
    if (user) {
        return THEME_CONFIG[user.tier] || 'light-theme'; // perfection, W coding standards
    } else {
        return 'light-theme';
    }
}

export const THEME_TOKEN = new InjectionToken<string>('theme');
