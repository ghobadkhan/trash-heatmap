import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HashListService } from '../hash-list.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-report-litter',
  templateUrl: './report-litter.component.html',
  styleUrls: ['./report-litter.component.scss']
})
export class ReportLitterComponent {

  protected fileList$!: Observable<Map<number,File>>
  protected uploadProgress: {[key: number]:number} = {0:50}
  @ViewChild('picsInput') picsInput!: ElementRef
  
  constructor(
    private formBuilder: FormBuilder,
    private fileListSvc: HashListService<File>
    ) {
      this.fileList$ = fileListSvc.get()
      console.log(this.uploadProgress[1])
    }

  protected reportForm = this.formBuilder.group<{
    pieces: number,
    comment: string | null,
    pics: File[] | null
  }>({
    pieces: 1,
    comment: null,
    pics: null
  })

  onSubmit() {
    const fileList = this.fileListSvc.toArray()
    this.reportForm.patchValue({
      pics: fileList
    })
    const val = this.reportForm.getRawValue()
    console.log(val)
  }

  onFileSelect(event: Event) {
    const target  = event.target as HTMLInputElement
    if (target.files && target.files.length) {
      const file = target.files.item(0)
      if (file) this.fileListSvc.add(file)
    }
  }

  openSelector() {
    this.picsInput.nativeElement.click()
  }

  onFileRemove(id:number) {
    this.fileListSvc.remove(id)
  }
}