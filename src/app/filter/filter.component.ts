import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

import { SynthelicService, AlertService } from '@app/_services';
import { ICategory, IElement } from '@app/_models';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit
{
  anyChkSelected: boolean;
  form: FormGroup
  categories: ICategory[] = [];
  effects: IElement[] = [];
  applications: IElement[] = [];

  constructor(private synthelicService: SynthelicService, private alertService: AlertService, private formBuilder: FormBuilder)
  {

  }

  ngOnInit(): void
  {
    this.form = this.formBuilder.group({
      selectedCategories: this.formBuilder.array([]),
      selectedEffects: this.formBuilder.array([]),
      selectedApplications: this.formBuilder.array([])
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
      const categories: FormArray = this.f.selectedCategories as FormArray;
      const effects: FormArray = this.f.selectedEffects as FormArray;
      const applications: FormArray = this.f.selectedApplications as FormArray;

      this.anyChkSelected = categories?.length > 0 || effects?.length > 0 || applications?.length > 0;
    });
  }

  /*
  * Handle categories checkbox change and preserve selected one.
  *   
  * @param event - The event for the element checked.   
  */
  onCategoryChange(event)
  {
    const categories: FormArray = this.f.selectedCategories as FormArray;

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
    const effects: FormArray = this.f.selectedEffects as FormArray;

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
    const applications: FormArray = this.f.selectedApplications as FormArray;

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
    console.log(this.form.value);
  }
}
