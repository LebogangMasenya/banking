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

    // mock login function
    login(role: 'client' | 'loanOfficer') {
        this.isAuthenticated = true;
        this.userRole = role;
    }

    logout() {
        this.isAuthenticated = false;
        this.userRole = null;
    }
}