import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-dropzone',
  templateUrl: './file-dropzone.component.html',
  styleUrls: ['./file-dropzone.component.css']
})
export class FileDropzoneComponent implements OnInit {
  config = {};

  constructor() { }

  ngOnInit() {
  }

  onUploadError(event) {
    const [file, message, misc] = event;
    console.error('Upload failed: ', file.fullPath);
    return event;
  }


  onUploadSuccess(event) {
    console.log('Upload succeeded: ', event);
    return event;
  }
}
