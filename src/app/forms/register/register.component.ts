
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { loginModel } from 'src/app/Models/loginModel';
import { registerModel } from 'src/app/Models/registerModel';
import { AuthenticationService } from 'src/app/Services/AuthService/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],

})
export class RegisterComponent implements OnInit{
  registerModel = new registerModel();
  itemForm!: FormGroup;



  constructor(private authService: AuthenticationService,
     private toastr: ToastrService,
     private router: Router){}
  ngOnInit(): void {
    this.initItemForm();
  }

  // initItemForm(): void {
  //   this.itemForm = this.fb.group({
  //     fullName: ['',Validators.required, Validators.minLength(5)],
  //     email: ['',Validators.required, Validators.minLength(5),Validators.email],
  //     password: ['',Validators.required, Validators.minLength(5)],
  //   });
  // }

  initItemForm(): void {
    this.itemForm = new FormGroup({
      fullName: new FormControl('',[Validators.required, Validators.minLength(5)]),
      email: new FormControl('', [Validators.required, Validators.minLength(5)]),
      passwordHash: new FormControl('',[Validators.required, Validators.minLength(5)]),
      roleId: new FormControl(0)
    });
  }

  
  register(registerModel: registerModel){
    this.authService.register(registerModel).subscribe({
      next: () => {
        this.toastr.success('Please login', 'Registration Successful');
        this.router.navigate(['/login']); 
      },
      error:(e)=>this.toastr.error(e.error)
    });
  }
 
}
