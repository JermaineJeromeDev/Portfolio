import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

interface Project {
  id: number;
  name: string;
  techStack: string[];
  descriptionKey: string; 
  liveLink: string;       
  githubLink: string;     
  image: string;          
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, TranslatePipe], 
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
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
