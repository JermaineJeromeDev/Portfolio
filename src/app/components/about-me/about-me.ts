import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { IconComponent } from '../icon/icon';

@Component({
  selector: 'app-about-me',
  imports: [IconComponent, NgOptimizedImage, TranslatePipe],
  templateUrl: './about-me.html',
  styleUrls: ['./about-me.scss'],
})
export class AboutMe {

}
