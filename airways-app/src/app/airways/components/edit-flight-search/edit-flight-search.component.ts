import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-edit-flight-search',
  templateUrl: './edit-flight-search.component.html',
  styleUrls: ['./edit-flight-search.component.scss']
})
export class EditFlightSearchComponent implements OnInit {
  constructor(private http:HttpClient){}
  ngOnInit():void {

  }



}
