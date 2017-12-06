import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponentComponent } from './login-component/login-component.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserMangementComponent } from './user-mangement/user-mangement.component';
import { RecipeMangementComponent } from './recipe-mangement/recipe-mangement.component';
import { ReportManagementComponent } from './report-management/report-management.component'
import { FooterComponent } from './footer/footer.component';
import { GeneralManagementComponent} from './general-management/general-management.component';
import { ContentManagementComponent } from './content-management/content-management.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { ViewRecipesComponent } from './recipe-management/view-recipes/view-recipes.component';
import { AddRecipeComponent } from './recipe-management/add-recipe/add-recipe.component';
import { AddCategoriesComponent } from './recipe-management/add-categories/add-categories.component'

const routes: Routes = [
	{ path: '', redirectTo: '/login', pathMatch: 'full' },
 	{ path: 'login', component:LoginComponentComponent},
 	{ path: 'dashboard',component:DashboardComponent, children: [
      { path: '', component: UserMangementComponent },
      { path: 'userMangement',     component:UserMangementComponent },
      { path: 'recipeMangement',   component:RecipeMangementComponent },
      { path: 'reportManagement',  component:ReportManagementComponent },
      { path: 'aboutUsManagement', component:GeneralManagementComponent },
      { path: 'contentManagement', component:ContentManagementComponent },
      { path: 'deleteUser',        component:DeleteUserComponent},
      { path: 'viewRecipes',       component:ViewRecipesComponent},
      { path: 'addRecipe',       component:AddRecipeComponent},
      { path: 'addCategories',       component:AddCategoriesComponent}

    ]},
 	{ path: 'footer', component:FooterComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
