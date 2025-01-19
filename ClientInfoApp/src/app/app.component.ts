import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClientAddComponent } from './components/client-add/client-add.component';
import { ClientEditComponent } from './components/client-edit/client-edit.component';
import { ClientListComponent } from './components/client-list/client-list.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { NavigationComponent } from './components/navigation/navigation.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [RouterOutlet,ClientAddComponent, ClientEditComponent, ClientListComponent, LoginFormComponent, NavigationComponent],
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ClientInfoApp';
}
