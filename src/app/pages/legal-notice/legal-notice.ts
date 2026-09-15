import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

/** Renders the localized legal notice page. */
@Component({
  selector: 'app-legal-notice',
  imports: [NgOptimizedImage, RouterLink, TranslatePipe],
  templateUrl: './legal-notice.html',
  styleUrls: ['./legal-notice.scss'],
})
export class LegalNoticeComponent {

}
