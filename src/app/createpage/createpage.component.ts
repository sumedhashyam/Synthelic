import { Component, OnInit } from '@angular/core';
import { SynthelicService } from '../services/synthelic.service';
import { IGender } from '../services/IGender';
import { ICategory } from '../services/ICategory';
import { IElementNames } from '../services/IElementNames';
import { IElementName } from '../services/IElementName';
import { IElement } from '../services/IElement';
import { IExperience } from '../services/IExperience';
import { IResponse } from '../services/IResponse';

@Component({
  selector: 'app-createpage',
  templateUrl: './createpage.component.html',
  styleUrls: ['./createpage.component.css']
})
export class CreatePageComponent implements OnInit
{
  errorMessage: string;
  apiElementNamesUrl: string;

  // API response holder
  genders: IGender[] = [];
  categories: ICategory[] = [];
  elementNames: IElementName[] = [];
  elementEffects: IElement[] = [];
  elementApplications: IElement[] = []; 

  selectedElementNameId: number;

  experience: IExperience[];
  addmore: boolean = false;
  explorer: boolean = false;
  set: boolean = false;
  setting: boolean = false;
  effects: boolean = false;
  reportNotes: boolean = false;
  category: string = null;
  title: string = '';
  notes: string = '';
  ex_weight: string = '';
  ex_age: string = '';
  gender: string = null;
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
  element_name: string;
  element_type: string;
  element_quantity: string;
  effects_name: string;
  url: string;
  element_describe: string = null;
  element_helpe: string = null;

  // Use for autocomplete
  // Ref - https://www.npmjs.com/package/angular-ng-autocomplete
  keyword = 'Name';

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
    let response: IResponse;

    this.synthelicService.getElementNames(this.apiElementNamesUrl).subscribe({
      next: resp =>
      {
        response = resp;
        let elementNames = response.results as IElementNames[];

        elementNames.forEach(en =>
        {
          en.names.forEach(name =>
          {
            const eName: IElementName = {
              Id: en.id,
              Name: name
            };
            this.elementNames.push(eName);
          })
        });
      },
      error: err => this.errorMessage = err,
      complete: () =>
      {
        if (response && response.next)
        {
          this.apiElementNamesUrl = response.next;
          this.fetchElementNames();
        }
      }
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

  elementNameSelected(element:IElementName)
  {
    this.selectedElementNameId=element.Id;
  }

  upDownClick(type): void
  {
    if (type == 'addmore')
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
    else if (type == 'explorer')
    {
      if (this.explorer == false)
      {
        this.explorer = true;
      }
      else
      {
        this.explorer = false;
      }
    }
    else if (type == 'set')
    {
      if (this.set == false)
      {
        this.set = true;
      }
      else
      {
        this.set = false;
      }
    }
    else if (type == 'setting')
    {
      if (this.setting == false)
      {
        this.setting = true;
      }
      else
      {
        this.setting = false;
      }
    }
    else if (type == 'effects')
    {
      if (this.effects == false)
      {
        this.effects = true;
      }
      else
      {
        this.effects = false;
      }
    }
    else if (type == 'reportNotes')
    {
      if (this.reportNotes == false)
      {
        this.reportNotes = true;
      }
      else
      {
        this.reportNotes = false;
      }
    }

  }
  submitInfo(info): void
  {
    if (info == 'personal')
    {
      this.experience = [{
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
      }];
      console.log(this.experience);
    }
    else
    {
      this.experience = [{
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
      }];
      console.log(this.experience);
    }
  }
  elementAdd()
  {
    var obj = {
      "element": this.selectedElementNameId,
      "name": this.element_name,
      "type": this.element_type,
      "quantity": this.element_quantity,
      "category_effect":this.element_describe,
      "category_application":this.element_helpe
    }
    this.elements_array.push(obj);
    console.log(this.elements_array);

    // Reset
    this.selectedElementNameId = 0;
  }
  effectsAdd()
  {
    var obj = {
      "effects": this.effects_name
    }
    this.effects_array.push(obj);
    console.log(this.effects_array);
  }
  synergiesAdd()
  {
    var obj = {
      "category": this.category,
      "url": this.url
    }
    this.synergies_array.push(obj);
    console.log(this.synergies_array);
  }
  remove(item, type)
  {
    if (type == 'elements')
    {
      this.elements_array.forEach((value, index) =>
      {
        if (value.name == item)
        {
          this.elements_array.splice(index, 1);
        }
      });
    }
    else if (type == 'effects')
    {
      this.effects_array.forEach((value, index) =>
      {
        if (value.effects == item)
        {
          this.effects_array.splice(index, 1);
        }
      });
    }
    else
    {
      this.synergies_array.forEach((value, index) =>
      {
        if (value.url == item)
        {
          this.synergies_array.splice(index, 1);
        }
      });
    }
  }
}
