import { Component, OnInit } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { AuthService } from './auth/auth.service';
import { UserService } from './shared/services/user.service';
import { AppService } from './app.service';

const { version: appVersion } = require('../../package.json')

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	name: string;
	admin: boolean;
	private connection;
	private appVersion;
	public toastOptions = {
        timeOut: 8000,
        lastOnBottom: true,
        clickToClose: true,
        maxLength: 0,
        maxStack: 7,
        showProgressBar: true,
        pauseOnHover: true,
        preventDuplicates: true,
        rtl: false,
        animate: 'fromRight',
        position: ['left', 'bottom']
    };

	constructor(private authService: AuthService, private user: UserService, private appService: AppService) {
		if (this.authService.isLoggedIn()) {
			this.name = this.user.getStoredUser().name;
			this.admin = this.user.getStoredUser().admin;
			this.appVersion = appVersion
		}
	}

	ngOnInit() {

	}

}
