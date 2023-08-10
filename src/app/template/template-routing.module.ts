import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TemplateComponent} from "./template.component";
import {MonTestComponent} from "../mon-test/mon-test.component";
import {AnneeComponentComponent} from "../Components/annee-component/annee-component.component";
import {CycleComponentComponent} from "../Components/cycle-component/cycle-component.component";
import {SessionComponentComponent} from "../Components/session-component/session-component.component";
import {TypeExamenComponentComponent} from "../Components/type-examen-component/type-examen-component.component";
import {TypeMatiereComponentComponent} from "../Components/type-matiere-component/type-matiere-component.component";
import {InscriptionComponentComponent} from "../Components/inscription-component/inscription-component.component";
import {
  AttributionMatiereComponentComponent
} from "../Components/attribution-matiere-component/attribution-matiere-component.component";
import {EcoleComponentComponent} from "../Components/ecole-component/ecole-component.component";
import {EleveComponentComponent} from "../Components/eleve-component/eleve-component.component";
import {EnrolementComponentComponent} from "../Components/enrolement-component/enrolement-component.component";
import {ExamenComponentComponent} from "../Components/examen-component/examen-component.component";
import {MatiereComponentComponent} from "../Components/matiere-component/matiere-component.component";
import {MoyenneComponentComponent} from "../Components/moyenne-component/moyenne-component.component";
import {NoteComponentComponent} from "../Components/note-component/note-component.component";
import {
  CycleTypeExamenComponentComponent
} from "../Components/cycle-type-examen-component/cycle-type-examen-component.component";

const routes: Routes = [
  {
    path:'',component: TemplateComponent,
    children:[
      {
        path:'Annee',component:AnneeComponentComponent

      },
      {
        path:'Cycle',component:CycleComponentComponent

      },
      {
        path:'Session',component:SessionComponentComponent

      },
      {
        path:'Type-Examen',component:TypeExamenComponentComponent

      },
      {
        path:'Type-Matiere',component:TypeMatiereComponentComponent

      },
      {
        path:'Inscription',component:InscriptionComponentComponent

      },
      {
        path:'Attribution Matiere',component:AttributionMatiereComponentComponent

      },
      {
        path:'Ecole',component:EcoleComponentComponent

      } ,
      {
        path:'Eleve',component:EleveComponentComponent

      } ,
      {
        path:'Enrolement',component:EnrolementComponentComponent

      },
      {
        path:'Examen',component:ExamenComponentComponent

      } ,
      {
        path:'Matiere',component:MatiereComponentComponent

      },
      {
        path:'Moyenne',component:MoyenneComponentComponent

      },
      {
        path:'Note',component:NoteComponentComponent

      },
      {
        path:'Cycle Type Examen',component:CycleTypeExamenComponentComponent

      },


    ]
  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateRoutingModule { }
