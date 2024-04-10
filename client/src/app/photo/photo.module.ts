import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosListComponent } from './photos-list/photos-list.component';
import { AddPhotoComponent } from './add-photo/add-photo.component';
import { EditComponent } from './edit/edit.component';
import { SharedModule } from '../shared/shared.module';
import { PhotoRoutingModule } from './photo-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DetailsComponent } from './details/details.component';



@NgModule({
  declarations: [
    PhotosListComponent,
    AddPhotoComponent,
    EditComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    PhotoRoutingModule,
    SharedModule,
    ReactiveFormsModule,
   
  ]
})
export class PhotoModule { }
