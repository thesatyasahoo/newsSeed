import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private userServe: UserService, private _snackBar: MatSnackBar, private router: Router) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  submit() {
    return this.userServe.register(this.userForm.value).subscribe(
      (res) => {
        console.log(res);
        this.showToasTmessages('User Created Successfuly');
        this.router.navigate(['login']);
      },(err) => {
        this.showToasTmessages(err.message);
      }
    )
  }
  showToasTmessages(message: string) {
    this._snackBar.open(message);
  }
}
