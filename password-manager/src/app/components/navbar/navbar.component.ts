import { CommonModule } from '@angular/common';
import { Component, Renderer2 } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLoginPage: boolean=false;

  constructor(private router: Router, private renderer: Renderer2,) {
    // this.setupSmoothScrolling();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = event.url === '/' || event.urlAfterRedirects === '/login';
      }
    });
  }
  ngOnInit(): void {
    this.setupSmoothScrolling();
  }
  // ngAfterViewInit(): void {
  //   this.setupSmoothScrolling();
  // }

  // private setupSmoothScrolling(): void {
  //   document.addEventListener('DOMContentLoaded', () => {
  //     const scrollToSectionLink = document.querySelector('a[href="#about"]');
  //     if (scrollToSectionLink) {
  //       scrollToSectionLink.addEventListener('click', (event) => {
  //         event.preventDefault(); // Prevent the default anchor behavior

  //         const sectionToScrollTo = document.getElementById('about');
  //         if (sectionToScrollTo) {
  //           sectionToScrollTo.scrollIntoView({ behavior: 'smooth' });
  //         }
  //       });
  //     }
  //   });
  // }
  

  private setupSmoothScrolling(): void {
    document.addEventListener('DOMContentLoaded', () => {
      // Function to add smooth scrolling to a specific link
      const addSmoothScrolling = (linkSelector: string, targetId: string) => {
        const linkElement = document.querySelector(`a[href="${linkSelector}"]`);
        if (linkElement) {
          linkElement.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent the default anchor behavior
  
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
              targetElement.scrollIntoView({ behavior: 'smooth' });
            }
          });
        }
      };
  
      // Add smooth scrolling for the "about" section
      addSmoothScrolling('#about', 'about');
  
      // Add smooth scrolling for the "contact" section
      addSmoothScrolling('#id', 'id');
      addSmoothScrolling('#home', 'home');
    });
  }
  


  //multiple sections- currently not working
  // private setupSmoothScrolling(): void {
  //   this.renderer.listen('window', 'DOMContentLoaded', () => {

  //     const scrollToSectionLinks = document.querySelectorAll('a.scroll-to-section');
  //     scrollToSectionLinks.forEach((link) => {
  //       link.addEventListener('click', (event) => {
  //         event.preventDefault(); // Prevent the default anchor behavior

  //         const targetSectionId = link.getAttribute('href');
  //         if (targetSectionId) { // Check if targetSectionId is not null
  //           const sectionToScrollTo = document.querySelector(targetSectionId);
  //           if (sectionToScrollTo) {
  //             sectionToScrollTo.scrollIntoView({ behavior: 'smooth' });
  //           }
  //         }
  //       });
  //     });
  //   });
  // }
}
