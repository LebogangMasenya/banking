import { Component, inject } from "@angular/core";
import { CharactersService } from "../../services/characters.service";
import { LoanService } from "../../services/loan.service";
import { UserService } from "../../services/user.service";
import { RouterLink, Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { CommonModule } from "@angular/common";
import { toSignal } from "@angular/core/rxjs-interop";
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
                    @for (character of characters(); track character.name) {
                        <li>
                            {{ character.name }}
                        </li>
                    }
                </ul>
            </section>

            <section>
                <h2>Available Vehicle Loans</h2>
                <ul>
                    @for (loan of vehicleLoans(); track loan.name) {
                    <li>
                            {{ loan.name }} - {{ loan.loanAmount }}% interest
                            <button>
                                Approve
                        </button>
                        <button>
                            Reject
                        </button>
                    </li>
                    }
                </ul>
            </section>

            <section>
                <h2>Available Starship Loans</h2>
                <ul>
                    @for (loan of starshipLoans(); track loan.name) {
                        <li>
                        {{ loan.name }} - {{ loan.loanAmount }}% interest
                        <button>
                            Approve
                        </button>
                        <button>
                            Reject
                        </button>
                    </li>
                    }
                </ul>
            </section>
        </div> 
    `,
    styles: ``,
    imports: [RouterLink, CommonModule],
    standalone: true
})
export class LoanOfficeComponent {
    private charactersService = inject(CharactersService);
    private loanService = inject(LoanService);

    private authService = inject(AuthService);
    private router = inject(Router);
    characters$ = this.charactersService.getAllCharacters();

    characters = toSignal(this.characters$, { initialValue: [] });
    
    userService = inject(UserService);
    currentUser = this.userService.getCurrentUser();
    availableVehicleLoans$ = this.loanService.getVehicleLoanOptions();
    availableStarshipLoans$ = this.loanService.getStarshipLoanOptions();


    starshipLoans = toSignal(this.availableStarshipLoans$, { initialValue: [] });
    vehicleLoans = toSignal(this.availableVehicleLoans$, { initialValue: [] });

    switchToClientView() {
        this.authService.login('client');
        this.router.navigate(['/client-portal']);
    }   
}