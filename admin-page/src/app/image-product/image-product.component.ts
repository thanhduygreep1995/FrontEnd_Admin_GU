import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleDriveService } from '../service/image/google-drive.service';


@Component({
  selector: 'app-image-product',
  templateUrl: './image-product.component.html',
  styleUrls: ['./image-product.component.css']
})
export class ImageProductComponent {

  constructor(private googleDriveService: GoogleDriveService, private router: Router) { }

  selectedImage: string | ArrayBuffer | null = null;
  productId!: number;
  imageStatus!: string;

  onFileChange(event: any) {
    const reader = new FileReader();
  
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
  
      reader.onload = () => {
        this.selectedImage = reader.result;
      };
    }
  }

  uploadImage() {
    if (this.selectedImage) {
      const fileInput = document.getElementById('thumbImage') as HTMLInputElement;
      const file = (fileInput.files as FileList)[0];
      const updateDate = new Date();
  
      this.googleDriveService.createImage(file, this.productId, updateDate, this.imageStatus)
        .subscribe(
          (response) => {
            console.log('Image uploaded successfully:', response);
            // Thêm logic xử lý sau khi upload thành công (nếu cần)
            // Ví dụ: chuyển hướng đến trang khác
          },
          (error) => {
            console.error('Error uploading image:', error);
            // Xử lý lỗi (nếu cần)
          }
        );
    }
  }
}
