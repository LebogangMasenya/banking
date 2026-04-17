import { createSelector, createFeatureSelector} from "@ngrx/store";
import { LoanState } from "../../models/loan.interface";

export const selectLoansState =  createFeatureSelector<LoanState>('loanstore');

export const selectAllLoans = createSelector(selectLoansState, (state: LoanState) => state.loans);

export const selectStarshipLoans = createSelector(selectAllLoans, (loans) => loans.filter(loan => loan.loanType === 'starship'));

export const selectVehicleLoans = createSelector(selectAllLoans, (loans) => loans.filter(loan => loan.loanType === 'vehicle'));

export const selectPendingLoans = createSelector(selectAllLoans, (loans) => loans.filter(loan => loan.status === 'pending'));

export const selectApprovedLoans = createSelector(selectAllLoans, (loans) => loans.filter(loan => loan.status === 'approved'));

export const selectRejectedLoans = createSelector(selectAllLoans, (loans) => loans.filter(loan => loan.status === 'rejected'));