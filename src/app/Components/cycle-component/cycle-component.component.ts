import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {CycleService} from "../../services/cycle.service";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-cycle-component',
  templateUrl: './cycle-component.component.html',
  styleUrls: ['./cycle-component.component.css']
})
export class CycleComponentComponent implements OnInit {
 libele = new FormControl('')
  cycles : any = []
  private confirmDeleteModal: any;
  activeCycle! : any
  selectedCycleId!: number | undefined;

  cycleForm = new FormGroup({
    libele: this.libele
  });
  constructor(private toastr:ToastrService,private cycleService : CycleService, private authenticationService:AuthenticationService,private router:Router) { }

  ngOnInit(): void {
    this.getAllCycle()
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

  addCycle(){
    var data = {
      libele: this.libele.value,
    }
    console.log(data)
    this.cycleService.addCycle(data).subscribe({
      next : (value:any) =>{
        console.log('Cycle ajoutée avec succès !')
        this.getAllCycle()
        this.cycleForm.reset()

      },
      error:(err)=>{
        console.log(err.message)

      }
    })
}
  editCycle(id: number | undefined) {
    //@ts-ignore
    this.cycleService.getCycleById(id).subscribe(
      (cycle: any) => {
        // Mettre à jour les contrôles du formulaire avec les données existantes
        this.selectedCycleId = id;
        this.libele.setValue(cycle.libele);
        console.log(this.cycleForm.value)
      },
      (error: any) => {
        console.log(error.message);
      }
    );
  }

  saveEditCycle() {
    // Vérifier si les valeurs du formulaire sont valides
    if (this.cycleForm.valid) {
      // Créer l'objet avec les nouvelles valeurs
      const updatedCycle = {
        libele: this.libele.value,

      };

      // Appeler le service pour mettre à jour l'année avec les nouvelles valeurs
      this.cycleService.editCycle(this.selectedCycleId, updatedCycle).subscribe(
        (value: any) => {
          console.log('Cycle mise à jour avec succès !');
          console.log(value)
          // Réinitialiser le formulaire après la mise à jour
          this.cycleForm.reset();
          // Mettre à jour la liste des années avec les nouvelles données
          this.getAllCycle();
        },
        (error: any) => {
          console.log(error.message);
        }
      );
    }
  }







  getAllCycle() {
    return this.cycleService.getAllCycle().subscribe(
      (value: any) => {
        this.cycles = value;
        console.log(this.cycles)
      },
      (error: any) => {
        console.log(error.message)
      }

  );
  }

  deleteCycle(id: number) {
    // Logique de suppression de l'élément avec l'ID spécifié
    this.cycleService.deleteCycle(id).subscribe(
      (value: any) => {
        console.log(value);
        this.getAllCycle()
      },
      (error: any) => {
        console.log(error.message);
      }
    );
    this.confirmDeleteModal.nativeElement.modal('delete');
  }

  setActiveCycle(cycle : any) {
    this.activeCycle={...cycle}
  }
}

