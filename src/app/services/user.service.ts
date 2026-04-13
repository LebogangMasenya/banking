import { Injectable, inject } from "@angular/core";
import { User } from "../models/user.model";
import { BankAccountModel } from "../models/bank.interface";
import { BankService } from "./bank.service";
@Injectable({providedIn: 'root'})
export class UserService {
    private currentUser: User | null = null;
    bankService = inject(BankService);

    constructor() { 
        // For demo purposes, we set a default user. In a real app, this would come from an auth service.
        this.setCurrentUser({
            id: 1,
            name: 'That Guy',
            email: 'that.guy@example.com',
            tier: 'premium'
        });
    }

    setCurrentUser(user: User) {
        this.currentUser = user;
    }
    getNetWorth(user: User): number {
        // Implementation for calculating net worth
        const accounts = this.bankService.getBankAccounts();
        // Example calculation (replace with actual logic)
        return accounts.reduce((total, account) => total + account.balance, 0);
    }

    getCurrentUser(): User | null {
        return this.currentUser;
    }
}