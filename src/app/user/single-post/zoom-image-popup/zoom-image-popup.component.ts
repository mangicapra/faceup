import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-zoom-image-popup',
  templateUrl: './zoom-image-popup.component.html',
  styleUrls: ['./zoom-image-popup.component.scss']
})
export class ZoomImagePopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ZoomImagePopupComponent>,
              @Inject(MAT_DIALOG_DATA) public url: string) { }

  ngOnInit() {
    console.log(this.url);
  }

}
