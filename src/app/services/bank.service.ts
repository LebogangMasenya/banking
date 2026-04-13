import { Injectable } from "@angular/core";
import { accountData } from "../data/mockData";
import { BankAccountModel } from "../models/bank.interface";
@Injectable({
    providedIn: 'root'
})
export class BankService {
    constructor() { }

    getInfoForAccount(accountName: string) {
        return accountData.find(account => account.title === accountName);
    }

    getBankAccounts() {
        return accountData;
    }

    getBankAccountNames() {
        return accountData.map(account => account.title);
    }

    private bankVault(): BankAccountModel[] {
        return accountData;
    }

}