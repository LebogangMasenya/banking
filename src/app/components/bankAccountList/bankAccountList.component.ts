import { Component, OnInit, Output, inject, EventEmitter, SimpleChanges, Input, OnChanges } from '@angular/core';
import { BankAccountModel } from '../../models/bank.interface';
import { BankService } from "../../services/bank.service";
import { BankAccount } from '../bankAccount/bankAccount.component';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from "@angular/common";
@Component({
  selector: 'bank-account-list',
  template: `
<section class="account-list">

<ng-container>

@if (showActiveOnly)  {
    <p><strong>Showing only active accounts:</strong></p>
} @else {
  <p><strong>Showing all inactive accounts:</strong></p>
}


@switch (currency) {
        @case ('ALL') {
            <p>All currencies</p>
        }
        @case ('$') {
            <p>US Dollar accounts</p>
        }
        @case ('EUR') {
            <p>Euro accounts</p>
        }
        @case ('R') {
            <p>Rand accounts</p>
        }
        @default {
            <p>No accounts found for selected currency</p>
        }
  }

    @for (name of accountNames; track name) {
        <bank-account 
            [accountId]="accountNames.indexOf(name)"
            (selected)="selected.emit($event)">
        </bank-account>
    }

</ng-container>

  <p *ngIf="accountNames.length === 0">No accounts found.</p>

</section>`,
  styleUrls: ['./bankAccountList.css'],
  imports: [BankAccount, MatCardModule, CommonModule]
})
export class BankAccountListComponent implements OnInit, OnChanges {

  @Input() currency: string = 'ALL';
  @Input() showActiveOnly!: boolean;

  @Output() selected = new EventEmitter<string>();
  bankAccounts: BankAccountModel[] = [];
  accountNames: string[] = [];
  private bankAccountService = inject(BankService);

  ngOnInit(): void {
    this.accountNames = this.bankAccountService.getBankAccountNames();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['currency'] || changes['showActiveOnly']) {
      this.updateAccountNames();
    }
  }

  private updateAccountNames() {
    let accounts = this.bankAccountService.getBankAccounts();

    if (this.showActiveOnly) {
      accounts = accounts.filter(acc => acc.isActive);
    }

    if (this.currency !== 'ALL') {
      accounts = accounts.filter(acc => acc.currency === this.currency);
    }

    this.accountNames = accounts.map(acc => acc.title);
  }
}