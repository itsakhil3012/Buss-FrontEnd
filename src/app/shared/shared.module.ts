import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatNativeDateModule } from '@angular/material/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { RejectPopupComponent } from './components/reject-popup/reject-popup.component';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [
    HeaderComponent,
    RejectPopupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatSelectModule,
    NgxMaterialTimepickerModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDialogModule
  ],
  exports: [
    HeaderComponent,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatSelectModule,
    NgxMaterialTimepickerModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDialogModule
  ]
})
export class SharedModule { }
