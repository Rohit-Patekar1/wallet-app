import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SetupPageComponent } from './pages/setup-page/setup-page.component';
import { HttpClientModule } from '@angular/common/http';
import { TableComponent } from './pages/table/table.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { SnackbarService } from 'src/service/snackbar.service';
import { LoaderComponent } from './loader/loader.component';
import { LoadingService } from 'src/service/loader.service';
import { RestrictDecimalsDirective } from './restrict-decimal.directive';


@NgModule({
  declarations: [
    AppComponent,
    SetupPageComponent,
    TableComponent,
    SnackbarComponent,
    LoaderComponent,
    RestrictDecimalsDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [SnackbarService,LoadingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
