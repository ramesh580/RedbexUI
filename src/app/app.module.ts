import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';  
import { jqxButtonComponent } from 'node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxbuttons';
import { jqxWindowComponent } from 'node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxwindow';
import { LoginComponent } from './Modules/login/login.component';
import {RouterModule } from '@angular/router'
import { appRoutes } from './routes';
import { DashboardComponent } from './Modules/dashboard/dashboard.component';
import {FormsModule } from '@angular/forms' 
import { AuthenticationService } from './Shared/Services/Authentication/authentication.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './Auth/auth.guard';
import { UserService } from './Shared/Services/User/user.service';
import { AuthInterceptor } from './Auth/auth.interceptor';
import { jqxRibbonComponent } from 'node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxribbon';

import { jqxDropDownButtonComponent } from 'node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxdropdownbutton';
import { jqxDockingLayoutComponent } from 'node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxdockinglayout';
import { UsersViewComponent } from './Modules/dashboard/ContentAndStructure/users-view/users-view.component';
import { FeatureExplorerViewComponent } from './Modules/dashboard/ContentAndStructure/feature-explorer-view/feature-explorer-view.component';
import { ViewExplorerViewComponent } from './Modules/dashboard/ContentAndStructure/view-explorer-view/view-explorer-view.component';
import { DomainExplorerViewComponent } from './Modules/dashboard/ContentAndStructure/domain-explorer-view/domain-explorer-view.component'; 
import { MapViewComponent } from './Modules/dashboard/Presentation/map-view/map-view.component';
import { ReportViewComponent } from './Modules/dashboard/Presentation/report-view/report-view.component';
import { jqxListBoxComponent } from 'node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxlistbox';

@NgModule({
  declarations: [
    AppComponent,jqxButtonComponent,jqxWindowComponent, LoginComponent, DashboardComponent,
    jqxRibbonComponent,jqxDropDownButtonComponent, jqxDockingLayoutComponent, UsersViewComponent,MapViewComponent,ReportViewComponent,jqxListBoxComponent,
     FeatureExplorerViewComponent, ViewExplorerViewComponent, DomainExplorerViewComponent],
  imports: [
    BrowserModule,FormsModule,
    AppRoutingModule,    
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ AuthenticationService, AuthGuard, UserService
  ,{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})



export class AppModule { }
