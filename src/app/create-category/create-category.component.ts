import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { DocCategory } from '../models/doc-category/doc-category.module';
import { Token } from '../models/token/token.module';


const API_URL: string = environment.apiUrl;

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

  docsCategory = new DocCategory("");

  constructor(private http: HttpClient,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  @Input()
  public create = false;

  @Output()
  public modalClosed: EventEmitter<void> = new EventEmitter<void>();


  close(): void {
    this.modalClosed.emit();
  }

  public createCategory() {
    this.docsCategory.name = (document.getElementById("categoryName") as HTMLInputElement).value;
    let resultTokens = new Array<Token>();
    let argTokens = (document.getElementById("categoryTokens") as HTMLInputElement).value.split(",");
    argTokens.forEach(e => resultTokens.push(new Token(e)));
    this.docsCategory.token = resultTokens;

    this.http.post<any>(API_URL + '/api/doc/createCategory', this.docsCategory, AuthService.getJwtHeader())
      .subscribe(
        (result: any) => {
          console.log(result);
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=> this.router.navigate(['/profile']));
        },
        (error: HttpErrorResponse) => {
          console.log(error.error);
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=> this.router.navigate(['/profile']));
        }
      );
  }
}
