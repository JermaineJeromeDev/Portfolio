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
  @Output() sectionSelected = new EventEmitter<string>();

  /** Closes the mobile navigation overlay. */
  closeMenu(): void {
    this.menuClosed.emit();
  }

  /** Selects a page fragment and closes the overlay. */
  selectSection(fragment: string, event: MouseEvent): void {
    event.preventDefault();
    this.sectionSelected.emit(fragment);
    this.closeMenu();
  }

  /** Emits a language selection and closes the overlay. */
  selectLanguage(lang: string): void {
    this.languageChanged.emit(lang); 
    this.closeMenu(); 
  }
}
