import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotasComponent } from './notas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormularioModule } from '../../formulario/formulario.module';
import { PesquisaModule } from '../../pesquisa/pesquisa.module';
import { NotasRoutingModule } from './notas-routing.module';



@NgModule({
  declarations: [NotasComponent],
  imports: [
    CommonModule,
    NotasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    FormularioModule,
    PesquisaModule,
  ]
})
export class NotasModule { }
