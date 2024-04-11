import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotosListComponent } from './photos-list/photos-list.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { AddPhotoComponent } from './add-photo/add-photo.component';
import { AuthActivate } from '../guards/auth.activate';

const routes: Routes = [
  {
    path: 'posts',
    children: [
      { path: '', pathMatch: 'full', component: PhotosListComponent },
      {
        path: ':postId',
        children: [
          { path: '', pathMatch: 'full', component: DetailsComponent },
          {
            path: 'edit',component: EditComponent,
  
          },
        ],
      },
    ],
  },
  {
    path: 'create', component: AddPhotoComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)], 
  exports: [RouterModule],
})
export class PhotoRoutingModule {}
