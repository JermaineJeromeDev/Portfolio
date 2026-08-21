import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonComponent } from '../../../../components/button/button';
import { SkillsIconComponent } from './components/skills-icon/skills-icon';

interface Skill { name: string; icon: string; }

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [ButtonComponent, TranslatePipe, SkillsIconComponent],
  templateUrl: './skills.html',
  styleUrls: ['./skills.scss'],
})
export class SkillsComponent {
  frontendSkills: Skill[] = [
    { name: 'HTML', icon: 'html' },
    { name: 'CSS', icon: 'css' },
    { name: 'JavaScript', icon: 'javascript' },
    { name: 'TypeScript', icon: 'typescript' },
    { name: 'Angular', icon: 'angular' },
    { name: 'Supabase', icon: 'supabase' },
    { name: 'Git', icon: 'git' }
  ];

  backendSkills: Skill[] = [
    { name: 'Python', icon: 'python' },
    { name: 'Django', icon: 'django' },
    { name: 'DRF', icon: 'drf' },
    { name: 'PostgreSQL', icon: 'postgresql' }
  ];

  devSecOpsSkills: Skill[] = [
    { name: 'Docker', icon: 'docker' },
    { name: 'Scrum', icon: 'scrum' },
    { name: 'Material Design', icon: 'material' },
    { name: 'Continually learning', icon: 'learning' }
  ];

  scrollToContact(): void {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  }
}
