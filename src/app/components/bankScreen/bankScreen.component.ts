import { Component, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { accountData } from "../../data/mockData";
import { BankAccountDetails } from "../bankAccountDetails/bankAccountDetails.component";
import { BankAccountListComponent } from "../bankAccountList/bankAccountList.component";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { TransactionSimDirective } from "../../decorators/transactionSim.directive";
import { Transaction } from "../../models/bank.interface";
@Component({
    templateUrl: './bankScreen.template.html',
    styleUrl: './bankScreen.css',
    imports: [CommonModule, BankAccountDetails, BankAccountListComponent, MatSlideToggleModule, MatProgressBarModule, TransactionSimDirective  ],  
    selector: 'bank-screen'
})
export class BankScreen {
    accounts = signal(accountData);
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