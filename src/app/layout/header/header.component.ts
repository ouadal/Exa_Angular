import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AnneeService} from "../../services/annee.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  annees   :any = []

  constructor(private router:Router, private anneeService : AnneeService) { }

  ngOnInit(): void {

  }

  logout(){
    localStorage.removeItem('userInformations');
    localStorage.removeItem('userRoles');
    this.router.navigateByUrl(`/authentication/login`)
  }

  activerAnnee(id:number) {
    this.anneeService.activerAnnee(id).subscribe({
      next:(value:any) =>{
        console.log(value)
        this.getAllAnnee()
        this.ngOnInit()
      },
      error:(err)=>{
        console.log(err.message)
      }

    })
  }


  getAllAnnee(){
    this.anneeService.getAllAnnee().subscribe({
      next:(value:any) =>{
        this.annees  = value;
        console.log(this.annees)
      },
      error:(err)=>{
        console.log(err.message)

      }

    })
  }
}
