import { EventEmitter, Injectable } from '@angular/core';
import { Client } from '../model/client';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private Clients: Client[] = [];
  public onClientsCountChange = new EventEmitter();
  constructor(private http: HttpClient, private auth: AuthService) { }

  public addClients(Client: Client) {
    return this.http.post("https://ku-2024-default-rtdb.europe-west1.firebasedatabase.app/Clients.json", Client, {
      params: {
        "auth": this.auth.idToken
      }
    });
  }

  public loadClients() {
    return this.http
      .get<{ [key: string]: Client }>("https://ku-2024-default-rtdb.europe-west1.firebasedatabase.app/Clients.json", {
        params: {
          "auth": this.auth.idToken
        }
      })
      .pipe(
        map((data): Client[] => {
          const Clients = [];
          for (let k in data) {
            data[k].id = k;
            Clients.push(data[k]);
          }
          return Clients;
        }),
        tap((data) => {
          this.Clients = data;
          this.onClientsCountChange.emit();
        })
      )
  }

  public loadClient(id: string) {
    return this.http.get<Client>("https://ku-2024-default-rtdb.europe-west1.firebasedatabase.app/Clients/" + id + ".json", {
      params: {
        "auth": this.auth.idToken
      }
    });
  }
  public updateClient(Client: Client) {
    return this.http.patch("https://ku-2024-default-rtdb.europe-west1.firebasedatabase.app/Clients/" + Client.id + ".json", Client, {
      params: {
        "auth": this.auth.idToken
      }
    });
  }

  public deleteClient(id: string) {
    return this.http.delete("https://ku-2024-default-rtdb.europe-west1.firebasedatabase.app/Clients/" + id + ".json", {
      params: {
        "auth": this.auth.idToken
      }
    });
  }

  public getCount() {
    return this.Clients.length;
  }

}
