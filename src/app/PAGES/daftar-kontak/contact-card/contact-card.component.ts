import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact } from '@core/models/contact.model';
import { FormatPhonePipe } from '@shared/utils/format-phone.pipe';
import { HighlightFavoriteDirective } from '@shared/directives/highlight-favorite.directive';
import { ButtonComponent } from '@shared/ui/button/button.component';

@Component({
  selector: 'app-contact-card',
  standalone: true,
  imports: [CommonModule, FormatPhonePipe, HighlightFavoriteDirective, ButtonComponent],
  templateUrl: './contact-card.component.html',
  styleUrl: './contact-card.component.css',
})
export class ContactCardComponent {
  @Input({ required: true }) contact!: Contact;
  @Output() toggleFavorite = new EventEmitter<string>();
  @Output() deleteContact = new EventEmitter<string>();

  onToggleFavorite() {
    this.toggleFavorite.emit(this.contact.id);
  }

  onDelete() {
    this.deleteContact.emit(this.contact.id);
  }
}
