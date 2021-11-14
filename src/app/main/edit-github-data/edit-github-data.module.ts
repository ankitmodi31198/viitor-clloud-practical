import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditGithubDataComponent } from './edit-github-data.component';
import { CommonUiModule } from 'src/app/common-ui/common-ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';



@NgModule({
  declarations: [
    EditGithubDataComponent
  ],
  imports: [
    CommonModule,
    CommonUiModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ],
  exports: [
    EditGithubDataComponent
  ]
})
export class EditGithubDataModule { }
