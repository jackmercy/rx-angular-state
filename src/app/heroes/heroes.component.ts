import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { delay } from 'rxjs';
import { HeroService } from '../hero.service';

export interface HeroProfile {
  url: string;
  name: string;
}

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  public heroForm: FormGroup;
  public heroes: HeroProfile[] = [];
 // TODO: add hero details page to display hero infor -> that page will need component store.
  constructor(
    private heroService: HeroService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private changeDef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.buildHeroForm();
    this.spinner.show('list');
    this.changeDef.markForCheck();

    this.heroService.getHeroesList().pipe(delay(500)).subscribe(
      (heroes: HeroProfile[]) => {
        this.heroes = heroes;
        this.spinner.hide('list');
        this.changeDef.markForCheck();
      }
    )
  }

  buildHeroForm(): void {
    this.heroForm = this.formBuilder.group({
      url: this.formBuilder.control(''),
      name: this.formBuilder.control('', Validators.required)
    });
  }

  createHero(): void {
    const data = this.heroForm.value;
    this.spinner.show('create');
    this.heroService.createHero(data).subscribe(
      resp => {
        if (resp) {
          // hide spinner.
          this.heroForm.reset();
          this.spinner.hide('create');
          this.changeDef.markForCheck();
        }
      }
    );
  }

  deleteHero(index: number): void {
    this.spinner.show('list');
    this.heroService.deleteHero(index).subscribe(
      resp => {
        if (resp) {
          // hide spinner.
          this.spinner.hide('list');
          this.changeDef.markForCheck();
        }
      }
    );
  }
}
