import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileDropzoneComponent } from './file-dropzone/file-dropzone.component';

import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import {NgxFileDropModule} from 'ngx-file-drop';
import { FileDropComponent } from './file-drop/file-drop.component';
import { RawWebkitComponent } from './raw-webkit/raw-webkit.component';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://girder.local.wholetale.org/api/v1/file',
  maxFilesize: 50,
  acceptedFiles: '*/*'
};

@NgModule({
  declarations: [
    AppComponent,
    FileDropzoneComponent,
    FileDropComponent,
    RawWebkitComponent
  ],
  imports: [
    BrowserModule,
    DropzoneModule,
    HttpClientModule,
    NgxFileDropModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
