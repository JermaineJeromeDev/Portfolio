import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { AboutMeComponent } from './components/about-me/about-me';
import { ContactComponent } from './components/contact/contact';
import { HeroComponent } from './components/hero/hero';
import { ProjectsComponent } from './components/projects/projects.component';
import { SkillsComponent } from './components/skills/skills';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, HeroComponent, AboutMeComponent, SkillsComponent, ProjectsComponent, ContactComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class HomeComponent {}
  
