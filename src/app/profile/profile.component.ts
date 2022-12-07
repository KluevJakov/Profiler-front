import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit, ɵisDefaultChangeDetectionStrategy} from '@angular/core';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {AuthService} from '../auth.service';
import {AnimationOptions} from 'ngx-lottie';


const API_URL: string = environment.apiUrl;

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
  allCategory: { id: number; name: string, token: { val: string }[] }[] = [];
  currentLogin = JSON.parse(AuthService.getCurrentUser()).login;

  //for lottie animations
  options: AnimationOptions = {
    path: '../../assets/document.json',
  };

  constructor(private http: HttpClient,
              private authService: AuthService,
              private router: Router) {
    this.http.get<any>(API_URL + '/api/doc/getCategories', AuthService.getJwtHeader())
      .subscribe(
        (result: any) => {
          result.forEach((e: { id: number; name: string; token: { val: string; }[]; }) => this.allCategory.push(e));
        },
        (error: HttpErrorResponse) => {

        }
      );
  }

  deleteCat(event: any, item: any): void {
    let catId = item;
    console.log(catId['id']);

    this.http.get<any>(API_URL + "/api/doc/deleteCategory/" + catId['id'], AuthService.getJwtHeader())
      .subscribe(
        (result: any) => {
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => this.router.navigate(['/profile']));
        },
        (error: HttpErrorResponse) => {
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => this.router.navigate(['/profile']));
        }
      );

  }

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
