import { Injectable, inject } from "@angular/core";
import { User } from "../models/user.model";
import { BankAccountModel } from "../models/bank.interface";
import { BankService } from "./bank.service";
import { CharactersService } from "./characters.service";
import { map } from "rxjs/operators";
@Injectable({providedIn: 'root'})
export class UserService {
    private currentUser: User | null = null;
    bankService = inject(BankService);
    charactersService = inject(CharactersService);

    useMapped$ = this.charactersService.getCharacterById(1).pipe(
        map((character: any) => ({
            id: character.url.split('/').filter((part: string) => part).pop(), // Extract ID from URL
            name: character.name,
            email: `${character.name.toLowerCase().replace(/\s/g, '.')}@example.com`,
            tier: 'premium' as const
        }))
    );

    constructor() { 
       this.useMapped$.subscribe(user => this.setCurrentUser(user));
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