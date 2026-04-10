import { Component, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { accountData } from "../../data/mockData";
import { BankAccountDetails } from "../bankAccountDetails/bankAccountDetails.component";
import { BankAccountListComponent } from "../bankAccountList/bankAccountList.component";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatProgressBarModule} from '@angular/material/progress-bar';


@Component({
    templateUrl: './bankScreen.template.html',
    styleUrl: './bankScreen.css',
    imports: [CommonModule, BankAccountDetails, BankAccountListComponent, MatSlideToggleModule, MatProgressBarModule],  
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
}