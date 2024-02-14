import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { collection,  getDocs, orderBy, query,} from 'firebase/firestore';
import { db} from '../../Config/Config';
export default function Users() {
    const[users,setusers]=useState([]);
       const columns = [
        {field: 'sl', header: 'Sl'},
        {field: 'name', header: 'Name'},
        {field: 'email', header: 'Email'},
        {field: 'Number', header: 'Number'}
    ];
useEffect(()=>{


 fetch_users();

},[])
const fetch_users = async()=>{
  setusers([]);
    const q = query(collection(db, "users"),orderBy("joined_date","desc"));
    const querySnapshot = await getDocs(q);
    var count =0;
    querySnapshot.forEach((doc) => {
      count=count+1;
        setusers((prev) => {
            return [
              ...prev,
              {
                id: doc.id,
                sl: count,
            
                name: doc.data().name,
                   email: doc.data().email? doc.data().email :null,
                Number: doc.data().mobile,
           
              },
            ]; 
          });
    });
}

  return (
    <div className="">
       <DataTable value={users} tableStyle={{ minWidth: '50rem' }}>
                {columns.map((col, i) => (
                    <Column key={col.field} field={col.field} header={col.header} />
                ))}
            </DataTable>
    </div>
  )
}
