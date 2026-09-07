import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonComponent } from '../../../../components/button/button';

/** Defines the data required to render a portfolio project. */
interface Project {
  id: number;
  name: string;
  techStack: string[];
  descriptionKey: string; 
  liveLink: string;       
  githubLink: string;     
  image: string;          
}

/** Defines the data required to render one testimonial slide. */
interface Testimonial {
  textKey: string;
  nameKey: string;
  roleKey: string;
  avatar: string;
  mobileLineWidth: number;
}

/** Displays portfolio projects and provides testimonial navigation. */
@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, TranslatePipe, ButtonComponent], 
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  currentTestimonialIndex = 0;

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

  /** Opens an external project URL in a new browser tab. */
  openLink(url: string): void {
    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener');
    }
  }

  /** Selects a testimonial by its zero-based index. */
  setTestimonial(index: number): void {
    this.currentTestimonialIndex = index;
  }

  /** Moves the testimonial carousel to the previous item. */
  prevTestimonial(): void {
    this.currentTestimonialIndex = 
      this.currentTestimonialIndex === 0 
        ? this.testimonials.length - 1 
        : this.currentTestimonialIndex - 1;
  }

  /** Moves the testimonial carousel to the next item. */
  nextTestimonial(): void {
    this.currentTestimonialIndex = 
      this.currentTestimonialIndex === this.testimonials.length - 1 
        ? 0 
        : this.currentTestimonialIndex + 1;
  }

  projects: Project[] = [
    { 
      id: 1, 
      name: 'El Pollo Loco', 
      techStack: ['JavaScript', 'HTML', 'CSS'],
      descriptionKey: 'PROJECTS.POLLO_DESC',
      liveLink: 'https://deine-domain.de',
      githubLink: 'https://github.com/JermaineJeromeDev/El-Pollo-Loco',
      image: 'img/el-pollo-loco.png'
    },
    { 
      id: 2, 
      name: 'Join', 
      techStack: ['Angular', 'TypeScript', 'HTML', 'CSS', 'Supabase'],
      descriptionKey: 'PROJECTS.JOIN_DESC',
      liveLink: 'https://deine-domain.de',
      githubLink: 'https://github.com/JermaineJeromeDev/Join',
      image: 'img/join.png'
    },
    { 
      id: 3, 
      name: 'Coderr', 
      techStack: ['Python', 'Django', 'DRF', 'REST API'], 
      descriptionKey: 'PROJECTS.CODERR_DESC',
      liveLink: 'https://deine-domain.de', 
      githubLink: 'https://github.com/JermaineJeromeDev/Coderr',
      image: 'img/coderr.png'
    },
    { 
      id: 4, 
      name: 'Videoflix', 
      techStack: ['Python', 'Django', 'DRF', 'PostgreSQL', 'Redis', 'Docker'], 
      descriptionKey: 'PROJECTS.VIDEOFLIX_DESC',
      liveLink: 'https://deine-domain.de',
      githubLink: 'https://github.com/JermaineJeromeDev/Videoflix',
      image: 'img/videoflix.png'
    }
  ];
}
