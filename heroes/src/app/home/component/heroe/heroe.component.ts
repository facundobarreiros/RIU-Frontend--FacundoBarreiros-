import { Component, Input } from '@angular/core';
import { SuperHero } from '../../../in-memory-data.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-heroe',
  imports: [MatCardModule],
  templateUrl: './heroe.component.html',
  styleUrl: './heroe.component.css'
})
export class HeroeComponent {

  @Input() heroe!: SuperHero;

}
