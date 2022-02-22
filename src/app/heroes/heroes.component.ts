import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RxState } from '@rx-angular/state';
import { NgxSpinnerService } from 'ngx-spinner';
import { concatMap, startWith, Subject, tap } from 'rxjs';
import { HeroService } from '../hero.service';

export interface HeroProfile {
  id: string;
  url: string;
  name: string;
  age?: number;
}

interface ComponentState {
  heroes: HeroProfile[];
}

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent extends RxState<ComponentState> implements OnInit {
  public heroForm: FormGroup;
  readonly heroes$ = this.select('heroes');
  readonly createClick$ = new Subject<Event>();
  readonly deleteClick$ = new Subject<string>();

  constructor(
    private heroService: HeroService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private router: Router,
    private changeDef: ChangeDetectorRef
  ) {
    super();
    this.spinner.show('list');
    this.connect('heroes', this.heroService.getHeroesList().pipe(tap(() => this.spinner.hide('list'))));
    this.hold(this.deleteClick$.pipe(concatMap((id) => {
      this.spinner.show('list');
      return this.heroService.deleteHero(id).pipe(tap(() => this.spinner.hide('list')));
    })));
  }

  ngOnInit(): void {
    this.buildHeroForm();
    this.hold(this.createClick$.pipe(startWith(true)), (value) => {
      if (typeof value !== 'boolean') {
        this.spinner.show('create');
        return this.heroService.createHero(this.heroForm?.value).subscribe(
          (created) => {
            console.log(created);
            this.spinner.hide('create');
            this.heroForm?.reset();
            this.changeDef.markForCheck();
          }
        );
      }
    })
    this.changeDef.markForCheck();
  }

  buildHeroForm(): void {
    this.heroForm = this.formBuilder.group({
      url: this.formBuilder.control(''),
      name: this.formBuilder.control(''),
      age: this.formBuilder.control(''),
    });
  }

  goToHeroDetails(id: string): void {
    this.router.navigate(['./detail', id]);
    this.changeDef.markForCheck();
  }
}
