import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
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
  readonly messageHeight = signal<number | null>(null);
  private readonly minimumMessageHeight = 202;
  private messageResizeStartY = 0;
  private messageResizeStartHeight = this.minimumMessageHeight;
  private isResizingMessage = false;

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

  getNameErrorKey(name: string): string {
    const trimmedName = name.trim();

    if (!trimmedName) {
      return 'CONTACT.ERROR_NAME_REQUIRED';
    }

    if (/\d/.test(trimmedName)) {
      return 'CONTACT.ERROR_NAME_NUMBERS';
    }

    return 'CONTACT.ERROR_NAME_INVALID';
  }

  isValidEmail(email: string): boolean {
    return /^(?=.{1,254}$)(?=.{1,64}@)[A-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+[A-Z]{2,63}$/i.test(email.trim());
  }

  getEmailErrorKey(email: string): string {
    return email.trim() ? 'CONTACT.ERROR_EMAIL_INVALID' : 'CONTACT.ERROR_EMAIL_REQUIRED';
  }

  isValidMessage(message: string): boolean {
    return message.trim().length >= 10;
  }

  isMessageEmpty(message: string): boolean {
    return message.trim().length === 0;
  }

  startMessageResize(event: PointerEvent, textarea: HTMLTextAreaElement): void {
    event.preventDefault();
    this.isResizingMessage = true;
    this.messageResizeStartY = event.clientY;
    this.messageResizeStartHeight = textarea.getBoundingClientRect().height;

    const resizeHandle = event.currentTarget as HTMLButtonElement;
    resizeHandle.setPointerCapture(event.pointerId);
  }

  resizeMessage(event: PointerEvent): void {
    if (!this.isResizingMessage) {
      return;
    }

    this.messageHeight.set(Math.max(
      this.minimumMessageHeight,
      this.messageResizeStartHeight + event.clientY - this.messageResizeStartY,
    ));
  }

  stopMessageResize(event: PointerEvent): void {
    const resizeHandle = event.currentTarget as HTMLButtonElement;

    if (resizeHandle.hasPointerCapture(event.pointerId)) {
      resizeHandle.releasePointerCapture(event.pointerId);
    }

    this.isResizingMessage = false;
  }

  resizeMessageWithKeyboard(event: KeyboardEvent): void {
    if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') {
      return;
    }

    event.preventDefault();
    const currentHeight = this.messageHeight() ?? this.minimumMessageHeight;
    const heightChange = event.key === 'ArrowUp' ? 16 : -16;
    this.messageHeight.set(Math.max(this.minimumMessageHeight, currentHeight + heightChange));
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
      const activeElement = document.activeElement;

      if (activeElement instanceof HTMLElement) {
        activeElement.blur();
      }

      window.scrollTo({
        top: 0,
        behavior: 'smooth' 
      });
    }
  }
}
