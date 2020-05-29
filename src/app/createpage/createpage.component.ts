import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SynthelicService } from '../services/synthelic.service';
import { IGender } from '../services/IGender';
import { ICategory } from '../services/ICategory';
import { IElementName } from '../services/IElementName';
import { IElement } from '../services/IElement';

@Component({
  selector: 'app-createpage',
  templateUrl: './createpage.component.html',
  styleUrls: ['./createpage.component.css']
})
export class CreatepageComponent implements OnInit 
{
  errorMessage: string;
  genders: IGender[] = [];
  categories: ICategory[] = [];
  elementNames: IElementName[] = [];
  elementEffects: IElement[] = [];
  elementApplications: IElement[] = [];

  public experience = {
    "title": "",
    "explorer_weight": "",
    "explorer_age": "",
    "explorer_gender": "",
    "set_before": "",
    "set_expectations": "",
    "setting_location": "",
    "setting_weather": "",
    "setting_atmosphere": "",
    "setting_companions": "",
    "setting_other": "",
    "effects_physical": "",
    "effects_emotional": "",
    "effects_semantic": "",
    "effects_meta_physical": "",
    "experience_elements": "",
    "experience_synergies": "",
    "experience_effects": "",
  };
  addmore: boolean = false;
  constructor(private synthelicService: SynthelicService) { }

  ngOnInit(): void
  {
    this.fetchGenders();
    this.fetchCategories();
    this.fetchElementNames();
    this.fetchElementEffects();
    this.fetchElementApplications();
  }

  addmoreclick()
  {
    if (this.addmore == false)
    {
      this.addmore = true;
    }
    else
    {
      this.addmore = false;
    }
  }

  fetchGenders(): void
  {
    this.synthelicService.getGenders().subscribe({
      next: response =>
      {
        this.genders = response.results as IGender[];
      },
      error: err => this.errorMessage = err
    });
  }

  fetchCategories(): void
  {
    this.synthelicService.getCategories().subscribe({
      next: response =>
      {
        this.categories = response.results as ICategory[];
      },
      error: err => this.errorMessage = err
    });
  }

  fetchElementNames(): void
  {
    // TODO: We need to call API till we not get all data
    this.synthelicService.getElementNames(10, 1).subscribe({
      next: response =>
      {
        this.elementNames = response.results as IElementName[];
      },
      error: err => this.errorMessage = err
    });
  }

  fetchElementEffects(): void
  {
    this.synthelicService.getElementEffects
      ().subscribe({
        next: response =>
        {
          this.elementEffects = response.results as IElement[];
        },
        error: err => this.errorMessage = err
      });
  }

  fetchElementApplications(): void
  {
    this.synthelicService.getElementApplications().subscribe({
      next: response =>
      {
        this.elementApplications = response.results as IElement[];
      },
      error: err => this.errorMessage = err
    });
  }
}
