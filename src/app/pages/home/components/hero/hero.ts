import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonComponent } from '../../../../components/button/button';
import { SocialIconsComponent } from '../../../../components/social-icons/social-icons';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ButtonComponent, SocialIconsComponent, TranslatePipe],
  templateUrl: './hero.html',
  styleUrls: ['./hero.scss'],
})
export class HeroComponent {
  /** Scrolls to the contact section after removing focus from the active control. */
  scrollToContact(): void {
    if (typeof document === 'undefined') {
      return;
    }

    this.blurActiveElement();
    document.getElementById('contact')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  /** Removes focus from the active element before smooth scrolling. */
  private blurActiveElement(): void {
    const activeElement = document.activeElement;

    if (activeElement instanceof HTMLElement) {
      activeElement.blur();
    }
  }
}
