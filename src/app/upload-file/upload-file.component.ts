import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  @Input()
  public create = false;

  @Output()
  public modalClosed: EventEmitter<void> = new EventEmitter<void>();


  close(): void {
    this.modalClosed.emit();
  }

  constructor() { }

  ngOnInit(): void {
  }

}
