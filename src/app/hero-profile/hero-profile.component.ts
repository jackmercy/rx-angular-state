import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HeroService } from '../hero.service';
import { HeroProfile } from '../heroes/heroes.component';
import { HeroState } from '../store/hero.reducer';
import { getHeroDetails, getHeroDetailsSuccess } from '../store/hero.actions';
import { selectHeroDetails } from '../store/hero.selectors';
@Component({
  selector: 'app-hero-profile',
  templateUrl: './hero-profile.component.html',
  styleUrls: ['./hero-profile.component.scss']
})
export class HeroProfileComponent implements OnInit {
  hero$: Observable<HeroProfile>;

  get heroId(): string {
    return this.activatedRoute.snapshot.params?.['id'];
  }

  constructor(
    private store: Store<HeroState>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private changeDef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    if (this.heroId) {
      this.store.dispatch(getHeroDetails({ id: this.heroId }));
      this.hero$ = this.store.pipe(select(selectHeroDetails));
      this.changeDef.markForCheck();
    }
  }

  goBack(): void {
    this.router.navigate(['./app']);
    this.changeDef.markForCheck();
  }
}
