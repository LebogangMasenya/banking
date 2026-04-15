import { Component } from "@angular/core";
@Component({
    selector: 'not-found',
    template: `
        <h1>404 - Not Found</h1>
        <p>The page you are looking for does not exist.</p>
    `,
    styles: `
        h1 {
            color: red;
        }
        p {
            font-size: 18px;
        }
    `   
})
export class NotFoundComponent {

}