import { Component, Input, OnChanges, SimpleChanges, inject } from "@angular/core";
import { BankService } from "../../services/bank.service";
import { BankAccountModel } from "../../models/bank.interface";
import { CommonModule } from "@angular/common";
import { BankFormat } from "../../decorators/bankFormat.pipe";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatListModule } from "@angular/material/list";
import { MatChipsModule } from "@angular/material/chips";

@Component({
    selector: 'bank-account-details',
    template: `
        <ng-container *ngIf="accountInfo; else noData">

    <mat-card [style.border]="'6px solid ' + accountInfo.cardColor">

        <mat-card-header>
            <mat-card-title>{{ accountInfo.title }}</mat-card-title>
            <mat-card-subtitle>{{ account }}</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
            <p class="balance-label">Current balance</p>
            <h2 class="balance-amount">{{ accountInfo | FinanceFormat }}</h2>
        </mat-card-content>

    </mat-card>

    <mat-card *ngIf="accountInfo.transactions?.length; else noTransactions">

        <mat-card-header>
            <mat-card-title>Transactions</mat-card-title>
            <mat-card-subtitle>
                {{ accountInfo.transactions!.length }} records
            </mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
            <mat-list>
                @for (tx of accountInfo.transactions; track tx) {

                <mat-list-item >
                    <span matListItemTitle>{{ tx.description }}</span>

                    <span matListItemLine>{{ tx.date }}</span>

                    <span 
                        matListItemMeta
                        [class.positive]="tx.amount > 0"
                        [class.negative]="tx.amount < 0">
                        {{ tx.amount  }} 
                    </span>

                    <mat-divider></mat-divider>
                        
                </mat-list-item>
                    }
            </mat-list>
        </mat-card-content>

    </mat-card>

    <ng-template #noTransactions>
        <mat-card>
            <mat-card-content>
                <p>No transactions on this account yet.</p>
            </mat-card-content>
        </mat-card>
    </ng-template>

</ng-container>

<ng-template #noData>
    <mat-card>
        <mat-card-content>
            <p>Select an account to view details.</p>
        </mat-card-content>
    </mat-card>
</ng-template>
    `,
    styleUrl: './bankAccountDetails.css',
    standalone: true,
    imports: [CommonModule, BankFormat, MatCardModule, MatDividerModule, MatListModule, MatChipsModule]
})
export class BankAccountDetails implements OnChanges {
    @Input() account: string | null = null;

    accountInfo: BankAccountModel | null = null;

    private bankService = inject(BankService);

    ngOnChanges(changes: SimpleChanges) {
        if (changes['account'] && this.account) {
            this.accountInfo = this.bankService.getInfoForAccount(this.account) || null;
        }
    }
}