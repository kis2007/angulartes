import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-ragistration',
  templateUrl: './ragistration.component.html',
  styleUrls: ['./ragistration.component.css']
})
export class RagistrationComponent implements OnInit {
  constructor(private router: Router) { }
  username: string;
  password: string;
  uname   : string;
  showMsg : boolean = false;
  oldobj = [];
  ngOnInit() {

  }
  registration() : void {
    let obj = {
      uname : this.uname,
      email : this.username,
      password : this.password
    }

    this.oldobj = JSON.parse(localStorage.getItem('logins'));

    if (!this.oldobj) {
      this.oldobj = [];
    }
    this.oldobj.push(obj);
    localStorage.setItem('logins', JSON.stringify(this.oldobj));
    this.showMsg = true;
  }


}
