import { Component, Input } from '@angular/core';
import { TrafficService } from '../../services/traffic.service';
import { TrafficDTOIncludeOwnership } from '../../dto/traffic';
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
  @Input() traffic: TrafficDTOIncludeOwnership;
  isEditing: boolean = false;
  note: string = "";

  constructor(private trafficService: TrafficService) { }

  deleteTraffic() {
    this.trafficService.deleteTraffic({ id: this.traffic.id });
  }

  beginService() {
    this.trafficService.beginServiceOnTraffic({ id: this.traffic.id })
  }

  endService() {
    this.trafficService.endServiceOnTraffic({ id: this.traffic.id })
  }
}
