import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonComponent } from '../../../../components/button/button';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ButtonComponent, TranslatePipe],
  templateUrl: './hero.html',
  styleUrls: ['./hero.scss'],
})
export class HeroComponent {
  scrollToContact(): void {
    if (typeof document === 'undefined') {
      return;
    }

    document.getElementById('contact')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
}
