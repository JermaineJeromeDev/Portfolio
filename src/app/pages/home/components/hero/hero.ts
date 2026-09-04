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

  private blurActiveElement(): void {
    const activeElement = document.activeElement;

    if (activeElement instanceof HTMLElement) {
      activeElement.blur();
    }
  }
}
