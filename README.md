# WalletApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.6.
Authentication is not implemented as mentioned in the task hence no routes are protected and auth guard is not implemented
Clone this repository, run `npm i` and finally `npm start`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Frontend Overview

The Wallet App frontend consists of three main pages, each designed to provide a seamless and intuitive user experience.

### Landing Page - Account Setup

![Landing Page](https://wallet-app-7pdd.vercel.app/)

The landing page serves as the entry point for new users to set up their wallet account. Here, users can enter their desired username and an initial amount to get started with their wallet.

- **Username Field**: Where new users can choose a unique username for their account.
- **Initial Amount Field**: Users can optionally provide an initial deposit amount to fund their wallet upon account creation.
- **Create Account Button**: After filling out the form, users can submit their details and create their wallet account.

### Wallet Page - Balance and Transactions

![Wallet Page](https://wallet-app-7pdd.vercel.app/)

Once the account is set up, users are directed to the wallet page. This page is the hub for managing finances within the app.

- **Welcome Message**: Greeting the user with their name for a personal touch.
- **Total Balance Display**: Shows the current balance in the user's wallet.
- **Debit/Credit Transaction Buttons**: Users can perform transactions by specifying an amount and selecting either debit or credit.
- **View Transactions Link**: A navigation link that takes users to the transaction history page.

### Transaction History Page 

[Transaction History  Page](https://wallet-app-7pdd.vercel.app/transactions)
The transaction history page provides users with a detailed log of all their transactions.

- **Transaction Table**: Lists all transactions along with their details such as date, balance, amount, type, and remarks.
- **Download CSV Button**: Allows users to export their transaction history as a CSV file.
- **Pagination Controls**: Users can navigate through their transaction history across multiple pages.

