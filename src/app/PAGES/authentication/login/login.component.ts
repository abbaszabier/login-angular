import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputTextComponent } from '@shared/ui/input-text/input-text.component';
import { AuthService } from '@api/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, InputTextComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  loading = signal(false);
  errorMessage = signal<string | null>(null);

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit() {
    this.setupForm();
  }

  setupForm() {
    this.form = this.fb.group({
      phone: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.errorMessage.set(null);

    try {
      const { phone, password } = this.form.getRawValue();
      const data = await this.authService.post_login({ phone, password });

      if (!data) {
        this.errorMessage.set('Login gagal. Periksa kembali phone & password Anda.');
        return;
      }

      this.router.navigate(['/']);
    } catch (err: any) {
      this.errorMessage.set(err?.error?.message ?? 'Terjadi kesalahan saat login.');
    } finally {
      this.loading.set(false);
    }
  }
}
