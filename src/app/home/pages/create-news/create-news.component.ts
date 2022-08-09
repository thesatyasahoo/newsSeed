import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.css']
})
export class CreateNewsComponent implements OnInit {
  newsForm: FormGroup;
  constructor(private fb: FormBuilder, private newsServe: NewsService, private _snackBar: MatSnackBar) {
    this.newsForm = this.fb.group({
      source: this.fb.group({
        id: [""],
        name: ["", [Validators.required]],
      }),
      author: ["", [Validators.required]],
      title: ["", [Validators.required]],
      description: ["", [Validators.required]],
      url: ["", [Validators.required]],
      urlToImage: ["", [Validators.required]],
      publishedAt: [""],
      content: ["", [Validators.required]],
      users: [""]
    })
  }

  ngOnInit() {
    
  }
  get f() {
    return this.newsForm.get('') as FormControl;
  }

  onSubmit(data: FormGroup) {
    let user: any = localStorage.getItem("User");
    console.log(JSON.parse(user).email)
    this.newsForm.patchValue({users: JSON.parse(user).email, publishedAt: new Date()});
    return this.newsServe.create(data.value).subscribe(
      (r) => {
        console.log(r);
        this.showToasTmessages('User Created Successfuly');
      },
      (err) => {
        console.log(err);
        this.showToasTmessages(err.error.message);
      }
    )
  }
  showToasTmessages(message: string) {
    this._snackBar.open(message);
  }
}
