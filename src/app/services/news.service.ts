import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Articles } from '../models/news.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  constructor(private http: HttpClient) { }

  addBookmark(data: Articles) {
    let userData: any = localStorage.getItem("User");
    let options: any = {headers: new HttpHeaders({"Authorization": JSON.parse(userData).email})};
    return this.http.post(`${environment.baseUrl}/news/addBookmark`, data, options);
  }

  create(newsData: Articles) {
    let userData: any = localStorage.getItem("User");
    let options: any = {headers: new HttpHeaders({"Authorization": JSON.parse(userData).email})};
    return this.http.post(`${environment.baseUrl}/news/create`, newsData, options);
  }

  getAll() {
    return this.http.get(`${environment.baseUrl}/news/webApi`);
  }

  getBookmark() {
    let userData: any = localStorage.getItem("User");
    let options: any = {headers: new HttpHeaders({"Authorization": JSON.parse(userData).email})};
    return this.http.get(`${environment.baseUrl}/news`, options);
  }

  getOne(id: string) {
    return this.http.get(`${environment.baseUrl}/news/${id}`);
  }

  updateOne(id: string, data: any) {
    return this.http.put(`${environment.baseUrl}/news/update/${id}`, data);
  }

  delete(id: string) {
    return this.http.delete(`${environment.baseUrl}/news/remove/${id}`);
  }

  forgotPassword(user: any) {
    return this.http.post(`${environment.baseUrl}/news/forgot-Password`, user);
  }

  updatePassword(user: any) {
    return this.http.put(`${environment.baseUrl}/news/update-password`, user);
  }
}
