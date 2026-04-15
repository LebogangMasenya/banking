import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isAuthenticated = false;
    private userRole: 'client' | 'loanOfficer' | null = null;

    getAuthStatus() {
        return this.isAuthenticated;
    }

    getUserRole() {
        return this.userRole;
    }
}