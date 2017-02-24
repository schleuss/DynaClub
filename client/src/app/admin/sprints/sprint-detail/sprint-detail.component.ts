import { Component, OnInit, Input, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { SprintService } from '../../../shared/services/sprint.service';
import { Sprint } from '../../../shared/models/sprint';
import { SprintValidator } from './sprint.validator'

import { FieldErrorsComponent } from '../../../shared/components/field-errors/field-errors.component'

@Component({
  selector: 'app-sprint-detail',
  templateUrl: './sprint-detail.component.html',
  styleUrls: ['./sprint-detail.component.css']
})
export class SprintDetailComponent implements OnInit {
  
  title: String;
  sprintForm: FormGroup;
  validator: SprintValidator = new SprintValidator();
  
  @Input() sprint: Sprint;
  error: any;
  
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private sprintService: SprintService,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.createEmptyForm();
    this.loadSprintForEdit();
  }

  loadSprintForEdit(): void {

    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        let id = params['id'];
        this.sprintService
            .findById(id)
            .then(sprint =>
              {
                this.sprint = sprint;
                this.setFormValues();
              }
            );
      } else {
        this.setFormValues();
      }
    });
  }

  createEmptyForm(): void {

    this.sprint = new Sprint();
    this.sprint.dateStart = null;
    this.sprint.dateFinish = null;
    this.sprint.initialAmount = null;

    this.sprintForm = this.fb.group({
      dateStart: [this.sprint.dateStart, [Validators.required]],
      dateFinish: [this.sprint.dateFinish, [Validators.required]],
      initialAmount: [this.sprint.initialAmount, [Validators.required]]
    });
  }

  setTitle(): void {
    if (this.sprint._id){
      this.title = "Editar período";
    } else {
      this.title = "Inserir período";
    }
  }

  setFormValues(): void {
    
    this.setTitle();

    this.sprintForm.setValue({
      dateStart: this.sprint.dateStart, 
      dateFinish: this.sprint.dateFinish,
      initialAmount: this.sprint.initialAmount
    });

    this.validator = new SprintValidator(this.sprintForm, this.sprintService, this.sprint);
  }

  setModelValues(formValues: Sprint): void {
     formValues._id = this.sprint._id;
     this.sprint = formValues;

     this.sprint.dateStart = new Date(this.sprint.dateStart);
     this.sprint.dateStart.setHours(0);
     this.sprint.dateStart.setMinutes(0);

     this.sprint.dateFinish = new Date(this.sprint.dateFinish);
     this.sprint.dateFinish.setHours(23);
     this.sprint.dateFinish.setMinutes(59);
  }

  onSubmit({ value, valid }: { value: Sprint, valid: boolean }) {
    if (valid){
      this.validator.clearErrors();
      this.save(value);
    } else {
      this.validator.showErrors();
    }
  }

  save(formValues: Sprint): void {
    this.setModelValues(formValues);

    this.sprintService
        .save(this.sprint)
        .then(sprint => {
          this.goBack();
        })
        .catch(error  => this.error = error);
  }

  goBack(): void {
    this.router.navigateByUrl('/sprints');
  }
}
