import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { FavouriteComponent } from './favourites/favourite.component';
import { NewsDialogComponent } from 'src/app/news-dialog/news-dialog.component';
import { CreateNewsComponent } from './create-news/create-news.component';
import { RouterModule } from '@angular/router';
import { UpdateUserDComponent } from 'src/app/updateUserD/updateUserD.component';


@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
    DialogComponent,
    FavouriteComponent,
    NewsDialogComponent,
    CreateNewsComponent,
    UpdateUserDComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
  ],
  exports: [
    DashboardComponent,
    UsersComponent,
    DialogComponent,
    FavouriteComponent,
    NewsDialogComponent,
    CreateNewsComponent,
    UpdateUserDComponent,
  ]
})
export class PagesModule { }
