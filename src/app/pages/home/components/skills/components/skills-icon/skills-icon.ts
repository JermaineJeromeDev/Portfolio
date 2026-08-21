import { Component, Input, OnChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SKILLS_ICON_DATA } from './skills-icon-data';

@Component({
  selector: 'app-skills-icon',
  standalone: true,
  template: `
    <svg [style.width]="size" [style.height]="size" [attr.viewBox]="currentViewBox" fill="none" xmlns="http://www.w3.org/2000/svg" [innerHTML]="safeSvgContent">
    </svg>
  `,
})
export class SkillsIconComponent implements OnChanges {
  @Input() name!: string;
  @Input() size = '100%';

  safeSvgContent?: SafeHtml;
  currentViewBox = '0 0 40 40';

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges(): void {
    const rawPaths = SKILLS_ICON_DATA[this.name] || '';
    this.safeSvgContent = this.sanitizer.bypassSecurityTrustHtml(rawPaths);

    if (this.name === 'drf' || this.name === 'angular') { 
      this.currentViewBox = '0 0 60 60'; 
    } else {
      this.currentViewBox = '0 0 40 40'; 
    }
  }
}
