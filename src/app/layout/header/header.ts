import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonComponent } from '../../components/button/button';
import { LogoComponent } from '../../components/logo/logo';
import { LanguageService, SupportedLanguage } from '../../core/services/language.service';
import { MenuOverlayComponent } from './components/menu-overlay/menu-overlay';

/** Provides desktop and mobile navigation plus language switching. */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LogoComponent, ButtonComponent, MenuOverlayComponent, TranslatePipe, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
  host: {
    '(window:resize)': 'onWindowResize()'
  }
})
export class HeaderComponent {
  isMenuOpen = false;
  private readonly mobileMenuMaxWidth = 768;

  constructor(private readonly languageService: LanguageService) {
  }

  /** Returns the active language in the format used by the UI toggle. */
  get currentLang(): 'EN' | 'DE' {
    return this.languageService.currentLanguage().toUpperCase() as 'EN' | 'DE';
  }

  /** Toggles the mobile navigation overlay. */
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  /** Closes the mobile menu when the viewport becomes desktop-sized. */
  onWindowResize(): void {
    if (window.innerWidth > this.mobileMenuMaxWidth && this.isMenuOpen) {
      this.isMenuOpen = false;
    }
  }

  /** Changes the application language using the shared language service. */
  changeLanguage(lang: string): void {
    const language: SupportedLanguage = lang.toUpperCase() === 'DE' ? 'de' : 'en';
    this.languageService.setLanguage(language);
  }

  /** Scrolls to a page fragment after closing the mobile menu. */
  scrollToFragmentWithOffset(fragment: string): void {
  if (typeof window === 'undefined') {
    return;
  }
  const activeElement = document.activeElement;
  if (activeElement instanceof HTMLElement) {
    activeElement.blur();
  }
  this.isMenuOpen = false;
  setTimeout(() => {
    const target = document.getElementById(fragment);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 200);
}

  /** Returns the page to the top and removes focus from the active control. */
  scrollToTop(): void {
    const activeElement = document.activeElement;
    if (activeElement instanceof HTMLElement) {
      activeElement.blur();
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
