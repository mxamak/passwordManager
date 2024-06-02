import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordManagerService } from '../../password-manager.service';
import { Observable } from 'rxjs';
import { CommonModule, NgFor } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { AES } from 'crypto-js';


@Component({
  selector: 'app-site-list',
  standalone: true,
  imports: [FormsModule, CommonModule, NgFor, RouterModule, NavbarComponent],
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css']
})
export class SiteListComponent implements OnInit {
  allSites!: Observable<Array<any>>;
  siteName!: string;
  siteUrl!: string;
  siteImgUrl!: string;
  id!: string;
  formState: string = "Add a New";
  isSuccess: boolean = false;
  successMessage!: string;
  userName: string = '';

  email !:string;
  username !:string;
  password !:string;
  passwordId!:string;
  // allSites !: Observable<any[]>; 

  constructor(private passwordManagerService: PasswordManagerService, private router: Router) {
    this.loadSites();
  }

  // ngOnInit() {
  //   const navigation = this.router.getCurrentNavigation();
  //   if (navigation?.extras.state) {
  //     this.userName = navigation.extras.state['userName'];
  //     this.successMessage = `Hello ${this.userName}, welcome to PasswordKeep!`;
  //     this.isSuccess = true;
  //   }
  // }
  ngOnInit() {
    this.loadSites();
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.userName = navigation.extras.state['userName'];
      this.successMessage = `Hello ${this.userName}, welcome to PasswordKeep!`;
      this.isSuccess = true;
    }
    this.loadSites();
  }
  
  showAlert(message: string) {
    this.isSuccess = true;
    this.successMessage = message;
  }

  // 1
  onSubmit(values: object) {
    if (this.formState == "Add a New") {
      console.log(values);
      this.passwordManagerService.addSite(values)
        .then(() => {
          this.showAlert('Data Saved Successfully');
        })
        .catch(err => {
          console.error("Error adding site: ", err);
        });
    } else if (this.formState == "Edit") {
      this.passwordManagerService.updateSite(this.id, values)
        .then(() => {
          this.showAlert('Data updated Successfully');
        })
        .catch(err => {
          console.error("Error updating site: ", err);
        });
    }
  }

  // 2
  // onSubmit(values: any) {
  //   const encryptedPassword = this.encryptPassword(values.password);
  //   values.password = encryptedPassword;

  //   if (this.formState == "Add a New") {
  //     this.passwordManagerService.addSiteAndPassword(values)
  //       .then(() => {
  //         this.showAlert('Data Saved Successfully');
  //         this.resetForm();
  //         this.loadSites();
  //       })
  //       .catch((err: any) => {
  //         console.error("Error adding site: ", err);
  //       });
  //   } else if (this.formState == "Edit") {
  //     this.passwordManagerService.updateSite(this.id, values)
  //       .then(() => {
  //         this.showAlert('Data updated Successfully');
  //         this.resetForm();
  //       })
  //       .catch(err => {
  //         console.error("Error updating site: ", err);
  //       });
  //   }
  // }

// 3



  resetForm() {
    this.siteName = '';
    this.email = '';
    this.username = '';
    this.password = '';
    this.formState = "Add a New";
    this.id = '';
  }
  encryptPassword(password: string) {
    const secretKey = 'KLx1k6rmtZwwuNhbqg4iFDJryU8YbYXmnDVBP8x0T0McyUP/oXc+Q6dWBgtevfyF';
    const encryptedPassword = AES.encrypt(password, secretKey).toString();
    return encryptedPassword;
  }
  loadSites() {
    this.allSites = this.passwordManagerService.loadSites();
  }

  editSite(siteName: string, siteUrl: string, siteImgUrl: string, id: string) {
    this.siteName = siteName;
    this.siteUrl = siteUrl;
    this.siteImgUrl = siteImgUrl;
    this.id = id;
    this.formState = "Edit";
  }

  deleteSite(id: string) {
    this.passwordManagerService.deleteSite(id)
      .then(() => {
        this.showAlert('Site Deleted Successfully');
      })
      .catch(err => {
        console.error("Error deleting site: ", err);
      });
  }
}
