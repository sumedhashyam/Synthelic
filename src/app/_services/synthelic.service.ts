import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'

import { IResponse } from '@app/_models/IResponse';
import { IExperience } from '@app/_models/IExperience';
import { environment } from '@src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SynthelicService
{
    // To test API from local, set apiBaseUrl as apiBaseUrl=''
    // Also in package.json, modify start in scripts as "start": "ng serve --proxy-config proxy.config.json --o"
    // Ref - https://juristr.com/blog/2016/11/configure-proxy-api-angular-cli/
    apiBaseUrl = environment.baseUrl;

    apiGendersUrl = `${this.apiBaseUrl}/api/categories/genders/`;
    apiCategoriesUrl = `${this.apiBaseUrl}/api/categories/synergy_categories/`;

    apiElementNamesUrl = `${this.apiBaseUrl}/api/synth/element_names/?page=1&page_size=10`;
    apiSourcesUrl = `${this.apiBaseUrl}/api/categories/sources/`;
    apiElementEffectsUrl = `${this.apiBaseUrl}/api/categories/effects/`;
    apiElementApplicationsUrl = `${this.apiBaseUrl}/api/categories/applications/`;
    apiSaveExperienceUrl = `${this.apiBaseUrl}/api/synth/experiences/`;

    apiElementsUrl = `${this.apiBaseUrl}/api/synth/elements/`;
    apiEffectsUrl = `${this.apiBaseUrl}/api/synth/experience_effects/`;
    apiSynergiesUrl = `${this.apiBaseUrl}/api/synth/experience_synergies/`;
    apiExperienceNameUrl = `${this.apiBaseUrl}/api/synth/experiences/?page_size=12&page=1`;

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