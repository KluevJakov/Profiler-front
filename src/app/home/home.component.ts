import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  options: AnimationOptions = {
    path: '../../assets/lottie.json',
  };
  constructor() { }

  ngOnInit(): void {
  }

}
