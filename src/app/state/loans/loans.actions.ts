import { createActionGroup, props } from "@ngrx/store";

export const LoansActions = createActionGroup({
    source: 'Loans',
    events: {
        'Approve Vehicle Loan': props<{ characterName: string; vehicleName: string }>(),
        'Approve Starship Loan': props<{ characterName: string; starshipName: string }>(),
        'Reject Vehicle Loan': props<{ characterName: string; vehicleName: string }>(),
        'Reject Starship Loan': props<{ characterName: string; starshipName: string }>(),
        'Update Loan Status': props<{ loanId: string, status: 'approved' | 'rejected' }>()
    }
})