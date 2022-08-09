import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NewsService } from '../services/news.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router, private newsService: NewsService) {

  }

  canActivate(): boolean {
    if(!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      localStorage.clear();
      return false;
    } else {
      // this.getFev()
      return true;
    }
  }

  getFev() {
    this.newsService.getBookmark().subscribe(
      (e: any) => {
        if(e && e.totalData > 0 ) {
          this.router.navigate(["home/favourite"]);
        }
      }, (err) => {
        this.router.navigate(["home"]);
        console.log(err);
      }
    )
  }
}
