import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LogoComponent } from '../../components/logo/logo';
import { SocialIconsComponent } from '../../components/social-icons/social-icons';

/** Renders the site footer, legal link, and social navigation. */
@Component({
  selector: 'app-footer',
  standalone: true, 
  imports: [LogoComponent, SocialIconsComponent, RouterLink, TranslatePipe],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  /** Current calendar year displayed in the copyright notice. */
  readonly currentYear: number = new Date().getFullYear();
}
