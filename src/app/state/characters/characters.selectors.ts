import { createSelector } from "@ngrx/store";
import { selectAllLoans } from "../loans/loans.selectors";

export const selectCharacterLoans = (characterName: string) => createSelector(selectAllLoans, (loans) => loans.filter(loan => loan.characterName === characterName));
export const selectCharacterVehicleLoans = (characterName: string) => createSelector(selectCharacterLoans(characterName), (loans) => loans.filter(loan => loan.loanType === 'vehicle'));
export const selectCharacterStarshipLoans = (characterName: string) => createSelector(selectCharacterLoans(characterName), (loans) => loans.filter(loan => loan.loanType === 'starship'));

export const selectCharacterPendingLoans = (characterName: string) => createSelector(selectCharacterLoans(characterName), (loans) => loans.filter(loan => loan.status === 'pending'));
export const selectCharacterApprovedLoans = (characterName: string) => createSelector(selectCharacterLoans(characterName), (loans) => loans.filter(loan => loan.status === 'approved'));
export const selectCharacterRejectedLoans = (characterName: string) => createSelector(selectCharacterLoans(characterName), (loans) => loans.filter(loan => loan.status === 'rejected'));