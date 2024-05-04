import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ServerComponent } from './components/server/server.component';
import { TrafficComponent } from './components/traffic/traffic.component';
import { FormsModule } from "@angular/forms"
import { ServerService } from './services/server.service';
import { ModalService } from './services/modal.service';
import { UserService } from './services/user.service';
import { SocketService } from './services/socket.service';
import { TrafficService } from './services/traffic.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ServerComponent, TrafficComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(public serverService: ServerService,
              public modalService: ModalService,
              public userService: UserService,
              public socketService: SocketService,
              public trafficService: TrafficService) {
    this.socketService.isReady.subscribe((v) => { v && this.showCreateUserModal() });
  }

  showCreateServerModal() {
    this.modalService.showModal("Create Server", "Please enter the name of the server", (name: string) => this.serverService.createServer({ name }));
  }

  showCreateUserModal() {
    this.modalService.showModal("Create User", "Please enter your name", (name: string) => this.userService.createUser({ name, color: "FFFFFF" }));
  }
}
