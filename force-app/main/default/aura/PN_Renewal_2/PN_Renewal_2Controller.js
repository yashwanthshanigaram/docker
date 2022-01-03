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
         
            //{label: 'Account Name', fieldName:'accountName__c',initialWidth : 120,sortable:'true', type: 'url', value:1},
            {label: 'Account Name', fieldName:'link',typeAttributes: {label: { fieldName: 'accountName__c'},target:'_blank'}, initialWidth : 80,sortable:'true', type: 'url',value:1},
            {label: 'Customer ID',fieldName:'accountId__c',initialWidth : 80, sortable:'true',type: 'text',value:2},
            {label: 'All Contracts',fieldName:'countOfActiveContracts__c',initialWidth : 80, sortable:'true',type: 'number',value:3},
            {label: results[0],fieldName:'c1_value__c',initialWidth : 75,sortable:'true', type: 'number',value:4,typeAttributes:{maximumFractionDigits :'0'}},
            {label: results[1],fieldName:'c2_value__c',initialWidth : 75, sortable:'true',type: 'number',value:5,typeAttributes:{maximumFractionDigits :'0'}},
            {label: results[2],fieldName:'c3_value__c',initialWidth : 75,sortable:'true', type: 'number',value:6,typeAttributes:{maximumFractionDigits :'0'}},
            {label: results[3],fieldName:'c4_value__c',initialWidth : 75, sortable:'true',type: 'number',value:7,typeAttributes:{maximumFractionDigits :'0'}},
            {label: results[4],fieldName:'c5_value__c',initialWidth : 75, sortable:'true',type: 'number',value:8,typeAttributes:{maximumFractionDigits :'0'}},
            {label: results[5],fieldName:'c6_value__c',initialWidth : 75, sortable:'true',type: 'number',value:9,typeAttributes:{maximumFractionDigits :'0'}},
           {label: 'Total EANV',fieldName:'grandTotalCalculated__c',initialWidth : 102,sortable:'true', type: 'number',value:10,typeAttributes:{maximumFractionDigits :'0'}}
            
        ]);	
         
        var sfdcId_ST = component.get('v.recordId');
  // Set the value, assumes you have created attribute "attributename" in your markup
  //component.set("v.sfdcId", sfdcId_ST);
         console.log("sfdcId"+sfdcId_ST);
        var action = component.get('c.dsAccount');
        action.setParams({
            'sfdcId_ST':sfdcId_ST,
        });
        action.setCallback(this, function(response){
            var state = response.getState();
          // alert(state);
            console.log('state'+state);
            if(state === 'SUCCESS' || state === 'DRAFT' ){
                var responseValue = response.getReturnValue();
                                responseValue.forEach(function(record){
                                    
                       record.accountName__c = record.accountName__c; 
                                    var fullfilment=component.get('v.RTM');
                                    console.log('fuillment route is'+fullfilment);

                   record.link = 'https://hp--gsdr22sp22.lightning.force.com/lightning/r/Account/'+record.sfdcId__c+'/view';
                   // record.link= 'https://hp--gsdr22sp22.lightning.force.com/apex/skuid__ui?page=ds_Account&account='+record.sfdcId__c+'&'+params;
                  });
                console.log('responseValue', responseValue);
                component.set("v.partnerList",responseValue);
               // component.set("v.allData",responseValue);

               
                if(responseValue != null && responseValue.length > 0){
                    component.set("v.totalPages", Math.ceil(response.getReturnValue().length/component.get("v.pageSize")));
                    component.set("v.currentPageNumber",1);
                    
                    helper.buildData(component, helper);
                }else{
                    cmp.set("v.totalPages", Math.ceil(response.getReturnValue().length/cmp.get("v.pageSize")));
                    cmp.set("v.currentPageNumber",0);
                    helper.buildData(cmp, helper);
                }
            }
            
        });
        $A.enqueueAction(action);
        
        var defaultColumns=[ 
           
            { value: "1", label: 'Account Name ',fieldName:'accountName__c'},
            { value: "2", label: 'Account City',fieldName:'city__c'},
            { value: "6", label: 'Account State',fieldName:'state__c'},
            {value: "4", label:"Account Country", fieldName:'country__c'},
            {label: 'Customer ID',fieldName:'accountId__c',value:"5"},
            { value: "3", label: 'All Contracts',fieldName:'countOfActiveContracts__c' },
            { value: "7", label: results[0],fieldName:'c1_value__c'},
            { value: "8", label: results[1],fieldName:'c2_value__c'},
            { value: "9", label: results[2],fieldName:'c3_value__c'},
            { value: "10", label: results[3],fieldName:'c4_value__c'},
            { value: "11", label: results[4],fieldName:'c5_value__c'},
             { value: "12", label: results[5],fieldName:'c6_value__c'},
             { value: "13", label: 'Total EANV',fieldName:'grandTotalCalculated__c' }
            
         
            
            
        ];
        var availableColumns = ["1","5","3","7","8","9","10","11","12","13"];
     
         component.set("v.options", defaultColumns);
        component.set("v.values", availableColumns);
          component.set("v.requiredOptions", ["1", "5", "3"]);
       
        
    },

    searchTable: function (cmp, event, helper) {
        var searchFilter = event.getSource().get("v.value").toUpperCase();
        console.log(searchFilter);
        cmp.set("v.STSearch",searchFilter);
        
        //alert(searchFilter);
    },
    
   
     handleSelected : function(cmp, event, helper){
         
     var SearchStr=cmp.get('v.STSearch');
        console.log(SearchStr);
        var BusinessGroupFilter=cmp.get('v.Businessgroup');
        console.log(BusinessGroupFilter);
        var RTMFilter=cmp.get('v.RTM');
        console.log(RTMFilter);
       
       
       var direct_col = {label: 'Direct Contracts',fieldName:'countOfActiveContracts__c',initialWidth : 140, sortable:'true',type: 'text',value:14};
       var all_col = {label: 'All Contracts',fieldName:'countOfActiveContracts__c',initialWidth : 140, sortable:'true',type: 'text',value:3};
      var indirect_col = {label: 'InDirect Contracts',fieldName:'countOfActiveContracts__c',initialWidth : 180, sortable:'true',type: 'text',value:15};
      var sfdcId_ST = cmp.get('v.recordId');

       var columnSet = cmp.get('v.columns');
       var RTMFilter=cmp.get('v.RTM');


       var valueindex = [];
      for (var x = 0; x < columnSet.length; x++)
      {
         valueindex[x] = columnSet[x].value;
      }

      console.log("RTM in handle selected:::"+RTMFilter);
      console.log("Outside loop ::"+ valueindex);
      console.log("Valu is handle ::"+valueindex.includes('3'));
      
      if(RTMFilter == "indirect" && !(valueindex.includes(15))){
       // if(RTMFilter == "indirect" && !(columnsvarsorted[x].value == 14)){
            console.log("filter: Indirect :: ");
           if(valueindex.includes(14)){
               columnSet[valueindex.indexOf(14)] = indirect_col;
               //columnsvarsorted.indexOf("12").value = "14";
            }else if(valueindex.includes('3') || valueindex.includes(3) ){
               columnSet[valueindex.indexOf(3)] = indirect_col;
               console.log("filter ::: All swapped");
            }
           }
           if(RTMFilter == "direct" && !(valueindex.includes(14))){
                if(valueindex.includes(15)){
                   columnSet[valueindex.indexOf(15)] = direct_col;
                   console.log("am here in direct 1 ");
                }else if(valueindex.includes('3') || valueindex.includes(3) ){
                   columnSet[valueindex.indexOf(3)] = direct_col;
                   console.log("am here in direct 2 ");
                }
           }
           if(RTMFilter == "all" && !(valueindex.includes(3))){
            if(valueindex.includes(15)){
               columnSet[valueindex.indexOf(15)] = all_col;
               console.log("am here ");
            }else if(valueindex.includes(14)){
               columnSet[valueindex.indexOf(14)] = all_col;
            }
       }
           cmp.set('v.columns', columnSet);


         
         
        var RenewalFilters=cmp.get("c.dsAccount");
        RenewalFilters.setParams({
            'sfdcId_ST':sfdcId_ST,
            'BusinessGroupFilter':BusinessGroupFilter,
            'RTMFilter':RTMFilter,
            'SearchStr':SearchStr
        });
        RenewalFilters.setCallback(this, function(response) {
           // component.set('v.searchspinner',false);
            var state = response.getState();
            console.log("state==>"+state);
              if (cmp.isValid() && state === "SUCCESS"){
                  var responseValue = response.getReturnValue();
                   responseValue.forEach(function(record){
                       record.accountName__c = record.accountName__c; 
                       var fullfilment=cmp.get('v.RTM');
                        console.log('fuillment route is :::'+fullfilment);
                        var params = "fulfillmentRoute="+fullfilment+"&isLightning=true";
                      
                   record.link = 'https://hp--gsdr22sp22.lightning.force.com/lightning/r/Account/'+record.sfdcId__c+'/view';
                  });
                console.log('responseValue :::', responseValue);
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
     downloadLevel2 : function(component, event, helper){
        var action = component.get('c.downloadRenewalLevel');
        action.setCallback(this, function(response){
            var state = response.getState();
            var sfdcId_ST = component.get('v.recordId');  
            console.log('state'+state);
            if(state === 'SUCCESS' || state === 'DRAFT' ){
                var responseValue = response.getReturnValue();
                console.log('responseValue', responseValue);
                component.set("v.partnerList",responseValue);
                // alert("Download request has been submitted successfully");
                
                var toastEvent = $A.get("e.force:showToast");
                var baseurl ='https://'+window.location.hostname+'/lightning/o/IBNext_Download_Tracker__c/list?filterName=00B7X000001Y5ArUAK';
                toastEvent.setParams({
                    "mode": 'sticky',
                    "title": 'success',
                    "type": 'success',
                    "message": 'Download request has been submitted successfully',
                    "messageTemplate": '{0} {1}',
                    "messageTemplateData": ['Download request has been submitted successfully.', {
                        url: baseurl,
                        label: 'Click here to view Download Tracker',
                    }]
                });
                toastEvent.fire();  
                
            }
            
        });
        $A.enqueueAction(action);
        
    },
    updateColumnSorting: function (cmp, event, helper) {
        cmp.set('v.isupdating', true);
        // We use the setTimeout method here to simulate the async
        // process of the sorting data, so that user will see the
        // spinner loading when the data is being sorted.
        setTimeout($A.getCallback(function() {
            var fieldName = event.getParam('fieldName');
            var sortDirection = event.getParam('sortDirection');
            cmp.set("v.sortedBy", fieldName);
            cmp.set("v.sortedDirection", sortDirection);
            if ( fieldName === 'link'){
                fieldName = 'accountName__c'; 
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
            {label: 'Account Name', fieldName:'link',typeAttributes: {label: { fieldName: 'accountName__c'},target:'_blank'}, initialWidth : 80,sortable:'true', type: 'url',value:1},
            { value: 2, label: 'Account City',fieldName:'city__c',sortable:'true',initialWidth : 120},
            { value: 6, label: 'Account State',fieldName:'state__c',sortable:'true',initialWidth : 120},
            {value: 4, label:"Account Country", fieldName:'country__c',sortable:'true',initialWidth : 120},
            {label: 'Customer ID',fieldName:'accountId__c',value:5,sortable:'true',initialWidth : 120},
            { value: 3, label: 'All Contracts',fieldName:'countOfActiveContracts__c',sortable:'true',initialWidth : 120},
            { value: 7, label: results[0],fieldName:'c1_value__c',sortable:'true',initialWidth : 120},
            { value: 8, label: results[1],fieldName:'c2_value__c',sortable:'true',initialWidth : 120},
            { value: 9, label: results[2],fieldName:'c3_value__c',sortable:'true',initialWidth : 120},
            { value: 10, label: results[3],fieldName:'c4_value__c',sortable:'true',initialWidth : 120},
            { value: 11, label: results[4],fieldName:'c5_value__c',sortable:'true',initialWidth : 120},
             { value: 12, label: results[5],fieldName:'c6_value__c',sortable:'true',initialWidth : 120},
             { value: 13, label: 'Total EANV',fieldName:'grandTotalCalculated__c',sortable:'true',initialWidth : 120},
             //{ value: "14", label: 'Direct Contracts',fieldName:'countOfActiveDirectContracts__c',sortable:'true',initialWidth : 120},
             //{ value: "15", label: 'Indirect Contracts',fieldName:'countOfActiveIndirectContracts__c',sortable:'true',initialWidth : 120}
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
        var direct_col = {label: 'Direct Contracts',fieldName:'activeContractCount__c',initialWidth : 140, sortable:'true',type: 'number',value:14};
        var all_col = {label: 'All Contracts',fieldName:'activeContractCount__c',initialWidth : 140, sortable:'true',type: 'number',value:3};
       var indirect_col = {label: 'InDirect Contracts',fieldName:'activeContractCount__c',initialWidth : 180, sortable:'true',type: 'number',value:15};
    /*added*/     var SearchStr=component.get('v.STSearch');
        console.log(SearchStr);
        var BusinessGroupFilter=component.get('v.Businessgroup');
        console.log(BusinessGroupFilter); /*added*/
        var RTMFilter=component.get('v.RTM');
          var sfdcId_ST = component.get('v.recordId');
         var action = component.get('c.dsAccount');
            action.setParams({
            'sfdcId_ST':sfdcId_ST,
            'BusinessGroupFilter':BusinessGroupFilter,
            'RTMFilter':RTMFilter,
            'SearchStr':SearchStr
        });
           action.setCallback(this, function(response){
              var state = response.getState();
             
              if(state === 'SUCCESS' || state === 'DRAFT' ){
              var responseValue = response.getReturnValue();
              console.log('responseValue', responseValue);
              component.set("v.partnerList",responseValue); 
            responseValue.forEach(function(record){
                                    
                       record.accountName__c = record.accountName__c; 
                                    var fullfilment=component.get('v.RTM');
                                    console.log('fuillment route is'+fullfilment);

                   record.link = 'https://hp--gsdr22sp22.lightning.force.com/lightning/r/Account/'+record.sfdcId__c+'/view';
                   // record.link= 'https://hp--gsdr22sp22.lightning.force.com/apex/skuid__ui?page=ds_Account&account='+record.sfdcId__c+'&'+params;
                  });
                  
                 if(responseValue != null && responseValue.length > 0){
                      component.set("v.totalPages", Math.ceil(response.getReturnValue().length/component.get("v.pageSize")));
                      component.set("v.currentPageNumber",1);
                      helper.setPageDataAsPerPagination(component, helper);
                  }else{
                    cmp.set("v.totalPages", Math.ceil(response.getReturnValue().length/cmp.get("v.pageSize")));
                    cmp.set("v.currentPageNumber",0);
                    helper.buildData(cmp, helper);
                }
              }
    });
              $A.enqueueAction(action);
        
        var usethisvar= component.get('v.globalvar');
        var columnsvar=component.get('v.columnsorder');
        //var columnsvalues=[];
        var result=[];
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
              //      console.log("in if")
                    break;
                    
                }
                else{
                //    console.log("in else")
                    c++;
                }
            }

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
        var valueindex = [];
        for (var x = 0; x < columnsvarsorted.length; x++)
        {
           valueindex[x] = columnsvarsorted[x].value;
        }
        var RTMFilter=component.get('v.RTM');

         console.log("Outside loop ::"+ valueindex);
         console.log("RTM :::"+RTMFilter);
         console.log("value includes ::"+valueindex.includes(15));
         if(RTMFilter == "indirect" && !(valueindex.includes(15))){
        // if(RTMFilter == "indirect" && !(columnsvarsorted[x].value == 14)){
             console.log("filter: Indirect ::");
            if(valueindex.includes(14)){
             columnsvarsorted[valueindex.indexOf(14)] = indirect_col;
                //columnsvarsorted.indexOf("12").value = "14";
             }else if(valueindex.includes(3)){
                 columnsvarsorted[valueindex.indexOf(3)] = indirect_col;
             }
            }
            if(RTMFilter == "direct" && !(valueindex.includes(14))){
                 if(valueindex.includes(3)){
                 columnsvarsorted[valueindex.indexOf(3)] = direct_col;
                 }else if(valueindex.includes(15)){
                     columnsvarsorted[valueindex.indexOf(15)] = direct_col;
                 }
            }
            
            if(RTMFilter == "all" && !(valueindex.includes(3))){
             
                 if(valueindex.includes(14)){
                     columnsvarsorted[valueindex.indexOf(14)] = all_col;
                 }else if(valueindex.includes(15)){
                     columnsvarsorted[valueindex.indexOf(15)] = all_col;
                 }
 
            }
 
 
        component.set("v.columns",columnsvarsorted);
        component.set("v.iscustomizetableopen",false);
    },
     popup: function(component, event, helper){
        var selectedRows = component.get('v.selectedRowsCount');
        //component.set("v.selectedRowsCount",selectedRowslength);

         if(selectedRows>0){
         component.set('v.isLoading', true);
        
         }else{
             component.set('v.isLoading', false);
         }
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
       // component.find("Route To Market").set('v.value',"all");
         var RTMFilter = 'all';
        component.set('v.RTM',RTMFilter);
        console.log("RTM"+RTMFilter);
        component.find("SearchBox").set('v.value',"");
        component.set("v.STSearch","");
        
 var columnSet = component.get('v.columns');
       var all_col = {label: 'All Contracts',fieldName:'countOfActiveContracts__c',initialWidth : 140, sortable:'true',type: 'number',value:3};

       console.log("column set in reset ::"+ JSON.stringify(columnSet));
       var valueindex = [];
      for (var x = 0; x < columnSet.length; x++)
      {
         valueindex[x] = columnSet[x].value;
      }

       if(RTMFilter == "all" && !(valueindex.includes(3))){
        console.log("in reset "+valueindex.includes(3)+':::'+valueindex.includes('3'));
            if(valueindex.includes(14)){
                columnSet[valueindex.indexOf(14)] = all_col;
            }else if(valueindex.includes(15)){
                columnSet[valueindex.indexOf(15)] = all_col;
            }

       }
       component.set('v.columns', columnSet);
 var column = component.get('c.applySelectedColumns');
       
       console.log("Columns in reset :: " + column);

        $A.enqueueAction(column);
        
        
    }
    
})