import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TestQuestionComponent } from './test-question/test-question.component';
import { TestResultComponent } from './test-result/test-result.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'test/:id', component: TestQuestionComponent },
  { path: 'result/:id', component: TestResultComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
