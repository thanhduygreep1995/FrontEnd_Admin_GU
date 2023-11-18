import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { google } from 'googleapis';


@Injectable({
  providedIn: 'root'
})
export class GoogleDriveService {
  private baseUrl = 'http://localhost:8080/api/v0/images';
  private drive;
  private folderId = 'yourFolderId'; // Thay thế bằng folderId của thư mục trên Google Drive
  private mimeType = 'image/jpeg';


  constructor(private http: HttpClient) {

    const auth = new google.auth.GoogleAuth({
      keyFile: 'path/to/your/credentials.json',
      scopes: 'https://www.googleapis.com/auth/drive',
    });

    this.drive = google.drive({ version: 'v3', auth });
  }


  async uploadImage(imageData: any) {
    try {
      // Upload hình ảnh vào thư mục có sẵn
      const uploadedFile = await this.drive.files.create({
        requestBody: {
          name: 'image.jpg',
          mimeType: this.mimeType,
          parents: [this.folderId], // Đặt parents là mảng chứa folderId của thư mục trên Google Drive
        },
        media: {
          mimeType: this.mimeType,
          body: imageData,
        },
      });

    } catch (error: any) {
      console.error('Error uploading image:', error.message);
      throw error;
    }
  }


  


  getAllImage(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/list`);
  }


  createImage(files: File, productId: number, updateDate: Date, imageStatus: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('imageUrl', files, files.name);
    formData.append('productId', productId.toString());
    formData.append('updateDate', updateDate.toString()); 
    formData.append('imageStatus', imageStatus);

    const headers = new HttpHeaders();
    // Add any additional headers if needed

    return this.http.post(`${this.baseUrl}/upload`, formData, { responseType: 'text' });
  }

  deleteImage(id: any): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url, { responseType: 'text' });
  }

}
