import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HeroProfile } from '../heroes/heroes.component';
import { HeroProfileComponentStore } from './hero-profile.component-store';

@Component({
  selector: 'app-hero-profile',
  templateUrl: './hero-profile.component.html',
  styleUrls: ['./hero-profile.component.scss'],
  providers: [HeroProfileComponentStore]
})
export class HeroProfileComponent implements OnInit {
  hero$: Observable<HeroProfile>;

  get heroId(): string {
    return this.activatedRoute.snapshot.params?.['id'];
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private readonly componentStore: HeroProfileComponentStore,
    private changeDef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    if (this.heroId) {
      this.componentStore.getHero(this.heroId);
      this.hero$ = this.componentStore.selectedHero();

      this.changeDef.markForCheck();
    }
  }

  goBack(): void {
    this.router.navigate(['./app']);
    this.changeDef.markForCheck();
  }
}
