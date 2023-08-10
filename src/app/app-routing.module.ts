import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path:'template',loadChildren :
      ()=>import('./template/template.module').then(m=>m.TemplateModule)
  },
  {
    path:'authentication',loadChildren:
      ()=> import('./authentication/authentication.module').then(m=>m.AuthenticationModule)
  },
  {
    path:'',redirectTo:'/authentication/login',pathMatch:"full"
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
