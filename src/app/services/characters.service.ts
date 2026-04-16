import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CharacterAssets } from "../models/loan.interface";
import { Character } from "../models/user.model";
import { Observable } from "rxjs";
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

getAllCharacters(): Observable<Character[]> {
  return this.http.get<any[]>(`https://swapi.info/api/people/`).pipe(
    switchMap((characters) => {
      // If no characters, return empty array immediately
      if (!characters.length) return of([]);

      // Map each character to an observable that resolves its full data
      const detailObservables = characters.map(character => this.hydrateCharacter(character));
      
      return forkJoin(detailObservables);
    })
  );
}

private hydrateCharacter(character: any): Observable<Character> {
  const vehicleRequests = (character.vehicles || []).map((url: string) => this.http.get(url));
  const starshipRequests = (character.starships || []).map((url: string) => this.http.get(url));

  return forkJoin({
    vehicles: vehicleRequests.length ? forkJoin(vehicleRequests) : of([]),
    starships: starshipRequests.length ? forkJoin(starshipRequests) : of([])
  }).pipe(
    map(({ vehicles, starships }) => ({
      ...character,
      id: character.url.split('/').filter(Boolean).pop(), // Extract ID
      vehicles,
      starships
    }))
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