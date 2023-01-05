import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth/services/auth.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-auth-demo';

  connected = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getCurrentUser().pipe(
      map((user) => !!user)
    ).subscribe((isConnected) => this.connected = isConnected);
  }
}
