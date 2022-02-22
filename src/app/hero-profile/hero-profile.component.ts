import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RxState } from '@rx-angular/state';
import { HeroService } from '../hero.service';
import { HeroProfile } from '../heroes/heroes.component';

interface ComponentState {
  hero: HeroProfile;
}

@Component({
  selector: 'app-hero-profile',
  templateUrl: './hero-profile.component.html',
  styleUrls: ['./hero-profile.component.scss']
})
export class HeroProfileComponent extends RxState<ComponentState> implements OnInit {
  hero$ = this.select('hero');

  get heroId(): string {
    return this.activatedRoute.snapshot.params?.['id'];
  }

  constructor(
    private heroService: HeroService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private changeDef: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {
    if (this.heroId) {
      this.connect('hero', this.heroService.getHeroDetails(this.heroId));
      this.changeDef.markForCheck();
    }
  }

  goBack(): void {
    this.router.navigate(['./app']);
    this.changeDef.markForCheck();
  }
}
