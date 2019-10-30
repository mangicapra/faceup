import { Component, OnInit, } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { CameraPopupComponent } from 'src/app/shared/camera-popup/camera-popup.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  visible: boolean = false;
  image: { url: string | ArrayBuffer, name: string};
  profileImg: string | ArrayBuffer;
  uploadfile: any;
  signupForm: FormGroup;
  loginForm: FormGroup;

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar, private apiService: ApiService) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      fullname: new FormControl('', Validators.required)
    });

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

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

  get fullname() { return this.signupForm.get('fullname'); }

  get lEmail() { return this.loginForm.get('email'); }
  get lPassword() { return this.loginForm.get('password'); }


  signUp() {
    const formData = new FormData();
    formData.append('name', this.signupForm.value.fullname);
    formData.append('email', 'test@test.com');
    formData.append('image', this.uploadfile);

    this.apiService.signUp(formData).subscribe(res => {
      console.log(res);
      this.signupForm.reset();
      this.uploadfile = null;
      this.snackBar.open('You have successfully singed in', null, {
        duration: 3000,
        panelClass: 'successMessage'
      });
    });
  }

  loing() {
    
  }

  faceLogin(): void {
    const dialogRef = this.dialog.open(CameraPopupComponent, {
      panelClass: 'camera-popup'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}
