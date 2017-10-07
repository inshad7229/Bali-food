import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpModule, Http, JsonpModule } from "@angular/http";
import { MdInputModule } from '@angular/material';
import { MdButtonModule, MdCheckboxModule,MdSlideToggleModule,MdProgressBarModule,MdDatepickerModule,MdSnackBarModule,
       MdDialogModule,MdTabsModule,MdSortModule } from '@angular/material';

import {ColorPickerModule} from 'angular4-color-picker';
import { FileSelectDirective } from 'ng2-file-upload';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { UserMangementComponent } from './user-mangement/user-mangement.component';
import { RecipeMangementComponent } from './recipe-mangement/recipe-mangement.component';
import { ReportManagementComponent } from './report-management/report-management.component';
import { GeneralManagementComponent } from './general-management/general-management.component';
import { ContentManagementComponent } from './content-management/content-management.component';
import { DialogComponent } from './dialogs/dialog/dialog.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { PasswordDialogComponent } from './dialogs/password-dialog/password-dialog.component';
import { WebsocketService} from './recipe-mangement/websocket.service'



@NgModule({
  declarations: [
    UserMangementComponent,
    AppComponent,
    LoginComponentComponent,
    DashboardComponent,
    FooterComponent,
    FileSelectDirective,
    SidebarComponent,
    NavbarComponent,
    RecipeMangementComponent,
    ReportManagementComponent,
    GeneralManagementComponent,
    ContentManagementComponent,
    DialogComponent,
    DeleteUserComponent,
    PasswordDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MdButtonModule,
    MdCheckboxModule,
    MdSlideToggleModule,
    MdDatepickerModule,
    MdProgressBarModule,
    MdSnackBarModule,
    MdDialogModule,
    MdTabsModule,
    MdSortModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    DashboardModule,
    MdInputModule,
    ColorPickerModule
 

  ],
  providers: [WebsocketService],
  bootstrap: [AppComponent],
  entryComponents:[DialogComponent,PasswordDialogComponent]
})
export class AppModule { }
