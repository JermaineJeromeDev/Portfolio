import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonComponent } from '../../../../components/button/button';
import { SkillsIconComponent } from './components/skills-icon/skills-icon';

/**
 * Describes one skill and its icon key.
 */
interface Skill { 
  name: string; 
  icon: string; 
}

/**
 * Supported skill category tab types.
 */
export type SkillTab = 'frontend' | 'backend' | 'devsecops';

/**
 * Displays skill categories and their responsive interaction states.
 */
@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [ButtonComponent, TranslatePipe, SkillsIconComponent, CommonModule],
  templateUrl: './skills.html',
  styleUrls: ['./skills.scss'],
})
export class SkillsComponent {
  /** The currently selected skill category tab. */
  activeTab: SkillTab = 'frontend';

  /** Controls the visibility of the mobile information tooltip. */
  isTooltipVisible: boolean = false;

  /** List of frontend development skills. */
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

  /** List of backend development skills. */
  backendSkills: Skill[] = [
    { name: 'Python', icon: 'python' },
    { name: 'Django', icon: 'django' },
    { name: 'PostgreSQL', icon: 'postgresql' },
    { name: 'Redis', icon: 'redis' },
    { name: 'Docker', icon: 'docker' },
  ];

  /** List of DevSecOps and deployment skills. */
  devSecOpsSkills: Skill[] = [
    { name: 'Shell-Scripting', icon: 'shell-scripting' },
    { name: 'DRF', icon: 'drf' }
  ];

  /**
   * Selects the skill category shown in the tab panel.
   * 
   * @param tab - The skill tab identifier to set as active.
   */
  setActiveTab(tab: SkillTab): void {
    this.activeTab = tab;
  }

  /**
   * Removes focus from the active element and smoothly scrolls down
   * to the contact section anchor.
   */
  scrollToContact(): void {
    const activeElement = document.activeElement;

    if (activeElement instanceof HTMLElement) {
      activeElement.blur();
    }

    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  }

  /**
   * Toggles the mobile tooltip visibility state for the highlighted skill.
   * Prevents interaction on desktop viewports.
   * 
   * @param event - The triggering click or touch event.
   */
  toggleTooltip(event: Event): void {
    if (window.innerWidth > 991) {
      return;
    }

    event.stopPropagation();
    this.isTooltipVisible = !this.isTooltipVisible;
  }

  /**
   * Closes the mobile tooltip when the user clicks anywhere outside 
   * the cyan highlighted skill item wrapper.
   * 
   * @param event - The global document click event context.
   */
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
