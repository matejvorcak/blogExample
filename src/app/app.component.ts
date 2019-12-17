import { Component, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-foundation/modal';
import { BsModalRef } from 'ngx-foundation/modal/bs-modal-ref.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  modalRef: BsModalRef;
  title = "Titlde";

  constructor(private modalService: BsModalService) { 
    
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'tiny' });
  }

  closeModal(){
    this.modalRef.hide();
  }

}
