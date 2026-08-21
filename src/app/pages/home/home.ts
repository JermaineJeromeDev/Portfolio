import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AboutMe } from './components/about-me/about-me';
import { HeroComponent } from './components/hero/hero';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeroComponent, AboutMe],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class HomeComponent {

}
