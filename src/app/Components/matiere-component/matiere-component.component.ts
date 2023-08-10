import { Component, OnInit } from '@angular/core';
import {MatiereService} from "../../services/matiere.service";
import {FormControl, FormGroup} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {ToastrService} from "ngx-toastr";
import {TypeMatiereService} from "../../services/type-matiere.service";

@Component({
  selector: 'app-matiere-component',
  templateUrl: './matiere-component.component.html',
  styleUrls: ['./matiere-component.component.css']
})
export class MatiereComponentComponent implements OnInit {

  libele = new FormControl('')
  codeMat = new FormControl('')
  typeMatiereSelect = new FormControl(0)

  matieres  :any  = []
  typeMatieres :any = []

  private confirmDeleteModal: any;
  activeMat! : any
  selectedMatiereId!: number | undefined;

  matiereForm = new FormGroup({
    libele: this.libele,
    codeMat: this.codeMat,
    typeMat: this.typeMatiereSelect,
  });
  constructor(private typeMatiereService:TypeMatiereService,private matiereService : MatiereService,private authenticationService:AuthenticationService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.loadTypeMatiere()
    this.getAllMat()
  }


  addMat(){
    var data = {
      libele: this.libele.value,
      codeMat: this.codeMat.value,
      typeMat: {id:this.typeMatiereSelect.value}

    }
    console.log(data)
    this.matiereService.addMat(data).subscribe({
      next : (value:any) =>{
        console.log('Matiere ajoutée avec succès !')
        this.getAllMat()
        this.matiereForm.reset()

      },
      error:(err)=>{
        console.log(err.message)

      }
    })
  }
  editMat(id: number | undefined) {
    this.matiereService.getMatById(id).subscribe(
      (matiere: any) => {
        // Mettre à jour les contrôles du formulaire avec les données existantes
        this.selectedMatiereId = id;
        this.libele.setValue(matiere.libele);
        this.codeMat.setValue(matiere.codeMat);
        this.typeMatiereSelect.setValue(matiere.typeMat);
        console.log(this.matiereForm.value)
      },
      (error: any) => {
        console.log(error.message);
      }
    );
  }

  saveEditMat() {
    // Vérifier si les valeurs du formulaire sont valides
    if (this.matiereForm.valid) {
      // Créer l'objet avec les nouvelles valeurs
      const updatedMat = {
        libele: this.libele.value,
        codeMat: this.codeMat.value,
        typeMat: this.typeMatiereSelect.value,

      };

      // Appeler le service pour mettre à jour l'année avec les nouvelles valeurs
      this.matiereService.editMat(this.selectedMatiereId, updatedMat).subscribe(
        (value: any) => {
          console.log('Matiere mise à jour avec succès !');
          console.log(value)
          // Réinitialiser le formulaire après la mise à jour
          this.matiereForm.reset();
          // Mettre à jour la liste des années avec les nouvelles données
          this.getAllMat();
        },
        (error: any) => {
          console.log(error.message);
        }
      );
    }
  }







  getAllMat() {
    this.matiereService.getAllMat().subscribe({
      next:(value:any) =>{
        this.matieres = value;
        console.log(this.matieres)
      },
      error:(err)=>{
        console.log(err.message)

      }

    })
  }

  deleteMat(id: number) {
    // Logique de suppression de l'élément avec l'ID spécifié
    this.matiereService.deleteMat(id).subscribe(
      (value: any) => {
        console.log(value);
        this.getAllMat()
      },
      (error: any) => {
        console.log(error.message);
      }
    );
    this.confirmDeleteModal.nativeElement.modal('delete');
  }

  setActiveMat(matiere : any) {
    this.activeMat={...matiere}
  }



  loadTypeMatiere(){
    //parseInt(this.examenSelect.value!)
    this.authenticationService.getMyInformations().subscribe({
      next:(value:any)=>{
        this.typeMatiereService.getAllTypeMat().subscribe(
          (value: any) => {
            console.log("heloooooooooooooooooooooooooooooooooooooooooooooooooooooooo")
            this.typeMatieres= value;
            console.log(this.typeMatieres)
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
}
