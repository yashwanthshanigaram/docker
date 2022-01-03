({
    
    init : function(component, event, helper) {
          var rule = component.get("v.search");
        console.log("ruleName" + rule);
         var sfdcId_ST = component.get('v.recordId');
         console.log("sfdcId"+sfdcId_ST);

     
    
	component.set('v.columns', [  
            {label: 'Product Category',initialWidth:200, fieldName:'productCategory__c',type:'text' , value:1},               
               {label: 'Serial Number',fieldName:'serialNumber__c',initialWidth:200, type:'text' , value:2},
                 {label: 'Product Number',fieldName:'productId__c',initialWidth:200, type:'text' , value:3}, 
                {label: 'Product Name',initialWidth:200, fieldName:'productName__c',type:'text' , value:4},
                {label: 'Product Line',initialWidth:200, fieldName:'ProductLine__c',type:'text' , value:5},                     
                 {label: 'Product Age',initialWidth:200, fieldName: 'productAgingStatus__c',type:'text' , value:6},
                {label: 'End Customer',initialWidth:300, fieldName: 'customerName__c',type:'text' , value:7}, 
             {label: 'Service Level',initialWidth:200, fieldName: 'serviceLevel__c',type:'text' , value:8},
            
             //{label: 'Account Name',initialWidth:200,type:'text', fieldName: 'Renew_Refresh__c' , value:9},
               {label: 'Final Ship Date',initialWidth:200, fieldName: 'finalShipDate__c',type:'text' , value:9},
              {label: 'Contract End Date',initialWidth:200, fieldName: 'contractEndDate__c',type:'text' , value:10},                         
              {label: 'Product End of Service Life Date',initialWidth:200, fieldName: 'eosl__c',type:'text' , value:11},
               {label: 'Lease Maturity Date',initialWidth:200, fieldName: 'leaseMaturityDate__c',type:'text' , value:12}
           /*{label: 'Customer ID',initialWidth:200, fieldName: 'customerId__c',type:'text' , value:13},
        		{label: 'Contract Number',initialWidth:200, fieldName: 'contractID__c',type:'text' , value:14}, 
           
          {label: 'HIT Hardware Incumbent Seller ID',initialWidth:200, fieldName: 'dealResellerPartnerProfileId__c',type:'text' , value:15},
            {label: 'HIT Hardware Incumbent Seller',initialWidth:200, fieldName: 'dealResellerName__c',type:'text' , value:16},
            {label: 'Services Incumbent Seller',initialWidth:200, fieldName: 'soldToName__c',type:'text' , value:17},
             {label: 'Services Incumbent Reseller',initialWidth:200, fieldName: 'resellerName__c',type:'text' , value:18},
             {label: 'Lease Contract Number',initialWidth:200, fieldName: 'leaseContractId__c',type:'text' , value:19},
            {label: 'Lease Start Date',initialWidth:200, fieldName: 'leaseContractStartDate__c',value:20}*/
            
                 
        ]);	
       
         
        var action = component.get("c.fetchQualifyingIB");
         action.setParams({'rule':rule,'sfdcId':sfdcId_ST
        });
        
        
        action.setCallback(this, function(response){
           
            var state = response.getState();
            //alert("IB "+state);
            
            
            
            if(state === 'SUCCESS' || state === 'DRAFT' ){

                var responseValue = response.getReturnValue();
                
                responseValue.forEach(function(record){
                    record.accountSTName__c = record.accountSTName__c; 
                    
                    record.link  ='https://hp--gsdr22sp22.lightning.force.com/lightning/r/Sales_Territory__c/'+record.sfdcId__c+'/view';
                    
                });
               
                component.set("v.partnerList",responseValue);
                
                component.set("v.allData",responseValue);
                
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
        var defaultColumns=[ 
           {label: 'Product category',initialWidth:200, fieldName:'Product_Category__c',type:'text' , value:"1"},               
               {label: 'Serial Number',fieldName:'Serial_Number__c',initialWidth:200, type:'text' , value:"2"},
                 {label: 'Product Number',fieldName:'Product_Number__c',initialWidth:200, type:'text' , value:"3"}, 
                {label: 'Product Name',initialWidth:200, fieldName:'Product_Name__c',type:'text' , value:"4"},
                {label: 'Product Line',initialWidth:200, fieldName:'ProductLine__c',type:'text' , value:"5"},                     
                 {label: 'Product Age',initialWidth:200, fieldName: 'Product_Age__c',type:'text' , value:"6"},
                {label: 'End Customer',initialWidth:300, fieldName: 'End_Customer_Name__c',type:'text' , value:"7"}, 
             {label: 'Service Level',initialWidth:200, fieldName: 'serviceLevel__c',type:'text' , value:"8"},
           
             //{label: 'Account Name',initialWidth:200,type:'text', fieldName: 'Renew_Refresh__c' , value:"9"},
               {label: 'Final Ship Date',initialWidth:200, fieldName: 'finalShipDate__c',type:'text' , value:"9"},
              {label: 'Contract End Date',initialWidth:200, fieldName: 'contractEndDate__c',type:'text' , value:"10"},                         

              {label: 'Product End of Service Life Date',initialWidth:200, fieldName: 'eosl__c',type:'text' , value:"11"},
               {label: 'Lease Maturity Date',initialWidth:200, fieldName: 'leaseMaturityDate__c',type:'text' , value:"12"},
               {label: 'Customer ID',initialWidth:200, fieldName: 'customerId__c',type:'text' , value:"13"},
        		{label: 'Contract Number',initialWidth:200, fieldName: 'contractID__c',type:'text' , value:"14"},  
           
          {label: 'HIT Hardware Incumbent Seller ID',initialWidth:200, fieldName: 'dealResellerPartnerProfileId__c',type:'text' , value:"15"},
            {label: 'HIT Hardware Incumbent Seller',initialWidth:200, fieldName: 'dealResellerName__c',type:'text' , value:"16"},
            {label: 'Services Incumbent Seller',initialWidth:200, fieldName: 'soldToName__c',type:'text' , value:"17"},
             {label: 'Services Incumbent Reseller',initialWidth:200, fieldName: 'resellerName__c',type:'text' , value:"18"},
             {label: 'Lease Contract Number',initialWidth:200, fieldName: 'leaseContractId__c',type:'text' , value:"19"},
            {label: 'Lease Start Date',initialWidth:200, fieldName: 'leaseContractStartDate__c',value:"20"}
            
        ];
        
        var availableColumns = [];
        
        component.set("v.options", defaultColumns);
        component.set("v.values", availableColumns);
         component.set("v.requiredOptions", ["1", "2","3","4","5","6","7","8","9","10","11","12"]);
        
                 
    },
  
    updateselectedtext: function (cmp, event, helper) {
        if(!cmp.get("v.hasPageChanged") || cmp.get("v.initialLoad")){                                           
            cmp.set("v.initialLoad", false);         
            var selectedRows = event.getParam('selectedRows');
            var selectedRowsString = JSON.stringify(selectedRows);
            console.log("Selected Rows==="+JSON.stringify(selectedRows));
            var allSelectedRows = cmp.get("v.selection");
            console.log("ALL Selcted Rows="+allSelectedRows);
                           
                var currentPageRecs = cmp.get("v.data");
                var i=0;
                currentPageRecs.forEach(function(row){
                    i++;
                    console.log('ST ID :: ' + i + ' :: ' + row.ExternalId);
                   
                    
                    if(selectedRowsString.includes(row.ExternalId)){
                        console.log("Inside selectedrow if==");
                        if(!allSelectedRows.includes(row.ExternalId))  
                        {
                            allSelectedRows.push(row.ExternalId);
                            console.log("Inside allSelectedRows if==");
                        }
                    }else{
                        var allRows= allSelectedRows.indexOf(row.ExternalId);
                        if (allRows > -1) {
                            console.log("Inside allRows=="+allSelectedRows);
                            allSelectedRows.splice(allRows, 1);
                            cmp.set('v.selection',allSelectedRows);
                            console.log("Selection is=="+allSelectedRows);
                        }
                    }
                    
                });
             cmp.set("v.selection", allSelectedRows);
             console.log("All rows selected"+allSelectedRows);
             cmp.set('v.selectedRecord',allSelectedRows);    
             cmp.set('v.selectedRowsCount', allSelectedRows.length);
         } else{
             cmp.set("v.hasPageChanged", false);          
         }
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
    openPopUp : function(component, event, helper) {
        component.set('v.columnsorder', [
            
          {label: 'Product category',initialWidth:200, fieldName:'Product_Category__c',type:'text' , value:1},               
               {label: 'Serial Number',fieldName:'Serial_Number__c',initialWidth:200, type:'text' , value:2},
                 {label: 'Product Number',fieldName:'Product_Number__c',initialWidth:200, type:'text' , value:3}, 
                {label: 'Product Name',initialWidth:200, fieldName:'Product_Name__c',type:'text' , value:4},
                {label: 'Product Line',initialWidth:200, fieldName:'ProductLine__c',type:'text' , value:5},                     
                 {label: 'Product Age',initialWidth:200, fieldName: 'Product_Age__c',type:'text' , value:6},
                {label: 'End Customer',initialWidth:300, fieldName: 'End_Customer_Name__c',type:'text' , value:7}, 
             {label: 'Service Level',initialWidth:200, fieldName: 'serviceLevel__c',type:'text' , value:8},
           
             //{label: 'Account Name',initialWidth:200,type:'text', fieldName: 'Renew_Refresh__c' , value:9},
               {label: 'Final Ship Date',initialWidth:200, fieldName: 'finalShipDate__c',type:'text' , value:9},
               {label: 'Contract End Date',initialWidth:200, fieldName: 'contractEndDate__c',type:'text' , value:10},                         

             {label: 'Product End of Service Life Date',initialWidth:200, fieldName: 'eosl__c',type:'text' , value:11},
             
               {label: 'Lease Maturity Date',initialWidth:200, fieldName: 'leaseMaturityDate__c',type:'text' , value:12},
               {label: 'Customer ID',initialWidth:200, fieldName: 'customerId__c',type:'text' , value:13},
        		{label: 'Contract Number',initialWidth:200, fieldName: 'customerID__c',type:'text' , value:14},  
           
          {label: 'HIT Hardware Incumbent Seller ID',initialWidth:200, fieldName: 'dealResellerPartnerProfileId__c',type:'text' , value:15},
            {label: 'HIT Hardware Incumbent Seller',initialWidth:200, fieldName: 'dealResellerName__c',type:'text' , value:16},
            {label: 'Services Incumbent Seller',initialWidth:200, fieldName: 'soldToName__c',type:'text' , value:17},
             {label: 'Services Incumbent Reseller',initialWidth:200, fieldName: 'resellerName__c',type:'text' , value:18},
             {label: 'Lease Contract Number',initialWidth:200, fieldName: 'leaseContractId__c',type:'text' , value:19},
            {label: 'Lease Start Date',initialWidth:200, fieldName: 'leaseContractStartDate__c' , value:20}       
            
        ]);
        
        component.set("v.updateColumn", true);
        
    },
    closePopUp : function(component, event, helper) {
        component.set("v.updateColumn", false);
        
    },
    handleChange: function (cmp, event) {
        
        
        
        var selectedOptionValue = event.getParam("value");
        
       
        var string123 = selectedOptionValue.toString();
        
        
        var array123 = JSON.parse("[" + string123 + "]");
        
        var refreshvalues;
        
        cmp.set('v.globalvar',array123);
        
        
        
        
        
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
      applySelectedColumns: function(component, event, helper){
        
     
        
     
        var usethisvar= component.get('v.globalvar');
       
        
        var columnsvar=component.get('v.columnsorder');
        component.set("v.sortedBy", false);
            component.set("v.sortedDirection", false);
        
        var result=[];
        
        
        
        
        for( var i = 0; i < columnsvar.length; i++){ 
            if(columnsvar[i].value == 1 || columnsvar[i].value == 2 || columnsvar[i].value == 3 || columnsvar[i].value == 4 || columnsvar[i].value == 5 || columnsvar[i].value == 6 || columnsvar[i].value == 7 || columnsvar[i].value == 8 || columnsvar[i].value == 9 || columnsvar[i].value == 10 ||  columnsvar[i].value == 11 || columnsvar[i].value == 12 || columnsvar[i].value == 13 || columnsvar[i].value == 14 || columnsvar[i].value == 15 || columnsvar[i].value == 16 || columnsvar[i].value == 17 || columnsvar[i].value == 18 )
            {
                continue;
            }
            var c=0;
            
            for ( var j = 0; j < usethisvar.length; j++ ){
                
                if ( columnsvar[i].value === usethisvar[j]) { 
                    
                    break;
                    
                }
                else{
                    
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
                    
                    columnsvarsorted[j] = columnsvar[i];
                }
            }
        }
        
        
        
        component.set("v.columns",columnsvarsorted);
        
        
        
        
        
        component.set("v.updateColumn",false);
    },
    
  
    
})