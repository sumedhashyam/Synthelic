import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

import { SynthelicService, AlertService, FilterService } from '@app/_services';
import { ExpresionResponce, IResponse } from '@app/_models';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit, OnDestroy
{
  subscription: Subscription;

  experience: any = [];
  expresionResponce: ExpresionResponce;
  apiExperienceNamesUrl: string;
  apiDenied: boolean = false;

  constructor(private synthelicService: SynthelicService, private alertService: AlertService, private filterService: FilterService)
  {
    // subscribe to filter
    this.subscription = this.filterService.onFilter().subscribe(filterParam =>
    {
      let filter = filterParam?.filter;
      this.fetchExperiences(filter);     
    });
  }

  ngOnInit(): void
  {
    this.fetchExperiences();
  }

  ngOnDestroy(): void
  {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  fetchExperiences(filter?:string): void
  {
    let response: IResponse;
    this.synthelicService.getExperience(this.apiExperienceNamesUrl, filter).subscribe({
      next: resp =>
      {
        response = resp;
        var data = response.results;
        if (data.length > 0)
        {
          this.filterData(data);
        }
      },
      error: err =>
      {
        this.alertService.error(err);
      },
      complete: () =>
      {
        if (response && response.next)
        {
          this.apiExperienceNamesUrl = response.next;
        }
        else if (response.next == null)
        {
          this.apiDenied = true;
        }
      }
    });
  }

  formatUIDate(dateString: string): string
  {
    return moment(dateString).format('DD.MM.YY');
  }

  filterData(experience)
  {
    for (let exp of experience)
    {
      this.expresionResponce = {
        id: exp.id,
        title: exp.title,
        created_at: exp.created_at,
        user: exp.user.username,
        experience_effects: exp.experience_effects.map(s => s.effect).join(', '),
        experience_elements: exp.experience_elements.map(s => s.name).join(', '),
        experience_synergies: exp.experience_synergies,
      };
      this.experience.push(this.expresionResponce);
    }
  }
}
