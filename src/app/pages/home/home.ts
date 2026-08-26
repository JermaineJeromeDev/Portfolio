import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AboutMe } from './components/about-me/about-me';
import { HeroComponent } from './components/hero/hero';
import { ProjectsComponent } from './components/projects/projects.component';
import { SkillsComponent } from './components/skills/skills';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeroComponent, AboutMe, SkillsComponent, ProjectsComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class HomeComponent {}

