import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, PLATFORM_ID, ViewChild } from '@angular/core';
import { ButtonComponent } from "../button/button";

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './hero.html',
  styleUrls: ['./hero.scss'],
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('titleWrapper') titleWrapper!: ElementRef;

  purpleX = 0;
  purpleY = 0;
  cyanX = 0;
  cyanY = 0;

  private resizeObserver?: ResizeObserver;

  constructor(
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      requestAnimationFrame(() => {
        this.calculateBlobPositions();
      });

      this.resizeObserver = new ResizeObserver(() => {
        this.calculateBlobPositions();
      });

      this.resizeObserver.observe(document.body);
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.resizeObserver?.disconnect();
    }
  }

  private calculateBlobPositions(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const titleElement = this.titleWrapper.nativeElement as HTMLElement;
    const heroElement = titleElement.closest('.hero') as HTMLElement | null;

    if (!heroElement) {
      return;
    }

    const textRect = titleElement.getBoundingClientRect();
    const heroRect = heroElement.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const heroWidth = heroRect.width;

    const textLeftInHero = textRect.left - heroRect.left;
    const textTopInHero = textRect.top - heroRect.top;

    if (windowWidth >= 1024) {
      const dynamicLeftOffset = windowWidth >= 1440 ? 560 : 560 - ((1440 - windowWidth) * 0.7);
      const desktopExtraRight = 400;
      const rightCap = Math.min(200, heroWidth * 0.25);

      this.purpleX = textLeftInHero - dynamicLeftOffset;
      this.purpleY = textTopInHero - 220;

      this.cyanX = Math.min(heroWidth - 20, textLeftInHero + textRect.width + desktopExtraRight) - rightCap;
      this.cyanY = textTopInHero - 250;
    }

    else if (windowWidth >= 768) {
      this.purpleX = textLeftInHero - 330;
      this.purpleY = textTopInHero - 260;

      this.cyanX = Math.min(heroWidth - 100, textLeftInHero + textRect.width - 140);
      this.cyanY = textTopInHero -50;
    }

    else if (windowWidth >= 540) {
      this.purpleX = textLeftInHero - 120;
      this.purpleY = textTopInHero + 40;

      this.cyanX = Math.min(heroWidth - 80, textLeftInHero + textRect.width + 10);
      this.cyanY = textTopInHero + 180;
    }

    else if (windowWidth >= 420) {
      this.purpleX = textLeftInHero - 90;
      this.purpleY = textTopInHero + 50;

      this.cyanX = Math.min(heroWidth - 120, textLeftInHero + textRect.width + 5);
      this.cyanY = textTopInHero + 150;
    }

    else if (windowWidth >= 360) {
      this.purpleX = textLeftInHero - 70;
      this.purpleY = textTopInHero + 80;

      this.cyanX = Math.min(heroWidth - 150, textLeftInHero + textRect.width - 10);
      this.cyanY = textTopInHero + 160;
    }

    else {
      this.purpleX = textLeftInHero - 40;
      this.purpleY = textTopInHero + 100;

      this.cyanX = Math.min(heroWidth - 170, textLeftInHero + textRect.width - 30);
      this.cyanY = textTopInHero + 170;
    }

    this.cdr.detectChanges();
  }
}
