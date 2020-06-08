import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';
import { MustMatch } from '@app/_helpers/mustMatch.validator';

@Component({ templateUrl: 'signup.component.html' })
export class SignupComponent implements OnInit
{
    form: FormGroup;
    loading = false;
    submitted = false;
    showPass = false;
    showConfirmPass = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) { }

    ngOnInit()
    {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required]
        },
            {
                validator: MustMatch('password', 'confirmPassword')
            });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    togglePass()
    {
        this.showPass = !this.showPass;
    }

    toggleConfirmPass()
    {
        this.showConfirmPass = !this.showConfirmPass;
    }

    onSubmit()
    {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid)
        {
            return;
        }

        this.loading = true;
        this.accountService.signup(this.form.value)
            .pipe(first())
            .subscribe(
                data =>
                {
                    this.alertService.success('Registration successful', { keepAfterRouteChange: true });
                    this.router.navigate(['signin'], { relativeTo: this.route });
                },
                error =>
                {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}