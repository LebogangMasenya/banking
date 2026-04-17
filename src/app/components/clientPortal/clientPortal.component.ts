import { Component, inject } from "@angular/core";
import { RouterModule, Router } from "@angular/router";
import { UserService } from "../../services/user.service";
import { CharactersService } from "../../services/characters.service";
import { LoanService } from "../../services/loan.service";
import { AuthService } from "../../services/auth.service";
import { CommonModule } from "@angular/common";
import { Observable } from "rxjs";
import { selectCharacterLoans, selectCharacterApprovedLoans, selectCharacterPendingLoans, selectCharacterRejectedLoans, selectCharacterStarshipLoans, selectCharacterVehicleLoans } from "../../state/characters/characters.selectors";
import { applyForStarshipLoan, applyForVehicleLoan } from "../../state/characters/characters.actions";
import { Store } from "@ngrx/store";
@Component({
    selector: 'client-portal',
    standalone: true,
    imports: [RouterModule, CommonModule],
    template: `
<div class="dashboard-container">
    <header class="dashboard-header">
        <h1>Client Portal</h1>
        <div class="actions">
            <a routerLink="loan-office">
                <button class="btn-secondary" (click)="switchToLoanOfficerView()">Loan Officer View</button>
            </a>
        </div>
    </header>

    <hr class="divider" />

    <section class="card welcome-banner">
        <h2>Welcome, {{ currentUser?.name }}</h2>
        <p>Your current net worth: <strong>{{ userService.getNetWorth(currentUser!) }}</strong></p>
        <a routerLink="home/{{ currentUser?.id }}" class="btn-link">View Account Details</a>
    </section>

    <div class="loan-grid">
        <section class="card">
            <h2>Available Vehicle Loans</h2>
            <ul class="loan-list">
                @for (loan of availableVehicleLoans$ | async; track loan.name) {
                    <li class="loan-item">
                        <div class="loan-info">
                            <strong>{{ loan.name }}</strong>
                            <span class="amount">{{ loan.loanAmount }} credits</span>
                        </div>
                        <button class="btn-primary" (click)="applyForVehicleLoan(loan.name, loan.loanAmount)">Apply Now</button>
                    </li>
                }
            </ul>
        </section>

        <section class="card">
            <h2>Available Starship Loans</h2>
            <ul class="loan-list">
                @for (loan of availableStarshipLoans$ | async; track loan.name) {
                    <li class="loan-item">
                        <div class="loan-info">
                            <strong>{{ loan.name }}</strong>
                            <span class="amount">{{ loan.loanAmount }} credits</span>
                        </div>
                        <button class="btn-primary" (click)="applyForStarshipLoan(loan.name, loan.loanAmount)">Apply Now</button>
                    </li>
                }
            </ul>
        </section>
    </div>

    <section class="card">
        <h2>Your Loan Applications</h2>
        @if (characterLoans$ | async; as loans) {
            <ul class="loan-list">
                @for (loan of loans; track loan.id) {
                    <li class="loan-item">
                        <div>
                            <strong>{{ loan.loanType | titlecase }} Loan</strong> - {{ loan.loanType === 'vehicle' ? loan.vehicleName : loan.starshipName }}
                            <div class="meta">Amount: {{ loan.amount }} credits</div>
                        </div>
                        <span class="status-badge" [class]="loan.status.toLowerCase()">{{ loan.status | titlecase }}</span>
                    </li>
                }
            </ul>
        }
    </section>
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
    .card {
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.welcome-banner {
    background: #f8f9fa;
    border: 4px solid #007bff;
}

.loan-list {
    list-style: none;
    padding: 0;
}

.loan-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
    border-bottom: 1px solid #eee;
}

.amount { font-size: 0.9rem; color: #666; display: block; }
.meta { font-size: 0.85rem; color: #888; }

/* Status Badges */
.status-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: bold;
}
.status-badge.pending { background: #fff3cd; color: #856404; }
.status-badge.approved { background: #d4edda; color: #155724; }
.status-badge.rejected { background: #f8d7da; color: #721c24; }

/* Buttons */
.btn-primary { background: #007bff; color: white; }
.btn-link { color: #007bff; text-decoration: none; font-weight: bold; }
.btn-link:hover { text-decoration: underline; }

`
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