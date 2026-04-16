import {createAction, props} from '@ngrx/store'

export const applyForVehicleLoan = createAction(
    '[Loan Office] Apply Vehicle Loan',
    props<{ characterName: string; vehicleName: string; amount: number }>() 
);

export const applyForStarshipLoan = createAction(
    '[Loan Office] Apply Starship Loan',
    props<{ characterName: string; starshipName: string; amount: number }>() 
);

// Action for the Loan Officer
export const updateLoanStatus = createAction(
    '[Loan Office] Update Status',
    props<{ loanId: string, status: 'approved' | 'rejected' }>()
);