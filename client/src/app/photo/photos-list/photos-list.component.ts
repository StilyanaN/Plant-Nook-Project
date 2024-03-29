import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Photo } from 'src/app/types/photo';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-photos-list',
  templateUrl: './photos-list.component.html',
  styleUrls: ['./photos-list.component.css']
})

  export class PhotosListComponent implements OnInit {

    photos: Photo[] | null = [];
    isLoading: boolean = true;
     hasPosts: boolean = true;
  
    constructor(private api: ApiService, private userService:UserService) {}

    get isLoggedIn(): boolean {
      return this.userService.isLogged;
    }
  
    ngOnInit(): void {

      this.api.getPhotos().subscribe((photos) => {
        this.photos = photos;

        if(this.photos && this.photos.length === 0){
          this.hasPosts = false;
        }
  
        setTimeout(() => {
          this.isLoading = false;
        }, 3000);
      });
    }
  
  }