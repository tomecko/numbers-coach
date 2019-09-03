import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { InputQuizComponent } from '../quiz/input-quiz/input-quiz.component';
import { SelfCheckQuizComponent } from '../quiz/self-check-quiz/self-check-quiz.component';
import { AlwaysFromHomeGuard } from './always-from-home.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'input-quiz', component: InputQuizComponent, canActivate: [AlwaysFromHomeGuard] },
  { path: 'self-check-quiz', component: SelfCheckQuizComponent, canActivate: [AlwaysFromHomeGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
