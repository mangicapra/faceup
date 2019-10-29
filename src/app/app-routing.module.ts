import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { UserComponent } from './user/user.component';
import { PostComponent } from './user/post/post.component';
import { FeedComponent } from './user/feed/feed.component';
import { SinglePostComponent } from './user/single-post/single-post.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'user',
    component: UserComponent,
    children: [
      {
        path: 'feeds',
        component: FeedComponent
      },
      {
        path: 'feeds/:id',
        component: SinglePostComponent
      },
      {
        path: 'add-post',
        component: PostComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
