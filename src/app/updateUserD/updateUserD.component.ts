import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-updateUserD',
  templateUrl: './updateUserD.component.html',
  styleUrls: ['./updateUserD.component.css']
})
export class UpdateUserDComponent implements OnInit {
  url: any = '';
  userForm: FormGroup;
  uploadedFiles!: Array < File > ;
  constructor( private fb: FormBuilder, private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UpdateUserDComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  public userService: UserService) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      file: [""]
    })
  }

  ngOnInit(): void {
    console.log(this.data);
    this.patchData(this.data);
    this.download(this.data._id)
  }

  close(): void {
    this.dialogRef.close();
  }
  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      // console.log(event.target.files)
      // var reader = new FileReader();

      // reader.readAsDataURL(event.target.files[0]); // read file as data url

      // reader.onload = (e: any) => {
      //   // called once readAsDataURL is completed
      //   // this.url = e.target.result;
      // };
      this.uploadedFiles = event.target.files;
      this.upload()
    }
  }
  download(id: string) {
    this.userService.downloadDp(id).subscribe(
      (r) => {
        console.log(r);
        this.url = r;
      }, (err) => {
        console.log(err)
      }
    )
  }
  upload() {
    let formData = new FormData();
    for (var i = 0; i < this.uploadedFiles.length; i++) {
        formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
    }
    this.userService.uploadImg(formData)
    .subscribe((response: any) => {
         console.log('response received is ', response);
         this.close();
    })
  }
  patchData(data: any) {
    return this.userForm.patchValue({
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      email: data.email,
      file: data.file
    })
  }

  update(id: string, data: any) {
    return this.userService.updateOne(id, data).subscribe(
      (res: any) => {
        console.log(res);
        this.showToasTmessages('User Updated Successfuly');
        // this.close();
      }, (err) => {
        console.log(err);
        this.showToasTmessages(err.error.message);
      }
    )
  }
  showToasTmessages(message: string) {
    this._snackBar.open(message);
  }
}
