import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  public userId: String;

  constructor(private httpService: HttpClient, private route: ActivatedRoute ) { }

  ngOnInit() {
    this.userId = this.route.snapshot.params.id;
    this.httpService.get('http://localhost:8080/user/' + this.userId, {responseType: 'json'}).subscribe(
      (data) => {console.log(data); }
    );
  }

}
