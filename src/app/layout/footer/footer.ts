import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LogoComponent } from '../../components/logo/logo';
import { SocialIconsComponent } from '../../components/social-icons/social-icons';

@Component({
  selector: 'app-footer',
  imports: [LogoComponent, SocialIconsComponent],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {}
