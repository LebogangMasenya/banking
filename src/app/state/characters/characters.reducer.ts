import { Action, createReducer, on } from "@ngrx/store";
import { LoanState, StarshipLoan, VehicleLoan } from "../../models/loan.interface";
import { applyForStarshipLoan, applyForVehicleLoan, updateLoanStatus } from './characters.actions'

import { initialCharacterState } from "../state";
export const characterLoansReducer = createReducer(
    initialCharacterState,
    on(applyForStarshipLoan, (state, { characterName, starshipName, amount }) => ({
        ...initialCharacterState,
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
        ...initialCharacterState,
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
        ...initialCharacterState,
        loans: state.loans.map((loan) => {
            if (loan.id === loanId) {
                return { ...loan, status };
            }

            return loan;
        })
    }))
)