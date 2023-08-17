import { Component, OnInit } from '@angular/core';
import {CycleTypeExamenService} from "../../services/cycle-type-examen.service";
import {FormControl, FormGroup} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {MatiereService} from "../../services/matiere.service";
import {ToastrService} from "ngx-toastr";
import {CycleService} from "../../services/cycle.service";
import {TypeExamenService} from "../../services/type-examen.service";

@Component({
  selector: 'app-cycle-type-examen-component',
  templateUrl: './cycle-type-examen-component.component.html',
  styleUrls: ['./cycle-type-examen-component.component.css']
})
export class CycleTypeExamenComponentComponent implements OnInit {
  cycle = new FormControl('')
  typeExamen = new FormControl('')


  cycleTypeExamens : any = []
  cycles : any = []
  typeExamens : any = []



  private confirmDeleteModal: any;
  activeCycleTypExam! : any
  selectedCycleTypExamId!: number | undefined;


  cycleSelect = new FormControl(0)
  examenSelect = new FormControl(0)

  cycleTypeExamenForm = new FormGroup({
    cycle: this.cycleSelect,
    typeExamen: this.examenSelect
  });

  constructor(private typeExamenService : TypeExamenService,private toastr:ToastrService,private cycleService : CycleService,private cycleTypeExamenService : CycleTypeExamenService,private authenticationService:AuthenticationService) { }

  ngOnInit(): void {
    this.loadCycle()
    this.loadTypeExam()
    this.getAllCycleTypExam()


  }



  loadCycle(){
    //parseInt(this.examenSelect.value!)
    this.authenticationService.getMyInformations().subscribe({
      next:(value:any)=>{
        this.cycleService.getAllCycle().subscribe(
          (value: any) => {
            console.log("heloooooooooooooooooooooooooooooooooooooooooooooooooooooooo")
            this.cycles= value;
            console.log(this.cycles)
          },
          (error: any) => {
            console.log(error.message)
          })
      },
      error:(err)=>{
        this.toastr.error(err.message)
      }
    })
  }



  loadTypeExam(){
    //parseInt(this.examenSelect.value!)
    this.authenticationService.getMyInformations().subscribe({
      next:(value:any)=>{
        this.typeExamenService.getAllTypeExamen().subscribe(
          (value: any) => {
            console.log("heloooooooooooooooooooooooooooooooooooooooooooooooooooooooo")
            this.typeExamens= value;
            console.log(this.typeExamens)
          },
          (error: any) => {
            console.log(error.message)
          })
      },
      error:(err)=>{
        this.toastr.error(err.message)
      }
    })
  }







  addCycleTypExam(){
    var data = {
      cycle: {id:this.cycleSelect.value},
      typeExamen: {id:this.examenSelect.value},
    }
    console.log(data)
    this.cycleTypeExamenService.addCycleTypExam(data).subscribe({
      next : (value:any) =>{
        console.log('Cycle type  ajoutée avec succès !')
        this.getAllCycleTypExam()
        this.cycleTypeExamenForm.reset()
      },
      error:(err)=>{
        console.log(err.message)

      }
    })
  }
  editCycleTypExam(id: number | undefined) {
    //@ts-ignore
    this.cycleTypeExamenService.getCycleTypExamById(id).subscribe(
      (cyclTypeExam: any) => {
        // Mettre à jour les contrôles du formulaire avec les données existantes
        this.selectedCycleTypExamId= id;
        this.cycleSelect.setValue(cyclTypeExam.cycle.id);
        console.log(this.cycleSelect.value)
        this.examenSelect.setValue(cyclTypeExam.typeExamen.id);
        console.log(this.examenSelect.value)
        console.log(this.cycleTypeExamenForm.value)
      },
      (error: any) => {
        console.log(error.message);
      }
    );
  }

  saveEditCycleTypeExam() {
    // Vérifier si les valeurs du formulaire sont valides
    if (this.cycleTypeExamenForm.valid) {
      // Créer l'objet avec les nouvelles valeurs
      const updatedCycleTypExam = {
        cycle:  {id:this.cycleSelect.value},
        typeExamen: {id:this.examenSelect.value},

      };

      // Appeler le service pour mettre à jour l'année avec les nouvelles valeurs
      this.cycleTypeExamenService.editCycleTypExam(this.selectedCycleTypExamId, updatedCycleTypExam).subscribe(
        (value: any) => {
          console.log('Cycle type mise à jour avec succès !');
          console.log(value)
          // Réinitialiser le formulaire après la mise à jour
          this.cycleTypeExamenForm.reset();
          // Mettre à jour la liste des années avec les nouvelles données
          //this.getAllCycleTypExam();
          this.ngOnInit()
        },
        (error: any) => {
          console.log(error.message);
        }
      );
    }
  }







  getAllCycleTypExam() {
    return this.cycleTypeExamenService.getAllCycleTypExam().subscribe(
      (value: any) => {
        this.cycleTypeExamens = value;
        console.log(this.cycleTypeExamens)
      },
      (error: any) => {
        console.log(error.message)
      }

    );
  }



  listtypeExamenPerCycle() {
    return this.cycleTypeExamenService.listtypeExamenPerCycle(2).subscribe(
      (value: any) => {
        this.cycleTypeExamens = value;
        console.log(this.cycleTypeExamens)
      },
      (error: any) => {
        console.log(error.message)
      }

    );
  }

  deleteCycleTypExam(id: number) {
    // Logique de suppression de l'élément avec l'ID spécifié
    this.cycleTypeExamenService.deleteCycleTypExam(id).subscribe(
      (value: any) => {
        console.log(value);
        this.getAllCycleTypExam()
      },
      (error: any) => {
        console.log(error.message);
      }
    );
    this.confirmDeleteModal.nativeElement.modal('delete');
  }

  setActiveCycleTypExam(cycle : any) {
    this.activeCycleTypExam={...cycle}
  }


}
