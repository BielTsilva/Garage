import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Car } from './models/car';
import { CarService } from './services/car.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  car = { } as Car;
  cars: Car[] = [];

  constructor(private carService: CarService) {}

  ngOnInit(): void {
      this.getCars();
  }

  // defines whether a car has been updated or created
  saveCar(form: NgForm){
    if (this.car.id !== undefined){
      this.carService.updateCar(this.car).subscribe(() => {
        this.cleanForm(form);
      })
    } else {
      this.carService.saveCar(this.car).subscribe(() => {
        this.cleanForm(form);
      })
    }
  }

  // call the service to get all the cars
  
  getCars(){
    this.carService.getCars().subscribe((cars: Car[]) => {
      this.cars = cars;
    });
  }

  // delete the car 
  deleteCar(car: Car){
    this.carService.deleteCar(car).subscribe(()=> {
      this.getCars();
    })
  }

  // copy the car to be updated.
  editCar(car: Car){
    this.car = { ...car };
  }

  // clean the form 
  cleanForm(form: NgForm){
    this.getCars();
    form.resetForm();
    this.car = {} as Car;
  }
}
