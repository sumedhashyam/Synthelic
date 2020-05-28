import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createpage',
  templateUrl: './createpage.component.html',
  styleUrls: ['./createpage.component.css']
})
export class CreatepageComponent implements OnInit {
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
    "setting_companions":"",
    "setting_other": "",
    "effects_physical": "",
    "effects_emotional": "",
    "effects_semantic": "",
    "effects_meta_physical": "",
    "experience_elements":"",
    "experience_synergies":"",
    "experience_effects": "",
  };
  addmore: boolean = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  addmoreclick() {
    if (this.addmore == false) {
      this.addmore = true;
    }
    else {
      this.addmore = false;
    }
  }
}
