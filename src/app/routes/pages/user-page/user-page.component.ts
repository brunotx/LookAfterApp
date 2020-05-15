import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersModel } from '../../../../assets/models/usersModel';


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  public userId: String;
  public currentUser: UsersModel;

  constructor(
    private httpService: HttpClient,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.userId = this.route.snapshot.params.id;
    if (this.userId === undefined || this.userId === null || this.userId === 'undefined') {
      this.router.navigateByUrl('home/');
    }

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.currentUser);
  }

  logout() {
    this.currentUser = null;
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    this.router.navigateByUrl('home/');
  }

}
