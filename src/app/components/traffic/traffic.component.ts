import { Component, Input } from '@angular/core';
import { ITrafficPublic } from '../../interfaces/traffic';
import { TrafficService } from '../../services/traffic.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-traffic',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './traffic.component.html',
  styleUrl: './traffic.component.scss'
})
export class TrafficComponent {
  @Input() traffic: ITrafficPublic;
  isEditing: boolean = false;
  note: string = "";

  constructor(private trafficService: TrafficService) { }

  deleteTraffic() {
    this.trafficService.deleteTraffic({ id: this.traffic.id, serverId: this.traffic.serverId });
  }

  saveAndDeleteTraffic() {
    this.trafficService.saveAndDelete({ id: this.traffic.id, serverId: this.traffic.serverId })
  }

  updateTraffic() {
    this.trafficService.updateTraffic( {id: this.traffic.id, serverId: this.traffic.serverId });
  }
}
