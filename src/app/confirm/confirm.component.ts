import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

export interface ConfirmModel {
  title: string;
  message: string;
}

@Component({
  template: `<div class="modal-dialog" style="width: 15vw">
                <div class="modal-content">
                   <div class="modal-header text-center">
                    <!-- <button type="button" class="close" (click)="close()" >&times;</button>-->
                     <h4>{{title || 'Are you sure?'}}</h4>
                   </div>
                   <div class="modal-footer d-flex align-items-start ">
                       <button type="button" class="btn btn-default mr-auto"  style="float: left" (click)="confirm()">Confirm</button>
                     <button type="button" class="btn btn-default" (click)="close()" >Cancel</button>
                   </div>
                 </div>
              </div>`,

})
export class ConfirmComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel, OnInit {
  title: string;
  message: string;

  constructor(dialogService: DialogService) {
    super(dialogService);
  }

  ngOnInit() {
  }

  confirm() {
    this.result = true;
    this.close();
  }
}
