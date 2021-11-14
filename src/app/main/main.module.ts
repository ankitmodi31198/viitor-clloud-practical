import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GithubDataService } from '../service/api/github-data.service';
import { MainRoutingModule } from './main-routing.module';
import { MaterialModule } from '../material/material.module';
import { EditGithubDataModule } from './edit-github-data/edit-github-data.module';
import { PreviewGithubDataComponent } from './preview-github-data/preview-github-data.component';



@NgModule({
  declarations: [
    MainComponent,
    PreviewGithubDataComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MainRoutingModule,
    MaterialModule,
    EditGithubDataModule
  ],
  exports: [
    MainComponent,
    PreviewGithubDataComponent
  ],
  providers: [
    GithubDataService
  ]
})
export class MainModule { }
