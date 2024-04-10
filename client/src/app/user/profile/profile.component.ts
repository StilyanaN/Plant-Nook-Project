import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProfileDetails, User } from 'src/app/types/user';
import { UserService } from '../user.service';
import { emailValidator } from 'src/app/shared/utils/email-validator';
import { EMAIL_DOMAINS } from 'src/app/shared/constants';
import { Router } from '@angular/router';
import { Photo } from 'src/app/types/photo';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  photo = {} as Photo;
  user = {} as User;
  photos: Photo[] = [];
  userPhotos: Photo[] = []; 
  totalLikes = 0; 
  photoCount = 0; 

  profileDetails: ProfileDetails = {
    username: '',
    email: '',
  };

  editUser = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, emailValidator(EMAIL_DOMAINS)]],
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private apiService: ApiService 
  ) {}

  ngOnInit(): void {
    if (this.currentUserId) {
      this.userService.getProfileId(this.currentUserId).subscribe((user) => {
        this.user = user;
        const { email, username } = this.user;
        this.editUser.setValue({ username, email });

        this.apiService.getPhotos().subscribe((photos: Photo[]) => {
          this.photos = photos;

          this.userPhotos = this.photos.filter(photo => photo.userId && photo.userId._id === this.currentUserId);

          this.totalLikes = this.calculateTotalLikes();
          this.photoCount = this.userPhotos.length; 
        });
      });
    }
  }

  get currentUser(): string | undefined {
    return this.userService.currentUsername;
  }

  get currentUserId(): string | undefined {
    return this.userService.currentUserId;
  }

  calculateTotalLikes(): number {
    let total = 0;
    this.userPhotos.forEach(photo => {
      if (photo.like) {
        total += photo.like.likesCount;
      }
    });
    return total;
  }
}
