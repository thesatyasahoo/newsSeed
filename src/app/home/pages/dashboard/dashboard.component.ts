import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Articles, News } from 'src/app/models/news.model';
import { NewsDialogComponent } from 'src/app/news-dialog/news-dialog.component';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  title: string = 'Welcome world';
  date: Date = new Date();
  newsData?: Articles[] = [];
  bookmarkStatus: boolean = false;

  constructor(private newsService: NewsService, public dialog: MatDialog,  private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getNews();
  }


  getNews() {
    return this.newsService.getAll().subscribe((data: News): void => {
      this.newsData = data.articles?.filter((e) => e.description !== null && !e.author?.includes("http:"));
    }, (err) => {
      console.log(err);
    })
  }

  addBookmark(data: Articles) {
    let user: any = localStorage.getItem("User");
    let newUser = {
      user: JSON.parse(user).email,
      ...data
    }
    return this.newsService.addBookmark(newUser).subscribe((res: any) => {
      console.log(res)
      if(res?.status === 200) {
        this.bookmarkStatus = true;
        this.showToasTmessages('Bookmark added Successfuly');
      }
    }, (err) => {
      this.showToasTmessages(err.error.message);
    })
  }
  getNewsDetail(e: Articles) {
    console.log(e);
    const dialogRef = this.dialog.open(NewsDialogComponent, {
      data: e,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
  showToasTmessages(message: string) {
    this._snackBar.open(message,'Undo', {duration: 1000});
  }
}
