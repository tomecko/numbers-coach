import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MaterialComponentsModule } from './material-components/material-components.module';
import { AppRoutingModule } from './routing/app-routing.module';

import { EndNavComponent } from './quiz/end-nav/end-nav.component';
import { InputQuizComponent } from './quiz/input-quiz/input-quiz.component';
import { MainActionComponent } from './quiz/main-action/main-action.component';
import { SelfCheckQuizComponent } from './quiz/self-check-quiz/self-check-quiz.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,

    EndNavComponent,
    InputQuizComponent,
    MainActionComponent,
    SelfCheckQuizComponent,
  ],
  imports: [
    // external
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    // internal
    AppRoutingModule,
    MaterialComponentsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
