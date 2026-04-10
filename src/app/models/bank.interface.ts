

export interface BankAccountModel {
    title: string,
    balance: number,
    cardColor: string,
    currency: string,
    isActive: boolean ,
    transactions? : Transaction[]
}

export interface Transaction {
    date: string,
    description: string,
    amount: number,
}