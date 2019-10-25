import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-camera-popup',
  templateUrl: './camera-popup.component.html',
  styleUrls: ['./camera-popup.component.scss']
})
export class CameraPopupComponent implements OnInit {

  streamRef: MediaStream;
  dataToReturn: string | ArrayBuffer;

  @ViewChild('video', {static: false})
  public video: ElementRef;

  @ViewChild('canvas', {static: false})
  public canvas: ElementRef;
  @Output() submitClicked = new EventEmitter<any>();

  constructor(private dialog: MatDialogRef<CameraPopupComponent>) { }

  ngOnInit() {
    this.checkMedia();
  }

  checkMedia() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
          this.streamRef = stream;
          this.video.nativeElement.srcObject = stream;
          this.video.nativeElement.play();
      });
   }
  }

  capture() {
    const context = this.canvas.nativeElement.getContext('2d').drawImage(this.video.nativeElement, 0, 0, 640, 480);
    this.dataToReturn = this.canvas.nativeElement.toDataURL('image/png');
    this.streamRef.getTracks().map(track => track.stop());
  }

  retake() {
    this.dataToReturn = null;
    this.checkMedia();
  }

  sendImg() {
    this.streamRef.getTracks().map(track => track.stop());
    this.submitClicked.emit(this.dataToReturn);
    this.dialog.close();
  }

}
