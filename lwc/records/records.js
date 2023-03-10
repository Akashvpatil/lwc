import { LightningElement, track, api } from 'lwc';
import getRecords from '@salesforce/apex/RecordsFetcherClass.getRecords';



export default class Records extends LightningElement {
    @track column = [];
    @track GotTheRecords = false;
    @track recordList = [];
    @track columnsName = [];
    @track fetchedrecords = [];
    @track valueForLabel = [];
    @track valueForcolumn = [];
    @track columns = [];
    @api getTheRecords(selected, fieldsList) {
        
        console.log('selected object in record.js: ' + selected);
        console.log('fieldsList: ' + fieldsList);

        this.valueForLabel = fieldsList;
        this.valueForColumn = fieldsList.map((value, index) =>
        ({
            label: this.valueForLabel[index],
            fieldName: value
        }))
        this.columns = this.valueForColumn;


        getRecords({ objectName: selected, fieldNames: fieldsList })
            .then(result => {
                console.log('in records result page: ' + selected);
                if (result) {
                    this.recordList = [];

                    this.recordList = result;

                    console.log('results' + JSON.stringify(result));
                    this.GotTheRecords = true;
                    console.log('recordList' + JSON.stringify(this.recordList));
                    console.log('size of records: ' + this.recordList.length);
                } else {
                    console.log('error occurred');
                }
            })
            .catch(error => {
                console.log('Error on record method: ' + error.message);
            });
    }

}
