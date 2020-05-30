import { Component, OnInit } from '@angular/core';
import { SynthelicService } from '../services/synthelic.service';
import { IGender } from '../services/IGender';
import { ICategory } from '../services/ICategory';
import { IElementNames } from '../services/IElementNames';
import { IElementName } from '../services/IElementName';
import { IElement } from '../services/IElement';
import { IExperience } from '../services/IExperience';
import { IResponse } from '../services/IResponse';
import { IExperienceElement } from './IExperienceElement';
import { IExperienceEffect } from './IExperienceEffect';
import { IExperienceSynergy } from './IExperienceSynergy';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit
{
  errorMessage: string;
  apiElementNamesUrl: string;

  // API response holder
  genders: IGender[] = [];
  categories: ICategory[] = [];
  elementNames: IElementName[] = [];
  elementEffects: IElement[] = [];
  elementApplications: IElement[] = [];

  // Toggle properties
  hideMore: boolean = false;
  hideExplorer: boolean = false;
  hideSet: boolean = false;
  hideSetting: boolean = false;
  hideEffectsInDetail: boolean = false;
  hideReportNotes: boolean = false;

  // Form elements
  title: string = '';

  // Use for autocomplete
  // Ref - https://www.npmjs.com/package/angular-ng-autocomplete
  keyword = 'Name';

  // Elements-->Substance
  elementName: string;
  elementType: string;
  elementQuantity: string;
  categoryEffect: string = null;
  categoryApplication: string = null;
  selectedElementNameId: number;
  elements: IExperienceElement[] = [];

  // Effects
  effectName: string;
  effects: IExperienceEffect[] = [];

  // Synergies
  synergyUrl: string;
  synergyCategory: string = null;
  synergies: IExperienceSynergy[] = [];

  // Notes
  notes: string = '';

  // Explorer
  expWeight: string = '';
  expAge: string = '';
  expGender: string = null;

  // Set
  setBefore: string;
  setExpectation: string;

  // Setting
  settingLocation: string;
  settingWeather: string;
  settingAtmosphere: string;
  settingCompanion: string;
  settingOther: string;

  // Effects in detail
  effectsPhysical: string;
  effectsEmotional: string;
  effectsSemantic: string;
  effectsMetaPhysical: string;

  Error: boolean = false;
  errorObj: string = null;

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

  elementNameSelected(element: IElementName)
  {
    this.selectedElementNameId = element.Id;
    this.elementName = element.Name;
  }

  toggleReportNotes(): void
  {
    this.hideReportNotes = !this.hideReportNotes;
  }

  toggleMoreDetails(): void
  {
    this.hideMore = !this.hideMore;
  }

  toggleExplorer(): void
  {
    this.hideExplorer = !this.hideExplorer;
  }

  toggleSet(): void
  {
    this.hideSet = !this.hideSet;
  }

  toggleSetting(): void
  {
    this.hideSetting = !this.hideSetting;
  }

  toggleEffectsInDetail(): void
  {
    this.hideEffectsInDetail = !this.hideEffectsInDetail;
  }

  addElement(): void
  {
    if (this.selectedElementNameId != undefined && this.selectedElementNameId != 0)
    {
      if (this.elements.length <= 9)
      {
        const expElement: IExperienceElement = {
          element: this.selectedElementNameId,
          name: this.elementName['Name'],
          type: this.elementType,
          quantity: this.elementQuantity,
          category_effect: this.categoryEffect,
          category_application: this.categoryApplication
        }

        this.elements.push(expElement);
        this.reset('element');
      }
      else
      {
        this.Error = true;
        this.errorObj = "Max limit :10";
        setTimeout(() => { this.Error = false }, 100000);
      }
    }
  }

  removeElement(expElement: IExperienceElement): void
  {
    // Ref - https://medium.com/@benjamincherion/how-to-break-an-array-in-javascript-6d3a55bd06f6
    this.elements.some((element, index) =>
    {
      if (element === expElement)
      {
        this.elements.splice(index, 1);
        return true;
      }
    });
  }

  addEffect(): void
  {
    if (this.effectName)
    {
      if (this.effects.length <= 9)
      {
        const expEffect: IExperienceEffect = {
          effect: this.effectName
        }
        this.effects.push(expEffect);
        this.effectName = '';
      }
      else
      {
        this.Error = true;
        this.errorObj = "Max limit :10";
        setTimeout(() => { this.Error = false }, 100000);
      }
    }
  }

  removeEffect(expEffect: IExperienceEffect): void
  {
    this.effects.some((effect, index) =>
    {
      if (effect === expEffect)
      {
        this.effects.splice(index, 1);
        return true;
      }
    });
  }

  addSynergy()
  {
    if (this.synergyCategory && this.synergyUrl)
    {
      if (this.synergies.length <= 9)
      {
        let categoryTitle = '';
        let category = this.categories.find(c => c.id == this.synergyCategory);
        if (category)  
        {
          categoryTitle = category.title;
        }

        const expSynergy: IExperienceSynergy = {
          category: this.synergyCategory,
          categoryName: categoryTitle,
          url: this.synergyUrl
        }
        this.synergies.push(expSynergy);
        this.reset('synergies');
      }
      else
      {
        this.Error = true;
        this.errorObj = "Max limit :10";
        setTimeout(() => { this.Error = false }, 100000);
      }
    }
  }

  removeSynergy(expSynergy: IExperienceSynergy): void
  {
    this.synergies.some((synergy, index) =>
    {
      if (synergy === expSynergy)
      {
        this.synergies.splice(index, 1);
        return true;
      }
    });
  }

  // remove(item, type)
  // {
  //   if (type == 'elements')
  //   {
  //     this.elements.forEach((value, index) =>
  //     {
  //       if (value.name == item)
  //       {
  //         this.elements.splice(index, 1);
  //       }
  //     });
  //   }
  //   else if (type == 'effects')
  //   {
  //     this.effects.forEach((value, index) =>
  //     {
  //       if (value.effect == item)
  //       {
  //         this.effects.splice(index, 1);
  //       }
  //     });
  //   }
  //   else
  //   {
  //     this.synergies.forEach((value, index) =>
  //     {
  //       if (value.url == item)
  //       {
  //         this.synergies.splice(index, 1);
  //       }
  //     });
  //   }
  // }

  saveExperience(info): void
  {
    if (info == 'personal' && this.title != undefined && this.title != '')
    {
      const experience: IExperience = {
        title: this.title,
        explorer_weight: this.expWeight,
        explorer_age: this.expAge,
        explorer_gender: this.expGender,
        set_before: this.setBefore,
        set_expectations: this.setExpectation,
        setting_location: this.settingLocation,
        setting_weather: this.settingWeather,
        setting_atmosphere: this.settingAtmosphere,
        setting_companions: this.settingCompanion,
        setting_other: this.settingOther,
        effects_physical: this.effectsPhysical,
        effects_emotional: this.effectsEmotional,
        effects_semantic: this.effectsSemantic,
        effects_meta_physical: this.effectsMetaPhysical,
        experience_elements: this.elements,
        experience_synergies: this.synergies,
        experience_effects: this.effects,
      };
      console.log(experience);

      this.synthelicService.saveExperience(experience).subscribe({
        next: response =>
        {
          console.log(response);
        },
        error: err => { this.Error = true; this.errorMessage = err; console.log(this.errorMessage); },
        complete: () =>
        {
          this.reset('submit');
        }
      });
    }
    else
    {

    }
  }

  reset(type: string)
  {
    switch (type)
    {
      case 'submit':
        this.title = '';
        this.notes = '';
        this.expWeight = '';
        this.expAge = '';
        this.expGender = null;
        this.setBefore = '';
        this.setExpectation = '';
        this.settingLocation = '';
        this.settingWeather = '';
        this.settingAtmosphere = '';
        this.settingCompanion = '';
        this.settingOther = '';
        this.effectsPhysical = '';
        this.effectsEmotional = '';
        this.effectsSemantic = '';
        this.effectsMetaPhysical = '';
        this.elements = [];
        this.synergies = [];
        this.effects = [];
        this.elementName = '';
        this.elementType = '';
        this.elementQuantity = '';
        this.effectName = '';
        this.synergyUrl = '';
        this.categoryEffect = null;
        this.categoryApplication = null;
        break;

      case 'element':
        this.elementName = '';
        this.elementType = '';
        this.elementQuantity = '';
        this.categoryEffect = null;
        this.categoryApplication = null;
        this.selectedElementNameId = 0;
        break;

      case 'synergies':
        this.synergyCategory = null;
        this.synergyUrl = '';
        break;
    }
  }
}
