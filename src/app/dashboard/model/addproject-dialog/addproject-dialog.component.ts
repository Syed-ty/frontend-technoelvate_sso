import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UsermanagementService } from '../../services/usermanagement.service';
import { Observable, map, startWith } from 'rxjs';



@Component({
  selector: 'app-addproject-dialog',
  templateUrl: './addproject-dialog.component.html',
  styleUrls: ['./addproject-dialog.component.css'],
})
export class AddprojectDialogComponent implements OnInit {
  projectForm!: FormGroup;
  spinner:boolean=false
  milestoneArray: FormArray | undefined;

  myControl = new FormControl('');
  myControls = new FormControl('');

  options: string[] = ['Payyavula Rajasekhar', 'Rakesh N', 'Chandan K'];
  projectManagersList: string[] = ['Veerabhadra Swamy B', 'Chandra Shekar'];

  filteredOptions!: Observable<string[]>;
  filteredOptions1!: Observable<string[]>;
  items!: FormArray;



  constructor(
    private userservice: UsermanagementService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<AddprojectDialogComponent>,
    private fb: FormBuilder,

  ) {
    this.projectForm = this.fb.group({
      projectName: new FormControl('', [Validators.required]),
      projectCost: new FormControl('', [Validators.required]),
      clientName: new FormControl('', [Validators.required]),
      projectType: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      projectLead: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      projectManager: new FormControl('', Validators.required),
      teamLead: new FormControl('', Validators.required),
      businessDevelopmentManger: new FormControl('', Validators.required),
      Remarks: new FormControl('', Validators.required),
      ProjectLeadArray: this.fb.array([]),
      milestoneArray: this.fb.array([this.createSupp()],this.sumValidator()),
    });
  }







  ngOnInit(): void {
    this.getAllProjectDetails();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.filteredOptions1 = this.myControls.valueChanges.pipe(
      startWith(''),
      map(value => this._filters(value || '')),
    );

  }









  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }


  private _filters(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.projectManagersList.filter(option => option.toLowerCase().includes(filterValue));
  }


  createSupp(): FormGroup {
    return this.fb.group({
      milestone: ['',[Validators.required, Validators.max(30)]],
      paymentPercent: ['',[Validators.required]],
      milestonedetails: ['',[Validators.required]],
      startMileStoneDate:['',[Validators.required]],
      endMileStoneDate:['',[Validators.required]],
      mileStoneAmount:[''],
      actualEndDate:[''],
    })
  }

  // totalPercentageValidator(): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     if (control instanceof FormArray && control.controls) {
  //       const totalPercentage = control.controls.reduce((sum, currentControl) => {
  //         const percentage = currentControl.get('paymentPercent')?.value || 0;
  //         return sum + percentage;
  //       }, 0);

  //       if (totalPercentage > 100) {
  //         console.log('ghj');
  //         return { 'percentageExceeded': true };
  //       }
  //     }

  //     return null;
  //   };
  // }


  sumValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const sum = control.value.reduce((acc: number, current: any) => {
        return acc + (current.fieldName || 0);
      }, 0);

      return sum > 100 ? { sumExceeded: true } : null;
    };
  }

  additionalValue:any
  onInputChange(event:any){
  this.additionalValue = event.target.value
  }





  additionalValues:any
  onInputChanged(event:any){
  this.additionalValues = event.target.value
  }

  ChangedEvent(event:any){
    this.projectForm.get('projectLead')?.setValue(event.option.value)
  }

  ChangedEvents(event:any){
    this.projectForm.get('projectManager')?.setValue(event.option.value)
  }

  additionalData(){
    this.options.push(this.additionalValue);
    this.projectForm.get('projectLead')?.setValue(this.additionalValue)
    this.myControl.reset()
  }

  additionalDatas(){
    this.projectManagersList.push(this.additionalValues);
    this.projectForm.get('projectManager')?.setValue(this.additionalValues)
    this.myControls.reset()
  }


  paymentInputChanged(event:any,i:any){
    let ProjectCost = this.projectForm.get('projectCost')?.value
    let Amount = (ProjectCost/100)*event.target.value;
     (this.projectForm.get('milestoneArray') as FormArray).controls[i].get('mileStoneAmount')?.setValue(Amount)
  }


  projectDetails:any
  finlaProjectleadArray :any[] = []
  getAllProjectDetails() {
    this.userservice.getAllProject().subscribe((res) => {
      if (res) {
        this.projectDetails = res.visitors;
        const arrayWithMaxLength = this.projectDetails.reduce((maxArray:any, obj:any) => {
          if (obj.ProjectLeadArray.length > maxArray.length) {
            return obj.ProjectLeadArray;
          }
          return maxArray;
        }, []);
        this.finlaProjectleadArray = arrayWithMaxLength
      }
    })
  }
  todayDate : Date = new Date();
  minDate : Date = new Date("1 January 2019");



  get getSupp() {
    return this.projectForm.get('milestoneArray') as FormArray;
  }

  addMilestone() {
    this.milestoneArray = this.projectForm.get('milestoneArray') as FormArray;
    this.milestoneArray.push(this.createSupp());
  }

  removeMileStone(idxe: number) {
    const control = <FormArray>this.projectForm.get('milestoneArray')
    control.removeAt(idxe)
  }




  onSubmit() {
    this.spinner=true
    // if(this.finlaProjectleadArray.includes(this.projectForm.get('projectLead')?.value) === false){
    //   const formArray = this.projectForm.get('ProjectLeadArray') as FormArray;
    //   this.finlaProjectleadArray.forEach(value => {
    //     formArray.push(new FormControl(value));
    //   });
    // }
    // else if(this.finlaProjectleadArray.includes(this.projectForm.get('projectLead')?.value) === true){
    //   const formArray = this.projectForm.get('ProjectLeadArray') as FormArray;
    //   this.finlaProjectleadArray.forEach(value => {
    //     formArray.push(new FormControl(value));
    //   });
    // }
    this.userservice.addProject(this.projectForm.value).subscribe(
      (res) => {
        if (!res.error) {
          this.spinner=false
          this.toastr.success(res.message);
          this.projectForm.reset();
          this.getAllProjectDetails();
          this.dialogRef.close('add');
        } else {
          this.toastr.error(res.message);
        }
      },
      (err) => {
        if (err.status) {
          this.toastr.error(err.error.message);
        } else {
          this.toastr.error('CONNECTION_ERROR');
        }
      }
    );
  }
  cancel() {
    this.dialogRef.close();
  }
}
