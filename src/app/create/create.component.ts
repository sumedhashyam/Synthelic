import { Component, OnInit } from '@angular/core';
import { SynthelicService } from '@app/_services/synthelic.service';
import { IGender } from '@app/_models/IGender';
import { ICategory } from '@app/_models/ICategory';
import { IElementNames } from '@app/_models/IElementNames';
import { IElementName } from '@app/_models/IElementName';
import { IElement } from '@app/_models/IElement';
import { IExperience } from '@app/_models/IExperience';
import { IExperienceElement } from '@app/_models/IExperienceElement';
import { IExperienceEffect } from '@app/_models/IExperienceEffect';
import { IExperienceSynergy } from '@app/_models/IExperienceSynergy';
import { NgForm, NgModel } from '@angular/forms';
import { IError } from '@app/_models/IError';
import { IResponse } from '@app/_models/IResponse';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit
{
  showLoader: boolean = false;
  apiElementNamesUrl: string;

  // API response holder
  genders: IGender[] = [];
  categories: ICategory[] = [];
  elementNames: IElementName[] = [];
  elementEffects: IElement[] = [];
  elementApplications: IElement[] = [];

  // Toggle properties
  hideMore: boolean = true;
  hideExplorer: boolean = true;
  hideSet: boolean = true;
  hideSetting: boolean = true;
  hideEffectsInDetail: boolean = true;
  hideReportNotes: boolean = true;

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
  elementNameSearchTxt: string;
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

  // Error handling
  errorMessage: string;
  showError: boolean = false;
  errors: IError[] = [];
  Type:any;
  constructor(private synthelicService: SynthelicService)
  {
   
  }

  ngOnInit(): void
  {    
    this.showLoader = true;
    this.fetchGenders();
    this.fetchCategories();
    this.fetchElementNames();
    this.fetchElementEffects();
    this.fetchElementApplications();
    this.showLoader = false;
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

  showErrors(error: IError)
  {
    this.showError = true;
    this.errors.push(error);
    setTimeout(() => { this.showError = false, this.errors = [] }, 2000);
  }

  elementNameSelected(element: IElementName)
  {
    this.selectedElementNameId = element.Id;
    this.elementName = element.Name;
    this.elementNameSearchTxt = element.Name;
  }

  elementNameChange(searchTxt: string)
  {
    this.elementNameSearchTxt = searchTxt;
  }

  validateElement(): void
  {
    const element = this.elementNames.find(e => e.Name === this.elementNameSearchTxt);
    if (element)
    {
      this.selectedElementNameId = element.Id;
      this.elementName = element.Name;
    }
    else
    {
      this.selectedElementNameId = 0;
      this.elementName = '';
    }
  }

  addElement(): void
  {
    this.validateElement();

    if (this.selectedElementNameId != undefined && this.selectedElementNameId > 0)
    {
      if (this.elements.length <= 9)
      {
        const expElement: IExperienceElement = {
          element: this.selectedElementNameId,
          name: this.elementName,
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
        const error: IError = {
          name: 'MaxElement10',
          message: 'Maximum 10 element allowed'
        }
        this.showErrors(error);
      }
    }
    else
    {
      const error: IError = {
        name: 'ElementNotFound',
        message: `The element '${this.elementNameSearchTxt}' not found.`
      }
      if (!this.elementNameSearchTxt)
      {
        error.message = 'Please enter element name';
      }
      this.showErrors(error);
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
        const error: IError = {
          name: 'MaxEffect10',
          message: 'Maximum 10 effect allowed'
        }
        this.showErrors(error);
      }
    }
    else
    {
      let error = this.errors.find(e => e.name === 'effects');
      if (!error)
      {
        error = {
          name: 'effects',
          message: 'Effect name is required'
        }
        this.showErrors(error);
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
    let error = this.errors.find(e => e.name === 'synergyUrl');
    if (this.synergyCategory && this.synergyUrl)
    {
      if (this.synergies.length <= 9)
      {
        if (!this.isValidUrl(this.synergyUrl) && !error)
        {
          error = {
            name: 'synergyUrl',
            message: 'Please provide correct url'
          }
          this.showErrors(error);
          return;
        }

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
        const error: IError = {
          name: 'MaxSynergy10',
          message: 'Maximum 10 synergy allowed'
        }
        this.showErrors(error);
      }
    }
    else
    {
      if (!error)
      {
        error = {
          name: 'synergyUrl',
          message: 'Synergy url and category is required'
        }
        this.showErrors(error);
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

  checkForRequired(field: NgModel, error: IError, index: number): void
  {
    if (field.errors && (error === null || error === undefined))
    {
      error = {
        name: field.name,
        message: `${field.name} is required`
      }
      this.showErrors(error);
    }
    else
    {
      if (!field.errors)
      {
        this.errors.splice(index, 1);
        this.showError = this.errors.length > 0;
      }
    }
  }

  isValidUrl(url: string)
  {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(url);
  }

  saveExperience(info: string): void
  {
    if (this.elements.length === 0)
    {
      let error = this.errors.find(e => e.name === 'MustHaveOneElement');
      if (!error)
      {
        error = {
          name: 'MustHaveOneElement',
          message: 'Please add at least one element'
        }
        this.showErrors(error);
      }
      return;
    }

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
      public: false
    };

    if (info == 'public')
    {
      experience.public = true;
    }

    console.log(JSON.stringify(experience));
    this.synthelicService.saveExperience(experience).subscribe({
      next: response =>
      {
        alert('Experience saved successfully!');
        console.log(response);
      },
      error: err =>
      {
        console.log(err);
        let error: IError = {
          name: 'ErrorOnSave',
          message: err
        }
        this.showErrors(error);

      },
      complete: () =>
      {
        this.reset('submit');
      }
    });
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
