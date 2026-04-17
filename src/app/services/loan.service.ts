import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, switchMap } from "rxjs";
@Injectable({
    providedIn: 'root'
})
export class LoanService {
    constructor(private http: HttpClient) { }

    getVehicleLoanOptions() {
    return this.http.get<any[]>(`https://swapi.info/api/vehicles`).pipe(
        map((response) => response.map((vehicle: any) => ({
            name: vehicle.name,
            model: vehicle.model,
            manufacturer: vehicle.manufacturer,
            // Guard against "unknown" values in the API
            loanAmount: isNaN(parseFloat(vehicle.cost_in_credits)) 
                ? 0 
                : parseFloat(vehicle.cost_in_credits) / 1000
        })))
    );
}

getStarshipLoanOptions() {
    return this.http.get<any[]>(`https://swapi.info/api/starships`).pipe(
        map((response) => response.map((starship: any) => ({
            name: starship.name,
            model: starship.model,
            manufacturer: starship.manufacturer,
            loanAmount: isNaN(parseFloat(starship.cost_in_credits)) 
                ? 0 
                : parseFloat(starship.cost_in_credits) / 1000
        })))
    );
}

    isWithinWorkingHours() {
        const now = new Date();
        const day = now.getDay(); // 0 (Sunday) to 6 (Saturday)
        const hour = now.getHours();

        // Assuming working hours are Monday to Friday, 9am to 5pm
        return day >= 1 && day <= 5 && hour >= 9 && hour < 17;
    }
}