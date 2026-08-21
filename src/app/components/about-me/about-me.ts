import { NgOptimizedImage, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, PLATFORM_ID, Renderer2, ViewChild } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { IconComponent } from '../icon/icon';

@Component({
  selector: 'app-about-me',
  imports: [IconComponent, NgOptimizedImage, TranslatePipe],
  templateUrl: './about-me.html',
  styleUrls: ['./about-me.scss'],
})
export class AboutMe implements AfterViewInit, OnDestroy {
  @ViewChild('photoRef') photoRef!: ElementRef<HTMLImageElement>;
  @ViewChild('waveMobileRef') waveMobileRef!: ElementRef<HTMLImageElement>;

  private unlistenResize!: () => void;

  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.syncMobileWave(), 150);
      this.unlistenResize = this.renderer.listen('window', 'resize', () => this.syncMobileWave());
    }
  }

  syncMobileWave() {
    if (!this.photoRef || !this.waveMobileRef || window.innerWidth > 1380) return;

    const photoEl = this.photoRef.nativeElement;
    if (photoEl.clientHeight === 0) return;

    const calculatedTop = this.calculateWaveTop(photoEl);
    if (calculatedTop !== null) {
      this.renderer.setStyle(this.waveMobileRef.nativeElement, 'top', `${calculatedTop}px`);
    }
  }

  private calculateWaveTop(photoEl: HTMLImageElement): number | null {
    const photoRect = photoEl.getBoundingClientRect();
    const sectionEl = photoEl.closest('.about-me');
    if (!sectionEl) return null;

    const sectionRect = sectionEl.getBoundingClientRect();
    const factor = this.getResponsiveFactor(window.innerWidth);

    const relativePhotoTop = photoRect.top - sectionRect.top;
    return relativePhotoTop + (photoRect.height * factor);
  }

  private getResponsiveFactor(width: number): number {
    if (width >= 1000) return 0.62 + ((1380 - width) / (1380 - 1000)) * 0.10;
    if (width >= 880) return 0.72 - ((1000 - width) / (1000 - 880)) * 0.001;
    if (width > 768) return 0.84 - ((880 - width) / (880 - 768)) * 0.16;
    if (width >= 360) return 0.77 + ((768 - width) / (768 - 360)) * 0.10;
    return 0.87 + ((360 - width) / (360 - 320)) * 0.001;
  }

  ngOnDestroy() {
    if (this.unlistenResize) this.unlistenResize();
  }
}
