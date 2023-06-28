import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../Models/employee';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'https://zc-angular-api.azurewebsites.net/api/v1';
  employees: Employee[];
  constructor(private http: HttpClient) { }

  // getProducts(): Observable<any[]> {
  //   return this.http.get<any[]>(this.apiUrl);
  // }

  // getProduct(productId: string): Observable<any> {
  //   const url = `${this.apiUrl}/${productId}`;
  //   return this.http.get<any>(url);
  // }
  addEmployee(employee: Employee) {
    const url = `${this.apiUrl}/Employee/CreateEmployee`;
    return this.http.post<Employee>(url, employee);
  }

  getEmployee() {
    const url = `https://zc-angular-api.azurewebsites.net/api/v1/Employee/GetAllEmployees`;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'accept': 'text/plain' })
    };
    return this.http.get<Employee[]>(url, httpOptions);
  }

  getAllEmployees(employeeid: string): Observable<any> {
    const urlGet = `https://zc-angular-api.azurewebsites.net/api/v1/Employee/GetEmployeesDetailsByID/${employeeid}`;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'accept': 'text/plain' })
    };
    //const url = `${this.apiUrl}/Employee/GetEmployeesDetailsByID/${employee.id}`;
    return this.http.get<any>(urlGet, httpOptions);
  }

  updateEmployee(employee: Employee) {
    const url = `${this.apiUrl}/Employee/UpdateEmployee/${employee.id}`;
    return this.http.put<Employee>(url, employee);
  }

  deleteEmployee(employee: Employee) {
    const url = `${this.apiUrl}/Employee/DeleteEmployeeByID`;
    return this.http.delete(url);
  }


  }

