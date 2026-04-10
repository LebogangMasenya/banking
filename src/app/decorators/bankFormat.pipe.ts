import { Pipe, PipeTransform } from "@angular/core";
import { type BankAccountModel } from "../models/bank.interface";
@Pipe({
    name: 'FinanceFormat',
    standalone: true
})
export class BankFormat implements PipeTransform {
    transform(value: BankAccountModel | null | undefined): string {
        if(!value) return '';

        const currencySymbol = value.currency || '$';
        return `${currencySymbol} ${value.balance?.toFixed(2) || '0.00'}`; // find out how to add space between 1000s
    }
}