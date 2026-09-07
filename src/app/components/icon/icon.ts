import { Component, input } from '@angular/core';

/**
 * A flexible icon component used to render vector graphics across the application.
 * Utilizes Angular's modern signal-based inputs for optimal performance and reactivity.
 */
@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [], 
  templateUrl: './icon.html', 
  styleUrls: ['./icon.scss']   
})
export class IconComponent {
  /**
   * The name of the icon to be displayed.
   * Accepts predefined design keys for auto-completion, but allows any fallback string 
   * to accommodate dynamically loaded or custom icon assets.
   * 
   * @default ''
   */
  name = input<'location' | 'lightbulb' | 'puzzle' | string>('');
}
