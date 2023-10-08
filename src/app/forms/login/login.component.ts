import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { jwtAuth } from 'src/app/Models/jwtAuth';
import { loginModel } from 'src/app/Models/loginModel';
import { AuthenticationService } from 'src/app/Services/AuthService/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginModel = new loginModel();
  jwtModel = new jwtAuth();
  itemForm!: FormGroup;
  ngOnInit(): void {
    this.initItemForm();
  }

  initItemForm(): void {
    this.itemForm = new FormGroup({
      email: new FormControl('', [
        Validators.email,
        Validators.required,
        Validators.minLength(5),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
    });
  }

  constructor(
    private authService: AuthenticationService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  login(loginModel: loginModel) {
    this.authService.login(loginModel).subscribe({
      next: (jwtModel) => {
        localStorage.setItem('jwtToken', jwtModel.token);
        this.toastr.success('', 'Login Successful');
        this.router.navigate(['/home']);
        window.location.reload();
      },
      error: (e) => {
        this.toastr.error(e.error);
        console.log(e.error);
      },
    });
  }
}
