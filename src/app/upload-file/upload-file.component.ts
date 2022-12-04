import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';

const API_URL: string = environment.apiUrl;

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  data: FormData = new FormData();
  public files: NgxFileDropEntry[] = [];
  isLoading: boolean = false;
  isFilesReadyForDownload: boolean = false;
  hasResult: boolean = false;

  static ExecResult = class {
    text: string;
    execTime: number;
    files: number;
    progress: number;
    urlResult: string;
    constructor(data: any){
      this.text = data.text;
      this.execTime = data.execTime;
      this.files = data.files;
      this.progress = data.progress;
      this.urlResult = data.urlResult;
    }
  }

  execResult = new UploadFileComponent.ExecResult("");

  constructor(private http: HttpClient,
    private authService: AuthService) { }

  ngOnInit(): void {
  }

  @Input()
  public create = false;

  @Output()
  public modalClosed: EventEmitter<void> = new EventEmitter<void>();


  close(): void {
    this.modalClosed.emit();
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;

    for (const droppedFile of this.files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.data.append('files', file);
        });
      }
    }

    if (this.files.length != 0) {
      this.isFilesReadyForDownload = true;
    } else {
      this.isFilesReadyForDownload = false;
    }
  }

  public upload() {
    if (this.files.length != 0) {
      this.isLoading = true;
      this.http.post<any>(API_URL + '/api/doc/loadFiles', this.data, AuthService.getJwtHeaderForFiles())
        .subscribe(
          (result: any) => {
            this.isLoading = false;
            this.hasResult = true;
            this.execResult = new UploadFileComponent.ExecResult(result);
          },
          (error: HttpErrorResponse) => {
            console.log(error.error);
          }
        );
    } else {
      alert("Сначала загрузите файлы");
    }
    this.files = [];
    this.data = new FormData();
    this.isFilesReadyForDownload = false;
  }

  public fileOver(event: any) {
    //console.log(event);
  }

  public fileLeave(event: any) {
    //console.log(event);
  }
}
