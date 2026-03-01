import {Component, inject, OnInit, QueryList, ViewChildren} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SlotScreenComponent} from './slot-screen/slot-screen.component';
import {NgForOf, NgIf} from '@angular/common';
import {RequestModel, ResponseModel} from './RequestModel';
import {AppServiceService} from './app-service.service';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MarkdownComponent} from 'ngx-markdown';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SlotScreenComponent, NgIf, FormsModule, MarkdownComponent, ReactiveFormsModule, NgForOf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'project-idea-generator';

  textWindowVisible: boolean = false;
  spinning: boolean = false;
  rolled: boolean = false;
  isLoading: boolean = false;

  @ViewChildren(SlotScreenComponent) slotScreens!: QueryList<SlotScreenComponent>;

  platformList: string[] = [];
  userBaseList: string[] = [];

  inputMode: boolean = false;

  platFormResult : string= "";
  userBaseResult : string= "";

  generatedIdeaStr : string= "";

  userDataForm! : FormGroup;

  requestModel: RequestModel = {
    platform: '',
    userBase: '',
    userExpertise: '',
    userTechStack: ''
  };

  expertiseOptions: string[] = [
    'Full Stack Developer',
    'Frontend Developer',
    'Backend Developer',
    'UI Designer',
    'Mobile Developer',
    'DevOps Engineer',
    'Product Designer',
    'ML Engineer'
  ];

  private appService = inject(AppServiceService) ;

  ngOnInit() {

    this.userDataForm = new FormGroup({
      'expertiseInput': new FormControl(null, Validators.required),
      'techStackInput': new FormControl(null, Validators.required),
    })

    this.appService.getLists().subscribe({
      next: (response : ResponseModel) => {
        this.platformList = response.platforms;
        this.userBaseList = response.userBases;
      },
      error: (error) => {
        console.error('Error fetching lists for roll:', error);
      },
    });
  }

  resetCounter: number = 0;

  async triggerRoll() {
    if (this.spinning) return;

    // this.textWindowVisible = false;

    this.spinning = true;
    this.resetCounter++;

    const [first, second] = this.slotScreens.toArray();

    this.platFormResult = await first.startSpin(this.platformList);
    this.userBaseResult = await second.startSpin(this.userBaseList);

    this.spinning = false;
    this.rolled = true;
  }

  showTextWindow(){
    this.inputMode = true;
    this.textWindowVisible = true;
  }

  submitDetails(){
    // console.log(this.userDataForm);
    this.requestModel = {
      platform: this.platFormResult,
      userBase: this.userBaseResult,
      userExpertise: this.userDataForm.get('expertiseInput')?.value,
      userTechStack: this.userDataForm.get('techStackInput')?.value,
    };
    // console.log(this.requestModel);
    this.isLoading = true;
    this.appService.getOverview(this.requestModel).subscribe({
      next: (response: string) => {
        // console.log(response);
        this.generatedIdeaStr = response;
        this.inputMode = false;
      },
      error: (error) => {
        console.error('Error Fetching Implementation Plan', error);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
