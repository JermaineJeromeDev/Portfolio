import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ButtonComponent } from '../../components/button/button';
import { LogoComponent } from '../../components/logo/logo';
import { MenuOverlayComponent } from './components/menu-overlay/menu-overlay';

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
  currentLang: 'EN' | 'DE' = 'EN';
  private readonly mobileMenuMaxWidth = 768;

  constructor(private translate: TranslateService) {
    this.translate.onLangChange.subscribe(({ lang }) => {
      this.currentLang = lang.toUpperCase() === 'DE' ? 'DE' : 'EN';
    });

    const activeLang = this.translate.getCurrentLang() ?? this.translate.getBrowserLang() ?? 'en';
    this.currentLang = activeLang.toUpperCase() === 'DE' ? 'DE' : 'EN';
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onWindowResize(): void {
    if (window.innerWidth > this.mobileMenuMaxWidth && this.isMenuOpen) {
      this.isMenuOpen = false;
    }
  }

  changeLanguage(lang: string): void {
    const normalizedLang = lang.toUpperCase() === 'DE' ? 'DE' : 'EN';
    const langCode = normalizedLang === 'DE' ? 'de' : 'en';

    this.translate.use(langCode);
    this.currentLang = normalizedLang;
  }

  scrollToFragmentWithOffset(fragment: string): void {
  if (typeof window === 'undefined') {
    return;
  }
  this.isMenuOpen = false;
  setTimeout(() => {
    const target = document.getElementById(fragment);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 200);
}

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
