import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Photo } from 'src/app/types/photo';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  formEdit: FormGroup;
  postId: string = '';
  photo: Photo = {
    like: { liked: false, likesCount: 0 },
  };

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private activeRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {
    this.formEdit = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      category: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      image: ['',[Validators.required, Validators.pattern(/^https?:\/\//i)]],
    });
  };


  ngOnInit(): void {
    this.postId = this.activeRoute.snapshot.params['postId'];
    this.postData(this.postId as string);
  }


  postData(postId:string){
    this.apiService.getPhoto(postId).subscribe((data: Photo)=> {
      this.populate(data);
    });
  }

  populate(photo:Photo) {
     this.formEdit.patchValue({
      title: photo.title,
      category: photo.category,
      image: photo.image,
      description: photo.description,
     });
  };


  onEdit(): void {
    if (this.formEdit.valid) {
      const updatedPhoto: Photo = this.formEdit.value;
      this.apiService.editPost(updatedPhoto, this.postId).subscribe((result) => {
        console.log('Post edited successfully:', result);
        this.router.navigate([`/posts/${this.postId}`]);
      });
    } else {
      console.log('Please fill in all required fields.');
    }
  }
  
}