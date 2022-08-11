import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  login(userFormValue: any) {
    return this.http.post(`${environment.baseUrl}/user/login`, userFormValue);
  }

  register(userFormValue: any) {
    return this.http.post(`${environment.baseUrl}/user/create`, userFormValue);
  }

  getAll() {
    return this.http.get(`${environment.baseUrl}/user`);
  }

  getOne(id: string) {
    return this.http.get(`${environment.baseUrl}/user/${id}`);
  }

  downloadDp(id: string) {
    return this.http.get(`${environment.baseUrl}/user/download/dp/${id}`, { responseType: 'blob' }).pipe(
      map(x => {
        const urlToBlob = window.URL.createObjectURL(x)
        return this.sanitizer.bypassSecurityTrustResourceUrl(urlToBlob);
      }),
    );;
  }

  updateOne(id: string, data: any) {
    return this.http.put(`${environment.baseUrl}/user/update/${id}`, data);
  }

  delete(id: string) {
    return this.http.delete(`${environment.baseUrl}/user/remove/${id}`);
  }

  forgotPassword(user: any) {
    return this.http.post(`${environment.baseUrl}/user/forgot-Password`, user);
  }

  updatePassword(user: any) {
    return this.http.put(`${environment.baseUrl}/user/update-password`, user);
  }
  uploadImg(data: any) {
    let userData: any = localStorage.getItem("User");
    let options: any = {headers: new HttpHeaders({"Authorization": JSON.parse(userData).email})};
    return this.http.post(`${environment.baseUrl}/user/api/upload`, data, options);
  }
}
