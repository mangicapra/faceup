import { Component, OnInit, } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { CameraPopupComponent } from 'src/app/shared/camera-popup/camera-popup.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

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

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      file: new FormControl('', Validators.required)
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
        const file = new File([blob], 'Profile photo');
        this.signupForm.value.file = file;
      });
      this.profileImg = res;
      dialogSubmitSubscription.unsubscribe();
    });

  }

  get firstName() { return this.signupForm.get('firstName'); }
  get lastName() { return this.signupForm.get('lastName'); }
  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }

  get lEmail() { return this.loginForm.get('email'); }
  get lPassword() { return this.loginForm.get('password'); }


  signUp() {
    console.log(this.signupForm.value);
    this.snackBar.open('You have successfully singed in', null, {
      duration: 3000,
      panelClass: 'successMessage'
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
