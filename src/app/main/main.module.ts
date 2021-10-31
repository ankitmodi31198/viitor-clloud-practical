import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GithubDataService } from '../service/api/github-data.service';



@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MainComponent
  ],
  providers: [
    GithubDataService
  ]
})
export class MainModule { }
