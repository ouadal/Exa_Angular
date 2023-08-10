import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup} from "@angular/forms";
import {CycleService} from "../../services/cycle.service";
import {SessionService} from "../../services/session.service";
import {ToastrService} from "ngx-toastr";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-session-component',
  templateUrl: './session-component.component.html',
  styleUrls: ['./session-component.component.css']
})
export class SessionComponentComponent implements OnInit {

  libele = new FormControl('')
  sessions : any = []
  private confirmDeleteModal: any;
  activeSession! : any

  sessionForm = new FormGroup({
    libele: this.libele
  });
  constructor(private toastr:ToastrService,private sessionService : SessionService,private authenticationService:AuthenticationService,private router:Router ) { }

  ngOnInit(): void {
    this.getAllSession()
    this.authenticationService.getMyInformations().subscribe({
      next:(value:any)=>{
        value.data[0].roles.forEach((el:any)=>{
          if(el.name == "ROLE_USER"){
            this.toastr.warning("vous n'avez pas accès a cette page..")
            this.router.navigateByUrl("/template/Examen")
          }
        })


      },
      error:(err)=>{
        this.toastr.error("vous ne vous etes pas encore connecté")

        this.router.navigateByUrl("/authentication/login")
      }


    })
  }



  addSession(){
    var data = {
      libele: this.libele.value,
    }
    console.log(data)
    this.sessionService.addSession(data).subscribe({
      next : (value:any) =>{
        console.log('Session ajoutée avec succès !')
        this.getAllSession()
        this.sessionForm.reset();
      },
      error:(err)=>{
        console.log(err.message)

      }
    })
  }
  editSession(id: number) {
    if (this.libele && this.libele.value) {
      var data = { libele: this.libele.value };
      console.log(data);
      this.sessionService.editSession(id, data).subscribe(
        (value: any) => {
          console.log(value);
          this.getAllSession()
        },
        (error: any) => {
          console.log(error.message);
        }
      );
    }
  }

  getAllSession() {
    return this.sessionService.getAllSession().subscribe(
      (value: any) => {
        this.sessions = value;
        console.log(this.sessions)
      },
      (error: any) => {
        console.log(error.message)
      }

    );
  }

  deleteSession(id: number) {
    // Logique de suppression de l'élément avec l'ID spécifié
    this.sessionService.deleteSession(id).subscribe(
      (value: any) => {
        console.log(value);
        this.getAllSession()
      },
      (error: any) => {
        console.log(error.message);
      }
    );
    this.confirmDeleteModal.nativeElement.modal('delete');
  }

  setActiveSession(session : any) {
    this.activeSession={...session}
  }



}


