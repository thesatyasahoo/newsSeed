import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  userForm: FormGroup;
  helper = new JwtHelperService();
  emailFromQuery: any = '';

  constructor(private fb: FormBuilder, private userServe: UserService, private _snackBar: MatSnackBar, private route: Router, private activeRoute: ActivatedRoute) {
    this.userForm = this.fb.group({
      email:[''],
      password: ['']
    })
  }

  ngOnInit(): void {
    this.activeRoute.queryParamMap.subscribe(params => {
      console.log(params.get('email'));
      this.emailFromQuery = params.get('email');
    })
  }

  submit() {
    this.userForm.patchValue({email: this.emailFromQuery});
    return this.userServe.updatePassword(this.userForm.value).subscribe(
      (res: any) => {
        console.log(res);
        this.showToasTmessages(res.message.message);
        this.route.navigateByUrl('login')
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
