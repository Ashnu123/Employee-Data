import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EmployeeService } from '../Services/employee.service';
import { Employee } from '../Models/employee';


@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  employees: Employee[] = [];
  allEmployees: Employee[] = [];
contactId:string=''
contact:any = {}
groupName:any = ''
products!: any[];
currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;
  loading = false;

constructor(private activatedRoute:ActivatedRoute, private router: Router, private empService: EmployeeService){

}

ngOnInit(): void {
  const employeeId = this.activatedRoute.snapshot.paramMap.get('id');
    if (employeeId) {
      this.loadEmployees(employeeId);
    }

}

loadEmployees(employeeId: string): void {
  this.empService.getAllEmployees(employeeId).subscribe(
    (data: any[]) => {
      this.employees = data;
    },
    (error: any) => {
      console.log(error);
    }
  );
}
  editEmployee(employee: Employee) {
    this.empService.updateEmployee(employee).subscribe(() => {
      this.router.navigate(['edit'], {relativeTo: this.activatedRoute});
      alert('Employee Details updated successfully');
    },
    (error: any) => {
      console.log(error);
      //console.log(error.error);

    });

  }

  deleteEmployee(employee: Employee) {
    const index = this.employees.indexOf(employee);
    this.empService.deleteEmployee(employee).subscribe(
      () => {
        this.loadEmployees(employee.id.toString());
        alert('Employee Details deleted successfully');
      },
      (error) => {
        console.log(error);
      }

    );
}

paginateEmployees(page: number): void {
  const startIndex = (page - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  this.currentPage = page;
  this.employees = this.allEmployees.slice(startIndex, endIndex);
}

getAllEmployees(): void {
  this.allEmployees = this.employees;
  this.totalItems = this.allEmployees.length;
  this.paginateEmployees(this.currentPage);
}

goToPreviousPage(): void {
  if (this.currentPage > 1) {
    this.paginateEmployees(this.currentPage - 1);
  }
}

goToNextPage(): void {
  const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  if (this.currentPage < totalPages) {
    this.paginateEmployees(this.currentPage + 1);
  }
}

}

