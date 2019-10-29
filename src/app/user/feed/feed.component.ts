import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  post$: Observable<Post[]>;
  env = environment;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.post$ = this.apiService.getAllPosts();
  }

}
