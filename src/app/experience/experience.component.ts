import { Component, OnInit } from '@angular/core';
import { SynthelicService, AlertService } from '@app/_services';
import * as moment from 'moment';
@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {
  experience: any = [];
  constructor(private synthelicService: SynthelicService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.experienceElements();
  }

  experienceElements(): void {
    this.synthelicService.getExperience().subscribe({
      next: response => {
        this.experience = response.results;
        console.log(this.experience);
      },
      error: err => {
        this.alertService.error(err);
      }
    });
  }
  formatUIDate(dateString: string): string {
    return moment(dateString).format('DD-MM-YYYY');
  }
}
