import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/button/button';
import { LogoComponent } from '../../components/logo/logo';
import { MenuOverlayComponent } from './components/menu-overlay/menu-overlay';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LogoComponent, ButtonComponent, MenuOverlayComponent],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent {
  isMenuOpen = false;
  currentLang = 'EN'; 

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  changeLanguage(lang: string): void {
    this.currentLang = lang;
    console.log(`Sprache gewechselt zu: ${lang}`);
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
