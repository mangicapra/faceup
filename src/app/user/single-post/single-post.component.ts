import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/post';
import { environment } from 'src/environments/environment';
import {MatDialog} from '@angular/material/dialog';
import { ZoomImagePopupComponent } from './zoom-image-popup/zoom-image-popup.component';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {

  postId: string;
  postSubscription: Subscription;
  post: Post;
  env = environment;

  constructor(private route: ActivatedRoute, private apiService: ApiService, public dialog: MatDialog) { }

  ngOnInit() {
    this.postId = this.route.snapshot.paramMap.get('id');
    this.postSubscription = this.apiService.getSinglePost(this.postId).subscribe((post: Post) => this.post = post);
  }

  zoomImg() {
    const img = this.env.baseUrl + this.post.image;

    const dialogRef = this.dialog.open(ZoomImagePopupComponent, {
      panelClass: 'zoom-image-popup',
      data: img
    });
  }

}
