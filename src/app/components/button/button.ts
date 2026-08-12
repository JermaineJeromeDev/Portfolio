import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.html',
  styleUrls: ['./button.scss']
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'language' = 'primary';
  @Input() color: 'green' | 'cyan' = 'green';
  @Input() isActive: boolean = false;
  @Input() disabled: boolean = false;
  @Input() type: 'button' | 'submit' = 'button';
}
