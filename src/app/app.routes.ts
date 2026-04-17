import { Routes } from '@angular/router';
import { ClientPortalComponent } from './components/clientPortal/clientPortal.component';
import { LoanOfficeComponent } from './components/loanOffice/loanOffice.component';
import { NotFoundComponent } from './components/not-found/not-found';
import { BankScreen } from './components/bankScreen/bankScreen.component';
import { WelcomePage } from './components/welcome/welcome.page';
import { authGuard, clientChildGuard, lowBalanceGuard, featureToggleGuard } from './guard/route-guard';
export const routes: Routes = [
    {path: '', redirectTo: 'welcome', pathMatch: 'full'},
    {path: 'welcome', component: WelcomePage},
    { path: 'client-portal', component: ClientPortalComponent},
    { path: 'loan-office', component: LoanOfficeComponent, canMatch: [featureToggleGuard]},
    { path: 'home', component: BankScreen, canActivate: [authGuard], canDeactivate: [lowBalanceGuard], 
        children: []},
    {
        path: '**',
        component: NotFoundComponent
    }
];
