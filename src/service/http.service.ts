import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private http: HttpClient) {}

  registerUser(name: String, amount: Number) {
    return this.http.post(`${environment.baseUrl}/api/setup`, {
      name,
      amount,
    });
  }

  fetchWalletDetails(id: String) {
    return this.http.get(`${environment.baseUrl}/api/wallet/${id}`);
  }

  transaction(id:String,amount:number,description:string) {
    return this.http.post(`${environment.baseUrl}/api/transact/${id}`,{
      description,
      amount,
    });
  }

  fetchTransactions(walletId:any,skip:any=0,limit:any=10,filter:string) {
    const params = new HttpParams()
    .set('walletId', walletId)
    .set('skip', skip.toString())
    .set('limit', limit.toString())
    .set('filter', filter.toString());

    return this.http.get(`${environment.baseUrl}/api/transactions`,{params});
  }
}
