import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { HeroesComponentStore } from './heroes.component-store';

export interface HeroProfile {
  id: string;
  url: string;
  name: string;
  age?: number;
}

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
  providers: [HeroesComponentStore]
})
export class HeroesComponent implements OnInit {
  public heroForm: FormGroup;
  public heroes$: Observable<HeroProfile[]>;

  constructor(
    private componentStore: HeroesComponentStore,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private router: Router,
    private changeDef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.buildHeroForm();
    this.spinner.show('list');
    this.componentStore.getHeroes();
    this.heroes$ = this.componentStore.selectHeroes();
    this.changeDef.markForCheck();
  }

  buildHeroForm(): void {
    this.heroForm = this.formBuilder.group({
      url: this.formBuilder.control(''),
      name: this.formBuilder.control(''),
      age: this.formBuilder.control(''),
    });
  }

  createHero(): void {
    this.spinner.show('create');
    const data = this.heroForm.value;
    this.componentStore.createHero(data);
    this.heroForm.reset();
    this.changeDef.markForCheck();
  }

  deleteHero(id: string): void {
    this.spinner.show('list');
    this.componentStore.deleteHero(id);
    this.changeDef.markForCheck();
  }

  goToHeroDetails(id: string): void {
    this.router.navigate(['./detail', id]);
    this.changeDef.markForCheck();
  }
}
