import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators';
import { IResponse } from '@app/_models/IResponse';
import { IExperience } from '@app/_models/IExperience';

@Injectable({
    providedIn: 'root'
})
export class SynthelicService
{
    apiGendersUrl = 'http://synthelic.com:9090/api/categories/genders/';
    apiCategoriesUrl = 'http://synthelic.com:9090/api/categories/synergy_categories/';

    apiElementNamesUrl = 'http://synthelic.com:9090/api/synth/element_names/?page_size=10&page=1';
    apiSourcesUrl = 'http://synthelic.com:9090/api/categories/sources/';
    apiElementEffectsUrl = 'http://synthelic.com:9090/api/categories/effects/';
    apiElementApplicationsUrl = 'http://synthelic.com:9090/api/categories/applications/';
    apiSaveExperienceUrl = 'http://synthelic.com:9090/api/synth/experiences/';

    apiElementsUrl = 'http://synthelic.com:9090/api/synth/elements/';
    apiEffectsUrl = 'http://synthelic.com:9090/api/synth/experience_effects/';
    apiSynergiesUrl = 'http://synthelic.com:9090/api/synth/experience_synergies/';
    apiExperienceNameUrl = 'http://synthelic.com:9090/api/synth/experiences/?page_size=12&page=1';

    constructor(private http: HttpClient)
    {

    }

    getGenders(): Observable<IResponse>
    {
        return this.http.get<IResponse>(this.apiGendersUrl, { withCredentials: true });
        //.pipe(tap(data => console.log("Element Applications:" + JSON.stringify(data))))
    }

    getCategories(): Observable<IResponse>
    {
        return this.http.get<IResponse>(this.apiCategoriesUrl, { withCredentials: true });
    }

    getElementNames(url?: string): Observable<IResponse>
    {
        if (!url)
        {
            url = this.apiElementNamesUrl;
        }

        return this.http.get<IResponse>(url, { withCredentials: true });
    }

    getElementSources(): Observable<IResponse>
    {
        return this.http.get<IResponse>(this.apiSourcesUrl, { withCredentials: true });
    }

    getElementEffects(): Observable<IResponse>
    {
        return this.http.get<IResponse>(this.apiElementEffectsUrl, { withCredentials: true });
    }

    getElementApplications(): Observable<IResponse>
    {
        return this.http.get<IResponse>(this.apiElementApplicationsUrl, { withCredentials: true });
    }

    saveExperience(experience: IExperience): Observable<any>
    {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), withCredentials: true };
        return this.http.post<IExperience>(this.apiSaveExperienceUrl, experience, httpOptions);
    }

    getElements(filter?: string): Observable<IResponse>
    {
        let url = filter !== null && filter !== undefined ? this.apiElementsUrl + filter : this.apiElementsUrl;
        return this.http.get<IResponse>(url, { withCredentials: true });
    }

    getEffects(filter?: string): Observable<IResponse>
    {
        let url = filter !== null && filter !== undefined ? this.apiEffectsUrl + filter : this.apiEffectsUrl;
        return this.http.get<IResponse>(url, { withCredentials: true });
    }

    getSynergies(filter?: string): Observable<IResponse>
    {
        let url = filter !== null && filter !== undefined ? this.apiSynergiesUrl + filter : this.apiSynergiesUrl;
        return this.http.get<IResponse>(url, { withCredentials: true });
    }

    getExperience(url?: string, filter?: string): Observable<IResponse>
    {
        if (!url)
        {
            url = this.apiExperienceNameUrl;
        }

        url = filter !== null && filter !== undefined ? url + filter : url;
        return this.http.get<IResponse>(url, { withCredentials: true });
    }
}