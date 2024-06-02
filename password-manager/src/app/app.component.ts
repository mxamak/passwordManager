import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SiteListComponent } from './components/site-list/site-list.component';
import { FormsModule } from '@angular/forms';
import { PasswordListComponent } from './components/password-list/password-list.component';
import { FooterComponent } from './components/footer/footer.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, SiteListComponent, FormsModule, PasswordListComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'password-manager';
}
