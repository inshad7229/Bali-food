import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpModule, Http, JsonpModule } from "@angular/http";
import { MatInputModule } from '@angular/material';
import { MatChipsModule,MatSelectModule,MatButtonModule, MatCheckboxModule,MatSlideToggleModule,MatProgressBarModule,MatDatepickerModule,MatSnackBarModule,
           MatDialogModule,MatTabsModule,MatSortModule,MatProgressSpinnerModule ,MatExpansionModule} from '@angular/material';
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
import { SelectUserComponent } from './popups/select-user/select-user.component';
import { RecipeServicesService } from './providers/recipe-services.service';
import { SpecificUsersComponent } from './popups/specific-users/specific-users.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppProvider } from './providers/app';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { CustomOption } from './custom-option';
import { ToastOptions } from 'ng2-toastr';
import { ConfirmationBoxComponent } from './popups/confirmation-box/confirmation-box.component';
import { SuccessComponent } from './dialogs/success/success.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FaqComponent } from './faq/faq.component';
import { AuthGuard } from './security/auth.guard';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddFaqComponent } from './popups/add-faq/add-faq.component';
import { CommentManagementComponent } from './recipe-management/comment-management/comment-management.component';

// import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
// import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
// import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
// import { PerfectScrollbarModule } from 'angular2-perfect-scrollbar';

// const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
//   suppressScrollX: true
// };

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
    ConfirmationBoxComponent,
    SuccessComponent,
    ContactUsComponent,
    FaqComponent,
    AddFaqComponent,
    CommentManagementComponent
  ],
  imports: [
  NgxPaginationModule,
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
    MatExpansionModule,
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
    MatSelectModule,
    MatChipsModule,
    // MDBBootstrapModule.forRoot(),
    NgbModule.forRoot(),
    ToastModule.forRoot()
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [ AuthGuard,{provide:ToastOptions,useClass:CustomOption},WebsocketService,RecipeServicesService,AppProvider],
  bootstrap: [AppComponent],
  entryComponents:[AddFaqComponent,SuccessComponent,ConfirmationBoxComponent,SpecificUsersComponent,SelectUserComponent,InstructionsComponent,AddCategoryComponent,UserlistComponent,IngredientsComponent,DialogComponent,PasswordDialogComponent]
})
export class AppModule { }
