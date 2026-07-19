import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Entity_User } from '@core/models/entities/user.entity';
import { AuthService } from '@api/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, RouterLink, RouterLinkActive],
})
export class HomeComponent implements OnInit {
  private authService = inject(AuthService);

  userState = Entity_User.state;
  user = computed(() => this.userState().value);
  loggingOut = signal(false);

  constructor() {}

  ngOnInit() {}

  onLogout() {
    this.loggingOut.set(true);
    this.authService.logout();
  }
}
