import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {TemplateModule} from "./template/template.module";
import { CycleComponentComponent } from './Components/cycle-component/cycle-component.component';
import { TypeExamenComponentComponent } from './Components/type-examen-component/type-examen-component.component';
import { TypeMatiereComponentComponent } from './Components/type-matiere-component/type-matiere-component.component';
import { SessionComponentComponent } from './Components/session-component/session-component.component';
import { AnneeComponentComponent } from './Components/annee-component/annee-component.component';
import {HTTP_INTERCEPTORS,HttpClientModule} from "@angular/common/http";
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { InscriptionComponentComponent } from './Components/inscription-component/inscription-component.component';
import { AttributionMatiereComponentComponent } from './Components/attribution-matiere-component/attribution-matiere-component.component';
import { CycleTypeExamenComponentComponent } from './Components/cycle-type-examen-component/cycle-type-examen-component.component';
import { EcoleComponentComponent } from './Components/ecole-component/ecole-component.component';
import { EleveComponentComponent } from './Components/eleve-component/eleve-component.component';
import { EnrolementComponentComponent } from './Components/enrolement-component/enrolement-component.component';
import { ExamenComponentComponent } from './Components/examen-component/examen-component.component';
import { MatiereComponentComponent } from './Components/matiere-component/matiere-component.component';
import { MoyenneComponentComponent } from './Components/moyenne-component/moyenne-component.component';
import { NoteComponentComponent } from './Components/note-component/note-component.component';
import { AppInterceptor } from './interceptors/app.interceptor';
import { AuthenticationModule } from './authentication/authentication.module';
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { OpRegistrationComponent } from './Components/op-registration/op-registration.component';
import { StatistiqueComponent } from './Components/statistique/statistique.component';


@NgModule({
  declarations: [
    AppComponent,
    CycleComponentComponent,
    TypeExamenComponentComponent,
    TypeMatiereComponentComponent,
    SessionComponentComponent,
    AnneeComponentComponent,
    InscriptionComponentComponent,
    AttributionMatiereComponentComponent,
    CycleTypeExamenComponentComponent,
    EcoleComponentComponent,
    EleveComponentComponent,
    EnrolementComponentComponent,
    ExamenComponentComponent,
    MatiereComponentComponent,
    MoyenneComponentComponent,
    NoteComponentComponent,
    OpRegistrationComponent,
    StatistiqueComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TemplateModule,
    AuthenticationModule,
    HttpClientModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatTableModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000, // Durée d'affichage du toast (en millisecondes)
      positionClass: 'toast-top-right', // Position du toast dans la fenêtre
      preventDuplicates: true, // Empêche l'affichage de plusieurs toasts identiques
      easing: "ease-in",
      easeTime: 1000
    }),
    MatSelectModule,
    MatDatepickerModule,
    FormsModule,
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:AppInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
