import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  userForm: FormGroup;
  helper = new JwtHelperService();

  constructor(private fb: FormBuilder, private userServe: UserService, private _snackBar: MatSnackBar, private route: Router) {
    this.userForm = this.fb.group({
      email: ['']
    })
  }

  ngOnInit(): void {
  }

  submit() {
    return this.userServe.forgotPassword(this.userForm.value).subscribe(
      (res: any) => {
        console.log(res);
        this.showToasTmessages(res.messag);
        this.route.navigateByUrl('login');
      },(err) => {
        // console.log(err);
        if(err.status ===  404) {
          this.showToasTmessages(err.error);
        }
      }
    )
  }
  showToasTmessages(message: string) {
    this._snackBar.open(message);
  }

}
