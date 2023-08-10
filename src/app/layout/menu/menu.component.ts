import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  listOfRole : any[] = []
  isAdmin : boolean = false
  constructor(private authenticationService : AuthenticationService) { }

  ngOnInit(): void {
    this.authenticationService.getMyInformations().subscribe({
      next:(value:any)=>{
        this.listOfRole = value.data[0].roles
        this.listOfRole.forEach((role)=> {
          if(role.name == "ROLE_ADMIN"){
            this.isAdmin = true;
          }
        })
      }
    })
  }

}
