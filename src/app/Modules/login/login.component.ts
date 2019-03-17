import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Shared/Services/Authentication/authentication.service';
import { first } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup : FormGroup;
  form: FormGroup;
  isLoginError = false;
  hideModal: boolean = false;

  display='none';
  constructor(private authentication: AuthenticationService, private router: Router) { }


  @ViewChild('openModal') openModal: ElementRef;
  @ViewChild('closeModal') closeModal: ElementRef;

  ngOnInit() {
    localStorage.setItem('reloaded', "");
    this.openModal.nativeElement.click();
  }

  onCancel(){
    this.display='block';
  }
  
  onLogin(userName: string, password: string) {
    this.authentication.login(userName, password).pipe(first())
      .subscribe(r =>
         {
          this.router.navigateByUrl('/dashboard');
          this.closeModal.nativeElement.closeModal();
      },
      (err:HttpErrorResponse)=>{
          this.isLoginError = true;
      }
      );
  }
}
