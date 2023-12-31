import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from "../auth/api.service";
import { tap } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })
  public loginError:String;

  constructor(private apiService:ApiService,private router: Router) { }

  ngOnInit() {
  }

  onSubmit(){
    if(this.loginForm.valid){
      this.apiService.login(this.loginForm.value)
      .subscribe((data) => {
        console.log(data);
        if(data.status === 200 && !data.body.ErrorCode){
            this.router.navigate(['/dashboard']);
        }else{
          this.loginError = data.body.message;
        }
      },
      error => this.loginError = error
      )

    }
  }
}
