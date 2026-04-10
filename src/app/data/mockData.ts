import {type  BankAccountModel } from "../models/bank.interface";


export const accountData: BankAccountModel[] = [
    {
        title: "Savings Account",
        balance: 1000,
        cardColor: "blue",
        currency: 'R',
        isActive: true,
        transactions: [
            { date: '2024-01-01', description: 'Initial Deposit', amount: 1000 },
            { date: '2024-02-15', description: 'Grocery Shopping', amount: -150 },
            { date: '2024-03-10', description: 'Salary Deposit', amount: 2000 },
            { date: '2024-04-05', description: 'Electricity Bill', amount: -100 }
        ]
    },
    {
        title: "Checking Account",
        balance: 500,
        cardColor: "green",
        currency: '$',
        isActive: false,
          transactions: [
            { date: '2024-01-01', description: 'Initial Deposit', amount: 1000 },
            { date: '2024-02-15', description: 'Grocery Shopping', amount: -150 },
            { date: '2024-03-10', description: 'Salary Deposit', amount: 2000 },
            { date: '2024-04-05', description: 'Electricity Bill', amount: -100 }
        ]
    },
    {
        title: "Credit Account",
        balance: -200,
        cardColor: "red",
        currency: '$',
        isActive: true,
          transactions: [
            { date: '2024-03-10', description: 'Salary Deposit', amount: 2000 },
            { date: '2024-04-05', description: 'Electricity Bill', amount: -100 }
        ]
    },
    {
        title: "Investment Account",
        balance: 2000,
        cardColor: "purple",
        currency: 'R',
        isActive: true,
          transactions: [
            { date: '2024-01-01', description: 'Initial Deposit', amount: 1000 },
            { date: '2024-02-15', description: 'Grocery Shopping', amount: -150 },
            { date: '2024-04-05', description: 'Electricity Bill', amount: -100 }
        ]

    },
        {
        title: "Travel Account",
        balance: 100,
        cardColor: "purple",
        currency: 'EUR',
        isActive: true,
          transactions: [
            { date: '2024-01-01', description: 'Initial Deposit', amount: 1000 },
            { date: '2024-02-15', description: 'Grocery Shopping', amount: -150 },
            { date: '2024-04-05', description: 'Electricity Bill', amount: -100 }
        ]

    },
          {
        title: "STEM Savings",
        balance: 100,
        cardColor: "purple",
        currency: 'R',
        isActive: true,
          transactions: [
            { date: '2024-01-01', description: 'Initial Deposit', amount: 1000 },
            { date: '2024-02-15', description: 'Grocery Shopping', amount: -150 },
            { date: '2024-04-05', description: 'Electricity Bill', amount: -100 }
        ]

    }


];