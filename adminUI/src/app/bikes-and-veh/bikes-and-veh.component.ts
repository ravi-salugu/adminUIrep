import { Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { HttpClient,HttpHeaders,HttpResponse} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-bikes-and-veh',
  templateUrl: './bikes-and-veh.component.html',
  styleUrls: ['./bikes-and-veh.component.css']
})
export class BikesAndVehComponent implements OnInit {
 
  bikes=[];
  bikesBehaviour :BehaviorSubject<any>
  regno: number;
  res: HttpResponse<any>;  
  displayedColumns: string[] = ['id', 'regno', 'availability', 'comments', 'station','actions'];
  dataSource :MatTableDataSource<any>;
  private headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private http:HttpClient) { 
    this.bikesBehaviour = new BehaviorSubject<any>(this.bikes);
  }
  
  ngOnInit() {
    this.fetchData();
    
    this.bikesBehaviour.subscribe( data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
    })
  }

  fetchData=function(){
    this.http.get("http://localhost:3000/bikes").subscribe(
      res =>{
        console.log(res);
        this.bikesBehaviour.next(res);
        console.log("inside component : ",this.bikes); 
      }
    )
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  removeBike=function(regno: Number){
    if(confirm("Are you sure?")){
      const url="http://localhost:3000/bikes/"+regno;
      return this.http.delete(url,{headers:this.headers}).toPromise()
       .then(()=>{
        this.fetchData();
      }
      )
    }
  }     
}
