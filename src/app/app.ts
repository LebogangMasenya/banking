import { Component, signal } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';
import { BankScreen } from './components/bankScreen/bankScreen.component';
import { BankAccount } from "./components/bankAccount/bankAccount.component";
import { ClientPortalComponent } from './components/clientPortal/clientPortal.component';
import { LoanOfficeComponent } from './components/loanOffice/loanOffice.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BankScreen, BankAccount, ClientPortalComponent, LoanOfficeComponent, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('banking');
}
