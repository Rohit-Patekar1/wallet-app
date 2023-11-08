import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/service/http.service';
import { SnackbarService } from 'src/service/snackbar.service';
import { AmountFilter, DateFilter } from 'src/utils';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  transactionsData: any = [];
  pageCount: number = 1;
  totalPages: number = 1;
  filters: string = DateFilter.EARLIEST;
  constructor(
    private backendService: BackendService,
    private readonly router: Router,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.backendService
      .fetchTransactions(
        localStorage.getItem('walletId')!,
        0,
        10,
        'date_earliest'
      )
      .subscribe(
        (response: any) => {
          this.transactionsData = response.transactions;
          this.totalPages = Math.ceil(response.total / 10);
        },
        (error) => {
          this.snackbarService.showSnackbar(error.error.message,'error')
          console.error('Error:', error);
        }
      );
  }

  next() {
    if (this.pageCount !== this.totalPages) {
      this.pageCount++;
      this.fetchTransaction(this.filters);
    }
  }

  previous() {
    if (this.pageCount !== 1) {
      this.pageCount--;
      this.fetchTransaction(this.filters);
    }
  }

  applySort(option: string) {
    switch (option) {
      case AmountFilter.HIGHEST:
        this.fetchTransaction(AmountFilter.HIGHEST);
        break;
      case AmountFilter.LOWEST:
        this.fetchTransaction(AmountFilter.LOWEST);
        break;
      case DateFilter.LATEST:
        this.fetchTransaction(DateFilter.LATEST);
        break;
      case DateFilter.EARLIEST:
        this.fetchTransaction(DateFilter.EARLIEST);
        break;
      default:
    }
  }

  fetchTransaction(filter: string) {
    this.filters = filter;
    this.backendService
      .fetchTransactions(
        localStorage.getItem('walletId')!,
        this.pageCount * 10,
        10,
        this.filters
      )
      .subscribe(
        (response: any) => {
          this.transactionsData = response.transactions;
          this.totalPages = Math.ceil(response.total / 10);
        },
        (error) => {
          this.snackbarService.showSnackbar(error.error.message,'error')
          console.error('Error:', error);
        }
      );
  }
  downloadCSV() {
    const csvString = this.convertToCSV(this.transactionsData);
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'transactions.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  goBack(){
    this.router.navigate(['/']);
  }

  convertToCSV(objArray: any[]): string {
    const array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = '';

    for (let index in objArray[0]) {
      row += index + ',';
    }
    row = row.slice(0, -1); 
    str += row + '\r\n';

    for (let i = 0; i < array.length; i++) {
      let line = '';
      for (let index in array[i]) {
        if (line != '') line += ',';

        line += array[i][index];
      }
      str += line + '\r\n';
    }
    return str;
  }
}
