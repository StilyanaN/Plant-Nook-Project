import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Photo, PhotoCreate, Like } from './types/photo';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getPhotos() {
    const { apiUrl } = environment;
    return this.http.get<Photo[]>(`${apiUrl}/posts`, { withCredentials: true });
  }

  getPhoto(postId: string) {
    const { apiUrl } = environment;
    return this.http.get<Photo>(`${apiUrl}/posts/${postId}`, {
      withCredentials: true,
    });
  };

  createPhoto(
    title: string,
    category: string,
    description: string,
    image: string
  ): Observable<any> {
    const { apiUrl } = environment;
    return this.http.post<PhotoCreate>(
      `${apiUrl}/posts`,
      { title, category, description, image },
      { withCredentials: true }
    );
  }

  likePhoto(postId: string) {
    const { apiUrl } = environment;
    return this.http.post<Like>(`${apiUrl}/likes/${postId}/like`, {}, {
      withCredentials: true,
    });
  }

  unlikePhoto(postId: string) {
    const { apiUrl } = environment;
    return this.http.delete<Like>(`${apiUrl}/likes//${postId}/like/remove`, {
      withCredentials: true,
    });
  }

  getLikeStatus(postId: string): Observable<Like> {
    const { apiUrl } = environment;
    return this.http.get<Like>(`${apiUrl}/likes/${postId}/like/status`, {
      withCredentials: true,
    });
  }

  getAll(): Observable<Like[]> {
    const { apiUrl } = environment;
    return this.http.get<Like[]>(`${apiUrl}/likes`, { withCredentials: true });
  }

  deletePost(postId: string | undefined) {
    const { apiUrl } = environment;
    return this.http.delete<Photo>(`${apiUrl}/posts/delete/${postId}`, {
      withCredentials: true,
    });
  }

  editPost(photo: Photo, postId: string) {
    const { apiUrl } = environment;
    const payload = photo;
    return this.http.put<Photo>(`${apiUrl}/posts/${postId}/edit`, payload, {
      withCredentials: true,
    });
  }
}
