import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BankScreen } from './components/bankScreen/bankScreen.component';
import { BankAccount } from "./components/bankAccount/bankAccount.component";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BankScreen, BankAccount],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('banking');
}
