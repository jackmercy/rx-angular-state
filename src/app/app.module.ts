import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { MaterialModule } from './material.module';
import { NgxSpinnerModule } from "ngx-spinner";
import { HeroService } from './hero.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HeroProfileComponent } from './hero-profile/hero-profile.component';
import { QrCodeModule } from 'ng-qrcode';
import { heroReducer } from './store/hero.reducer';
import { HeroEffects } from './store/hero.effects';
@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroProfileComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,

    MaterialModule,
    QrCodeModule,
    NgxSpinnerModule,
    StoreModule.forRoot({heroReducer}),
    EffectsModule.forRoot([HeroEffects])
  ],
  providers: [HeroService],
  bootstrap: [AppComponent]
})
export class AppModule { }
