import { Component, inject } from "@angular/core";
import { RouterModule } from "@angular/router";
import { UserService } from "../../services/user.service";
import { CharactersService } from "../../services/characters.service";
import { LoanService } from "../../services/loan.service";
@Component({
    selector: 'client-portal',
    standalone: true,
    imports: [RouterModule],
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
                            <button>Apply Now</button>
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
                            <button>Apply Now</button>
                        </div>
                    </li>
                </ul>
            </section>

        <div>
            <h2>Your accounts</h2>
            <a routerLink="home/{{ currentUser?.id }}">View Account Details</a>
        </div>
    
        </div>

       
    `,
    styles: ``
})
export class ClientPortalComponent {
    userService = inject(UserService);
    charactersService = inject(CharactersService);
    loanService = inject(LoanService);

    currentUser = this.userService.getCurrentUser();

    availableVehicleLoans$ = this.loanService.getVehicleLoanOptions();
    availableStarshipLoans$ = this.loanService.getStarshipLoanOptions();

    switchToLoanOfficerView() {

    }
}