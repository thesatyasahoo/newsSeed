import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  url:any = '';
  constructor( public userService: UserService, public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data._id)
    this.download(this.data._id);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  download(id: string) {
    return this.userService.downloadDp(id).subscribe(
      (r) => {
        // console.log(r);
        this.url = r;
      }, (err) => {
        console.log(err)
      }
    )
  }
  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (e: any) => {
        // called once readAsDataURL is completed
        this.url = e.target.result;
      };
    }
  }
}
