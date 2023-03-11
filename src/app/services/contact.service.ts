import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private afs:AngularFirestore,private toastr:ToastrService ) { }

  loadData() {
    return this.afs.collection('contactsForms').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data }
        })
      })
    )
  }
  deleteData(id){
    this.afs.collection('contactsForms').doc(id).delete().then(docRef=>{
      this.toastr.success('Data Delete Successfully');

    })
  }
}
