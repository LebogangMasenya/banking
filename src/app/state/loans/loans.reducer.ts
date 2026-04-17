import { createReducer, on } from "@ngrx/store";
import { LoanState } from "../../models/loan.interface";
import { LoansActions } from "./loans.actions";
import { initialLoanState } from "../state";

export const loansReducer = createReducer(
    initialLoanState,
    on(LoansActions.approveVehicleLoan, (state, { characterName, vehicleName }) => ({
        ...state,
        loans: state.loans.map(loan => {
            if (loan.characterName === characterName && 'vehicleName' in loan && loan.vehicleName === vehicleName) {
                return { ...loan, status: 'approved' };
            }
            return loan;
        })
    })),
    on(LoansActions.approveStarshipLoan, (state, { characterName, starshipName }) => ({
        ...state,
        loans: state.loans.map(loan => {
            if (loan.characterName === characterName && 'starshipName' in loan && loan.starshipName === starshipName) {
                return { ...loan, status: 'approved' };
            }
            return loan;
        })
    })),
    on(LoansActions.rejectVehicleLoan, (state, { characterName, vehicleName }) => ({
        ...state,
        loans: state.loans.map(loan => {
            if (loan.characterName === characterName && 'vehicleName' in loan && loan.vehicleName === vehicleName) {
                return { ...loan, status: 'rejected' };
            }
            return loan;
        })
    })),
    on(LoansActions.rejectStarshipLoan, (state, { characterName, starshipName }) => ({
        ...state,
        loans: state.loans.map(loan => {
            if (loan.characterName === characterName && 'starshipName' in loan && loan.starshipName === starshipName) {
                return { ...loan, status: 'rejected' };
            }
            return loan;
        })
    })),
    on(LoansActions.updateLoanStatus, (state, { loanId, status }) => ({
        ...state,
        loans: state.loans.map(loan => {
            if (loan.id === loanId) {
                return { ...loan, status };
            }
            return loan;
        })
    }))
)