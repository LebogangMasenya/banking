import { Component, Attribute, Input,inject, Output, EventEmitter } from "@angular/core";
import { BankService } from "../../services/bank.service";
import { CardClick } from "../../decorators/cardClick.directive";
import { BankAccountModel } from "../../models/bank.interface";
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { BankFormat } from "../../decorators/bankFormat.pipe";

@Component({
    selector: 'bank-account',
    template: `
    <mat-card cardClick [style.border]="'6px solid ' + accountInfo?.cardColor">

    <mat-card-header>
        <mat-card-title>{{ accountInfo?.title }}</mat-card-title>

        @if(accountInfo?.isActive) {
            <mat-card-subtitle>{{ accountInfo?.currency }} - Active</mat-card-subtitle>
        } @else {
            <mat-card-subtitle>{{ accountInfo?.currency }} - Inactive</mat-card-subtitle>
        }
    </mat-card-header>

    </mat-card>
    `,
    styleUrl: './bankAccount.css',
    imports: [CardClick, MatCardModule, CommonModule, BankFormat]
})
export class BankAccount {
    @Output() selected = new EventEmitter<string>();
    @Input() accountId! : number;
    private bankService = inject(BankService);
    accountInfo: BankAccountModel | null = null;


    ngOnInit() {
        const index = Number(this.accountId);

        if (isNaN(index)) {
            console.error('BankAccount did not receive a valid accountindex!');
            return;
        }

        const accounts = this.bankService.getBankAccounts();
        this.accountInfo = accounts[index] || null;

        if (!this.accountInfo) {
            console.error(`No account found at index: ${index}`);
        }
    }



    triggerSelect() {
        this.selected.emit(this.accountInfo?.title || '');
    }
}