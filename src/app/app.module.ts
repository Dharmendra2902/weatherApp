import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainFrameComponent } from './main-frame/main-frame.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http'

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartComponent } from './chart/chart.component'
import { ChartModule } from 'angular-highcharts';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MainFrameComponent,
    ChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    ChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
