import { Injectable, inject } from "@angular/core";
import { User } from "../models/user.model";
import { BankService } from "./bank.service";
import { CharactersService } from "./characters.service";
import { map } from "rxjs/operators";
import { BehaviorSubject, switchMap } from "rxjs";
import { AuthService } from "./auth.service";
@Injectable({ providedIn: 'root' })
export class UserService {
    private currentUser: User | null = null;
    bankService = inject(BankService);
    authService = inject(AuthService);
    charactersService = inject(CharactersService);
    private userRole = this.authService.getUserRole();
    private currentUserSubject = new BehaviorSubject<User | null>(null);

    currentUser$ = this.currentUserSubject.asObservable();
    constructor() {
        this.authService.userRole$.pipe(
            switchMap(role => {
                const id = role.userRole === 'loanOfficer' ? 8 : 1;
                return this.charactersService.getCharacterById(id);
            }),
            map((character: any) => ({
                id: character.url.split('/').filter(Boolean).pop(),
                name: character.name,
                email: `${character.name.toLowerCase().replace(/\s/g, '.')}@example.com`,
                tier: 'premium' as const
            }))
        ).subscribe(user => {
            this.currentUserSubject.next(user);
        });
    }

    setCurrentUser(user: User) {
        this.currentUser = user;
        this.currentUserSubject.next(user);
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

    getCurrentUserVaue(): User | null {
        return this.currentUserSubject.value;
    }
}