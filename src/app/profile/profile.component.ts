import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  modalVisible: boolean = false;
  modalCreate: boolean = false;
  modalUploadVisible: boolean = false;
  modalUploadCreate: boolean = false;

  constructor() { }

  createCategory(): void {
    this.modalCreate = true;
    this.modalVisible = true;
  }

  uploadFiles(): void {
    this.modalUploadCreate = true;
    this.modalUploadVisible = true;
  }

  ngOnInit(): void {
  }

}
