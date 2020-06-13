import { Component, OnInit, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { SynthelicService, AlertService, FilterService } from '@app/_services';
import { Element, ElementResponse, Effect, Synergy } from '@app/_models';

@Component({
  selector: 'app-trend',
  templateUrl: './trend.component.html',
  styleUrls: ['./trend.component.css']
})
export class TrendComponent implements OnInit, OnDestroy
{
  subscription: Subscription;

  elements: Element[] = [];
  effects: Effect[] = [];
  synergies: Synergy[] = [];

  selectedElement: ElementResponse;
  selectedIndex: number = null;

  isElementProcessed: boolean;
  isEffectProcessed: boolean;
  isSynergyProcessed: boolean;

  constructor(private synthelicService: SynthelicService, private alertService: AlertService, private filterService: FilterService)
  {
    // subscribe to filter
    this.subscription = this.filterService.onFilter().subscribe(filterParam =>
    {
      this.fetchValuesWithFilter(filterParam?.filter);
    });
  }

  ngOnInit(): void
  {
    this.fetchElements();
    this.fetchEffects();
    this.fetchSynergies();
  }

  ngOnDestroy(): void
  {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  fetchValuesWithFilter(filter: string)
  {
    console.log(`Trend filter: ${filter}`);
    this.isElementProcessed = false;
    this.isEffectProcessed = false;
    this.isSynergyProcessed = false;

    this.elements = [];
    this.effects = [];
    this.synergies = [];

    this.fetchElements(filter);
    this.fetchEffects(filter);
    this.fetchSynergies(filter);
  }

  fetchElements(filter?: string): void
  {
    this.synthelicService.getElements(filter).subscribe({
      next: response =>
      {
        this.elements = response.results as Element[];
        if (this.elements.length > 0)
        {
          this.showElementDetail(this.elements[0], 0);
        }
        else
        {
          this.alertService.warn('No elements found', { autoClose: true });
        }
      },
      error: err =>
      {
        this.alertService.error(err, { autoClose: true });
        this.isElementProcessed = true;
      },
      complete: () =>
      {
        this.isElementProcessed = true;
      }
    });
  }

  fetchEffects(filter?: string): void
  {
    this.synthelicService.getEffects(filter).subscribe({
      next: response =>
      {
        this.effects = response.results as Effect[];
        if (this.effects.length === 0)
        {
          this.alertService.warn('No effects found', { autoClose: true });
        }
      },
      error: err =>
      {
        this.alertService.error(err, { autoClose: true });
        this.isEffectProcessed = true;
      },
      complete: () =>
      {
        this.isEffectProcessed = true;
      }
    });
  }

  fetchSynergies(filter?: string): void
  {
    this.synthelicService.getSynergies(filter).subscribe({
      next: response =>
      {
        this.synergies = response.results as Synergy[];
        if (this.synergies.length === 0)
        {
          this.alertService.warn('No synergies found', { autoClose: true });
        }
      },
      error: err =>
      {
        this.alertService.error(err, { autoClose: true });
        this.isSynergyProcessed = true;
      },
      complete: () =>
      {
        this.isSynergyProcessed = true;
      }
    });
  }

  showElementDetail(element: Element, index: number)
  {
    this.selectedIndex = index;
    this.selectedElement = {
      id: element.id,
      imageUrl: element.image,
      commonName: element.common_name,
      scientificName: element.scientific_name,
      elementNames: element.element_names.map(s => s.name).join(', '),
      elementSources: element.element_sources.map(s => s.title).join(', '),
      elementEffects: element.element_effects.map(s => s.title).join(', '),
      elementApplications: element.element_applications.map(s => s.title).join(', ')
    };
  }
}
