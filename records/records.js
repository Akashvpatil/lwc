import { LightningElement,track,api} from 'lwc';
import getRecords from '@salesforce/apex/RecordsFetcherClass.getRecords';
export default class Records extends LightningElement {
@track GotTheRecords=false;
@track recordList=[];

@api getTheRecords(selectedObject,fieldsList){
    console.log('selected object in record.js '+selectedObject)
    getRecords({objectName:selectedObject, fieldsApiNames: fieldsList}).then((result)=>{
        console.log('in records result page '+selectedObject);
        if(result){
           
            this.recordList=[];
            for(key in result){
                console.log('in records '+key);
                this.recordList.push({label:key,value:key});
            }
            this.GotTheRecords=true;
            console.log('size of records'+this.recordList.size);
        }else {
            console.log('error occured');
        }
    }).catch(error=>{
        console.log("Error on record method"+error.message)
    })       
}



}