import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Photo } from '../../types/photo';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-photos-list',
  templateUrl: './photos-list.component.html',
  styleUrls: ['./photos-list.component.css']
})
export class PhotosListComponent implements OnInit {
  photos: Photo[] | null = [];
  isLoading: boolean = true;
  hasPosts: boolean = true;

  constructor(private api: ApiService, private userService: UserService) {}

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  ngOnInit(): void {
    this.api.getPhotos().subscribe((photos) => {
      this.photos = photos;

      setTimeout(() => {
        this.isLoading = false;
      }, 2000);


      if (this.photos.length === 0) {
        this.hasPosts = false;
      }
    });
  }

  getTotalLikes(photo: Photo): number {
    return photo.likes ? photo.likes.length : 0;
  }
}
