import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '@core/services/contact.service';
import { ContactListComponent } from './contact-list/contact-list.component';
import { HelperService, Popup_m } from '@core/services/helper.service';

@Component({
  selector: 'app-daftar-kontak',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ContactListComponent],
  templateUrl: './daftar-kontak.component.html',
  styleUrl: './daftar-kontak.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DaftarKontakComponent {
  private fb = inject(FormBuilder);
  private contactService = inject(ContactService);
  private helper = inject(HelperService);

  contacts = this.contactService.contacts;
  showForm = signal(false);

  form = this.fb.group({
    nama: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
  });

  onAddClick() {
    this.showForm.set(true);
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { nama, email, phone } = this.form.getRawValue();
    this.contactService.add({ nama: nama!, email: email!, phone: Number(phone) });
    this.form.reset();
    this.showForm.set(false);
  }

  onCancel() {
    this.form.reset();
    this.showForm.set(false);
  }

  onToggleFavorite(id: string) {
    this.contactService.toggleFavorite(id);
  }

  onDeleteContact(id: string) {
    const popup: Popup_m = {
      type: 'warning',
      title: 'Hapus kontak?',
      message: 'Kontak yang dihapus tidak bisa dikembalikan.',
      button: 'Hapus',
      showCancel: true,
    };

    this.helper.confirmationAlert(popup, true).then((ok) => {
      if (ok) this.contactService.delete(id);
    });
  }
}
