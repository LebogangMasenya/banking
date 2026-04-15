
export interface User {
    id: number;
    name: string;
    email: string;
    tier: 'basic' | 'premium' | 'vip';
    role?: 'user' | 'loan-officer';
}