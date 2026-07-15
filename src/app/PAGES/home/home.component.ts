import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { Widget_gameModule } from '@shared/widgets/widget_game/widget_game.module';
import { Entity_User } from '@core/models/entities/user.entity';
import { AuthService } from '@api/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [Widget_gameModule],
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
