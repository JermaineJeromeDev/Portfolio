import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnChanges, PLATFORM_ID } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SKILLS_ICON_DATA } from './skills-icon-data';

/**
 * Renders a reactive, sanitized skill icon from the centralized SVG data map.
 * Supports Angular SSR (Server-Side Rendering) gracefully by bypassing browser-only APIs.
 */
@Component({
  selector: 'app-skills-icon',
  standalone: true, // Falls deine Komponente standalone ist, ansonsten weglassen
  template: `
    @if (isBrowser) {
      <svg 
        [style.width]="size" 
        [style.height]="size" 
        [attr.viewBox]="currentViewBox" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        [innerHTML]="safeSvgContent">
      </svg>
    } @else {
      <svg 
        [style.width]="size" 
        [style.height]="size" 
        [attr.viewBox]="currentViewBox" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg">
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
  /** The specific lookup key name of the skill icon inside the centralized dataset. */
  @Input() name!: string;

  /** The responsive CSS width and height dimension bounding box for the SVG. */
  @Input() size = '100%';

  /** Flags whether the application environment context is currently executing in a client browser. */
  readonly isBrowser: boolean;

  /** Stored HTML reference node containing the XSS-validated and bypassed SVG paths. */
  safeSvgContent?: SafeHtml;

  /** Bounding box canvas dimensions configuration value. Default is a precise 60x60 grid layout. */
  currentViewBox = '0 0 60 60';

  /**
   * Initializes the components rendering engine environment footprint.
   * 
   * @param sanitizer - Core Angular utility provider used to skip strict DOM injection security protocols.
   * @param platformId - Unique technical runtime identifier token used to determine execution origin.
   */
  constructor(
    private sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: Object 
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  /**
   * Angular core lifecycle hook called whenever input-bound properties experience data modifications.
   * Refreshes and re-sanitizes the visual vector canvas paths matching the updated key value.
   */
  ngOnChanges(): void {
    if (!this.isBrowser) {
      return;
    }

    const rawPaths = SKILLS_ICON_DATA[this.name] || '';
    this.safeSvgContent = this.sanitizer.bypassSecurityTrustHtml(rawPaths);
  }
}
