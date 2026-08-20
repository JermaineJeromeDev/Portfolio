import { Component, input } from '@angular/core';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [], 
  templateUrl: './icon.html', 
  styleUrls: ['./icon.scss']   
})
export class IconComponent {
  name = input<'location' | 'lightbulb' | 'puzzle' | string>('');
}
