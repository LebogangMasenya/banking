import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isAuthenticated = false;
    private userRole: 'client' | 'loanOfficer' | null = null;
    private authStatusSubject = new BehaviorSubject<{ isAuthenticated: boolean, userRole: 'client' | 'loanOfficer' | null }>({ isAuthenticated: this.isAuthenticated, userRole: this.userRole });
    userRole$ = this.authStatusSubject.asObservable();  
    getAuthStatus() {
        return this.isAuthenticated;
    }

    getUserRole() {
       return this.authStatusSubject.value.userRole;

    }

    // mock login function
    login(role: 'client' | 'loanOfficer') {
        this.isAuthenticated = true;
        this.authStatusSubject.next({ isAuthenticated: this.isAuthenticated, userRole: role });
        this.userRole = role;
    }

    logout() {
        this.isAuthenticated = false;
        this.userRole = null;
        this.authStatusSubject.next({ isAuthenticated: this.isAuthenticated, userRole: this.userRole });
    }
}