import { Component } from '@angular/core';
import { AuthService } from '../shared/auth/services/auth.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-auth-demo';

  connected$ = this.authService.getCurrentUser().pipe(map((user) => !!user));

  constructor(private authService: AuthService) {
  }
}
