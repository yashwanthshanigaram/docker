({
    init : function(component, event, helper) {
          let startDate = new Date();
    const results = [];
    for (let i = 0; i < 6; i++) {
        const dd = startDate ? new Date(startDate) : new Date();
    const currentMonth = dd.getUTCMonth(); // 0 - 11; 10,11,0 = Qtr1; 1,2,3 = Qtr2; 4,5,6=Qtr3; 7,8,9=Qtr4
    let qtrStartMonth = 0;
    switch (currentMonth) {
        case 2:
        case 3:
            qtrStartMonth = 1; // Feb, Q2
            break;
        case 5:
        case 6:
            qtrStartMonth = 4; // May, Q3
            break;
        case 8:
        case 9:
            qtrStartMonth = 7; // Aug, Q4
            break;
        case 11:
            qtrStartMonth = 10; // Nov, Q1
            break;
        case 0:
            qtrStartMonth = 10 - 12; // Nov, Q1 but previous year
            break;
        default:
            qtrStartMonth = currentMonth;
    }
   dd.setUTCMonth(qtrStartMonth);
dd.setUTCDate(1);
const e = new Date(dd);
e.setUTCMonth(qtrStartMonth + (1 * 3));
e.setUTCDate(0); // Last day of previous month
const year = e.getFullYear();
if (currentMonth === 0) {
e.setFullYear(year + 1);
}
const qtrNumber = Math.ceil(dd.getUTCMonth() / 3) + 1;
const t = `Q${qtrNumber > 4 ? 1 : qtrNumber} ${dd.getUTCFullYear() + (dd.getUTCMonth() >= 10 ? 1 : 0)}`;
        console.log("tvalue="+t);
        startDate = e;
        startDate.setUTCDate(startDate.getUTCDate() + 1);
        results.push(t);
                      
    };
        
        component.set('v.columns', [
            {label: 'ST ID',fieldName:'accountSTID__c',initialWidth : 95,sortable:'true', type: 'text',value:8},  
           // {label: 'ST Short Name',fieldName:'accountSTName__c',initialWidth : 280,sortable:'true', type:'url',typeAttributes: {label: { fieldName: 'accountSTName__c'}, target:'_blank'},value:9},
            {label: 'ST Short Name', fieldName:'link',typeAttributes: {label: { fieldName: 'accountSTName__c'},target:'_blank'}, initialWidth : 285,sortable:'true', type: 'url',value:9},
            {label: '#Accounts',fieldName:'cntOfTotalAcc__c',initialWidth : 105, sortable:'true',type: 'number',value:10},
            {label: 'All Contracts',fieldName:'activeContractCount__c',initialWidth : 140, sortable:'true',type: 'number',value:13},
            {label: results[0],fieldName:'c1_value__c',initialWidth : 104,sortable:'true', type: 'number',value:1,typeAttributes:{maximumFractionDigits :'0'}},
            {label: results[1],fieldName:'c2_value__c',initialWidth : 104, sortable:'true',type: 'number',value:2,typeAttributes:{maximumFractionDigits :'0'}},
            {label: results[2],fieldName:'c3_value__c',initialWidth : 104,sortable:'true', type: 'number',value:3,typeAttributes:{maximumFractionDigits :'0'}},
            {label: results[3],fieldName:'c4_value__c',initialWidth : 104, sortable:'true',type: 'number',value:4,typeAttributes:{maximumFractionDigits :'0'}},
            {label: results[4],fieldName:'c5_value__c',initialWidth : 104, sortable:'true',type: 'number',value:5,typeAttributes:{maximumFractionDigits :'0'}},
            {label: results[5],fieldName:'c6_value__c',initialWidth : 104, sortable:'true',type: 'number',value:6,typeAttributes:{maximumFractionDigits :'0'}},
            {label: 'Total EANV',fieldName:'totalValue__c',initialWidth : 120,sortable:'true', type: 'number',value:7,typeAttributes:{maximumFractionDigits :'0'}}
            
        ]);	
        //var action = component.get('c.fetchCustomer');

        var action = component.get('c.filterSearch'); ///step 1
        action.setCallback(this, function(response){
            var state = response.getState();
           // alert(state);
            console.log('state'+state);
            if(state === 'SUCCESS' || state === 'DRAFT' ){
                var responseValue = response.getReturnValue();
               // console.log('responseValue', responseValue);
                component.set("v.partnerList",responseValue);
                //component.set("v.allData",responseValue);
                 responseValue.forEach(function(record){
                       record.accountSTName__c = record.accountSTName__c; //Here define your value which you want to display
    					//record.link = 'https://hp--skuid.visualforce.com/apex/skuid__ui?page=ds_PageForAccountRedirection&accountid'+record.accountId__c+'/view' ;
    					record.link = 'https://hp--gsdr22sp22.lightning.force.com/lightning/r/Sales_Territory__c/'+record.sfdcId__c+'/view';

                      
                  });
                if(responseValue != null && responseValue.length > 0){
                    component.set("v.totalPages", Math.ceil(response.getReturnValue().length/component.get("v.pageSize")));
                    component.set("v.currentPageNumber",1);
                    
                    helper.buildData (component, helper);
                }else{
                    component.set("v.totalPages", Math.ceil(response.getReturnValue().length/component.get("v.pageSize")));
                    component.set("v.currentPageNumber",0);
                    helper.buildData(component, helper);
                }
            }
            
        });
        $A.enqueueAction(action);
        
        var defaultColumns=[ 
           { value: "1", label: 'ST ID',fieldName:'accountSTID__c'},
            { value: "2", label: 'ST Short Name',fieldName:'accountSTName__c'},
            { value: "3", label: '#Accounts',fieldName:'cntOfTotalAcc__c'},
            { value: "4", label: results[0],fieldName:'c1_value__c'},
            { value: "5", label: results[1],fieldName:'c2_value__c'},
            { value: "6", label: results[2],fieldName:'c3_value__c'},
            { value: "7", label: results[3],fieldName:'c4_value__c'},
            { value: "8", label: results[4],fieldName:'c5_value__c'},
             { value: "9", label: results[5],fieldName:'c6_value__c'},
             { value: "10", label: 'Total EANV',fieldName:'totalValue__c' },
            // { value: "11", label: 'Sales Program',fieldName:'' },
            // { value: "12", label: 'Direct Contracts',fieldName:'' },
             { value: "13", label: 'All Contracts',fieldName:'' },
            // { value: "14", label: 'InDirect Contracts',fieldName:''},
             { value: "15", label: 'GL Recommendation',fieldName:'greenlakeoverallPropensity__c'},
             { value: "16",label:'Account PTB',fieldName:'overallAccountPriority__c'},
           // { value: "17",label: 'PN Winback Potential',fieldName:'potentialWinBack__c'}
            
            
        ];
        var availableColumns = ["1", "2","3","13","4","5","6","7","8","9","10"];
     
         component.set("v.options", defaultColumns);
        component.set("v.values", availableColumns);
        component.set("v.requiredOptions", ["1", "2","13"]);
       
        
    },
    
     searchTable: function (cmp, event, helper) {
        var searchFilter = event.getSource().get("v.value").toUpperCase();
        console.log(searchFilter);
        cmp.set("v.RenewalSearch",searchFilter);
       //alert(searchFilter);
    },
    updateColumnSorting: function (cmp, event, helper) {
        cmp.set('v.isupdating', true);
        setTimeout($A.getCallback(function() {
            var fieldName = event.getParam('fieldName');
             var sortDirection = event.getParam('sortDirection');
            cmp.set("v.sortedBy", fieldName);
            cmp.set("v.sortedDirection", sortDirection);
            if ( fieldName === 'link'){
                fieldName = 'accountSTName__c'; 
                helper.sortData(cmp, fieldName, sortDirection); 
            }else{
                     helper.sortData(cmp, fieldName, sortDirection);
                }
            cmp.set('v.isupdating', false);
        }), 0);
    },
    
    opencustomizetable : function(component, event, helper) {
        let startDate = new Date();
    const results = [];
    for (let i = 0; i < 6; i++) {
        const dd = startDate ? new Date(startDate) : new Date();
    const currentMonth = dd.getUTCMonth(); // 0 - 11; 10,11,0 = Qtr1; 1,2,3 = Qtr2; 4,5,6=Qtr3; 7,8,9=Qtr4
    let qtrStartMonth = 0;
    switch (currentMonth) {
        case 2:
        case 3:
            qtrStartMonth = 1; // Feb, Q2
            break;
        case 5:
        case 6:
            qtrStartMonth = 4; // May, Q3
            break;
        case 8:
        case 9:
            qtrStartMonth = 7; // Aug, Q4
            break;
        case 11:
            qtrStartMonth = 10; // Nov, Q1
            break;
        case 0:
            qtrStartMonth = 10 - 12; // Nov, Q1 but previous year
            break;
        default:
            qtrStartMonth = currentMonth;
    }
   dd.setUTCMonth(qtrStartMonth);
dd.setUTCDate(1);
const e = new Date(dd);
e.setUTCMonth(qtrStartMonth + (1 * 3));
e.setUTCDate(0); // Last day of previous month
const year = e.getFullYear();
if (currentMonth === 0) {
e.setFullYear(year + 1);
}
const qtrNumber = Math.ceil(dd.getUTCMonth() / 3) + 1;
const t = `Q${qtrNumber > 4 ? 1 : qtrNumber} ${dd.getUTCFullYear() + (dd.getUTCMonth() >= 10 ? 1 : 0)}`;
        console.log("tvalue="+t);
        startDate = e;
        startDate.setUTCDate(startDate.getUTCDate() + 1);
        results.push(t);
                      
    };
        component.set('v.columnsorder', [
            
              {label: 'ST ID',fieldName:'accountSTID__c',initialWidth : 95,sortable:'true', type: 'text',value:1},
             {label: 'ST Short Name', fieldName:'link',typeAttributes: {label: { fieldName: 'accountSTName__c'},target:'_blank'}, initialWidth : 285,sortable:'true', type: 'url',value:2},    
           {label: '#Accounts',fieldName:'cntOfTotalAcc__c',initialWidth : 140, sortable:'true',type: 'number',value:3},
           {label: results[0],fieldName:'c1_value__c',initialWidth : 140,sortable:'true', type: 'number',value:4,typeAttributes:{maximumFractionDigits :'0'}},
            {label:results[1],fieldName:'c2_value__c',initialWidth : 140, sortable:'true',type: 'number',value:5,typeAttributes:{maximumFractionDigits :'0'}},
            {label: results[2],fieldName:'c3_value__c',initialWidth : 140,sortable:'true', type: 'number',value:6,typeAttributes:{maximumFractionDigits :'0'}},
            {label: results[3],fieldName:'c4_value__c',initialWidth : 140, sortable:'true',type: 'number',value:7,typeAttributes:{maximumFractionDigits :'0'}},
            {label: results[4],fieldName:'c5_value__c',initialWidth : 140, sortable:'true',type: 'number',value:8,typeAttributes:{maximumFractionDigits :'0'}},
            {label: results[5],fieldName:'c6_value__c',initialWidth : 140, sortable:'true',type: 'number',value:9,typeAttributes:{maximumFractionDigits :'0'}},
            {label: 'Total EANV',fieldName:'totalValue__c',initialWidth : 140,sortable:'true', type: 'number',value:10,typeAttributes:{maximumFractionDigits :'0'}}, 
            //{label: 'Sales Program',fieldName:'',initialWidth : 140, sortable:'true',type: 'text',value:11},
            {label: 'Direct Contracts',fieldName:'activeContractCount__c',initialWidth : 140, sortable:'true',type: 'number',value:12},
            {label: 'All Contracts',fieldName:'activeContractCount__c',initialWidth : 140, sortable:'true',type: 'number',value:13},
            {label: 'InDirect Contracts',fieldName:'activeContractCount__c',initialWidth : 180, sortable:'true',type: 'number',value:14},
            {label: 'GL Recommendation',fieldName:'greenlakeoverallPropensity__c',initialWidth : 170, sortable:'true', type: 'text',value:15},
            {label:'Account PTB',fieldName:'overallAccountPriority__c',initialWidth : 140, sortable:'true',type: 'text',value:16},
           // {label: 'PN Winback Potential',fieldName:'potentialWinBack__c',initialWidth : 180, sortable:'true',type: 'text',value:17}
        
        ]);
        
        component.set("v.iscustomizetableopen", true);
        
    },
    closecustomizetable : function(component, event, helper) {
        component.set("v.iscustomizetableopen", false);
        
    },
    handleChange: function (cmp, event) {
        
        
        // This will contain an array of the "value" attribute of the selected options
        var selectedOptionValue = event.getParam("value");
        
        //// console.log(typeof(selectedOptionValue));
        var string123 = selectedOptionValue.toString();
        //alert("Option selected with value: '" + selectedOptionValue.toString() + "'");
        
        var array123 = JSON.parse("[" + string123 + "]");
        
        var refreshvalues;
        
        cmp.set('v.globalvar',array123);
               
      },
    applySelectedColumns: function(component, event, helper){
        var direct_col = {label: 'Direct Contracts',fieldName:'activeContractCount__c',initialWidth : 140, sortable:'true',type: 'number',value:12};
        var all_col = {label: 'All Contracts',fieldName:'activeContractCount__c',initialWidth : 140, sortable:'true',type: 'number',value:13};
       var indirect_col = {label: 'InDirect Contracts',fieldName:'activeContractCount__c',initialWidth : 180, sortable:'true',type: 'number',value:14};
        
       var SearchStr=component.get('v.RenewalSearch');
        console.log(SearchStr);
        var BusinessGroupFilter=component.get('v.Businessgroup');
        console.log(BusinessGroupFilter);
        var RTMFilter=component.get('v.RTM');
        console.log(RTMFilter);/*
        var columnsvarsorted = cmp.get('v.columns');
        if(RTMFilter == "indirect" && !(valueindex.includes(14))){
            // if(RTMFilter == "indirect" && !(columnsvarsorted[x].value == 14)){
                 console.log("filter: Indirect ::");
                if(valueindex.includes(12)){
                 columnsvarsorted[valueindex.indexOf(12)] = indirect_col;
                    //columnsvarsorted.indexOf("12").value = "14";
                 }else if(valueindex.includes(13)){
                     columnsvarsorted[valueindex.indexOf(13)] = indirect_col;
                 }
                }
                if(RTMFilter == "direct" && !(valueindex.includes(12))){
                     if(valueindex.includes(13)){
                     columnsvarsorted[valueindex.indexOf(13)] = direct_col;
                     }else if(columnsvarsorted.includes(14)){
                         columnsvarsorted[valueindex.indexOf(14)] = direct_col;
                     }
                }
                
                if(RTMFilter == "all" && !(valueindex.includes(13))){
                 console.log("in one value::"+valueindex.includes(13)+':::'+valueindex.includes('13'));
                     if(valueindex.includes(14)){
                         columnsvarsorted[valueindex.indexOf(14)] = all_col;
                     }else if(valueindex.includes(12)){
                         columnsvarsorted[valueindex.indexOf(12)] = all_col;
                     }
     
                }
     */
        //var action = component.get('c.fetchCustomer');
        var action = component.get('c.filterSearch');
        action.setParams({
            'BusinessGroupFilter':BusinessGroupFilter,
            'RTMFilter':RTMFilter,
            'SearchStr':SearchStr
        });
        
        action.setCallback(this, function(response){
            var state = response.getState();
           // alert(state);
            
            if(state === 'SUCCESS' || state === 'DRAFT' ){
                var responseValue = response.getReturnValue();
                console.log('responseValue', responseValue);
                component.set("v.partnerList",responseValue);
             responseValue.forEach(function(record){
                       record.accountSTName__c = record.accountSTName__c; //Here define your value which you want to display
    					//record.link = 'https://hp--skuid.visualforce.com/apex/skuid__ui?page=ds_PageForAccountRedirection&accountid'+record.accountId__c+'/view' ;
    					record.link = 'https://hp--gsdr22sp22.lightning.force.com/lightning/r/Sales_Territory__c/'+record.sfdcId__c+'/view';

                      
                  });
           
                if(responseValue != null && responseValue.length > 0){
                    component.set("v.totalPages", Math.ceil(response.getReturnValue().length/component.get("v.pageSize")));
                    component.set("v.currentPageNumber",1);
                    helper.buildData(component, helper);
                }else{
                    component.set("v.totalPages", Math.ceil(response.getReturnValue().length/component.get("v.pageSize")));
                   component.set("v.currentPageNumber",0);
                    helper.buildData(component, helper);
                }
            }
        });
        $A.enqueueAction(action);
        
        var usethisvar= component.get('v.globalvar');
   
        
        var columnsvar=component.get('v.columnsorder');
        //var columnsvalues=[];
        var result=[];
        
        
        
        //console.log(columnsvar.length);
        for( var i = 0; i < columnsvar.length; i++){ 
            if(columnsvar[i].value == 1 || columnsvar[i].value == 2 || columnsvar[i].value == 3 || columnsvar[i].value == 4 || columnsvar[i].value == 5 || columnsvar[i].value == 6 || columnsvar[i].value == 7 || columnsvar[i].value == 8 || columnsvar[i].value == 9 || columnsvar[i].value == 10 ||  columnsvar[i].value == 11 || columnsvar[i].value == 12 || columnsvar[i].value == 13 || columnsvar[i].value == 14 || columnsvar[i].value == 15 || columnsvar[i].value == 16 || columnsvar[i].value == 17 || columnsvar[i].value == 18 )
            {
                continue;
            }
            var c=0;
            //  console.log("i"+columnsvar[i].value);
            for ( var j = 0; j < usethisvar.length; j++ ){
                //    console.log(usethisvar[j]);
                if ( columnsvar[i].value === usethisvar[j]) { 
                          console.log("in if"+ columnsvar[i].label);

                    break;
                    
                }
                else{
                    //    console.log("in else")
                    c++;
                }
            }
            //console.log("c"+c);
            //console.log(usethisvar.length);
            if (c == usethisvar.length){
                
                columnsvar.splice(i, 1); 
                i--;
            }
            
            
        }
        
        var columnsvarsorted = [];
        
        for ( var j = 0; j < usethisvar.length; j++ )
        {
            for( var i = 0; i < columnsvar.length; i++)
            {
                if(usethisvar[j] == columnsvar[i].value)
                {
                    //console.log(columnsvar[i]);
                    
                    columnsvarsorted[j] = columnsvar[i];

                }
            }
        }

       
                        /*
  { value: "12", label: 'Direct Contracts',fieldName:'' },
             { value: "13", label: 'All Contracts',fieldName:'' },
             { value: "14", label: 'InDirect Contracts',fieldName:''},
        
            SAbiha :: Below snippet is for applying RTM filter logic with customise table 
        */
       console.log("length of arr : "+columnsvarsorted.length);
       var valueindex = [];
       for (var x = 0; x < columnsvarsorted.length; x++)
       {
          valueindex[x] = columnsvarsorted[x].value;
       }

        console.log("Outside loop ::"+ valueindex);
        if(RTMFilter == "indirect" && !(valueindex.includes(14))){
       // if(RTMFilter == "indirect" && !(columnsvarsorted[x].value == 14)){
            console.log("filter: Indirect ::");
           if(valueindex.includes(12)){
            columnsvarsorted[valueindex.indexOf(12)] = indirect_col;
               //columnsvarsorted.indexOf("12").value = "14";
            }else if(valueindex.includes(13)){
                columnsvarsorted[valueindex.indexOf(13)] = indirect_col;
            }
           }
           if(RTMFilter == "direct" && !(valueindex.includes(12))){
                if(valueindex.includes(13)){
                columnsvarsorted[valueindex.indexOf(13)] = direct_col;
                }else if(columnsvarsorted.includes(14)){
                    columnsvarsorted[valueindex.indexOf(14)] = direct_col;
                }
           }
           
           if(RTMFilter == "all" && !(valueindex.includes(13))){
            console.log("in one value::"+valueindex.includes(13)+':::'+valueindex.includes('13'));
                if(valueindex.includes(14)){
                    columnsvarsorted[valueindex.indexOf(14)] = all_col;
                }else if(valueindex.includes(12)){
                    columnsvarsorted[valueindex.indexOf(12)] = all_col;
                }

           }

        
           console.log(columnsvarsorted);
         component.set("v.columns",columnsvarsorted);
  
        component.set("v.iscustomizetableopen",false);
    },
    
    
     onNext : function(component, event, helper) {        
        var pageNumber = component.get("v.currentPageNumber");
        component.set("v.currentPageNumber", pageNumber+1);
        helper.buildData(component, helper);
    },
    
    onPrev : function(component, event, helper) {        
        var pageNumber = component.get("v.currentPageNumber");
        component.set("v.currentPageNumber", pageNumber-1);
        helper.buildData(component, helper);
    },
    
    processMe : function(component, event, helper) {
        component.set("v.currentPageNumber", parseInt(event.target.name));
        helper.buildData(component, helper);
    },
    
    onFirst : function(component, event, helper) {        
        component.set("v.currentPageNumber", 1);
        helper.buildData(component, helper);
    },
    
    onLast : function(component, event, helper) {        
        component.set("v.currentPageNumber", component.get("v.totalPages"));
        helper.buildData(component, helper);
    },
    
    downloadRenewal : function(component, event, helper){
        var action = component.get('c.downloadRenewalCenter');
        action.setCallback(this, function(response){
            var state = response.getState();
            console.log('state'+state);
            if(state === 'SUCCESS' || state === 'DRAFT' ){
                var responseValue = response.getReturnValue();
                console.log('responseValue', responseValue);
                component.set("v.partnerList",responseValue);
                // alert("Download request has been submitted successfully");
                
                var toastEvent = $A.get("e.force:showToast");
                var baseurl ='https://'+window.location.hostname+'/lightning/o/IBNext_Download_Tracker__c/list?filterName=00B0t000005utNrEAI';
                toastEvent.setParams({
                    "mode": 'sticky',
                    "title": 'Success',
                    "type": 'Success',
                    "message": 'Download request has been submitted successfully',
                    "messageTemplate": '{0} {1}',
                    "messageTemplateData": ['Download request has been submitted successfully.', {
                        url: baseurl,
                        label: 'Click here to view Download Tracker',
                        target:'_Parent'
                    }]
                });
                toastEvent.fire();  
                
            }
            
        });
        $A.enqueueAction(action);
        
    },
    
    handleSelected : function(cmp, event, helper){
//-------------------------------------
        var direct_col = {label: 'Direct Contracts',fieldName:'activeContractCount__c',initialWidth : 140, sortable:'true',type: 'number',value:12};
        var all_col = {label: 'All Contracts',fieldName:'activeContractCount__c',initialWidth : 140, sortable:'true',type: 'number',value:13};
       var indirect_col = {label: 'InDirect Contracts',fieldName:'activeContractCount__c',initialWidth : 180, sortable:'true',type: 'number',value:14};
        
        var columnSet = cmp.get('v.columns');
        var RTMFilter=cmp.get('v.RTM');


        console.log("column set ::"+ JSON.stringify(columnSet));
        var valueindex = [];
       for (var x = 0; x < columnSet.length; x++)
       {
          valueindex[x] = columnSet[x].value;
       }

       console.log("Outside loop hanndle ::"+ valueindex);
       
       if(RTMFilter == "indirect" && !(valueindex.includes(14))){
        // if(RTMFilter == "indirect" && !(columnsvarsorted[x].value == 14)){
             console.log("filter: Indirect ::");
            if(valueindex.includes(12)){
                columnSet[valueindex.indexOf(12)] = indirect_col;
                //columnsvarsorted.indexOf("12").value = "14";
             }else if(valueindex.includes(13)){
                columnSet[valueindex.indexOf(13)] = indirect_col;
             }
            }
            if(RTMFilter == "direct" && !(valueindex.includes(12))){
                 if(valueindex.includes(13)){
                    columnSet[valueindex.indexOf(13)] = direct_col;
                    console.log("am here ");
                 }else if(valueindex.includes(14)){
                    columnSet[valueindex.indexOf(14)] = direct_col;
                 }
            }
            if(RTMFilter == "all" && !(valueindex.includes(13))){
                if(valueindex.includes(12)){
                   columnSet[valueindex.indexOf(12)] = all_col;
                   console.log("am here ");
                }else if(valueindex.includes(14)){
                   columnSet[valueindex.indexOf(14)] = all_col;
                }
           }
            cmp.set('v.columns', columnSet);
            console.log("column set FINAL ::"+ JSON.stringify(columnSet));
           
         var SearchStr=cmp.get('v.RenewalSearch');
        console.log(SearchStr);
        var BusinessGroupFilter=cmp.get('v.Businessgroup');
        console.log(BusinessGroupFilter);
        var RTMFilter=cmp.get('v.RTM');
        console.log(RTMFilter);
         //var column = cmp.get('c.applySelectedColumns');
        // $A.enqueueAction(column);
        
        var RenewalFilters=cmp.get("c.filterSearch");
        RenewalFilters.setParams({
            'BusinessGroupFilter':BusinessGroupFilter,
            'RTMFilter':RTMFilter,
            'SearchStr':SearchStr
        });
        RenewalFilters.setCallback(this, function(response) {
            var column = cmp.get('c.applySelectedColumns');
         $A.enqueueAction(column);
           // component.set('v.searchspinner',false);
            var state = response.getState();
            console.log("state==>"+state);
              if (cmp.isValid() && state === "SUCCESS"){
                  var responseValue = response.getReturnValue();
                console.log('responseValue', responseValue);
                              responseValue.forEach(function(record){
                       record.accountSTName__c = record.accountSTName__c; //Here define your value which you want to display
    					//record.link = 'https://hp--skuid.visualforce.com/apex/skuid__ui?page=ds_PageForAccountRedirection&accountid'+record.accountId__c+'/view' ;
    					record.link = 'https://hp--gsdr22sp22.lightning.force.com/lightning/r/Sales_Territory__c/'+record.sfdcId__c+'/view';

                      
                  });
               // console.log("programlist"+response.getReturnValue());
                cmp.set("v.partnerList",response.getReturnValue());
                  
                if(responseValue != null && responseValue.length > 0){
                    cmp.set("v.totalPages", Math.ceil(response.getReturnValue().length/cmp.get("v.pageSize")));
                    cmp.set("v.currentPageNumber",1);
                    
                    helper.buildData(cmp, helper);
                }else{
                    cmp.set("v.totalPages", Math.ceil(response.getReturnValue().length/cmp.get("v.pageSize")));
                    cmp.set("v.currentPageNumber",0);
                    helper.buildData(cmp, helper);
                }
                 
            }
    });
       // alert(SearchStr);
        $A.enqueueAction(RenewalFilters);
        
    },  
    showSpinner: function(component, event, helper) {
        // make Spinner attribute true for displaying loading spinner 
        component.set("v.spinner", true); 
    },
     
    // function automatic called by aura:doneWaiting event 
    hideSpinner : function(component,event,helper){
        // make Spinner attribute to false for hiding loading spinner    
        component.set("v.spinner", false);
    },
    
   
    Reset : function(component, event, helper) {
        component.find("Business Group").set('v.value',"");
        //component.find("Route To Market").set('v.value',"all");
        var RTMFilter = 'all';
        component.set('v.RTM',RTMFilter);
        console.log("RTM"+RTMFilter);
        component.find("SearchBox").set('v.value',"");
       component.set('v.RenewalSearch',"");
       var columnSet = component.get('v.columns');
       var all_col = {label: 'All Contracts',fieldName:'activeContractCount__c',initialWidth : 140, sortable:'true',type: 'number',value:13};

       console.log("column set in reset ::"+ JSON.stringify(columnSet));
       var valueindex = [];
      for (var x = 0; x < columnSet.length; x++)
      {
         valueindex[x] = columnSet[x].value;
      }

       if(RTMFilter == "all" && !(valueindex.includes(13))){
        console.log("in reset "+valueindex.includes(13)+':::'+valueindex.includes('13'));
            if(valueindex.includes(14)){
                columnSet[valueindex.indexOf(14)] = all_col;
            }else if(valueindex.includes(12)){
                columnSet[valueindex.indexOf(12)] = all_col;
            }

       }
       component.set('v.columns', columnSet);
       var column = component.get('c.applySelectedColumns');
       
       console.log("Columns in reset :: " + column);

        $A.enqueueAction(column);
         
        //var resetloader = component.get('c.fetchCustomer');
        //$A.enqueueAction(resetloader);
         //var columnvalue=component.get("v.values");
         //window.sessionStorage.setItem('somekey3',columnvalue);
        //console.log("columnvalue3"+columnvalue);
        
      // var resetLoader = component.get('c.init');
       // $A.enqueueAction(resetLoader);
        
    }
})