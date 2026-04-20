import { Component, inject, computed } from "@angular/core";
import { CharactersService } from "../../services/characters.service";
import { LoanService } from "../../services/loan.service";
import { UserService } from "../../services/user.service";
import { RouterLink, Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { CommonModule } from "@angular/common";
import { toSignal } from "@angular/core/rxjs-interop";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { LoansActions } from "../../state/loans/loans.actions";
import { selectAllLoans, selectApprovedLoans, selectPendingLoans, selectRejectedLoans, selectVehicleLoans, selectStarshipLoans, selectLoansState } from "../../state/loans/loans.selectors"
import { selectAllCharacterLoans } from "../../state/characters/characters.selectors";
import { CharacterStore } from "../../state/signal-store/character-store";
@Component({
    selector: 'loan-office',
    providers: [CharacterStore],
    template: `
   <div class="dashboard-container">
    <header class="dashboard-header">
        <h1>Loan Office</h1>
        <div class="actions">
            <span>Switch to</span>
            <a routerLink="/client-portal">
                <button class="btn-secondary" (click)="switchToClientView()">Client View</button>
            </a>
        </div>
    </header>

    <hr class="divider" />

    <section class="user-profile">
        <span class="label">Loan Officer:</span>
        <span class="value">{{ currentUserValue()?.name }}</span>
    </section>

    <div class="loan-grid">
        <section class="card">
            <h2>Current Characters</h2>
            <ul class="list-unstyled">
                @for (character of characters(); track character.name) {
                    <li class="list-item">{{ character.name }}</li>
                }
            </ul>
        </section>

        <section class="card">
            <h2>Available Vehicle Loans</h2>
            <ul class="loan-list">
                @for (loan of vehicleLoans(); track loan.name) {
                    <li class="loan-item">
                        <div class="loan-info">
                            <strong>{{ loan.name }}</strong>
                            <span class="interest">{{ loan.loanAmount }}% interest</span>
                        </div>
                        <div class="button-group">
                            <button class="btn-success">Approve</button>
                            <button class="btn-danger">Reject</button>
                        </div>
                    </li>
                }
            </ul>
        </section>

        <section class="card">
            <h2>Available Starship Loans</h2>
            <ul class="loan-list">
                @for (loan of starshipLoans(); track loan.name) {
                    <li class="loan-item">
                        <div class="loan-info">
                            <strong>{{ loan.name }}</strong>
                            <span class="interest">{{ loan.loanAmount }}% interest</span>
                        </div>
                        <div class="button-group">
                            <button class="btn-success">Approve</button>
                            <button class="btn-danger">Reject</button>
                        </div>
                    </li>
                }
            </ul>
        </section>

        <section class="card">
            <h2>Loan Applications</h2>
            <ul>    
                @for (loan of characterLoans(); track loan.id) {
                    <li class="loan-item">
                        <div class="loan-info">
                            <strong>{{ loan.characterName }} - {{ loan.loanType === 'vehicle' ? loan.vehicleName : loan.starshipName }}</strong>
                            <span class="interest">{{ loan.amount }} credits</span>
                        </div>
                        <div class="button-group">
                            <button class="btn-success" (click)="approveLoan(loan.characterName, loan.loanType === 'vehicle' ? loan.vehicleName : loan.starshipName)">Approve</button>
                            <button class="btn-danger" (click)="rejectLoan(loan.characterName, loan.loanType === 'vehicle' ? loan.vehicleName : loan.starshipName)">Reject</button>
                        </div>
                    </li>   
                }

            </ul>
        </section>
    </div>
</div>
    `,
    styles: `
    
    .dashboard-container {
    padding: 2rem;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #333;
    max-width: 1000px;
    margin: 0 auto;
}

.dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.user-profile {
    margin: 1.5rem 0;
    font-size: 1.1rem;
}

.label { font-weight: bold; color: #666; }
.value { margin-left: 0.5rem; color: #000; }

.loan-grid {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.card {
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.loan-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
    border-bottom: 1px solid #eee;
}

.loan-item:last-child { border-bottom: none; }

.loan-info { display: flex; flex-direction: column; }
.interest { color: #666; font-size: 0.9rem; }

.button-group {
    display: flex;
    gap: 0.5rem;
}

/* Button Styles */
button {
    padding: 0.5rem 1rem;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    font-weight: 600;
    transition: opacity 0.2s;
}

button:hover { opacity: 0.8; }

.btn-secondary { background: #6c757d; color: white; }
.btn-success { background: #28a745; color: white; }
.btn-danger { background: #dc3545; color: white; }

.list-unstyled { list-style: none; padding: 0; }
.list-item { padding: 0.5rem 0; border-bottom: 1px solid #eee; }
    
    
    
    `,
    imports: [RouterLink, CommonModule],
    standalone: true
})
export class LoanOfficeComponent {
    private charactersService = inject(CharactersService);
    private loanService = inject(LoanService);

    private authService = inject(AuthService);
    private router = inject(Router);
    private store = inject(Store);

    readonly characterStore =  inject(CharacterStore);
    currentLoans$ = this.store.select(selectAllLoans);
    approvedLoans$ = this.store.select(selectApprovedLoans);
    pendingLoans$ = this.store.select(selectPendingLoans);
    rejectedLoans$ = this.store.select(selectRejectedLoans);
    vehicleLoans$ = this.store.select(selectVehicleLoans);
    starshipLoans$ = this.store.select(selectStarshipLoans);
    loansState$ = this.store.select(selectLoansState);

    allCharacterLoans$ = this.store.selectSignal(selectAllCharacterLoans);
    allCharacterLoans = computed(() => this.allCharacterLoans$());

    characters$ = this.charactersService.getAllCharacters();

    characters = toSignal(this.characters$, { initialValue: [] });

    userService = inject(UserService);
    currentUser$ = this.userService.currentUser$;
    currentUser = toSignal(this.userService.currentUser$, { initialValue: null });
    currentUserValue = computed(() => this.currentUser() || null);
    
    availableVehicleLoans$ = this.loanService.getVehicleLoanOptions();
    availableStarshipLoans$ = this.loanService.getStarshipLoanOptions();

    characterLoans = computed(() => {
        return this.allCharacterLoans().filter(loan => loan.status === 'pending');
    });

    starshipLoans = toSignal(this.availableStarshipLoans$, { initialValue: [] });
    vehicleLoans = toSignal(this.availableVehicleLoans$, { initialValue: [] });

    approveLoan(characterName: string, vehicleName: string) {
        console.log('Approving loan for', characterName, ' - ', vehicleName);
        this.characterStore.approveVehicleLoan({characterName, vehicleName})
    }

    rejectLoan(characterName: string, vehicleName: string) {
        console.log('Rejecting loan for', characterName, ' - ', vehicleName);

        this.characterStore.rejectVehicleLoan({characterName, vehicleName})
    }

    switchToClientView() {
        this.authService.login('client');
        this.router.navigate(['/client-portal']);
    }
}