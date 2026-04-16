export interface CharacterAssets {
    character: any;
    vehicles: any[];
    starships: any[];
}

export interface BaseLoan {
    id: string; // Unique GUID for the loan itself
    characterName: string;
    amount: number;
    status: 'pending' | 'approved' | 'rejected';
    requestDate: Date;
}

export interface VehicleLoan extends BaseLoan {
    loanType: 'vehicle';
    vehicleName: string;
}

export interface StarshipLoan extends BaseLoan {
    loanType: 'starship';
    starshipName: string;
}

// A Union type for the state array
export type GalacticLoan = VehicleLoan | StarshipLoan;

export interface LoanState {
    loans: GalacticLoan[];
    loading: boolean;
    error: string | null;
}