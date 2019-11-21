import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpResponse} from '@angular/common/http'


@Component({
  selector: 'app-add-bike',
  templateUrl: './add-bike.component.html',
  styleUrls: ['./add-bike.component.css']
})
export class AddBikeComponent implements OnInit {

  constructor(private http:HttpClient) { }
  confirmationString: string="New Bike has been added";
  isAdded: boolean=false;
  bikeObj:object={};
  addNewBike=function(bike) {
    this.bikeObj={
      
      "regno":bike.regno,
      "station":bike.station,
      "comments":bike.comments,
      "availability": "available"
    }
    this.http.post("http://localhost:3000/bikes/",this.bikeObj).subscribe((res:Response)=>{
      this.isAdded=true;
    })
  }

  ngOnInit() {
  }

}
