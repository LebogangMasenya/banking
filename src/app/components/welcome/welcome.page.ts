import { Component } from "@angular/core";
@Component({
    selector: 'welcome-screen',
    template: `
        <div class="welcome-container">
            <h1>Welcome to Galactic Bank</h1>
            <p>Your trusted partner in interstellar finance.</p>
            <p>Explore our services, manage your accounts, and apply for loans with ease.</p>
            <p>Navigate through the galaxy of banking at your fingertips!</p>
        </div>
    `,
    style: `
        .welcome-container {
            text-align: center;
            padding: 50px;
            background: radial-gradient(circle, #1e3c72, #2a5298);
            color: white;
            border-radius: 15px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        }
        .welcome-container h1 {
            font-size: 3em;
            margin-bottom: 20px;
        }
        .welcome-container p {
            font-size: 1.5em;
            margin-bottom: 10px;
        }
    `
})
export class WelcomePage {
    

} 