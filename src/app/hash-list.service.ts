import { Inject, Injectable, Optional } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HashListService<T = string> {

  private tList = new Map<number,T>()
  private lastId: number = -1

  get(): Observable<Map<number,T>> {
    const tListObs = of(this.tList)
    return tListObs
  }

  add(item: T) {
    this.lastId++
    this.tList.set(this.lastId, item)
    if (item instanceof File) {
      console.log(item.name)
    }
  }

  remove(id:number) {
    this.tList.delete(id)
  }

  clear() {
    this.tList.clear()
  }

  toArray() {
    return Array.from(this.tList.values())
  }
}