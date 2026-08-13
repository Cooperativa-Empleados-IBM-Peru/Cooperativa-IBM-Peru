import { Component, OnInit } from '@angular/core';
import {
	NotificationService,
	NotificationDisplayService
} from 'carbon-components-angular';

@Component({
	selector: 'app-internos',
	templateUrl: './internos.component.html',
	styleUrls: ['./internos.component.scss']
})
export class InternosComponent implements OnInit {
	notificationObject = {
		type: 'error',
		title: 'Sample notification',
		message: 'Sample message'
	};


	constructor(protected notificationService: NotificationService,
		protected notificationDisplayService: NotificationDisplayService) { }

	ngOnInit(): void {
	}
	closeNotificationBanner() {
		this.notificationService.close(this.notificationObject);
   		// this.notificationService.onClose.closed=true;
		this.notificationDisplayService.close(this.notificationObject);
	}
}
