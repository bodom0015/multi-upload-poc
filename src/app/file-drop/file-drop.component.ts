import { Component, OnInit } from '@angular/core';
import {FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry} from 'ngx-file-drop';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-file-drop',
  templateUrl: './file-drop.component.html',
  styleUrls: ['./file-drop.component.css']
})
export class FileDropComponent implements OnInit {


  files: NgxFileDropEntry[] = [];

  constructor(private readonly http: HttpClient) { }

  ngOnInit() {
  }

  dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    console.log('Files: ', files);
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath, file);
          
          // TODO: POST to Girder
          this.http.post('https://girder.local.wholetale.org/api/v1/file', {
            parentType: 'folder',
            parentId: 'insertParentIdHere',
            name: file.name,
            // ... etc ...
          }, {
            headers: {
              'Girder-Token': 'tokenGoesHere'
            }
          });

          // Loop over all chunks and POST to https://girder.local.wholetale.org/api/v1/file/chunk

          /**
           // You could upload it like this:
           const formData = new FormData()
           formData.append('logo', file, relativePath)

           // Headers
           const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })

           this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
           .subscribe(data => {
            // Sanitized logo returned from backend
          })
           **/

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event){
    console.log(event);
  }

  public fileLeave(event){
    console.log(event);
  }
}
