import { Component, OnInit } from '@angular/core';
import { SynthelicService, AlertService } from '@app/_services';
import * as moment from 'moment';
import { ExpresionResponce } from '@app/_models';
@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {
  experience: any = [];
  expresionResponce: ExpresionResponce;
  constructor(private synthelicService: SynthelicService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.experienceElements();
  }

  experienceElements(): void {
    this.synthelicService.getExperience().subscribe({
      next: response => {
        var data = response.results;
        console.log(data);
        if (data.length > 0) {
          this.filterData(data);
        }
      },
      error: err => {
        this.alertService.error(err);
      }
    });
  }
  formatUIDate(dateString: string): string {
    return moment(dateString).format('DD-MM-YYYY');
  }
  filterData(experience) {
    for (let e1 of experience) {
      this.expresionResponce = {
        id: e1.id,
        title: e1.title,
        created_at: e1.created_at,
        user: e1.user.username,
        experience_effects: e1.experience_effects.map(s => s.effect).join(', '),
        experience_elements: e1.experience_elements.map(s => s.name).join(', '),
        experience_synergies: e1.experience_synergies,
      };
      this.experience.push(this.expresionResponce);
    }
  }
}
