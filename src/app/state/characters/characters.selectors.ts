import { createSelector, createFeatureSelector } from "@ngrx/store";
import { LoanState } from "../../models/loan.interface";
export const selectCharacterLoansState = createFeatureSelector<LoanState>('characterloansstore');
export const selectAllCharacterLoans = createSelector(selectCharacterLoansState, (state: LoanState) => state.loans || []);
export const selectCharacterLoans = (characterName: string) => createSelector(selectAllCharacterLoans, (characterLoansState) => characterLoansState.filter(loan => loan.characterName === characterName));
export const selectCharacterVehicleLoans = (characterName: string) => createSelector(selectCharacterLoans(characterName), (loans) => loans.filter(loan => loan.loanType === 'vehicle'));
export const selectCharacterStarshipLoans = (characterName: string) => createSelector(selectCharacterLoans(characterName), (loans) => loans.filter(loan => loan.loanType === 'starship'));

export const selectCharacterPendingLoans = (characterName: string) => createSelector(selectCharacterLoans(characterName), (loans) => loans.filter(loan => loan.status === 'pending'));
export const selectCharacterApprovedLoans = (characterName: string) => createSelector(selectCharacterLoans(characterName), (loans) => loans.filter(loan => loan.status === 'approved'));
export const selectCharacterRejectedLoans = (characterName: string) => createSelector(selectCharacterLoans(characterName), (loans) => loans.filter(loan => loan.status === 'rejected'));