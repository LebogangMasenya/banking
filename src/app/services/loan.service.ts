import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, switchMap } from "rxjs";
@Injectable({
    providedIn: 'root'
})
export class LoanService {
    constructor(private http: HttpClient) { }

    getVehicleLoanOptions() {
        return this.http.get(`https://swapi.info/api/vehicles/`).pipe(
            map((response: any) => response.results.map((vehicle: any) => ({
                name: vehicle.name,
                model: vehicle.model,
                manufacturer: vehicle.manufacturer,
                loanAmount: parseFloat(vehicle.cost_in_credits) / 1000 // Simplified logic for loan amount
            })))
        );
    }

    getStarshipLoanOptions() {
        return this.http.get(`https://swapi.info/api/starships/`).pipe(
            map((response: any) => response.results.map((starship: any) => ({
                name: starship.name,
                model: starship.model,
                manufacturer: starship.manufacturer,
                loanAmount: parseFloat(starship.cost_in_credits) / 1000 // Simplified logic for loan amount
            })))
        );
    }

    // working hours
    isWithinWorkingHours() {
        const now = new Date();
        const day = now.getDay(); // 0 (Sunday) to 6 (Saturday)
        const hour = now.getHours();

        // Assuming working hours are Monday to Friday, 9am to 5pm
        return day >= 1 && day <= 5 && hour >= 9 && hour < 17;
    }
}