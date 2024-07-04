import { Component, OnInit } from '@angular/core';
import { IServer } from '../../interfaces/server';
import { Input } from "@angular/core";
import { TrafficService } from '../../services/traffic.service';
import { ITrafficPublic } from '../../interfaces/traffic';
import { TrafficComponent } from '../traffic/traffic.component';
import { DatePipe } from '@angular/common';
import { ServerService } from '../../services/server.service';
import { IonicModule } from '@ionic/angular';
import { ellipsisVertical } from "ionicons/icons";
import { addIcons } from "ionicons";

@Component({
  selector: 'app-server',
  standalone: true,
  imports: [TrafficComponent, DatePipe, IonicModule],
  templateUrl: './server.component.html',
  styleUrl: './server.component.scss'
})
export class ServerComponent implements OnInit {
  @Input() server: IServer;
  public trafficLists: ITrafficPublic[] = [];

  constructor(public trafficService: TrafficService, public serverService: ServerService) {
    addIcons({ ellipsisVertical });
  }

  ngOnInit(): void {
    this.trafficService.traffics.subscribe((info) => this.populateTraffic(info));
  }

  partition(array: ITrafficPublic[], isValid: (traf: ITrafficPublic) => boolean) {
    return array.reduce<ITrafficPublic[][]>(([pass, fail], elem) => {
      return isValid(elem) ? [[...pass, elem], fail] : [pass, [...fail, elem]];
    }, [[], []]);
  }

  populateTraffic(list: ITrafficPublic[]) {
    const firstList = list.filter((traffic) => traffic.serverId === this.server.id);
    const [priority, nonPriority] = this.partition(firstList, (traffic) => traffic.owner.isOwner);
    this.trafficLists = priority;
    this.trafficLists.push(...nonPriority);
  }

  createTraffic() {
    this.trafficService.createTraffic({ serverId: this.server.id });
  }

  saveServer() {
    this.serverService.saveAndDelete({ id: this.server.id });
  }

  showModal() {
    const doc = document.getElementById(this.server.id) as HTMLDialogElement;
    if (!doc) {
      console.error("No modal with this id is found");
      return;
    }
    doc.showModal();
  }
}
