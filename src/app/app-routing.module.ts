import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth/auth.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { CreateNewsComponent } from './home/pages/create-news/create-news.component';
import { DashboardComponent } from './home/pages/dashboard/dashboard.component';
import { FavouriteComponent } from './home/pages/favourites/favourite.component';
import { UsersComponent } from './home/pages/users/users.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'update-password',
    component: UpdatePasswordComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService],
    children:[
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'favourite',
        component: FavouriteComponent
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'create',
        component: CreateNewsComponent
      },

    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
