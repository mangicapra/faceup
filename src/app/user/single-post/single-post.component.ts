import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {

  postId: string;
  post$: Observable<Post>;
  env = environment;

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit() {
    this.postId = this.route.snapshot.paramMap.get('id');
    this.post$ = this.apiService.getSinglePost(this.postId);
  }

}
