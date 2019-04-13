import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

export interface State {
  uname: string;
  username: string;
  password: string;
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  stateCtrl = new FormControl();
  filteredStates: Observable<State[]>;


  constructor(private router: Router) {
   
   }
  username: string;
  password: string;
  selecetdname: string;
  states: State[] = [];
    ngOnInit() {
      this.initialize();
      
    }

    initialize(){
      this.states = JSON.parse(localStorage.getItem('logins'));
      this.filteredStates = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterStates(state) : this.states.slice())
      );
    }

    getPosts(country) {
      this.selecetdname = country;
    }

    login() : void {
      const filterUsername = this.selecetdname.toLowerCase();
      let found =  this.states.find(state => state.uname.toLowerCase().indexOf(filterUsername) === 0);

      if(this.password == found.password){
       this.router.navigate(["user"]);
      }else {
        alert("Invalid credentials");
      }
    }

    removethis(name){
     let abcd = JSON.parse(localStorage.getItem('logins'));
     let found = abcd.filter(state => state.uname.toLowerCase().indexOf(name) == -1);
    //  console.log(found);
     localStorage.setItem('logins', JSON.stringify(found));
     this.initialize();
    }

    private _filterStates(value: string): State[] {
      const filterValue = value.toLowerCase();
      return this.states.filter(state => state.uname.toLowerCase().indexOf(filterValue) === 0);
    }
    
}
