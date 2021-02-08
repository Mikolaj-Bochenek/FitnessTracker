import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-stop-training',
  template: `<h1 mat-dialog-title>Are you sure?</h1>
            <div mat-dialog-content>
              <p>You already got {{ passedData.progress }}%</p>
            </div>
            <div mat-dialog-actions>
              <button (click)=onExitClick() class="button exit">Yes</button>
              <button (click)=onContinueClick() class="button">No</button>
            </div>`,
  styles: [`
  .button {
    color: white;
    width: 50%;
    background: #e91e63;
    outline: none;
    font-family: Roboto, "Helvetica Neue", sans-serif;
    font-size: 14px;
    font-weight: 500;
    box-sizing: border-box;
    position: relative;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: pointer;
    outline: none;
    border: none;
    -webkit-tap-highlight-color: transparent;
    display: inline-block;
    white-space: nowrap;
    text-decoration: none;
    vertical-align: baseline;
    text-align: center;
    margin: 0;
    min-width: 64px;
    line-height: 36px;
    padding: 0 16px;
    border-radius: 4px;
    overflow: visible;
    transform: translate3d(0, 0, 0);
    transition: background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .exit {
    background: transparent;
  }

  .exit:hover {
    background: grey;
  }`
]
})
export class StopTrainingComponent {
  constructor(
    public dialogRef: MatDialogRef<StopTrainingComponent>,
    @Inject(MAT_DIALOG_DATA) public passedData: any) {}

  onExitClick(): void {
    this.dialogRef.close('exit');
  }

  onContinueClick(): void {
    this.dialogRef.close('continue');
  }
}
