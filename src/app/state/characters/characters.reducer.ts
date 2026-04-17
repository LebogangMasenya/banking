import { Action, createReducer, on } from "@ngrx/store";
import { LoanState, StarshipLoan, VehicleLoan } from "../../models/loan.interface";
import { applyForStarshipLoan, applyForVehicleLoan, updateLoanStatus } from './characters.actions'

export const initialLoanState: LoanState = {
    loans: [],
    loading: false,
    error: null
}


export const characterLoansReducer = createReducer(
    initialLoanState,
    on(applyForStarshipLoan, (state, { characterName, starshipName, amount }) => ({
        ...initialLoanState,
        loans: [...state.loans, {
            id: crypto.randomUUID(),
            characterName,
            amount,
            status: 'pending',
            requestDate: new Date(),
            loanType: 'starship',
            starshipName
        } as StarshipLoan]
    })),
    on(applyForVehicleLoan, (state, { characterName, vehicleName, amount }) => ({
        ...initialLoanState,
        loans: [...state.loans, {
            id: crypto.randomUUID(),
            characterName,
            vehicleName,
            amount,
            status: 'pending',
            requestDate: new Date(),
            loanType: 'vehicle',
        } as VehicleLoan]
    })),
    on(updateLoanStatus, (state, {loanId, status }) => ({
        ...initialLoanState,
        loans: state.loans.map((loan) => {
            if (loan.id === loanId) {
                loan.status = status;
            }

            return loan;
        })
    }))
)