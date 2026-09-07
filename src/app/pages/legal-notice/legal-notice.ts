import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

/** Renders the localized legal notice page. */
@Component({
  selector: 'app-legal-notice',
  imports: [TranslatePipe],
  templateUrl: './legal-notice.html',
  styleUrls: ['./legal-notice.scss'],
})
export class LegalNoticeComponent {

}
