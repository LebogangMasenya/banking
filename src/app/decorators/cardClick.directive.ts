import { Directive, HostListener, Host } from '@angular/core';
import { BankAccount } from '../components/bankAccount/bankAccount.component';

@Directive({ selector: '[cardClick]', standalone: true })
export class CardClick {
  constructor(@Host() private card: BankAccount) {}

  @HostListener('click')
  onClick() {
    this.card.triggerSelect();
  }
}