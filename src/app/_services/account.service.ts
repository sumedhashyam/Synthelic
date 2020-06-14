import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '@app/_models/user';
import { environment } from '@src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AccountService
{
    // To test API from local, set apiBaseUrl as apiBaseUrl=''
    // Also in package.json, modify start in scripts as "start": "ng serve --proxy-config proxy.config.json --o"
    apiBaseUrl = environment.baseUrl;

    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    apiUrl = `${this.apiBaseUrl}/api/profiles`;

    constructor(
        private router: Router,
        private http: HttpClient
    )
    {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User
    {
        return this.userSubject.value;
    }

    signup(user: User)
    {
        return this.http.post(`${this.apiUrl}/signup/`, user, { withCredentials: true });
    }

    login(username: string, password: string)
    {
        return this.http.post<User>(`${this.apiUrl}/login/`, { username, password }, { withCredentials: true })
            .pipe(map(user =>
            {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    logout()
    {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['signin']);
    }

}