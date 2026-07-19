import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatPhone', standalone: true })
export class FormatPhonePipe implements PipeTransform {
  transform(value: number | string | null | undefined): string {
    if (!value) return '';
    const digits = String(value).replace(/\D/g, '');
    if (digits.length < 4) return digits;

    const first = digits.slice(0, 4);
    const rest = digits.slice(4).match(/.{1,4}/g) ?? [];
    return [first, ...rest].join('-');
  }
}
