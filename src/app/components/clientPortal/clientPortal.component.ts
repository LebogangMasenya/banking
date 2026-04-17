import { Component, inject } from "@angular/core";
import { RouterModule, Router } from "@angular/router";
import { UserService } from "../../services/user.service";
import { CharactersService } from "../../services/characters.service";
import { LoanService } from "../../services/loan.service";
import { AuthService } from "../../services/auth.service";
import { CommonModule } from "@angular/common";
import { Observable } from "rxjs";
import {selectCharacterLoans, selectCharacterApprovedLoans, selectCharacterPendingLoans, selectCharacterRejectedLoans, selectCharacterStarshipLoans, selectCharacterVehicleLoans} from "../../state/characters/characters.selectors";
import {applyForStarshipLoan, applyForVehicleLoan} from "../../state/characters/characters.actions";
import { Store } from "@ngrx/store";
@Component({
    selector: 'client-portal',
    standalone: true,
    imports: [RouterModule, CommonModule],
    template: `
        <div>
            <div>
                Switch to <a routerLink="loan-office"><button (click)="switchToLoanOfficerView()">Loan Officer View</button></a>
            </div>
            <h1>Client Portal</h1>

            <section>
                <h2>Welcome, {{ currentUser?.name }}</h2>
                <p>Your current net worth is: {{ userService.getNetWorth(currentUser!) }}</p>
            </section>

            <section class="loan-options">
                <h2>Available Vehicle Loans</h2>
                <ul>
                    <li *ngFor="let loan of availableVehicleLoans$ | async">
                        {{ loan.name }} - {{ loan.loanAmount}} credits

                        <div class="CTA">
                            <button (click)="applyForVehicleLoan(loan.name, loan.loanAmount)">Apply Now</button>
                        </div>
                    </li>
                </ul>
            </section>  

            <section>
                <h2>Available Starship Loans</h2>
                <ul>
                    <li *ngFor="let loan of availableStarshipLoans$ | async">
                        {{ loan.name }} - {{ loan.loanAmount}} credits

                        <div class="CTA">
                            <button (click)="applyForStarshipLoan(loan.name, loan.loanAmount)">Apply Now</button>
                        </div>
                    </li>
                </ul>
            </section>

        <div>
            <h2>Your accounts</h2>
            <a routerLink="home/{{ currentUser?.id }}">View Account Details</a>
        </div>
    

        <section>
            <h2>Your Loan Applications</h2>
            <div *ngIf="characterLoans$ | async as loans; ">
                <ul>
                    <li *ngFor="let loan of loans">
                        {{ loan.loanType | titlecase }} Loan for {{ loan.loanType === 'vehicle' ? loan.vehicleName : loan.starshipName }} - Amount: {{ loan.amount }} credits - Status: {{ loan.status | titlecase }}
                    </li>
                </ul>
            </div>
        </section>
        </div>

       
    `,
    styles: ``
})
export class ClientPortalComponent {
    userService = inject(UserService);
    charactersService = inject(CharactersService);
    loanService = inject(LoanService);
    authService = inject(AuthService);
    router = inject(Router);
    currentUser = this.userService.getCurrentUser();

    private store = inject(Store);
    characterLoans$: Observable<any[]> = this.store.select(selectCharacterLoans(this.currentUser?.name || ''));
    availableVehicleLoans$ = this.loanService.getVehicleLoanOptions();
    availableStarshipLoans$ = this.loanService.getStarshipLoanOptions();


    applyForVehicleLoan(vehicleName: string, amount: number) {
        console.log(`Applying for vehicle loan: ${vehicleName} with amount ${amount} for character ${this.currentUser?.name}`);
        this.store.dispatch(applyForVehicleLoan({ characterName: this.currentUser?.name || '', vehicleName, amount }));
    }

    applyForStarshipLoan(starshipName: string, amount: number) {
        console.log(`Applying for starship loan: ${starshipName} with amount ${amount} for character ${this.currentUser?.name}`);
        this.store.dispatch(applyForStarshipLoan({ characterName: this.currentUser?.name || '', starshipName, amount }));
    }

    switchToLoanOfficerView() {
        this.authService.login('loanOfficer');
        this.router.navigate(['/loan-office']);
    }
}