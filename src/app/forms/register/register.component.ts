import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { registerModel } from 'src/app/Models/registerModel';
import { AuthenticationService } from 'src/app/Services/AuthService/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerModel = new registerModel();
  itemForm!: FormGroup;
  repeatPass: string = 'none';

  constructor(
    private authService: AuthenticationService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.initItemForm();
  }

  initItemForm(): void {
    this.itemForm = new FormGroup({
      fullName: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/),
      ]),
      passwordHash: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
      roleId: new FormControl(0),
    });
  }

  get fullName(): FormControl {
    return this.itemForm.get('fullName') as FormControl;
  }
  get email(): FormControl {
    return this.itemForm.get('email') as FormControl;
  }
  get passwordHash(): FormControl {
    return this.itemForm.get('passwordHash') as FormControl;
  }
  get confirmPassword(): FormControl {
    return this.itemForm.get('confirmPassword') as FormControl;
  }

  register(registerModel: registerModel) {
    if (this.passwordHash.value !== this.confirmPassword.value) {
      this.repeatPass = 'inline';
      return;
    }
    this.repeatPass = 'none';
    this.authService.register(registerModel).subscribe({
      next: () => {
        this.toastr.success('Please login', 'Registration Successful');
        this.router.navigate(['/login']);
      },
      error: (e) => this.toastr.error(e.error),
    });
  }
}
