import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { UserService } from 'src/app/services/user.service';
import { UpdateUserDComponent } from 'src/app/updateUserD/updateUserD.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  dataSource: any = [];
  user: any = {};
  usermatch: string = "";
  displayedColumns: string[] = ['username', 'firstName', 'lastName', 'email', 'action'];
  constructor(private userService: UserService, public dialog: MatDialog, private router: Router) {
    this.getAllUsers();
  }

  ngOnInit(): void {
    this.user = localStorage.getItem("User");
    this.usermatch = JSON.parse(this.user).email;
  }

  getAllUsers() {
    return this.userService.getAll().subscribe(async (res: any) => {
      this.usermatch = JSON.parse(this.user).email;
      console.log(res)
      this.dataSource = res;
    }, (err) => {
      console.log(err)
    })
  }

  onClickGetUser(e: any): void {
    console.log(e);
    const dialogRef = this.dialog.open(DialogComponent, {
      width: 'auto',
      data: e,
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  delete(e: any) {
    console.log(e._id);
    return this.userService.delete(e._id).subscribe((res: any) => {
      console.log(res);
      this.getAllUsers();
      localStorage.clear();
      this.router.navigate(['login']);
    })
  }

  updateDada(e: any) {
    console.log(e);
    const dialogRef = this.dialog.open(UpdateUserDComponent, {
      width: 'auto',
      data: e,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // localStorage.clear();
      // this.router.navigate(['login']);
    });
  }
}
