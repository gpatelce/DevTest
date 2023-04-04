import { LightningElement,api } from 'lwc';
import usageInfo from '@salesforce/apex/UsageInfoController.createOrUpdateSAIDUsageInfo';
// * Calendarific API Base URL
const columns = [
    { label: 'Holiday Name', fieldName: 'name' },
    { label: 'Description', fieldName: 'description' },
    { label: 'Type', fieldName: 'primary_type' },
    { label: 'Date', fieldName: 'date.iso', type : 'Date' },
    { label: 'URL', fieldName: 'canonical_url' , type: 'url' }
];
const CALENDARIFIC_URL = 'https://calendarific.com/api/v2/holidays?api_key=';
export default class PublicSearch extends LightningElement {
    @api textboxlabel = 'Enter South African ID';
    @api textboxplaceholder = 'Type 13 digit id here...';
    @api buttonname = 'Search';
    @api errormessage = 'Please enter a valid Id';
    @api apikey = '9099109241ce859a699364f246419face6b49997';
    @api country = 'za';
    displaytable=false;
    buttontrue=true;
    southafricanid;
    holidays = {};
    data = [];
    columns = columns;
    
    connectedCallback(){
        this.textboxlabel = this.textboxlabel;
        this.textboxplaceholder = this.textboxplaceholder;
        this.buttonname = this.buttonname;
        this.errormessage = this.errormessage;
        this.country = this.country;
        this.apikey = this.apikey;
    }
    // * This method will return if the user object is populated or not
    get holidayPopulated() {
        return this.holidays && this.holidays.id;
    }


    // * This method will set the southafricanid as the user is typing the text in the input field
    updateSouthAfricanId(event) {
        this.southafricanid = event.target.value;
        console.log('++++'+this.southafricanid.length);
        if(this.southafricanid.length === 13 && !isNaN(this.southafricanid)){
            this.buttontrue=false;
        }
        else{
             this.buttontrue=true;
        }
    }

    get disableButton(){
        return !(this.southafricanid && this.southafricanid.data.length);
    }

    // * This method is used to call GitHub API using fetch method and get the user details
    getHolidays() {

        if(this.southafricanid) {
            this.displaytable = true;
            let year = 2023; 
            usageInfo({ said : this.southafricanid});
            this.data = [];
            const customyear = this.southafricanid.slice(0, 2);
            console.log('++++'+customyear);
            if(customyear > 23)
                year = 19+customyear;
            else 
                year = 20+customyear;
            console.log('++++cuatomyear'+year);
            fetch(CALENDARIFIC_URL+this.apikey+"&country="+this.country+"&year="+year)
            .then(response => {
                console.log('**REP'+JSON.stringify(response));
                if(response.ok) {
                    return response.json();
                } else {
                    throw Error(response);
                }
            })
            .then(responseholidays => {
                //console.log('***'+JSON.stringify(responseholidays));
                //this.data = responseholidays.response.holidays;
                if(responseholidays.response.holidays) {
                    //this is the final array into which the flattened response will be pushed. 
                    let datapush = [];
                        
                    for (let row of responseholidays.response.holidays) {
                            // this const stroes a single flattened row. 
                            const flattenedRow = {}
                            
                            // get keys of a single row — Name, Phone, LeadSource and etc
                            let rowKeys = Object.keys(row); 
                        
                            //iterate 
                            rowKeys.forEach((rowKey) => {
                                
                                //get the value of each key of a single row. John, 999-999-999, Web and etc
                                const singleNodeValue = row[rowKey];
                                
                                //check if the value is a node(object) or a string
                                if(singleNodeValue.constructor === Object){
                                    
                                    //if it's an object flatten it
                                    this._flatten(singleNodeValue, flattenedRow, rowKey)        
                                }else{
                                    
                                    //if it’s a normal string push it to the flattenedRow array
                                    flattenedRow[rowKey] = singleNodeValue;
                                }
                                
                            });
                        
                            //push all the flattened rows to the final array 
                            datapush.push(flattenedRow);
                            
                        }
                        
                        //assign the array to an array that's used in the template file
                        console.log('***datapush = ' + JSON.stringify(datapush));
                        this.data = datapush;
                    } else if (error) {
                        this.error = error;
                    }
                //console.log('***Sample'+JSON.stringify(this.data));
                //console.log('***123Sample'+JSON.stringify(this.data[0].date.iso));
            })
            .catch(error => console.log(error))

        } else {
            alert(this.errormessage);
        }
    }

    _flatten = (nodeValue, flattenedRow, nodeName) => {        
        let rowKeys = Object.keys(nodeValue);
        rowKeys.forEach((key) => {
            let finalKey = nodeName + '.'+ key;
            flattenedRow[finalKey] = nodeValue[key];
        })
    }

}