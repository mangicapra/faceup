import { Component, OnInit } from '@angular/core';
import { CameraPopupComponent } from 'src/app/shared/camera-popup/camera-popup.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  image: { url: string | ArrayBuffer; name: any; };
  profileImg: any;
  uploadfile: any;
  newPostForm: FormGroup;

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar, private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.newPostForm = new FormGroup({
      title: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required)
    });
  }

  get title() { return this.newPostForm.get('title'); }

  /**
   *
   * @param files Accepts image type file
   */
  displayProfile(files): void {
    if (files.length === 0) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = event => {
      this.image = {
        url: reader.result,
        name: files[0].name
      };
      this.profileImg = this.image.url;
      this.uploadfile = files[0];
    };
  }

  triggerCamera(): void {
    this.profileImg = '';

    const dialogRef = this.dialog.open(CameraPopupComponent, {
      panelClass: 'camera-popup'
    });

    const dialogSubmitSubscription = dialogRef.componentInstance.submitClicked.subscribe(res => {
      fetch(res)
      .then(f => f.blob())
      .then(blob => {
        const file = new File([blob], 'profile_photo.jpg');
        this.uploadfile = file;
      });
      this.profileImg = res;
      dialogSubmitSubscription.unsubscribe();
    });
  }

  createPost() {
    const formData = new FormData();
    formData.append('image', this.uploadfile);
    formData.append('user_id', '1');
    formData.append('title', this.title.value);

    this.apiService.createPost(formData).subscribe(res => {
      this.snackBar.open('You have successfully created new post.', null, {
        duration: 3000,
        panelClass: 'successMessage'
      }).afterDismissed().subscribe(d => this.router.navigateByUrl('user/feeds'));
    });
  }
}
