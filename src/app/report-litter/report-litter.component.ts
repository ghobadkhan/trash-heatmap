import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HashListService } from '../hash-list.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GeolocationService } from '../geolocation.service';

@Component({
  selector: 'app-report-litter',
  templateUrl: './report-litter.component.html',
  styleUrls: ['./report-litter.component.scss']
})
export class ReportLitterComponent implements OnInit {

  protected fileList$!: Observable<Map<number,File>>
  protected uploadProgress: {[key: number]:number} = {0:50}
  private tmpLat?: number
  private tmpLng?: number

  @ViewChild('picsInput') picsInput!: ElementRef
  
  constructor(
    private formBuilder: FormBuilder,
    private fileListSvc: HashListService<File>,
    private httpClient: HttpClient,
    private gLocSvc: GeolocationService
    ) {
      this.fileList$ = fileListSvc.get()
      console.log(this.uploadProgress[1])
    }
  

  protected reportForm = this.formBuilder.group<{
    count: number,
    comment: string | null,
    pics: File[] | null,
    lat?: number,
    lng?: number
  }>({
    count: 1,
    comment: null,
    pics: null
  })

  ngOnInit(): void {
    // TODO: Later we should set current lat and lng to user state
    this.gLocSvc.getCurrentLocation().subscribe({
      next: loc => {
        this.reportForm.enable()
        this.tmpLat = loc.lat
        this.tmpLng = loc.lng
      },
      error: errorMsg => {
        this.reportForm.disable()
        window.alert(errorMsg)
      }
    })
  }

  onSubmit() {
    const fileList = this.fileListSvc.toArray()
    this.reportForm.patchValue({
      pics: fileList
    })
    const val = this.reportForm.getRawValue()
    if (!this.tmpLat || !this.tmpLng) {
      window.alert("The service doesn't know your location. You can't send a report!")
    } else {
      val.lat = this.tmpLat
      val.lng = this.tmpLng
      this.httpClient.post("/api/report-litter",val).subscribe({
        next: () => window.alert("Done!"),
        error: err => window.alert(`There's an error! \n ${err}`)
      })
    }
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