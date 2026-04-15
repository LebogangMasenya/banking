import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChildFn, CanDeactivateFn , CanMatchFn} from "@angular/router";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";
import { BankAccount } from "../components/bankAccount/bankAccount.component";
import { Route, UrlSegment } from "@angular/router";
import { LoanService } from "../services/loan.service";

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const authService = inject(AuthService);
  return authService.getAuthStatus();
};

export const clientChildGuard: CanActivateChildFn = (
  childRoute: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const authService = inject(AuthService);
  return authService.getUserRole() === 'client';
};

export const lowBalanceGuard: CanDeactivateFn<BankAccount> = (
  component: BankAccount,
  currentRoute: ActivatedRouteSnapshot,
  currentState: RouterStateSnapshot,
  nextState: RouterStateSnapshot,
) => {
  return component.accountInfo && component.accountInfo.balance < 1000 ? confirm('you are running low on funds, are you sure you want to leave?') : true;
};


export const featureToggleGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
    const loanService = inject(LoanService);
    return loanService.isWithinWorkingHours();
};