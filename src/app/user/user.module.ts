import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatIconModule, MatCardModule, MatInputModule, MatMenuModule } from '@angular/material';
import { FeedComponent } from './feed/feed.component';
import { PostComponent } from './post/post.component';
import { SinglePostComponent } from './single-post/single-post.component';
import { ZoomImagePopupComponent } from './single-post/zoom-image-popup/zoom-image-popup.component';


@NgModule({
  declarations: [UserComponent, FeedComponent, PostComponent, SinglePostComponent, ZoomImagePopupComponent],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule
  ],
  entryComponents: [
    ZoomImagePopupComponent
  ]
})
export class UserModule { }
