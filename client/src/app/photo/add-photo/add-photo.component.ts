import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';


@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.css'],
})
export class AddPhotoComponent {
  formCreate = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(2)]],
    category: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
    image: ['',[Validators.required, Validators.pattern(/^https?:\/\//i)]],
  });

  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {}


  createPhoto(): void {
    if (this.formCreate.invalid) {
      return;
    }
  
    const { title, category, description, image } = this.formCreate.value;
  
    if (title && category && description && image) {
      this.apiService.createPhoto(title, category, description, image).subscribe(() => {
        this.router.navigate(['/posts']);
      });
    }
  }
  

}
  