import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/auth/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup = new FormGroup({});
  errors: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      login: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  onSubmit(): void {
    const formValue = this.signInForm.value;
    this.authService.login(formValue.login, formValue.password).subscribe({
      next: () => this.router.navigate(['/', 'private', 'dashboard']),
      error: (err: HttpErrorResponse) => this._handleErrors(err)
    });
  }

  private _handleErrors(err: HttpErrorResponse): void {
      this.errors = `Erreur ${err.status}: ${err.error?.message}`;
  }

}
