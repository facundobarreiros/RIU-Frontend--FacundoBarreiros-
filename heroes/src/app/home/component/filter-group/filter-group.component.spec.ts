import { ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { FilterGroupComponent } from './filter-group.component';

describe('FilterGroupComponent', () => {
  let component: FilterGroupComponent;
  let fixture: ComponentFixture<FilterGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterGroupComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FilterGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería emitir el valor de búsqueda cuando cambia el input', fakeAsync(() => {
    spyOn(component.search, 'emit');

    component.formGroup.controls.name.setValue('Iron');
    tick(300);
    flush();

    expect(component.search.emit).toHaveBeenCalledWith({ name: 'Iron' });
  }));

  it('debería emitir { name: null } si el input es null o undefined', fakeAsync(() => {
    spyOn(component.search, 'emit');

    component.formGroup.controls.name.setValue(null);
    tick(300);
    flush();

    expect(component.search.emit).toHaveBeenCalledWith({ name: null });
  }));

  it('debería emitir el valor correcto cuando se escribe y se difiere la emisión (debounce)', fakeAsync(() => {
    spyOn(component.search, 'emit');

    component.formGroup.controls.name.setValue('S');
    tick(100);
    component.formGroup.controls.name.setValue('Sp');
    tick(100);
    component.formGroup.controls.name.setValue('Spi');
    tick(100);
    tick(300);
    flush();

    expect(component.search.emit).toHaveBeenCalledTimes(1);
    expect(component.search.emit).toHaveBeenCalledWith({ name: 'Spi' });
  }));
});
