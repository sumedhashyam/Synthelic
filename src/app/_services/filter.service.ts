import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FilterService
{
    private subject = new Subject<any>();

    sendFilter(filterParam: string)
    {
        this.subject.next({ filter: filterParam });
    }

    clearFilter()
    {
        this.subject.next();
    }

    onFilter(): Observable<any>
    {
        return this.subject.asObservable();
    }

}