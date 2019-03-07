import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  public loading = false;
  public submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.register(this.f.username.value, this.f.email.value, this.f.password.value)
      .subscribe(
        data => {
          console.log('data :', data);
          this.router.navigate(['/login']);
        },
        error => {
          console.log('error :', error);
          // this.alertService.error(error);
          this.loading = false;
        });

    // this.userService.register(this.registerForm.value)
    //   .pipe(first())
    //   .subscribe(data => {
    //     this.alertService.success('Registration successful', true);
    //     this.router.navigate(['/login']);
    //   }, error => {
    //     this.alertService.error(error);
    //     this.loading = false;
    //   });
  }
}
