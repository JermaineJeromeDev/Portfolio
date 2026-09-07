import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

/**
 * A presentational component that renders a list of interactive social media icons.
 * Typically embedded in the header, footer, or hero sections to link to external profiles 
 * such as GitHub, LinkedIn, or other professional platforms.
 */
@Component({
  selector: 'app-social-icons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './social-icons.html',
  styleUrls: ['./social-icons.scss']
})
export class SocialIconsComponent {
  
}
