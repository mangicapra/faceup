import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

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
