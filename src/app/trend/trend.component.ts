import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';

import { SynthelicService, AlertService } from '@app/_services';
import { Element, ElementResponse, Effect, Synergy } from '@app/_models';

@Component({
  selector: 'app-trend',
  templateUrl: './trend.component.html',
  styleUrls: ['./trend.component.css']
})
export class TrendComponent implements OnInit
{
  elements: Element[] = [];
  effects: Effect[] = [];
  synergies: Synergy[] = [];

  selectedElement: ElementResponse;
  selectedIndex: number = null;

  constructor(private synthelicService: SynthelicService, private alertService: AlertService) { }

  ngOnInit(): void
  {
    this.fetchElements();
    this.fetchEffects();
    this.fetchSynergies();
  }

  fetchElements(): void
  {
    this.synthelicService.getElements().subscribe({
      next: response =>
      {
        this.elements = response.results as Element[];
        if (this.elements.length > 0)
        {
          this.showElementDetail(this.elements[0], 0);
        }
      },
      error: err =>
      {
        this.alertService.error(err);
      }
    });
  }

  fetchEffects(): void
  {
    this.synthelicService.getEffects().subscribe({
      next: response =>
      {
        this.effects = response.results as Effect[];
      },
      error: err =>
      {
        this.alertService.error(err);
      }
    });
  }

  fetchSynergies(): void
  {
    this.synthelicService.getSynergies().subscribe({
      next: response =>
      {
        this.synergies = response.results as Synergy[];
      },
      error: err =>
      {
        this.alertService.error(err);
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
