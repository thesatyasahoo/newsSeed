import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Articles, News } from 'src/app/models/news.model';
import { NewsDialogComponent } from 'src/app/news-dialog/news-dialog.component';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})

export class FavouriteComponent implements OnInit {
  title: string = 'Welcome world';
  date: Date = new Date();
  newsData?: Articles[] = [];
  bookmarkStatus: boolean = false;

  constructor(private newsService: NewsService, public dialog: MatDialog,
    private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    // this.getNews();
    this.getBookmark();
  }


  getNews() {
    return this.newsService.getAll().subscribe((data: News): void => {
      console.log(data.articles);
      this.newsData = data.articles?.filter((e) => e.description !== null);
    }, (err) => {
      console.log(err);
    })
  }

  deleteBookmark(item: any) {
    return this.newsService.delete(item._id).subscribe((res: any) => {
      console.log(res)
      if(res?.status === 200) {
        this.bookmarkStatus = true;
        this.showToasTmessages(res.message);
        this.getBookmark();
      }
    }, (err) => {
      this.showToasTmessages(err.error.message);
      this.getBookmark();
    })
  }

  getBookmark() {
    this.newsData = [];
    let user:any = localStorage.getItem("User");
    return this.newsService.getBookmark().subscribe((res: any) => {
      console.log(res)
      if(res && res.data.length > 0 && res.status === 200) {
        return res.data.map((e:Articles) => {
          if(e.user === JSON.parse(user).email) {
            this.newsData?.push(e)
          } else {
            this.newsData = [];
          }
        })
      } else {
        this.newsData = [];
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
  addNewNews() {
    this.router.navigate(['home/create']);
  }
}
