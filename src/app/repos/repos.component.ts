import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss']
})
export class ReposComponent implements OnInit {

  avatarUrl;
  userName;
  name;
  repos;

  constructor(private authService: AuthService, private http: HttpClient) {
    this.authService.getToken().subscribe(token => {
      this.authService.getUserName().subscribe(username => {
        this.userName = username;
        let header: HttpHeaders = new HttpHeaders();

        header = header.append('Authorization', `token ${token}`);
        http.get(`https://api.github.com/users/${username}/repos`, {
          headers: header
        }).subscribe(val => this.repos = val);
      });
    });
    this.authService.getPhoto().subscribe(url => {
      this.avatarUrl = url;
    });
    this.authService.getName().subscribe(name => {
      this.name = name;
    });
  }

  ngOnInit() {
  }

}
