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

  isValidName(name: string): boolean {
    return /^(?=(?:.*\p{L}){2,})[\p{L}\p{M}' -]+$/u.test(name.trim());
  }

  isValidEmail(email: string): boolean {
    return /^(?=.{1,254}$)(?=.{1,64}@)[A-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+[A-Z]{2,63}$/i.test(email.trim());
  }

  isValidMessage(message: string): boolean {
    return message.trim().length >= 10;
  }

  isMessageEmpty(message: string): boolean {
    return message.trim().length === 0;
  }

  onSubmit(form: NgForm): void {
    if (
      form.valid &&
      this.isValidName(this.contactData.name) &&
      this.isValidEmail(this.contactData.email) &&
      this.isValidMessage(this.contactData.message) &&
      this.contactData.privacyAccepted
    ) {
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
