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

  experiences: any = [];
  expresionResponce: ExpresionResponce;
  apiExperienceNamesUrl: string;
  apiDenied: boolean = false;
  isExperienceProcessed: boolean;

  constructor(private synthelicService: SynthelicService, private alertService: AlertService, private filterService: FilterService)
  {
    // subscribe to filter
    this.subscription = this.filterService.onFilter().subscribe(filterParam =>
    {
      let filter = filterParam?.filter;
      console.log(`Experience filter: ${filter}`);

      this.experiences = [];
      this.apiExperienceNamesUrl = null;
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

  fetchExperiences(filter?: string): void
  {
    this.isExperienceProcessed = false;
    let response: IResponse;
    this.synthelicService.getExperience(this.apiExperienceNamesUrl, filter).subscribe({
      next: resp =>
      {
        response = resp;
        let data = response.results;
        if (data.length > 0)
        {
          this.filterData(data);
        }
      },
      error: err =>
      {
        this.alertService.error(err, { autoClose: true });
        this.isExperienceProcessed = true;
      },
      complete: () =>
      {
        this.isExperienceProcessed=true;
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
      this.experiences.push(this.expresionResponce);
    }
    this.isExperienceProcessed = true;
  }
}
