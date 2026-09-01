import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonComponent } from '../../../../components/button/button';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe, RouterLink, ButtonComponent],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss']
})
export class ContactComponent {
  contactData = {
    name: '',
    email: '',
    message: '',
    privacyAccepted: false
  };

  mailSent = false;

  onSubmit(form: NgForm): void {
    if (form.valid && this.contactData.privacyAccepted) {
      console.log('Formular-Daten bereit für Backend:', this.contactData);
      
      this.mailSent = true;
      form.resetForm();
      this.contactData.privacyAccepted = false;

      setTimeout(() => this.mailSent = false, 4000);
    }
  }

  scrollToTop(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth' 
      });
    }
  }
}
