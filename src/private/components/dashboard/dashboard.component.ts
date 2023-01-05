import { Component } from '@angular/core';
import { AuthService } from '../../../shared/auth/services/auth.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  username$ = this.authService.getCurrentUser().pipe(
    map((currentUser) => currentUser ? currentUser.login : '')
  );

  constructor(private authService: AuthService) {}
}
