import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import {
  FormControl,
  FormGroup,
  UntypedFormBuilder,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-points-card",
  templateUrl: "./points-card.component.html",
  styleUrls: ["./points-card.component.scss"],
})
export class PointsCardComponent implements OnInit, OnChanges {
  pointsFrom: FormGroup;
  @Input() title: string;
  @Input() disable: boolean = false;
  @Input() maxPoints: any = null;
  @Input() gotPoints: any = null;
  @Output() getPointsForm: EventEmitter<any> = new EventEmitter();

  constructor(private formBuilder: UntypedFormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.maxPoints ||
      changes.gotPoints ||
      changes.maxPoints.currentValue ||
      changes.gotPoints.currentValue
    ) {
      if (this.maxPoints) {
        const newValues = {
          descriptionPoints:
            this.gotPoints.description + "/" + this.maxPoints.description,
          simulation:
            this.gotPoints.simulation + "/" + this.maxPoints.simulation,
          code: this.gotPoints.code + "/" + this.maxPoints.code,
        };

        this.pointsFrom.patchValue(newValues);
      }
    }
  }

  ngOnInit(): void {
    if (this.gotPoints) {
      this.pointsFrom = this.formBuilder.group({
        descriptionPoints: new FormControl(
          {
            value:
              this.gotPoints.description + "/" + this.maxPoints.description,
            disabled: this.disable,
          },
          [Validators.required]
        ),
        simulation: new FormControl(
          {
            value: this.gotPoints.simulation + "/" + this.maxPoints.simulation,
            disabled: this.disable,
          },
          [Validators.required]
        ),
        code: new FormControl(
          {
            value: this.gotPoints.code + "/" + this.maxPoints.code,
            disabled: this.disable,
          },
          [Validators.required]
        ),
      });
    } else {
      this.pointsFrom = this.formBuilder.group({
        descriptionPoints: new FormControl(
          { value: 0, disabled: this.disable },
          [
            Validators.required,
            Validators.min(0),
            Validators.max(this.maxPoints.description),
          ]
        ),
        simulation: new FormControl({ value: 0, disabled: this.disable }, [
          Validators.required,
          Validators.min(0),
          Validators.max(this.maxPoints.simulation),
        ]),
        code: new FormControl({ value: 0, disabled: this.disable }, [
          Validators.required,
          Validators.min(0),
          Validators.max(this.maxPoints.code),
        ]),
      });
    }

    this.pointsFrom.valueChanges.subscribe((data) => {
      if (this.pointsFrom.valid) {
        this.getPointsForm.emit(data);
      } else {
        this.getPointsForm.emit(null);
      }
    });
  }

  get f(): any {
    return this.pointsFrom.controls;
  }

  get total() {
    if (this.disable) {
      return (
        parseInt(this.gotPoints.description) +
        parseInt(this.gotPoints.simulation) +
        parseInt(this.gotPoints.code) +
        "/" +
        (parseInt(this.maxPoints.description) +
          parseInt(this.maxPoints.simulation) +
          parseInt(this.maxPoints.code))
      );
    }
    return (
      parseInt(this.f.descriptionPoints.value) +
      parseInt(this.f.simulation.value) +
      parseInt(this.f.code.value)
    );
  }
}
