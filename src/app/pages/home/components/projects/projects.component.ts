import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonComponent } from '../../../../components/button/button';

/**
 * Defines the cryptographic and structural data required to render a portfolio project card.
 */
interface Project {
  /** The unique numerical identifier for database/tracking purposes. */
  id: number;
  /** The public display name of the application. */
  name: string;
  /** List of main core technologies utilized in the build. */
  techStack: string[];
  /** Translation localization bundle key referencing the project summary text. */
  descriptionKey: string; 
  /** Publicly accessible deployment landing page web address URL. */
  liveLink: string;       
  /** Public code repository location on GitHub. */
  githubLink: string;     
  /** Relative local path asset routing key for the preview snapshot image file. */
  image: string;          
}

/**
 * Defines the localization keys and layout dimensions required to render one testimonial slide.
 */
interface Testimonial {
  /** Translation bundle key containing the direct quote message feedback string. */
  textKey: string;
  /** Translation bundle key referencing the author's official display name. */
  nameKey: string;
  /** Translation bundle key referencing the professional enterprise role title. */
  roleKey: string;
  /** Path key directing to the user profile image avatar layout resource node. */
  avatar: string;
  /** Target width tracking option used to align styling accents on mobile responsive viewports. */
  mobileLineWidth: number;
}

/**
 * Component displaying interactive portfolio showcase project items and providing 
 * carousel navigation controls for review testimonials.
 */
@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, TranslatePipe, ButtonComponent], 
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  /** The current active index identifier pinpointing the visible slide selection item inside the layout. */
  currentTestimonialIndex = 0;

  /** List containing the formatted testimonial slider item data references. */
  testimonials: Testimonial[] = [
    {
      textKey: 'PROJECTS.TESTIMONIAL_TEXT_1',
      nameKey: 'PROJECTS.TESTIMONIAL_NAME_1',
      roleKey: 'PROJECTS.TESTIMONIAL_ROLE_1',
      avatar: 'img/placeholder-3.svg',
      mobileLineWidth: 64
    },
    {
      textKey: 'PROJECTS.TESTIMONIAL_TEXT_2',
      nameKey: 'PROJECTS.TESTIMONIAL_NAME_2',
      roleKey: 'PROJECTS.TESTIMONIAL_ROLE_2',
      avatar: 'img/placeholder-2.svg',
      mobileLineWidth: 61
    },
    {
      textKey: 'PROJECTS.TESTIMONIAL_TEXT_3',
      nameKey: 'PROJECTS.TESTIMONIAL_NAME_3',
      roleKey: 'PROJECTS.TESTIMONIAL_ROLE_3',
      avatar: 'img/placeholder-1.svg',
      mobileLineWidth: 46
    }
  ];

  /** List containing the configured production showcase application portfolio grid records. */
  projects: Project[] = [
    { 
      id: 1, 
      name: 'El Pollo Loco', 
      techStack: ['JavaScript', 'HTML', 'CSS'],
      descriptionKey: 'PROJECTS.POLLO_DESC',
      liveLink: 'https://jermainejeromedev.github.io/El-Pollo-Loco/',
      githubLink: 'https://github.com/JermaineJeromeDev/El-Pollo-Loco',
      image: 'img/el-pollo-loco.png'
    },
    { 
      id: 2, 
      name: 'Join', 
      techStack: ['Angular', 'TypeScript', 'HTML', 'CSS', 'Supabase'],
      descriptionKey: 'PROJECTS.JOIN_DESC',
      liveLink: 'https://jermainejeromedev.github.io/Join/',
      githubLink: 'https://github.com/JermaineJeromeDev/Join',
      image: 'img/join.png'
    },
    { 
      id: 3, 
      name: 'Coderr', 
      techStack: ['Python', 'Django', 'DRF', 'REST API'], 
      descriptionKey: 'PROJECTS.CODERR_DESC',
      liveLink: 'https://coderr-production-4519.up.railway.app', 
      githubLink: 'https://github.com/JermaineJeromeDev/Coderr',
      image: 'img/coderr.png'
    },
    { 
      id: 4, 
      name: 'Videoflix', 
      techStack: ['Python', 'Django', 'DRF', 'PostgreSQL', 'Redis', 'Docker'], 
      descriptionKey: 'PROJECTS.VIDEOFLIX_DESC',
      liveLink: 'https://videoflix-frontend-five.vercel.app/',
      githubLink: 'https://github.com/JermaineJeromeDev/Videoflix',
      image: 'img/videoflix.png'
    }
  ];

  /**
   * Safe execution anchor wrapper that launches external hyperlinks targeting new browser viewport instances.
   * Leverages explicit strict noopener setups to secure thread sandboxing against hijack vulnerabilities.
   * 
   * @param url - The absolute target remote destination location string path to load.
   */
  openLink(url: string): void {
    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener');
    }
  }

  /**
   * Direct navigation jump method adjusting target indicators matching selected index bounds.
   * 
   * @param index - The zero-based numerical reference position value target to focus.
   */
  setTestimonial(index: number): void {
    this.currentTestimonialIndex = index;
  }

  /**
   * Increments viewport indicators navigation backwards by one step.
   * Reverts target back to boundary endpoints automatically if execution triggers on starting nodes.
   */
  prevTestimonial(): void {
    this.currentTestimonialIndex = 
      this.currentTestimonialIndex === 0 
        ? this.testimonials.length - 1 
        : this.currentTestimonialIndex - 1;
  }

  /**
   * Increments viewport indicators navigation forward by one step.
   * Flushes target values back down to starting baselines if boundaries limits are reached.
   */
  nextTestimonial(): void {
    this.currentTestimonialIndex = 
      this.currentTestimonialIndex === this.testimonials.length - 1 
        ? 0 
        : this.currentTestimonialIndex + 1;
  }
}
