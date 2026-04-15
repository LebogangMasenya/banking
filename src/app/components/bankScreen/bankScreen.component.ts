import { Component, signal, inject, Inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { accountData } from "../../data/mockData";
import { BankAccountDetails } from "../bankAccountDetails/bankAccountDetails.component";
import { BankAccountListComponent } from "../bankAccountList/bankAccountList.component";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TransactionSimDirective } from "../../decorators/transactionSim.directive";
import { Transaction } from "../../models/bank.interface";
import { UserService } from "../../services/user.service";
import { themeFactory } from "../../factories/theme.factory";
import { THEME_TOKEN } from "../../factories/theme.factory";
import { MatBadgeModule } from "@angular/material/badge";
import { RouterLink } from "@angular/router";
@Component({
    templateUrl: './bankScreen.template.html',
    styleUrl: './bankScreen.css',
    imports: [CommonModule, BankAccountDetails, BankAccountListComponent, MatSlideToggleModule, MatProgressBarModule, TransactionSimDirective, MatBadgeModule, RouterLink],
    selector: 'bank-screen',
    providers:[
        { provide: THEME_TOKEN, useFactory: themeFactory, deps: [UserService] }
    ]
})
export class BankScreen {
    private theme = inject(THEME_TOKEN);
    get currentTheme() {
        return this.theme;
    }
    accounts = signal(accountData);
    userService = inject(UserService);

    userInfo = signal({
        user: this.userService.getCurrentUser(),
        netWorth: this.userService.getNetWorth(this.userService.getCurrentUser()!)

    });
    selectedAccount = signal<string | null>(null);

    onAccountSelected(name: string) {
        this.selectedAccount.set(name);
    }


    isActiveOnly = signal(true);
    toggleActiveOnly() {
        this.isActiveOnly.set(!this.isActiveOnly());
    }
    filteredCurrency = signal<string>('ALL');

    filterCurrency(currency: string) {
        this.filteredCurrency.set(currency);
    }

    recentTransactions = signal<Transaction[]>([]);

    addTransaction(tx: Transaction) {
        this.recentTransactions.update(current => [tx, ...current].slice(0, 5));
        // update balance if selected account matches transaction description
        const selected = this.selectedAccount();
        if (selected && tx.description.includes(selected)) {
            this.updateBalance(selected, tx.amount);
        }
    }

    updateBalance(accountName: string, amount: number) {
        this.accounts.update(accounts => {
            return accounts.map(acc => {
                if (acc.title === accountName) {
                    return { ...acc, balance: acc.balance + amount };
                }
                return acc;
            });
        });
    }
}