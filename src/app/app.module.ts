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

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,

    MaterialModule,
    NgxSpinnerModule
  ],
  providers: [HeroService],
  bootstrap: [AppComponent]
})
export class AppModule { }
