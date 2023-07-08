import { Component, OnInit, Input } from '@angular/core';
import { IbmidService } from '../../services/ibmid.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {

  @Input() sideactive;
  hidesidemenu = true;

  constructor(public ibmidservice : IbmidService) { }

  ngOnInit(): void {
  }

}
