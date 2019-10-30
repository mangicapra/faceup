import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  signUp(data): Observable<User> {
    return this.http.post<User>(`${environment.baseUrl}/users/register`, data);
  }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.baseUrl}/posts/index`);
  }

  createPost(data): Observable<Post> {
    return this.http.post<Post>(`${environment.baseUrl}/posts/store`, data);
  }

  getSinglePost(id: string): Observable<Post> {
    return this.http.get<Post>(`${environment.baseUrl}/posts/show/${id}`);
  }
}
