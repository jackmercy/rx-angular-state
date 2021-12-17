import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroService } from '../hero.service';
import { HeroProfile } from '../heroes/heroes.component';

@Component({
  selector: 'app-hero-profile',
  templateUrl: './hero-profile.component.html',
  styleUrls: ['./hero-profile.component.scss']
})
export class HeroProfileComponent implements OnInit {

  hero: HeroProfile;

  get heroId(): string {
    return this.activatedRoute.snapshot.params?.['id'];
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service: HeroService
  ) { }

  ngOnInit(): void {
    if (this.heroId) {
      this.service.getHeroDetails(this.heroId).subscribe(
        resp => this.hero = resp,
        err => console.log(err)
      )
    }
  }

  goBack(): void {
    this.router.navigate(['./app']);
  }
}
