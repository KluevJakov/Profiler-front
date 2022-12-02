import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

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
