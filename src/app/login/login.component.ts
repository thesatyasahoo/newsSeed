import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../services/user.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  helper = new JwtHelperService();

  constructor(private fb: FormBuilder, private userServe: UserService, private _snackBar: MatSnackBar, private route: Router) {
    this.userForm = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.min(3)]
    })
  }

  ngOnInit(): void {
  }

  submit() {
    return this.userServe.login(this.userForm.value).subscribe(
      (res: any) => {
        // console.log(res);
        this.showToasTmessages('User Logged In Successfuly');
        const decodedToken = this.helper.decodeToken(res.message);
        localStorage.setItem('User', JSON.stringify(decodedToken))
        localStorage.setItem('token', JSON.stringify(res.message))
        // console.log(decodedToken.status);
        if(decodedToken.status === 200) {
          this.route.navigateByUrl('home')
        }
      },(err) => {
        // console.log(err);
        if(err.status ===  404) {
          this.showToasTmessages(err.error);
        }
      }
    )
  }
  showToasTmessages(message: string) {
    this._snackBar.open(message,'Undo', {duration: 1000});
  }

}
