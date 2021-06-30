import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErroPipe } from './pipes/erro.pipe';
import { MaterialModule } from '../material.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CrudComponent } from './components/crud/crud.component';



@NgModule({
  declarations: [ErroPipe, CrudComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FormsModule
  ],
  exports: [
    ErroPipe,
    CrudComponent,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FormsModule
  ]
})
export class FormularioModule { }
