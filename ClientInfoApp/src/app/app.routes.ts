
import { Routes } from '@angular/router';
import { ClientListComponent } from './components/client-list/client-list.component';
import { ClientAddComponent } from './components/client-add/client-add.component';
import { ClientEditComponent } from './components/client-edit/client-edit.component';
import { LoginFormComponent } from './components/login-form/login-form.component';

export const routes: Routes = [
  { path: "", component: LoginFormComponent },
  { path: "list", component: ClientListComponent },
  { path: "add-client", component: ClientAddComponent },
  { path: "client/:id", component: ClientEditComponent }
];
