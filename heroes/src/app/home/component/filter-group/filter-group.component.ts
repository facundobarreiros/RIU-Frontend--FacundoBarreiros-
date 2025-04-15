import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-filter-group',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './filter-group.component.html',
  styleUrl: './filter-group.component.css'
})
export class FilterGroupComponent implements OnInit {

  @Output() search: EventEmitter<GroupFilter> = new EventEmitter<GroupFilter>();


  fb = inject(FormBuilder);

  formGroup: FormGroup<GroupFilterForm> = this.fb.group({
    name: new FormControl
      <string | null>(null)
  }) as FormGroup<GroupFilterForm>;


  ngOnInit(): void {

    this.suscribeFormChanges();

  }

  suscribeFormChanges(): void {

    this.formGroup.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe((search) => {

      const groupFilter: GroupFilter = {
        name: <string | null>(search.name ?? null)
      };

      this.search.emit(groupFilter);
    });
  }

}

interface GroupFilterForm {
  name: FormControl<string | null>;

}

interface GroupFilter {
  name: string | null;
}
