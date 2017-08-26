import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { Filter } from '../global-types';
import { Helper } from '../helper';
import { CITIES, PROFESSIONS } from '../global-consts';
import { Option } from '../global-types';

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit {
  regions: Option[] = CITIES;
  professions: Option[] = PROFESSIONS;
  searchForm: FormGroup;
  searchType: string = 'jobs';
  isSelected: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      region: undefined,
      profession: undefined
    });
  }

  public selected(type: string): void {
    this.searchType = type;
    this.isSelected = true;
  }

  public search(): void {
    let params: Filter = new Filter();

    if (Helper.submitForm(this.searchForm, params)) {
      params.page = 1;
      this.router.navigate(['/' + this.searchType, params]);
    }
  }

  public back(): void {
    this.isSelected = false;
  }
}
