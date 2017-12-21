import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpModule, Http, JsonpModule } from "@angular/http";
import { MatInputModule } from '@angular/material';
import { MatSelectModule,MatButtonModule, MatCheckboxModule,MatSlideToggleModule,MatProgressBarModule,MatDatepickerModule,MatSnackBarModule,
       MatDialogModule,MatTabsModule,MatSortModule,MatProgressSpinnerModule } from '@angular/material';
import { MDBBootstrapModule } from 'angular-bootstrap-md';           
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
import { WebsocketService} from './recipe-mangement/websocket.service';
import { ViewRecipesComponent } from './recipe-management/view-recipes/view-recipes.component';
import { AddRecipeComponent } from './recipe-management/add-recipe/add-recipe.component';
import { AddCategoriesComponent } from './recipe-management/add-categories/add-categories.component';
import { IngredientsComponent } from './popups/ingredients/ingredients.component';
import { UserlistComponent } from './popups/userlist/userlist.component';
import { AddCategoryComponent } from './popups/add-category/add-category.component';
import { InstructionsComponent } from './popups/instructions/instructions.component'
import { DateTimePickerModule} from 'ngx-datetime-picker';
import { SelectUserComponent } from './popups/select-user/select-user.component';
import { RecipeServicesService } from './providers/recipe-services.service';
import { SpecificUsersComponent } from './popups/specific-users/specific-users.component'



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
    ViewRecipesComponent,
    AddRecipeComponent,
    AddCategoriesComponent,
    IngredientsComponent,
    UserlistComponent,
    AddCategoryComponent,
    InstructionsComponent,
    SelectUserComponent,
    SpecificUsersComponent,
  ],
  imports: [
    DateTimePickerModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTabsModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    DashboardModule,
    MatInputModule,
    ColorPickerModule,
    MatSelectModule,
    MDBBootstrapModule.forRoot()
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [WebsocketService,RecipeServicesService],
  bootstrap: [AppComponent],
  entryComponents:[SpecificUsersComponent,SelectUserComponent,InstructionsComponent,AddCategoryComponent,UserlistComponent,IngredientsComponent,DialogComponent,PasswordDialogComponent]
})
export class AppModule { }
