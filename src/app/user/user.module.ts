import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { RouterModule } from '@angular/router';

import { MatIconModule } from '@angular/material';
import { FeedComponent } from './feed/feed.component';
import { PostComponent } from './post/post.component';


@NgModule({
  declarations: [UserComponent, FeedComponent, PostComponent],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule
  ]
})
export class UserModule { }
