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

  constructor(private synthelicService: SynthelicService, private alertService: AlertService) { }

  @ViewChildren('anchor') anchors: QueryList<any>;

  ngOnInit(): void
  {
    this.fetchElements();
    this.fetchEffects();
    this.fetchSynergies();
  }

  ngAfterViewInit()
  {
    // Show first element's preview
    this.anchors.changes.subscribe(t =>
    {
      if (this.elements.length > 0)
      {
        //this.showElementDetail(this.elements[0].id);
      }
    })
  }

  fetchElements(): void
  {
    this.synthelicService.getElements().subscribe({
      next: response =>
      {
        this.elements = response.results as Element[];
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

  showElementDetail(id: number)
  {
    let element = this.elements.find(e => e.id == id);
    console.log(element);

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
