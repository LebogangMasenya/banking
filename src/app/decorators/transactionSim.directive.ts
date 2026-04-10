import { Directive, OnInit, OnDestroy, Output, EventEmitter } from "@angular/core";
import { Transaction } from "../models/bank.interface";
import { Subscription, interval } from "rxjs";

// interval is a function that creates an Observable that emits sequential numbers every specified interval of time. In this case, it will emit a number every 5000 milliseconds (5 seconds).
@Directive({
    selector: '[transactionSim]',
    standalone: true
})
export class TransactionSimDirective implements OnInit, OnDestroy {
    @Output() newTransaction = new EventEmitter<Transaction>();


    private timerSubscription?: Subscription;
    ngOnInit() {
        const source = interval(5000);

        this.timerSubscription = source.subscribe(() => {
            const mockTransaction = {
                date: new Date().toISOString(),
                description: 'Mock Transaction',
                amount: Math.floor(Math.random() * 1000) - 500 // Random amount between -500 and +500
            };

            this.newTransaction.emit(mockTransaction);
        });
    }

    ngOnDestroy() {
        if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
        }
    }
}   
