import { Component } from '@angular/core';

/**
 * A purely presentational component that renders the application's branding logo.
 * Used as a static visual asset across the header, footer, or loading screens.
 */
@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [],
  templateUrl: './logo.html',
  styleUrls: ['./logo.scss'],
})
export class LogoComponent {
  
}
