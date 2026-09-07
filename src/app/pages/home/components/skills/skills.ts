import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonComponent } from '../../../../components/button/button';
import { SkillsIconComponent } from './components/skills-icon/skills-icon';

/** Describes one skill and its icon key. */
interface Skill { name: string; icon: string; }
export type SkillTab = 'frontend' | 'backend' | 'devsecops';

/** Displays skill categories and their responsive interaction states. */
@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [ButtonComponent, TranslatePipe, SkillsIconComponent, CommonModule],
  templateUrl: './skills.html',
  styleUrls: ['./skills.scss'],
})
export class SkillsComponent {
  activeTab: SkillTab = 'frontend';

  isTooltipVisible: boolean = false;

  frontendSkills: Skill[] = [
    { name: 'HTML', icon: 'html' },
    { name: 'CSS', icon: 'css' },
    { name: 'JavaScript', icon: 'javascript' },
    { name: 'TypeScript', icon: 'typescript' },
    { name: 'Angular', icon: 'angular' },
    { name: 'Supabase', icon: 'supabase' },
    { name: 'Git', icon: 'git' },
    { name: 'REST-API', icon: 'rest-api' },
    { name: 'Scrum', icon: 'scrum' },
    { name: 'Material Design', icon: 'material-design' }
  ];

  backendSkills: Skill[] = [
    { name: 'Python', icon: 'python' },
    { name: 'Django', icon: 'django' },
    { name: 'PostgreSQL', icon: 'postgresql' },
    { name: 'Docker', icon: 'docker' },
  ];

  devSecOpsSkills: Skill[] = [
    { name: 'Shell-Scripting', icon: 'shell-scripting' },
    { name: 'DRF', icon: 'drf' }
  ];

  /** Selects the skill category shown in the tab panel. */
  setActiveTab(tab: SkillTab): void {
    this.activeTab = tab;
  }

  /** Scrolls to the contact section from the skills call to action. */
  scrollToContact(): void {
    const activeElement = document.activeElement;

    if (activeElement instanceof HTMLElement) {
      activeElement.blur();
    }

    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  }

  /** Toggles the mobile tooltip for the highlighted skill. */
  toggleTooltip(event: Event): void {
    if (window.innerWidth > 991) {
      return;
    }

    event.stopPropagation();
    this.isTooltipVisible = !this.isTooltipVisible;
  }

  /** Closes the mobile tooltip when the user clicks outside the highlighted skill. */
  @HostListener('document:click', ['$event'])
  closeTooltip(event?: Event): void {
    if (window.innerWidth > 991) {
      return;
    }

    const target = event?.target as HTMLElement | null;
    const clickedInsideSkill = target?.closest('.skills__item--cyan');

    if (!clickedInsideSkill) {
      this.isTooltipVisible = false;
    }
  }
}
