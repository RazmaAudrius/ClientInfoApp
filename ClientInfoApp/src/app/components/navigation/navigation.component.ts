import { Component } from '@angular/core';
import { Router,RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {

  constructor(public router:Router, public auth: AuthService) { }

  public LogOut() {
    this.auth.logOut();
    this.router.navigate(['']);
  }

}
