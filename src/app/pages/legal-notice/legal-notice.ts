import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-legal-notice',
  imports: [TranslatePipe],
  templateUrl: './legal-notice.html',
  styleUrls: ['./legal-notice.scss'],
})
export class LegalNoticeComponent {

}
