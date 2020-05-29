import { Component, OnInit } from '@angular/core';
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
  title: string = '';
  notes: string = '';
  ex_weight: string = '';
  ex_age: string = '';
  gender: string = '';
  set_before: string;
  set_expectations: string;
  setting_location: string;
  setting_weather: string;
  setting_atmosphere: string;
  setting_companions: string;
  setting_other: string;
  effects_physical: string;
  effects_emotional: string;
  effects_semantic: string;
  effects_meta_physical: string;
  elements_array: any = [];
  synergies_array: any = [];
  effects_array: any = [];
  Error: boolean = false;
  error_msg: string;

  constructor(private synthelicService: SynthelicService) { }

  ngOnInit(): void
  {
    this.fetchGenders();
    this.fetchCategories();
    this.fetchElementNames();
    this.fetchElementEffects();
    this.fetchElementApplications();
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

  addmoreclick(): void
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
  genderFun(event): void
  {
    this.gender = event.target.value
    console.log(event.target.value);
  }
  submitInfo(info): void
  {
    if (info == 'personal')
    {
      this.experience = {
        "title": this.title,
        "explorer_weight": this.ex_weight,
        "explorer_age": this.ex_age,
        "explorer_gender": this.gender,
        "set_before": this.set_before,
        "set_expectations": this.set_expectations,
        "setting_location": this.setting_location,
        "setting_weather": this.setting_weather,
        "setting_atmosphere": this.setting_atmosphere,
        "setting_companions": this.setting_companions,
        "setting_other": this.setting_other,
        "effects_physical": this.effects_physical,
        "effects_emotional": this.effects_emotional,
        "effects_semantic": this.effects_semantic,
        "effects_meta_physical": this.effects_meta_physical,
        "experience_elements": this.elements_array,
        "experience_synergies": this.synergies_array,
        "experience_effects": this.effects_array,
      };
      console.log(this.experience);
    }
    else
    {
      this.experience = {
        "title": this.title,
        "explorer_weight": this.ex_weight,
        "explorer_age": this.ex_age,
        "explorer_gender": this.gender,
        "set_before": this.set_before,
        "set_expectations": this.set_expectations,
        "setting_location": this.setting_location,
        "setting_weather": this.setting_weather,
        "setting_atmosphere": this.setting_atmosphere,
        "setting_companions": this.setting_companions,
        "setting_other": this.setting_other,
        "effects_physical": this.effects_physical,
        "effects_emotional": this.effects_emotional,
        "effects_semantic": this.effects_semantic,
        "effects_meta_physical": this.effects_meta_physical,
        "experience_elements": this.elements_array,
        "experience_synergies": this.synergies_array,
        "experience_effects": this.effects_array,
      };
      console.log(this.experience);
    }
  }
}
