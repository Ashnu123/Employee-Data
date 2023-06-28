import { Component, OnInit, Input } from '@angular/core';
import { Address, Employee } from 'src/app/Models/employee';
import { NgForm, FormsModule, Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { EmployeeService } from '../Services/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  employees: any[] = [];
  address: Address[] = [];
  employeeForm: FormGroup;
  response: any;
  currentStep: number = 1;
  maxFileSize = 500;

  ngOnInit(): void {

  }


  // ngOnInit(): void {
  //   this.employeeForm = this.formBuilder.group({
  //     name: '',
  //     email: '',
  //     dob: '',
  //     gender: '',
  //     mobile: 0,
  //     resume: '',
  //     profilePic: '',
  //     id: 0,
  //     position: '',
  //     statusId: 0,
  //     resumeBase64: '',
  //     profilePicBase64: '',
  //     createdById: 0,
  //     createdDate: '',
  //     address: this.formBuilder.group({
  //       address1: '',
  //       address2: '',
  //       street: '',
  //       city: '',
  //       state: '',
  //       zip: '',
  //       country: '',
  //       createdById: 0,
  //       createdDate: ''
  //     })

  //   });
  // }
  // constructor(private empService: EmployeeService, private formBuilder: FormBuilder) {
  //   this.employeeForm = this.formBuilder.group({
  //     name: ['', Validators.required],
  //     email: ['', [Validators.required, Validators.email]],
  //     dob: ['', Validators.required],
  //     position: ['', Validators.required],
  //     statusId: ['', Validators.required],
  //     gender: ['', Validators.required],
  //     mobile: ['', Validators.required],
  //     resume: ['', Validators.required],
  //     profilePic: ['', Validators.required],
  //     address1: ['', Validators.required],
  //     address2: [''],
  //     street: ['', Validators.required],
  //     city: ['', Validators.required],
  //     state: ['', Validators.required],
  //     zip: ['', Validators.required],
  //     country: ['', Validators.required]
  //   });

  // }
;
  constructor(private empService: EmployeeService, private formBuilder: FormBuilder) {
    this.employeeForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      mobile: ['', Validators.required],
      addresses: this.formBuilder.array([]),
      profilePic: [null],
      resume: [null]
    });

  }
  get addresses(): FormArray {
    return this.employeeForm.get('addresses') as FormArray;
  }

  addAddress(): void {
    const addressGroup = this.formBuilder.group({
      address1: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      country: ['', Validators.required],
    });

    this.addresses.push(addressGroup);
  }

  removeAddress(index: number): void {
    this.addresses.removeAt(index);
  }

  nextStep() {
    this.currentStep++;
  }

  previousStep() {
    this.currentStep--;
  }


  onFileChange(event: any, controlName: string) {
    const file = event.target.files[0];

    if (file) {
      const fileSizeKB = Math.round(file.size / 1024);

      if (fileSizeKB <= this.maxFileSize) {
        this.employeeForm.patchValue({ [controlName]: file });
      } else {
        event.target.value = null;
        alert(`File size exceeds the maximum limit of ${this.maxFileSize}KB.`);
      }
    }
  }

  onSubmit(form:NgForm) {
    if (this.employeeForm.valid) {
      this.empService.addEmployee(form.value).subscribe(
        response => {
          console.log('Employee created successfully:', response);
          this.employeeForm.reset();
        },
        error => {
          console.error('Error creating employee:', error);
        }
      );
    }

    }

    check(e: any){
      console.log(e)
      console.log(e.target.checked)
      console.log(e.target.value)
    }
  // addEmployee(employee: NgForm) {
  //   this.empService.addEmployee(employee).subscribe(
  //     () => {
  //       if (this.employeeForm.valid) {

  //         const newEmployee = {
  //           name: this.employeeForm.get('name')?.value,
  //           email: this.employeeForm.get('email')?.value,
  //           dob: this.employeeForm.get('dob')?.value,
  //           position: this.employeeForm.get('position')?.value,
  //           gender: this.employeeForm.get('gender')?.value,
  //           mobile: this.employeeForm.get('mobile')?.value,
  //           resume: this.employeeForm.get('resume')?.value,
  //           profilePic: this.employeeForm.get('profilePic')?.value,
  //           // Other employee fields...

  //           address: {
  //             address1: this.employeeForm.get('address.address1')?.value,
  //             address2: this.employeeForm.get('address.address2')?.value,
  //             street: this.employeeForm.get('address.street')?.value,
  //             city: this.employeeForm.get('address.city')?.value,
  //             state: this.employeeForm.get('address.state')?.value,
  //             zip: this.employeeForm.get('address.zip')?.value,
  //             country: this.employeeForm.get('address.country')?.value
  //           }
  //         };
  //         this.employees.push(newEmployee);
  //         console.log(this.employeeForm);
  //         // Reset the form
  //         this.response = this.employeeForm;
  //         this.employeeForm.reset();
  //       }
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );

  // }

}
