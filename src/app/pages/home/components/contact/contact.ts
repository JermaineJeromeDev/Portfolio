import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { ButtonComponent } from '../../../../components/button/button';
import { ContactService } from '../../../../core/services/contact.service';

/**
 * Component managing the contact form of the portfolio.
 * Handles form validation, user input processing, dynamic textarea resizing,
 * and form submission via Formspree.
 */
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe, RouterLink, ButtonComponent],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss']
})
export class ContactComponent {
  private readonly contactService = inject(ContactService);

  /** Reactive signal tracking the custom height of the message textarea in pixels. */
  readonly messageHeight = signal<number | null>(null);

  /** The minimum allowed height for the message textarea in pixels. */
  private readonly minimumMessageHeight = 202;

  /** Stores the initial Y-coordinate of the pointer when starting to resize the textarea. */
  private messageResizeStartY = 0;

  /** Stores the initial height of the textarea when starting to resize. */
  private messageResizeStartHeight = this.minimumMessageHeight;

  /** Flag indicating whether the user is currently resizing the textarea. */
  private isResizingMessage = false;

  /** Data model binding the form inputs. */
  contactData = {
    name: '',
    email: '',
    message: '',
    privacyAccepted: false
  };

  /** Indicates whether the email was successfully transmitted. */
  mailSent = false;

  /** Indicates whether the form is currently in the process of submitting. */
  isSubmitting = false;

  /** Flag triggered if an error occurs during form submission. */
  submitError = false;

  /**
   * Normalizes a string by trimming whitespace. Returns an empty string if null or undefined.
   * 
   * @param value - The raw string to normalize.
   * @returns The trimmed string, or an empty string.
   */
  private normalize(value: string | null | undefined): string {
    return value?.trim() ?? '';
  }

  /**
   * Validates if the given name contains at least two Unicode letters and valid punctuation.
   * 
   * @param name - The name string to validate.
   * @returns True if the name is valid, false otherwise.
   */
  isValidName(name: string | null | undefined): boolean {
    return /^(?=(?:.*\p{L}){2,})[\p{L}\p{M}' -]+$/u.test(this.normalize(name));
  }

  /**
   * Evaluates the name input and returns the matching translation key for the error message.
   * 
   * @param name - The name string to evaluate.
   * @returns The translation key corresponding to the specific validation error.
   */
  getNameErrorKey(name: string | null | undefined): string {
    const trimmedName = this.normalize(name);

    if (!trimmedName) {
      return 'CONTACT.ERROR_NAME_REQUIRED';
    }

    if (/\d/.test(trimmedName)) {
      return 'CONTACT.ERROR_NAME_NUMBERS';
    }

    return 'CONTACT.ERROR_NAME_INVALID';
  }

  /**
   * Validates if the given email matches a strict standardized regular expression.
   * 
   * @param email - The email string to validate.
   * @returns True if the email is valid, false otherwise.
   */
  isValidEmail(email: string | null | undefined): boolean {
    return /^(?=.{1,254}$)(?=.{1,64}@)[A-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+[A-Z]{2,63}$/i.test(this.normalize(email));
  }

  /**
   * Evaluates the email input and returns the matching translation key for the error message.
   * 
   * @param email - The email string to evaluate.
   * @returns The translation key corresponding to the validation error.
   */
  getEmailErrorKey(email: string | null | undefined): string {
    return this.normalize(email) ? 'CONTACT.ERROR_EMAIL_INVALID' : 'CONTACT.ERROR_EMAIL_REQUIRED';
  }

  /**
   * Checks if the message content meets the minimum length requirement of 10 characters.
   * 
   * @param message - The message string to validate.
   * @returns True if the message is at least 10 characters long, false otherwise.
   */
  isValidMessage(message: string | null | undefined): boolean {
    return this.normalize(message).length >= 10;
  }

  /**
   * Checks whether the message input is empty after trimming whitespace.
   * 
   * @param message - The message string to check.
   * @returns True if the message is empty, false otherwise.
   */
  isMessageEmpty(message: string | null | undefined): boolean {
    return this.normalize(message).length === 0;
  }

  /**
   * Initializes the pointer resize operation for the message textarea.
   * Captures the initial pointer position and sets the pointer capture.
   * 
   * @param event - The PointerEvent triggered by the user interaction.
   * @param textarea - The HTML textarea element being resized.
   */
  startMessageResize(event: PointerEvent, textarea: HTMLTextAreaElement): void {
    event.preventDefault();
    this.isResizingMessage = true;
    this.messageResizeStartY = event.clientY;
    this.messageResizeStartHeight = textarea.getBoundingClientRect().height;

    const resizeHandle = event.currentTarget as HTMLButtonElement;
    resizeHandle.setPointerCapture(event.pointerId);
  }

  /**
   * Tracks pointer movements and updates the `messageHeight` signal accordingly.
   * Prevents resizing below the configured minimum height.
   * 
   * @param event - The PointerEvent tracked during dragging.
   */
  resizeMessage(event: PointerEvent): void {
    if (!this.isResizingMessage) {
      return;
    }

    this.messageHeight.set(Math.max(
      this.minimumMessageHeight,
      this.messageResizeStartHeight + event.clientY - this.messageResizeStartY,
    ));
  }

  /**
   * Ends the pointer resize operation and releases the pointer capture.
   * 
   * @param event - The PointerEvent triggered when releasing the interaction.
   */
  stopMessageResize(event: PointerEvent): void {
    const resizeHandle = event.currentTarget as HTMLButtonElement;

    if (resizeHandle.hasPointerCapture(event.pointerId)) {
      resizeHandle.releasePointerCapture(event.pointerId);
    }

    this.isResizingMessage = false;
  }

  /**
   * Adjusts the textarea height using ArrowUp and ArrowDown keyboard shortcuts.
   * Adds or subtracts 16px increments.
   * 
   * @param event - The KeyboardEvent capturing the arrow keys.
   */
  resizeMessageWithKeyboard(event: KeyboardEvent): void {
    if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') {
      return;
    }

    event.preventDefault();
    const currentHeight = this.messageHeight() ?? this.minimumMessageHeight;
    const heightChange = event.key === 'ArrowUp' ? 16 : -16;
    this.messageHeight.set(Math.max(this.minimumMessageHeight, currentHeight + heightChange));
  }

  /**
   * Handles form submission. Validates fields manually before sending the data to Formspree.
   * Resets the form and triggers a success notice upon standard response.
   * 
   * @param form - The NgForm reference passed from the template.
   * @returns A promise that resolves when the submission process completes.
   */
  async onSubmit(form: NgForm): Promise<void> {
    if (
      form.valid &&
      this.isValidName(this.contactData.name) &&
      this.isValidEmail(this.contactData.email) &&
      this.isValidMessage(this.contactData.message) &&
      this.contactData.privacyAccepted
    ) {
      this.isSubmitting = true;
      this.submitError = false;

      try {
        await firstValueFrom(this.contactService.submit({
          name: this.normalize(this.contactData.name),
          email: this.normalize(this.contactData.email),
          message: this.normalize(this.contactData.message),
          privacyAccepted: this.contactData.privacyAccepted,
        }));

        this.mailSent = true;
        this.contactData = {
          name: '',
          email: '',
          message: '',
          privacyAccepted: false,
        };
        form.resetForm(this.contactData);

        setTimeout(() => this.mailSent = false, 4000);
      } catch {
        this.submitError = true;
      } finally {
        this.isSubmitting = false;
      }
    }
  }

  /**
   * Blurs the currently focused element and smoothly scrolls the window back to the top.
   * Safe for Server-Side Rendering (SSR) environments.
   */
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
