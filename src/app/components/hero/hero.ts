import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
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

  ngAfterViewInit(): void {
    this.calculateBlobPositions();

    this.resizeObserver = new ResizeObserver(() => {
      this.calculateBlobPositions();
    });

    this.resizeObserver.observe(document.body);
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  private calculateBlobPositions(): void {
    const titleElement = this.titleWrapper.nativeElement as HTMLElement;
    const heroElement = titleElement.closest('.hero') as HTMLElement | null;

    if (!heroElement) {
      return;
    }

    const textRect = titleElement.getBoundingClientRect();
    const heroRect = heroElement.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const heroWidth = heroRect.width;
    const heroHeight = heroRect.height;

    const textLeftInHero = textRect.left - heroRect.left;
    const textTopInHero = textRect.top - heroRect.top;

    if (windowWidth >= 1280) {
      this.purpleX = textLeftInHero - (heroWidth * 0.18);
      this.purpleY = textTopInHero - (heroHeight * 0.12);
      this.cyanX = textLeftInHero + textRect.width + (heroWidth * 0.05);
      this.cyanY = textTopInHero - (heroHeight * 0.10);
    } else if (windowWidth >= 1024) {
      this.purpleX = textLeftInHero - (heroWidth * 0.20);
      this.purpleY = textTopInHero - (heroHeight * 0.10);
      this.cyanX = textLeftInHero + textRect.width + (heroWidth * 0.04);
      this.cyanY = textTopInHero - (heroHeight * 0.09);
    } else if (windowWidth >= 912) {
      this.purpleX = textLeftInHero - (heroWidth * 0.20);
      this.purpleY = textTopInHero - (heroHeight * 0.12);
      this.cyanX = textLeftInHero + textRect.width + (heroWidth * 0.18);
      this.cyanY = textTopInHero - (heroHeight * 0.14);
    } else if (windowWidth >= 820) {
      this.purpleX = textLeftInHero - (heroWidth * 0.24);
      this.purpleY = textTopInHero - (heroHeight * 0.06);
      this.cyanX = textLeftInHero + textRect.width + (heroWidth * 0.03);
      this.cyanY = textTopInHero - (heroHeight * 0.06);
    } else if (windowWidth >= 768) {
      this.purpleX = textLeftInHero - (heroWidth * 0.26);
      this.purpleY = textTopInHero - (heroHeight * 0.04);
      this.cyanX = textLeftInHero + textRect.width + (heroWidth * 0.02);
      this.cyanY = textTopInHero - (heroHeight * 0.05);
    } else if (windowWidth >= 540) {
      this.purpleX = textLeftInHero - (heroWidth * 0.30);
      this.purpleY = textTopInHero;
      this.cyanX = textLeftInHero + textRect.width + (heroWidth * 0.01);
      this.cyanY = textTopInHero - (heroHeight * 0.03);
    } else if (windowWidth >= 440) {
      this.purpleX = textLeftInHero - (heroWidth * 0.32);
      this.purpleY = textTopInHero + (heroHeight * 0.03);
      this.cyanX = textLeftInHero + textRect.width;
      this.cyanY = textTopInHero - (heroHeight * 0.02);
    } else if (windowWidth >= 430) {
      this.purpleX = textLeftInHero - (heroWidth * 0.33);
      this.purpleY = textTopInHero + (heroHeight * 0.03);
      this.cyanX = textLeftInHero + textRect.width - (heroWidth * 0.01);
      this.cyanY = textTopInHero - (heroHeight * 0.02);
    } else if (windowWidth >= 412) {
      this.purpleX = textLeftInHero - (heroWidth * 0.34);
      this.purpleY = textTopInHero + (heroHeight * 0.04);
      this.cyanX = textLeftInHero + textRect.width - (heroWidth * 0.01);
      this.cyanY = textTopInHero - (heroHeight * 0.01);
    } else if (windowWidth >= 390) {
      this.purpleX = textLeftInHero - (heroWidth * 0.35);
      this.purpleY = textTopInHero + (heroHeight * 0.05);
      this.cyanX = textLeftInHero + textRect.width - (heroWidth * 0.02);
      this.cyanY = textTopInHero - (heroHeight * 0.01);
    } else if (windowWidth >= 375) {
      this.purpleX = textLeftInHero - (heroWidth * 0.36);
      this.purpleY = textTopInHero + (heroHeight * 0.06);
      this.cyanX = textLeftInHero + textRect.width - (heroWidth * 0.02);
      this.cyanY = textTopInHero;
    } else {
      this.purpleX = textLeftInHero - (heroWidth * 0.37);
      this.purpleY = textTopInHero + (heroHeight * 0.06);
      this.cyanX = textLeftInHero + textRect.width - (heroWidth * 0.03);
      this.cyanY = textTopInHero;
    }

    this.purpleX += heroWidth * 0.16;
    this.cyanX += heroWidth * 0.14;
    this.purpleY += heroHeight * 0.18;
    this.cyanY += heroHeight * 0.16;
  }
}
