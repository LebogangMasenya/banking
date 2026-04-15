import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CharacterAssets } from "../models/loan.interface";
// the magic of rxJs
import { map, forkJoin, switchMap, of } from "rxjs";
@Injectable({
    providedIn: 'root'
})
export class CharactersService {
    constructor(private http: HttpClient) { }

    getCharacterById(id: number) {
        return this.http.get(`https://swapi.info/api/people/${id}`);
    }

    getAllCharacters() {
    return this.http.get<any>(`https://swapi.info/api/people/`).pipe(
        switchMap((response: any) => {
            const characters = response.results;
            
            const characterObservables = characters.map((character: any) => {
                const vehicleUrls = character.vehicles || [];
                const starshipUrls = character.starships || [];
                
                // Handle empty arrays properly
                const vehiclesObservable = vehicleUrls.length 
                    ? forkJoin(vehicleUrls.map((url: string) => this.http.get<any>(url)))
                    : of([] as any[]); // Return empty array observable
                
                const starshipsObservable = starshipUrls.length 
                    ? forkJoin(starshipUrls.map((url: string) => this.http.get<any>(url)))
                    : of([] as any[]); // Return empty array observable
                
                // Now forkJoin with consistent observable types
                return forkJoin({
                    character: of(character),
                    vehicles: vehiclesObservable,
                    starships: starshipsObservable
                }).pipe(
                    
                );
            });
            
            return forkJoin(characterObservables);
        })
    );
}

private calculateCollateralValue(vehicles: any[], starships: any[]): number {
    const vehicleValue = vehicles.reduce((sum, v) => sum + (parseInt(v?.cost_credits) || 0), 0);
    const starshipValue = starships.reduce((sum, s) => sum + (parseInt(s?.cost_credits) || 0), 0);
    return vehicleValue + starshipValue;
}

    getCharacterVehicles(id: number) {
        return this.http.get(`https://swapi.info/api/people/${id}/vehicles`);
    }
}