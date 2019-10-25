import { Component, OnInit } from '@angular/core';
import { CameraPopupComponent } from 'src/app/shared/camera-popup/camera-popup.component';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  image: { url: string | ArrayBuffer; name: any; };
  profileImg: any;
  uploadfile: any;
  constructor(public dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit() {}

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

    dialogRef.afterClosed().subscribe(result => {
      this.profileImg = result;
    });
  }
}
