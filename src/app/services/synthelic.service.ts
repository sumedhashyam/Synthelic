import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators';
import { IResponse } from './IResponse';
import { IExperience } from './IExperience';

@Injectable({
    providedIn: 'root'
})
export class SynthelicService
{
    apiGendersUrl = 'http://synthelic.com:9090/api/categories/genders/';
    apiCategoriesUrl = 'http://synthelic.com:9090/api/categories/synergy_categories/';
    apiElementNamesUrl = 'http://synthelic.com:9090/api/synth/element_names/?page_size=10&page_number=1';
    apiElementEffectsUrl = 'http://synthelic.com:9090/api/categories/effects/';
    apiElementApplicationsUrl = 'http://synthelic.com:9090/api/categories/applications/';
    apiSaveExperienceUrl = 'http://synthelic.com:9090/api/synth/experiences/';

    constructor(private http: HttpClient)
    {

    }

    getGenders(): Observable<IResponse>
    {
        return this.http.get<IResponse>(this.apiGendersUrl).pipe(
            //tap(data => console.log("Genders:" + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    getCategories(): Observable<IResponse>
    {
        return this.http.get<IResponse>(this.apiCategoriesUrl).pipe(
            //tap(data => console.log("Categories:" + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    getElementNames(url?: string): Observable<IResponse>
    {
        if (!url)
        {
            url = this.apiElementNamesUrl;
        }

        return this.http.get<IResponse>(url).pipe(
            //tap(data => console.log("Element Names:" + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    getElementEffects(): Observable<IResponse>
    {
        return this.http.get<IResponse>(this.apiElementApplicationsUrl).pipe(
            //tap(data => console.log("Element Effects:" + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    getElementApplications(): Observable<IResponse>
    {
        return this.http.get<IResponse>(this.apiElementEffectsUrl).pipe(
            //tap(data => console.log("Element Applications:" + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    saveExperience(experience: IExperience): Observable<any>
    {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.post<IExperience>(this.apiSaveExperienceUrl, experience, httpOptions)
            .pipe(catchError(this.handleError));
    }

    private handleError(err: HttpErrorResponse)
    {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent)
        {
            // A client-side or network error occurred. Handle it accordingly
            errorMessage = `An error occurred: ${err.error.message}`;
        }
        else
        {
            // The backedn returned an unsuccessful response code
            // The response body may contain clues as to what went wrong.
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}