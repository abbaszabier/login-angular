import { Injectable, signal } from '@angular/core';
import { Contact } from '@core/models/contact.model';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private _contacts = signal<Contact[]>([]);
  contacts = this._contacts.asReadonly();

  add(data: { nama: string; email: string; phone: number }) {
    const newContact: Contact = {
      ...data,
      id: crypto.randomUUID(),
      isFavorite: false,
      createdAt: new Date().toISOString(),
    };
    this._contacts.update((list) => [...list, newContact]);
  }

  delete(id: string) {
    this._contacts.update((list) => list.filter((c) => c.id !== id));
  }

  toggleFavorite(id: string) {
    this._contacts.update((list) =>
      list.map((c) => (c.id === id ? { ...c, isFavorite: !c.isFavorite } : c)),
    );
  }
}
