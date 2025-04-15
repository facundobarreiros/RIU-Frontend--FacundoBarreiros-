import { Routes } from "@angular/router";
import { HeroeComponent } from "./component/heroe/heroe.component";
import { HomeComponent } from "./component/home/home.component";
import { SuperHeroFormComponent } from "./component/super-hero-form/super-hero-form.component";

export const HOME: Routes = [
  { path: '', component: HomeComponent },
  { path: 'heroe', component: HeroeComponent },
  { path: 'crear', component: SuperHeroFormComponent },
  { path: 'editar/:id', component: SuperHeroFormComponent }
]
