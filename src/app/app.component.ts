import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ServerComponent } from './components/server/server.component';
import { TrafficComponent } from './components/traffic/traffic.component';
import { FormsModule } from "@angular/forms"
import { ServerService } from './services/server.service';
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
  public modalInput: string;
  public modalTitle: string;
  public modalDescription: string;
  public modalButtonText: string;
  public isCreatingUser: boolean = true;
  public createCallback: () => void;

  constructor(public serverService: ServerService,
    public userService: UserService,
    public socketService: SocketService,
    public trafficService: TrafficService) {
    this.socketService.isReady.subscribe((v) => { v && this.showCreateUserModal() });
  }

  showCreateServerModal() {
    const modal = document.getElementById("main_modal") as HTMLDialogElement;
    this.isCreatingUser = false;
    this.modalInput = "";
    this.modalTitle = "Create New Server";
    this.modalDescription = "Please Enter the Name for the New Server";
    this.modalButtonText = "Create Server";
    this.createCallback = () => {
      this.serverService.createServer({ name: this.modalInput });
    }
    modal.showModal();
  }

  showCreateUserModal() {
    const modal = document.getElementById("main_modal") as HTMLDialogElement;
    this.isCreatingUser = true;
    this.modalInput = "";
    this.modalTitle = "Create User";
    this.modalDescription = "Please Enter Your Name";
    this.modalButtonText = "Confirm";
    this.createCallback = () => {
      this.userService.createUser({ name: this.modalInput, color: "#000000" });
    }
    modal.showModal();
  }
}
