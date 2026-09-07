import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

/**
 * A reusable button component used throughout the portfolio.
 * Supports multiple visual variants, colors, and interactive states.
 */
@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.html',
  styleUrls: ['./button.scss']
})
export class ButtonComponent {
  /**
   * The visual style variant of the button.
   * - 'primary': Main call-to-action styling.
   * - 'secondary': Outline or alternative action styling.
   * - 'language': Specialized styling for the language switcher.
   * 
   * @default 'primary'
   */
  @Input() variant: 'primary' | 'secondary' | 'language' = 'primary';

  /**
   * The color theme applied to the button component.
   * 
   * @default 'green'
   */
  @Input() color: 'green' | 'cyan' = 'green';

  /**
   * Indicates whether the button is currently in an active or selected state.
   * Frequently used for toggles or active navigation links (e.g., language selection).
   * 
   * @default false
   */
  @Input() isActive: boolean = false;

  /**
   * Disables the button, preventing user interactions and applying disabled styles.
   * 
   * @default false
   */
  @Input() disabled: boolean = false;

  /**
   * The native HTML type attribute of the button element.
   * Use 'submit' when placing the button inside a form to trigger form submission.
   * 
   * @default 'button'
   */
  @Input() type: 'button' | 'submit' = 'button';
}
