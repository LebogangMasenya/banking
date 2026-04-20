import { getState, patchState, signalStore, watchState, withComputed, withHooks, withMethods, withProps, withState } from '@ngrx/signals'
import { initialCharacterState } from '../state'
import { StarshipLoan, VehicleLoan } from '../../models/loan.interface'
import { computed, effect } from '@angular/core'
import { CharactersService } from '../../services/characters.service'
import { LoanService } from '../../services/loan.service'
import { inject } from '@angular/core'
interface starshipPros {
    characterName: string,
    starshipName: string,
    amount?: number
}

interface vehicleProps {
    characterName: string,
    vehicleName: string,
    amount?: number
}

export const CharacterStore = signalStore(
    { providedIn: 'root' },
    withState(initialCharacterState),
    withMethods((store) => ({
        applyForStarshipLoan({ characterName, starshipName, amount }: starshipPros): void {

            patchState(store, (state) => ({
                loans: [...state.loans, {
                    id: crypto.randomUUID(),
                    characterName,
                    amount,
                    status: 'pending',
                    requestDate: new Date(),
                    loanType: 'starship',
                    starshipName
                } as StarshipLoan]
            }))
        },
        applyForVehicleLoan({ characterName, vehicleName, amount }: vehicleProps): void {
            patchState(store, (state) => ({
                loans: [...state.loans, {
                    id: crypto.randomUUID(),
                    characterName,
                    vehicleName,
                    amount,
                    status: 'pending',
                    requestDate: new Date(),
                    loanType: 'vehicle',
                } as VehicleLoan]
            }))
        },
        updateLoanStatus(loanId: string, status: 'pending' | 'approved' | 'rejected'): void {
            patchState(store, (state) => ({
                loans: state.loans.map((loan) => {
                    if (loan.id === loanId) {
                        return { ...loan, status };
                    }

                    return loan;
                })
            }))
        },
        characterLoanCount(characterName: string) {
            return store.loans().filter(name => name.characterName === characterName).length
        },
        approveVehicleLoan({ characterName, vehicleName }: vehicleProps) {
            patchState(store, (state) => ({
                loans: state.loans.map(loan => {
                    if (loan.characterName === characterName && 'vehicleName' in loan && loan.vehicleName === vehicleName) {
                        return { ...loan, status: 'approved' };
                    }
                    return loan;
                })
            }))
        },
        rejectVehicleLoan({ characterName, vehicleName }: vehicleProps) {
            patchState(store, (state) => ({
                loans: state.loans.map(loan => {
                    if (loan.characterName === characterName && 'vehicleName' in loan && loan.vehicleName === vehicleName) {
                        return { ...loan, status: 'rejected' };
                    }
                    return loan;
                })
            }))
        },
        doesLoanExist(characterName: string, loanType: 'vehicle' | 'starship', itemName: string) {
            return store.loans().some(loan => {
                if (loan.characterName !== characterName) return false;
                if (loan.loanType !== loanType) return false;
                if (loanType === 'vehicle' && 'vehicleName' in loan) {
                    return loan.vehicleName === itemName;
                }
                if (loanType === 'starship' && 'starshipName' in loan) {
                    return loan.starshipName === itemName;
                }
                return false;
            });
        },
        getAllCharacters() {
            
        }



    })),
    withComputed((store) => ({
        loansCount: computed(() => store.loans.length),
    })),
    withHooks({
        onInit(store) {
            const savedState = localStorage.getItem('app_state');
            if (savedState) {
                patchState(store, { loans: JSON.parse(savedState) });
            }

            watchState(store, (state) => {
                console.info("State was updated");
                localStorage.setItem("app_state", JSON.stringify(state.loans))
            })
        }
    }),
    withProps(() => ({
        charactersService: inject(CharactersService),
        loansService: inject(LoanService)
    }))
);