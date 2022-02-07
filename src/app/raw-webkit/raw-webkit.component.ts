import {ChangeDetectorRef, Component, HostListener} from '@angular/core';

interface WebkitRelativeFile extends File {
  fullPath?: string;
  webkitRelativePath?: string;
}

interface FileUpload {
  name: string;
  size: number;
  lastModified: number;
  fullPath: string;
}

@Component({
  selector: 'app-raw-webkit',
  templateUrl: './raw-webkit.component.html',
  styleUrls: ['./raw-webkit.component.css']
})
export class RawWebkitComponent {
  fileUploads: Array<FileUpload> = [];
  dragAreaClass = 'dragarea';
  errors: Array<any> = [];

  toDate(epoch: number) {
    if (!epoch) { return ''; }
    return new Date(epoch);
  }

  constructor(private readonly ref: ChangeDetectorRef) {
  }

  // Simple multi file upload handling
  onChange($event: any) {
    this.uploadFiles($event.target.files);
  }

  // Drag and Drop handling
  // Based on http://www.advancesharp.com/blog/1218/angular-4-upload-files-with-data-and-web-api-by-drag-drop
  @HostListener('dragover', ['$event']) onDragOver(event) {
    this.dragAreaClass = 'droparea';
    event.preventDefault();
  }
  @HostListener('dragenter', ['$event']) onDragEnter(event) {
    this.dragAreaClass = 'droparea';
    event.preventDefault();
  }
  @HostListener('dragend', ['$event']) onDragEnd(event) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
  }
  @HostListener('dragleave', ['$event']) onDragLeave(event) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
  }
  @HostListener('drop', ['$event']) onDrop(event) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
    event.stopPropagation();
    const items = event.dataTransfer.items;
    console.log('Uploading Items via Data Transfer: ', items);

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < items.length; i++) {
      const item = items[i].webkitGetAsEntry();
      if (item) {
        this.scanFiles(item);
      }
    }
  }
  async scanFiles(entry) {
    if (entry.isFile) {
      const file = await this.getFileFromEntry(entry);
      if (file) {
        this.fileUploads.push({
          name: entry.name,
          fullPath: entry.fullPath,
          size: file.size,
          lastModified: file.lastModified,
        });
      } else {
        console.log('Failed to lookup file from entry: ', entry);
      }
      this.ref.detectChanges();
    } else if (entry.isDirectory) {
      const directoryReader = entry.createReader();
      console.log('parsing directory: ', entry);
      directoryReader.readEntries((entries) => {
        entries.forEach(this.scanFiles.bind(this));
      });
    }
  }


  async getFileFromEntry(fileEntry) : Promise<File> {
      try {
      return await new Promise((resolve, reject) => fileEntry.file(resolve, reject));
    } catch (err) {
      console.log(err);
    }
  }

  // Directory upload handling
  // Based on https://developer.mozilla.org/en-US/docs/Web/API/File/webkitRelativePath
  uploadFiles(files: Array<WebkitRelativeFile>) {
    console.log('Uploading Files via File Input: ', files);
    this.errors = []; // Clear error
    for (const file of files) {
      // TODO: Validate file size and allowed extensions
      // TODO: Create containing folder structure within Girder
      // TODO: Init each file as a new upload, return upload ID
      // TODO: Queue file chunks for upload
      // TODO: Display upload in table / update progress
      this.fileUploads.push({
        name: file.name,
        size: file.size,
        lastModified: file.lastModified,
        fullPath: file.fullPath || file.webkitRelativePath,
      });
      this.ref.detectChanges();
    }
  }
}
