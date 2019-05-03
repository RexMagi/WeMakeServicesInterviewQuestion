import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private zone: NgZone) { }

  ngOnInit() {
  }

  sigin() {
    this.authService.sigin().subscribe(val => {
      if (val) {
        this.zone.run(() => this.router.navigateByUrl('/repos'));
      }
    });
  }

}
