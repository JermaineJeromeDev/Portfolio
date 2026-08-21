import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, PLATFORM_ID, ViewChild } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonComponent } from '../../../../components/button/button';

interface Coordinates { x: number; y: number; }

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ButtonComponent, TranslatePipe],
  templateUrl: './hero.html',
  styleUrls: ['./hero.scss'],
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('titleWrapper') titleWrapper!: ElementRef;

  purpleX = 0; purpleY = 0;
  cyanX = 0; cyanY = 0;
  private resizeObserver?: ResizeObserver;

  constructor(
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      requestAnimationFrame(() => this.calculateBlobPositions());
      this.resizeObserver = new ResizeObserver(() => this.calculateBlobPositions());
      this.resizeObserver.observe(document.body);
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.resizeObserver?.disconnect();
    }
  }

  private calculateBlobPositions(): void {
    if (!isPlatformBrowser(this.platformId) || !this.titleWrapper) return;

    const titleEl = this.titleWrapper.nativeElement as HTMLElement;
    const heroEl = titleEl.closest('.hero') as HTMLElement | null;
    if (!heroEl) return;

    const textRect = titleEl.getBoundingClientRect();
    const heroRect = heroEl.getBoundingClientRect();
    const textLeft = textRect.left - heroRect.left;
    const textTop = textRect.top - heroRect.top;
    const purpleCoords = this.calculatePurpleBlob(textLeft, textTop);
    const cyanCoords = this.calculateCyanBlob(textLeft, textTop, textRect.width, heroRect.width);

    this.purpleX = purpleCoords.x;
    this.purpleY = purpleCoords.y;
    this.cyanX = cyanCoords.x;
    this.cyanY = cyanCoords.y;

    this.cdr.detectChanges();
  }

  private calculatePurpleBlob(left: number, top: number): Coordinates {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const isLandscape = w <= 767 && w > h && h <= 620;

    if (w >= 1024 && h <= 600) return { x: left - 330, y: top - 130 };
    if (isLandscape) return { x: left - (w >= 1200 ? 380 : 260), y: top + 600 };
    if (w >= 1024) {
      const offset = w >= 1440 ? 560 : 560 - ((1440 - w) * 0.7);
      return { x: left - (w >= 1200 && h < 850 ? 400 : offset), y: top - (w >= 1200 && h < 850 ? 220 : 300) };
    }
    if (w >= 768) return { x: left - 330, y: top - 300 };
    if (w >= 540) return { x: left - 220, y: top - 200 };
    if (w >= 420) return { x: left - 200, y: top - 150 };
    return { x: left - (w >= 360 ? 200 : 150), y: top - (w >= 360 ? 110 : 150) };
  }

  private calculateCyanBlob(left: number, top: number, textW: number, heroW: number): Coordinates {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const isLandscape = w <= 767 && w > h && h <= 620;

    if (w >= 1024 && h <= 600) return { x: Math.min(heroW - 40, left + textW - 100), y: top - 180 };
    if (isLandscape) return { x: Math.min(heroW - 40, left + textW - (w >= 1200 ? 60 : 120)), y: top - 20 };
    if (w >= 1024) {
      if (w >= 1200 && h < 850) return { x: Math.min(heroW - 60, left + textW - 60), y: top - 250 };
      const rightCap = Math.min(200, heroW * 0.25);
      return { x: Math.min(heroW - 20, left + textW + 400) - rightCap, y: top - 120 };
    }
    if (w >= 768) return { x: Math.min(heroW - 100, left + textW - 120), y: top - 100 };
    if (w >= 540) return { x: Math.min(heroW - 20, left + textW - 65), y: top - 80 };
    if (w >= 420) return { x: Math.min(heroW - 80, left + textW - 150), y: top - 5 };
    return { x: Math.min(heroW - (w >= 360 ? 60 : 40), left + textW - (w >= 360 ? 95 : 140)), y: top - (w >= 360 ? 20 : 10) };
  }
}
