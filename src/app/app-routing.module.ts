import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetupPageComponent } from './pages/setup-page/setup-page.component';
import { TableComponent } from './pages/table/table.component';

const routes: Routes = [
  { path: '', component: SetupPageComponent },
  { path: 'transactions', component: TableComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
