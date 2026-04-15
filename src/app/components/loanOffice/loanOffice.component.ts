import { Component, inject } from "@angular/core";
import { CharactersService } from "../../services/characters.service";
import { LoanService } from "../../services/loan.service";
import { UserService } from "../../services/user.service";
import { RouterLink } from "@angular/router";
@Component({
    selector: 'loan-office',
    template: `
        <div>
            <div>   
            Switch to <a routerLink="client-portal"><button (click)="switchToClientView()">Client View</button></a>
            </div>
            <h1>Loan Office</h1>

            <section>
                <h2>Loan officer</h2>
                {{ currentUser?.name }}
            </section>  
            <section>
                <h2>Current loans</h2>
                <ul>
                    <li *ngFor="let character of characters$ | async">
                        {{ character.name }}
                    </li>
                </ul>
            </section>

            <section>
                <h2>Available Vehicle Loans</h2>
                <ul>
                    <li *ngFor="let loan of vehicleLoans | async">
                        {{ loan.name }} - {{ loan.interestRate }}% interest
                        <button>
                            Approve
                        </button>
                        <button>
                            Reject
                        </button>
                    </li>
                </ul>
            </section>

            <section>
                <h2>Available Starship Loans</h2>
                <ul>
                    <li *ngFor="let loan of starshipLoans | async">
                        {{ loan.name }} - {{ loan.interestRate }}% interest
                        <button>
                            Approve
                        </button>
                        <button>
                            Reject
                        </button>
                    </li>
                </ul>
            </section>
        </div> 
    `,
    styles: ``,
    imports: [RouterLink],
    standalone: true
})
export class LoanOfficeComponent {
    private charactersService = inject(CharactersService);
    private loanService = inject(LoanService);

    characters$ = this.charactersService.getAllCharacters();

    userService = inject(UserService);
    currentUser = this.userService.getCurrentUser();
    availableVehicleLoans$ = this.loanService.getVehicleLoanOptions();
    availableStarshipLoans$ = this.loanService.getStarshipLoanOptions();


    starshipLoans = this.availableStarshipLoans$.subscribe(loanOptions => {
       return loanOptions;
    });

    vehicleLoans = this.availableVehicleLoans$.subscribe(loanOptions => {
     this.vehicleLoans = loanOptions;
     return loanOptions;
    })

    switchToClientView() {
        }   
}