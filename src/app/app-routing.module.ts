import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ConverterComponent } from './converter/converter.component';

const routes: Routes = [
  {path:'currency-converter',component:ConverterComponent},
  {path:'about',component:AboutComponent},
  {path:'',component:ConverterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
