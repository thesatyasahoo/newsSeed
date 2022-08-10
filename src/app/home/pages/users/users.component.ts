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
  url:any = "";
  usermatch: string = "";
  constructor(private userService: UserService, public dialog: MatDialog, private router: Router) {
    this.getAllUsers();
  }

  ngOnInit(): void {
    this.user = localStorage.getItem("User");
    this.usermatch = JSON.parse(this.user).email;
  }

  getAllUsers() {
    let tempData: any[] = [];
    return this.userService.getAll().subscribe(async (res: any) => {
      this.usermatch = JSON.parse(this.user).email;
      
      res.map(async (r: User) => {
        console.log(r.file);
        tempData.push({
          _id: r._id,
          firstName: r.firstName,
          lastName: r.lastName,
          username: r.username,
          email: r.email,
          password: r.password,
          file: r.file !== "" ? "http://localhost:3000/"+r.file : "../../../../assets/149071.png",
        })
      })
      this.dataSource = tempData;
      console.log(tempData)
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

  download(id: string) {
    return this.userService.downloadDp(id).subscribe(
      async (r: any) => {
        // console.log(r);
        this.url = r;
        return await this.url;
      }, (err) => {
        console.log(err)
      }
    )
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

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  file: any;
}