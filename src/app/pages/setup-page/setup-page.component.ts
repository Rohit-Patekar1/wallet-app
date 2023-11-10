import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/service/http.service';
import { SnackbarService } from 'src/service/snackbar.service';

@Component({
  selector: 'app-setup-page',
  templateUrl: './setup-page.component.html',
  styleUrls: ['./setup-page.component.css'],
})
export class SetupPageComponent implements OnInit {
  username: string = '';
  balance: number = 0;
  isUserLoggedIn: string = 'false';
  remarks: string = '';
  amount: number =0;
  transactionType: string = 'debit';
  showCreditDropdown: boolean = false;
  showDebitDropdown: boolean = false;
  isLoading = false;

  constructor(
    private backendService: BackendService,
    private readonly router: Router,
    private snackbarService: SnackbarService,
  ) {}

  ngOnInit(): void {
    this.isUserLoggedIn = localStorage.getItem('walletUser')!;
    if (this.isUserLoggedIn) {
      this.isLoading = true;
      this.backendService
        .fetchWalletDetails(localStorage.getItem('walletId')!)
        .subscribe(
          (response: any) => {
            this.username = response.walletData.name;
            this.balance = response.walletData.balance;
            this.isLoading = false;
          },
          (error) => {
            this.isLoading = false;
            this.snackbarService.showSnackbar(error.error.message, 'error');
            console.error('Error:', error.error.message);
          }
        );
    }
  }

  saveWallet() {
    this.balance=this.amount
    this.backendService.registerUser(this.username, this.amount).subscribe(
      (response: any) => {
        localStorage.setItem('walletUser', 'true');
        localStorage.setItem('walletId', response.id);
        this.isUserLoggedIn = 'true';
        this.snackbarService.showSnackbar('Account created successfully!', 'success');
      },
      (error) => {
        this.isLoading = false;
        this.snackbarService.showSnackbar(error.error.message, 'error');
        console.error('Error:', error);
      }
    );
  }

  toggleDropdown(transactionType: string): void {
    if (transactionType == 'credit') {
      this.showCreditDropdown = !this.showCreditDropdown;
      this.showDebitDropdown=false
    } else {
      this.showDebitDropdown = !this.showDebitDropdown;
      this.showCreditDropdown=false
    }
  }

  doTransaction(type: string) {
    this.isLoading = true;
    if (type == 'debit') this.amount = -this.amount;
    this.backendService
      .transaction(localStorage.getItem('walletId')!, this.amount, this.remarks)
      .subscribe(
        (response: any) => {
          this.balance = response.balance;
          this.snackbarService.showSnackbar('Transaction successful','success')
          this.isLoading = false;
        },
        (error) => {
          this.snackbarService.showSnackbar(error.error.message,'error')
          console.error('Error:', error.error.message);
        }
      );
    this.amount = 0;
    this.remarks = '';
  }

  closeDropdown(): void {
    this.showCreditDropdown = false;
  }

  fetchTransaction() {
     this.router.navigate(['/transactions']);
  }
}
