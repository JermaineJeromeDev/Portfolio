import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnChanges, PLATFORM_ID } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SKILLS_ICON_DATA } from './skills-icon-data';

@Component({
  selector: 'app-skills-icon',
  template: `
    @if (isBrowser) {
    <svg [style.width]="size" [style.height]="size" [attr.viewBox]="currentViewBox" fill="none" xmlns="http://www.w3.org/2000/svg" [innerHTML]="safeSvgContent">
    </svg>
    } @else {
    <svg [style.width]="size" [style.height]="size" [attr.viewBox]="currentViewBox" fill="none" xmlns="http://www.w3.org/2000/svg">
    </svg>
    }
  `,
  styles: [
  `:host { 
    display: inline-flex; 
    align-items: center; 
    justify-content: center; 
    color: inherit;
    width: var(--icon-size, 100%);
    height: var(--icon-size, 100%);
  }`,
  `svg { 
    color: inherit; 
    fill: currentColor; 
    stroke: currentColor; 
  }`
],

})
export class SkillsIconComponent implements OnChanges {
  @Input() name!: string;
  @Input() size = '100%';

  readonly isBrowser: boolean;
  safeSvgContent?: SafeHtml;
  currentViewBox = '0 0 60 60';

  constructor(
    private sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: Object 
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnChanges(): void {
    if (!this.isBrowser) {
      return;
    }

    const rawPaths = SKILLS_ICON_DATA[this.name] || '';
    this.safeSvgContent = this.sanitizer.bypassSecurityTrustHtml(rawPaths);
  }
}
