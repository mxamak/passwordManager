import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

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
}
