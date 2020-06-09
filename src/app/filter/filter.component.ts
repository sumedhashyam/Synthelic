import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

import { SynthelicService, AlertService, FilterService } from '@app/_services';
import { ICategory, IElement } from '@app/_models';
import { ModalService } from '@app/_modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit
{
  anyChkSelected: boolean;
  form: FormGroup;
  selectedCategories: FormArray;
  selectedEffects: FormArray;
  selectedApplications: FormArray;

  categories: ICategory[] = [];
  effects: IElement[] = [];
  applications: IElement[] = [];

  constructor(private formBuilder: FormBuilder, private router: Router, private synthelicService: SynthelicService,
    private alertService: AlertService, private filterService: FilterService, private modalService: ModalService)
  {

  }

  ngOnInit(): void
  {
    this.form = this.formBuilder.group({
      checkedCategories: this.formBuilder.array([]),
      checkedEffects: this.formBuilder.array([]),
      checkedApplications: this.formBuilder.array([])
    });

    this.fetchCategories();
    this.fetchEffects();
    this.fetchApplications();

    this.bindFormChange();
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  fetchCategories(): void
  {
    this.synthelicService.getCategories().subscribe({
      next: response =>
      {
        this.categories = response.results as ICategory[];
      },
      error: err => { this.alertService.error(err); }
    });
  }

  fetchEffects(): void
  {
    this.synthelicService.getElementEffects
      ().subscribe({
        next: response =>
        {
          this.effects = response.results as IElement[];
        },
        error: err => { this.alertService.error(err); }
      });
  }

  fetchApplications(): void
  {
    this.synthelicService.getElementApplications().subscribe({
      next: response =>
      {
        this.applications = response.results as IElement[];
      },
      error: err => { this.alertService.error(err); }
    });
  }

  bindFormChange(): void
  {
    this.form.valueChanges.subscribe(val =>
    {
      this.selectedCategories = this.f.checkedCategories as FormArray;
      this.selectedEffects = this.f.checkedEffects as FormArray;
      this.selectedApplications = this.f.checkedApplications as FormArray;

      this.anyChkSelected = this.selectedCategories?.length > 0 || this.selectedEffects?.length > 0 || this.selectedApplications?.length > 0;
    });
  }

  /*
  * Handle categories checkbox change and preserve selected one.
  *   
  * @param event - The event for the element checked.   
  */
  onCategoryChange(event)
  {
    const categories: FormArray = this.f.checkedCategories as FormArray;

    if (event.target.checked)
    {
      categories.push(new FormControl(event.target.value));
    } else
    {
      let i: number = 0;
      categories.controls.forEach((item: FormControl) =>
      {
        if (item.value == event.target.value)
        {
          categories.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  /*
  * Handle effects checkbox change and preserve selected one.
  *   
  * @param event - The event for the element checked.   
  */
  onEffectChange(event)
  {
    const effects: FormArray = this.f.checkedEffects as FormArray;

    if (event.target.checked)
    {
      effects.push(new FormControl(event.target.value));
    } else
    {
      let i: number = 0;
      effects.controls.forEach((item: FormControl) =>
      {
        if (item.value == event.target.value)
        {
          effects.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  /*
   * Handle applications checkbox change and preserve selected one.
   *   
   * @param event - The event for the element checked.   
   */
  onApplicationChange(event)
  {
    const applications: FormArray = this.f.checkedApplications as FormArray;

    if (event.target.checked)
    {
      applications.push(new FormControl(event.target.value));
    } else
    {
      let i: number = 0;
      applications.controls.forEach((item: FormControl) =>
      {
        if (item.value == event.target.value)
        {
          applications.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  onSubmit()
  {
    let filterParam = '';
    let route = this.router.url.replace(/\//g, '');
    switch (route.toLowerCase())
    {
      case 'experiences':
        filterParam = this.getFilterParamForExperience();
        break;

      case 'trends':
        filterParam = this.getFilterParamForTrend();
        break;
    }

    this.filterService.sendFilter(filterParam);
    this.closeModal('filterModal');
  }

  getFilterParamForTrend(): string
  {
    let filterParam = '';

    let sourceFilter;
    if (this.selectedCategories?.length > 0)
    {
      sourceFilter = `?source=${this.selectedCategories.controls.map(i => i.value).join('&source=')}`;
    }

    let effectFilter;
    if (this.selectedEffects?.length > 0)
    {
      let startingChar = sourceFilter !== undefined ? '&' : '?'
      effectFilter = `${startingChar}effect=${this.selectedEffects.controls.map(i => i.value).join('&effect=')}`;
    }

    let appFilter;
    if (this.selectedApplications?.length > 0)
    {
      let startingChar = sourceFilter !== undefined || effectFilter !== undefined ? '&' : '?'
      appFilter = `${startingChar}application=${this.selectedApplications.controls.map(i => i.value).join('&application=')}`;
    }

    if (sourceFilter)
    {
      filterParam = sourceFilter;
    }

    if (effectFilter)
    {
      filterParam = filterParam + effectFilter;
    }

    if (appFilter)
    {
      filterParam = filterParam + appFilter;
    }

    return filterParam;
  }

  getFilterParamForExperience(): string
  {
    let filterParam = '';

    let sourceFilter;
    if (this.selectedCategories?.length > 0)
    {
      sourceFilter = `&source=${this.selectedCategories.controls.map(i => i.value).join('&source=')}`;
    }

    let effectFilter;
    if (this.selectedEffects?.length > 0)
    {
      effectFilter = `&effect=${this.selectedEffects.controls.map(i => i.value).join('&effect=')}`;
    }

    let appFilter;
    if (this.selectedApplications?.length > 0)
    {
      appFilter = `&application=${this.selectedApplications.controls.map(i => i.value).join('&application=')}`;
    }

    if (sourceFilter)
    {
      filterParam = sourceFilter;
    }

    if (effectFilter)
    {
      filterParam = filterParam + effectFilter;
    }

    if (appFilter)
    {
      filterParam = filterParam + appFilter;
    }

    return filterParam;
  }

  closeModal(id: string)
  {
    this.modalService.close(id);
  }
}