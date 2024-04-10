import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Photo } from 'src/app/types/photo';
import { UserService } from '../../user/user.service';
import { User } from 'src/app/types/user';
import { ErrorService } from 'src/app/core/error/error.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  photo: Photo = {
    like: { liked: false, likesCount: 0 },
  };
  postId: string = '';
  userId: string | undefined;
  ownerId: string = '';
  likeId: string | undefined = '';
  isLiked: boolean = false; 
  errorMsg: string = '';

  constructor(
    private apiService: ApiService,
    private activeRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private errorService: ErrorService
  ) {}


  declare user: User | null;

  get loggedIn(): boolean {
    return this.userService.isLogged;
  }

  get currentUser(): string | undefined {
    return this.userService.currentUsername;
  }

  get currentUserId(): string | undefined {
    return this.userService.currentUserId;
  }

  get isOwner(): boolean {
    if (this.photo.userId?._id === this.currentUserId) {
      return true;
    }
    return false;
  }

  
  ngOnInit() {
    this.getPhoto().subscribe({
      next: (post) => {
        this.photo = post;
        this.isLiked = this.likeCheck(post);
        if (post._id) {
          this.getLikeStatus(post._id); 
        }
       
        this.photo.likesCount = post.likes ? post.likes.length : 0;
      },
      error: (error) => {
        this.errorMsg =
          error.message || 'An error occurred while fetching data';
        this.errorService.setError(error);
      },
    });
  }
  

  likeCheck(post: Photo): boolean {
    const userId = this.userService.currentUserId;
    if (!userId) {
        return false; 
    }
    return !!post.likes?.some(like => like.userId === userId);
}

  getPhoto() {
    const postId = this.activeRoute.snapshot.params['postId'];
    return this.apiService.getPhoto(postId);
  }
  deletePhoto(postId: string | undefined) {
    this.apiService.deletePost(postId).subscribe(() => {
      this.router.navigate(['/posts']);
    });
  }


  addLike() {
    if (this.loggedIn && !this.isOwner) {
      const postId = this.photo._id; 
      if (!postId) {
        console.error('PostId is undefined');
        return;
      }
      if (this.isLiked) {
        this.apiService.unlikePhoto(postId).subscribe({
          next: (like) => {
            console.log('Photo like removed successfully');
            this.isLiked = false; 
            if (!this.photo.like) {
              this.photo.like = { liked: false, likesCount: 0 }; 
            }
            this.photo.like.likesCount--; 
            this.photo.likes = this.photo.likes?.filter(like => like.userId !== this.currentUserId) ?? [];
          },
          error: (error) => {
            console.error('Error removing like:', error);
          },
        });
      } else {
        this.apiService.likePhoto(postId).subscribe({
          next: (like) => {
            console.log('Photo liked successfully');
            this.isLiked = true; 
            if (!this.photo.like) {
              this.photo.like = { liked: true, likesCount: 0 }; 
            }
            this.photo.like.likesCount++;
            
            const currentUserId = this.currentUserId ?? ''; 
            this.photo.likes = [...(this.photo.likes ?? []), { userId: currentUserId }];
          },
          error: (error) => {
            console.error('Error liking photo:', error);
          },
        });
      }
    }
  }
  
  
   updateLikesCount() {
    this.photo.likesCount = this.photo.like ? this.photo.like.likesCount : 0;
  }
  
  getLikeStatus(postId: string) {
    this.apiService.getLikeStatus(postId).subscribe({
      next: (likeStatus) => {
        
        this.isLiked = likeStatus.liked;
        this.photo.like = {
          liked: likeStatus.liked,
          likesCount: likeStatus.likesCount,
        };
        this.updateLikesCount(); 
      },
      error: (error) => {
        console.error('Error getting like status:', error);
      },
    });
  }
  
}
