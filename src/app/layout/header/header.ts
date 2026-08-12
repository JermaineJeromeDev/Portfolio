import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LogoComponent } from '../../components/logo/logo';
import { MenuOverlayComponent } from './components/menu-overlay/menu-overlay';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LogoComponent, MenuOverlayComponent], 
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent {
  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.isMenuOpen = false;
  }

  changeLanguage(lang: string): void {
    console.log('Sprache gewechselt zu:', lang);
  }
}
