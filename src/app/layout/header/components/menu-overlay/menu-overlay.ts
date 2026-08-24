import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LogoComponent } from './../../../../components/logo/logo';

@Component({
  selector: 'app-menu-overlay',
  standalone: true,
  imports: [CommonModule, LogoComponent, TranslatePipe],
  templateUrl: './menu-overlay.html',
  styleUrls: ['./menu-overlay.scss']
})
export class MenuOverlayComponent {
  @Input() isOpen = false;
  @Input() currentLang = 'EN';
  @Output() menuClosed = new EventEmitter<void>();
  @Output() languageChanged = new EventEmitter<string>();

  closeMenu(): void {
    this.menuClosed.emit();
  }

  scrollToSection(event: Event, sectionId: string): void {
    const target = document.getElementById(sectionId);

    if (!target) {
      return;
    }

    event.preventDefault();

    const headerHeight = document.querySelector('.header')?.getBoundingClientRect().height ?? 0;
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 24;

    window.scrollTo({
      top,
      behavior: 'smooth'
    });
  }

  selectLanguage(lang: string): void {
    this.languageChanged.emit(lang); 
    this.closeMenu(); 
  }
}
