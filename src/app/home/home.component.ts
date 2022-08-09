import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, Observable } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  url: any = "";
  @ViewChild('drawer', { static: false })
  drawer!: MatSidenav;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result) => result.matches));
  userInfo: any;
  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.userInfo = JSON.parse(localStorage.getItem('User') || '');
    this.download(this.userInfo.id)
    setTimeout(() => {
      this.isHandset$.subscribe((isVisible) => {
        if (isVisible) {
          this.drawer?.close();
        }
      });
    }, 100);
    // this.newsService.getBookmark().subscribe(
    //   (e: any) => {
    //     console.log(e);
    //     if(e && e.totalData > 0 ) {
    //       this.router.navigate(["home/favourite"]);
    //     }
    //   }, (err) => {
    //     console.log(err);
    //   }
    // )
  }
  download(id: string) {
    console.log(id)
    if(this.userInfo.file) {
      this.userService.downloadDp(id).subscribe(
        (r) => {
          console.log(r);
          this.url = r;
        }, (err) => {
          console.log(err)
        }
      )
    }
  }
  logout() {
    localStorage.clear();
    return this.router.navigate(['login']);
  }
}
