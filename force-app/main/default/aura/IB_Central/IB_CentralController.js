({
    
    init : function(component, event, helper) {
    
	component.set('v.columns', [  
            {label: 'Total Programs', fieldName:'noOfProgram__c',initialWidth : 80, sortable:'true', type: 'number', value:1},
            {label: 'ST ID',fieldName:'accountSTID__c',initialWidth : 80,sortable:'true', type: 'text',value:2},
            {label: 'ST Short Name',fieldName:'link',initialWidth : 150, type:'url',sortable:'true',typeAttributes: {label: { fieldName: 'accountSTName__c'}, target:'_blank'},value:3},   
            {label: 'Country',fieldName:'accountSTCountry__c',initialWidth : 100, type: 'text',value:4,sortable:'true'},
            {label: '% Total Programs Covered',fieldName:'totalProgramsCoveredPercent__c',sortable:'true', typeAttributes:{maximumFractionDigits :'0'},initialWidth : 165,wrapText:'true',type: 'number',value:5},
            {label:'Account PTB',fieldName:'overallAccountPriority__c',sortable:'true',initialWidth : 130, type: 'text',value:6},
            {label: 'GL Recommendation',fieldName:'greenlakeoverallPropensity__c',sortable:'true',initialWidth : 140,  type: 'text',value:7},
            //{label: 'Compute IB Footprint ',initialWidth : 180,  type: 'number'},
            // {label: 'Storage IB FootPrint',initialWidth : 180,  type: 'text'},
            {label: 'Compute Size',fieldName:'accountSizeCompute__c',sortable:'true', typeAttributes:{maximumFractionDigits :'0'}, initialWidth : 120, type: 'number',value:8},
            {label: 'Storage Size',fieldName:'accountSizeStorage__c',sortable:'true', typeAttributes:{maximumFractionDigits :'0'},initialWidth : 130, type: 'number',value:9}, 
            {label: 'PN EANV',fieldName:'accountSizePointnext__c',sortable:'true',typeAttributes:{ maximumFractionDigits :'0'}, initialWidth : 100, type: 'number',value:10}
            // {label: 'PN Win Back Potential',fieldName:'potentialWinBack__c',sortable:'true',initialWidth : 190,  type: 'text',value:11},
            //{label: 'Compute IB potential',initialWidth : 180, type: 'text'},
            //{label: 'Storag IB potential',initialWidth : 180, type: 'text'}      
        ]);	
       
         //component.set('v.spinner', true);
        var action = component.get("c.fetchAccountInfo");
        
        
        action.setCallback(this, function(response){
            //component.set('v.spinner', false);
            var state = response.getState();
            
            //console.log('state'+state);
            
            if(state === 'SUCCESS' || state === 'DRAFT' ){
                //    component.set("v.wrapperList",response.getReturnValue());
                var responseValue = response.getReturnValue();
                responseValue.forEach(function(record){
                    record.accountSTName__c = record.accountSTName__c; //Here define your value which you want to display
                    //record.link = 'https://hp--skuid.visualforce.com/apex/skuid__ui?page=ds_PageForAccountRedirection&accountid'+record.accountId__c+'/view' ;
                    //record.link = 'https://hp--gsdr22sp22.lightning.force.com/apex/skuid__ui?page=ds_Account&account=0012700001odEW0AAM&fulfillmentRoute=direct';
                    record.link  ='https://hp--gsdr22sp22.lightning.force.com/lightning/r/Sales_Territory__c/'+record.sfdcId__c+'/view';
                    //record.link  ='/r/Sales_Territory__c/'+record.sfdcId__c+'/view';
                });
                //console.log('responseValue', responseValue);
                component.set("v.partnerList",responseValue);
                
                component.set("v.allData",responseValue);
                
                if(responseValue != null && responseValue.length > 0){
                    component.set("v.totalPages", Math.ceil(response.getReturnValue().length/component.get("v.pageSize")));
                    component.set("v.currentPageNumber",1);
                    //component.set("v.totalRecord",response.getReturnValue().length);
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
            { value: "1", label: 'Total Programs', fieldName:'totalProgramsCount__c'},
            { value: "2", label: 'ST ID',fieldName:'accountSTID__c'},
            { value: "3", label: 'ST Short Name',fieldName:'accountSTName__c'},
            { value: "4", label: 'Country',fieldName:'accountSTCountry__c'},         
            { value: "5", label: '% Programs Covered (Total)',fieldName:'totalProgramsCoveredPercent__c'},
            { value: "6", label: 'Account PTB',fieldName:'overallAccountPriority__c'},
            { value: "7", label: 'GL Recommendation',fieldName:'greenlakeoverallPropensity__c' },
            { value: "8", label: 'Compute Size',fieldName:'accountSizeCompute__c'},
            { value: "9", label: 'Storage Size',fieldName:'accountSizeStorage__c'},
            { value: "10", label: 'PN EANV',fieldName:'accountSizePointnext__c'},
            { value: "11", label: 'PN Win Back Potential',fieldName:'potentialWinBack__c'}
            
        ];
        
        var availableColumns = ["1", "2","3","4","5","6","7","8","9","10"];
        
        component.set("v.options", defaultColumns);
        component.set("v.values", availableColumns);
        
    },
    doInit : function(component, event, helper) {  
        
        var action = component.get("c.fetchSalesMetrics");
        //component.set('v.spinner', true);
        
        
        
        action.setCallback(this, function(result){
           // component.set('v.spinner', false);
            var state = result.getState();
           // console.log("sales prog covered"+state);
            if (component.isValid() && state === "SUCCESS"){
               // console.log("programlist"+result.getReturnValue());
                var responseValue = result.getReturnValue();
               // console.log(responseValue);
                component.set("v.programList",result.getReturnValue());  
                var count = component.get("v.programList");
                //console.log(count.length);  
            }
            
        });
        
        $A.enqueueAction(action);
    },
    
    
    
    searchTable: function (cmp, event, helper) {
        var searchFilter = event.getSource().get("v.value");
        //console.log(searchFilter);
        cmp.set("v.tableSearch",searchFilter);
        //alert(searchFilter);
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
    
    
    handleSelected:function (component, event, helper) {
        component.set('v.isLoading', false);
        var selectedValues = component.get('v.selectedRowsCount');
        var searchfilter = component.get('v.search');
        //console.log(searchfilter);
        //  alert("first call :  "+selectedValues);
        // component.set("v.partnerList",'');
        
        
        
        var Accountnamefilter=component.get('v.Accountname');
        var selectedValues = component.get('v.selectedRowsCount');
        //alert(selectedValues);
        if(selectedValues>0){
            component.set('v.isLoading', true);
            
        }
        console.log(Accountnamefilter);
        // var SalesProgramNameFilter=component.get('v.SalesProgramName');
        //  console.log(SalesProgramNameFilter);
        var SalesProgramStatusFilter=component.get('v.SalesProgramStatus');
       // console.log(SalesProgramStatusFilter);
        var AccountInsightsFilter=component.get('v.AccountInsights');
       // console.log(AccountInsightsFilter);
        var SalesProgramNameFilter=component.get('v.ProgramName');
       // console.log(SalesProgramNameFilter);
        var SearchStr=component.get('v.tableSearch');
        
        //console.log(tablSearch);
        
        var IBCentralFilters=component.get("c.performSearchSOQL");
        
        
        IBCentralFilters.setParams({
            'Accountnamefilter':Accountnamefilter,
            'SalesProgramNameFilter':SalesProgramNameFilter,
            'SalesProgramStatusFilter':SalesProgramStatusFilter,
            'AccountInsightsFilter':AccountInsightsFilter,
            'SearchStr':SearchStr
        });
        IBCentralFilters.setCallback(this, function(response) {
            // component.set('v.searchspinner',false);
            var state = response.getState();
            //console.log("state==>"+state);
            if (component.isValid() && state === "SUCCESS"){
                var responseValue = response.getReturnValue();
               // console.log('responseValue', responseValue);
               // console.log("programlist"+response.getReturnValue());
                component.set("v.programList",response.getReturnValue());   
            }  
        });
        
        //filters applied for Accoutn table 
     //   if(Accountnamefilter==="all" && SalesProgramNameFilter==="" && SalesProgramStatusFilter==="" && AccountInsightsFilter==="" && SearchStr!='NULL'){
            
      //  }else{
            var accountFilter = component.get("c.fetchAccountInfo");      
            accountFilter.setParams({
                'Accountnamefilter':Accountnamefilter,
                'SalesProgramNameFilter':SalesProgramNameFilter,
                'SalesProgramStatusFilter':SalesProgramStatusFilter,
                'AccountInsightsFilter':AccountInsightsFilter,
                'SearchStr':SearchStr
            });
            accountFilter.setCallback(this, function(response) {
                // component.set('v.searchspinner',false);
                var state = response.getState();
               // console.log("state==fetch>"+state);
                
                var selectedrecords=[];
                if (component.isValid() && state === "SUCCESS"){
                    
                    var responseValue = response.getReturnValue();
                    var selectedRows = component.get('v.selection');
                    
                    responseValue.forEach(function(record){
                        //record.accountSTName__c = record.accountSTName__c; //Here define your value which you want to display
                        //record.link = 'https://hp--skuid.visualforce.com/apex/skuid__ui?page=ds_PageForAccountRedirection&accountid'+record.accountId__c+'/view' ;
                        //record.link = 'https://hp--gsdr22sp22.lightning.force.com/apex/skuid__ui?page=ds_Account&account=0012700001odEW0AAM&fulfillmentRoute=direct';
                        record.link  ='https://hp--test.lightning.force.com/lightning/r/Sales_Territory__c/'+record.sfdcId__c+'/view';
                        if(selectedRows.includes(record.ExternalId)){
                            selectedrecords.push(record);
                        }
                        //record.link  ='/r/Sales_Territory__c/'+record.sfdcId__c+'/view';
                    });
                    if(selectedRows.length>0){
                         component.set("v.partnerList",selectedrecords);
                        
                    }
                    /*     //link code :Sabiha
                responseValue.forEach(function(responseValue){
                    console.log("Account Name :"+ responseValue.accountSTName__c);
                    responseValue.linkname = '/apex/skuid__ui?page=ds_PageForAccountRedirection&customURL='+Url+'/&stid='+responseValue.accountSTID__c+'&Ltng=L1table';
                })
                //link code ends here */
               // console.log('responseValue', responseValue);
                console.log("partnerList"+response.getReturnValue());
                // component.set("v.programList",response.getReturnValue());  
              var checkboxrows=component.get("v.selectedRowsCount");
                    
               console.log("checkbox selected"+checkboxrows);
                
                    if(checkboxrows>0){
                        console.log("I am if");
                       
                        
                        var responseValues = component.get('v.partnerList');
                        console.log("checkbox columns"+responseValues);
                       
                     if(responseValues != null && responseValues.length > 0){
                    component.set("v.totalPages", Math.ceil(checkboxrows/component.get("v.pageSize")));
                    component.set("v.currentPageNumber",1);
                    
                    helper.buildData(component,helper);
                }else{
                    component.set("v.totalPages", Math.ceil(checkboxrows/component.get("v.pageSize")));
                    component.set("v.currentPageNumber",0);
                    helper.buildData(component, helper);
                }
                    }else{
                        console.log("I am else");
                         component.set("v.partnerList",responseValue);
                         if(responseValue != null && responseValue.length > 0){
                    component.set("v.totalPages", Math.ceil(response.getReturnValue().length/component.get("v.pageSize")));
                    component.set("v.currentPageNumber",1);
                    
                    helper.buildData(component,helper);
                }else{
                    component.set("v.totalPages", Math.ceil(response.getReturnValue().length/component.get("v.pageSize")));
                    component.set("v.currentPageNumber",0);
                    helper.buildData(component, helper);
                }
                    }
                
               
                
              
                
            }  
        });
            
            
            //   alert(SearchStr);
            
            $A.enqueueAction(accountFilter);
       // }
        $A.enqueueAction(IBCentralFilters);
        //  $A.enqueueAction(programFilter);
        
        //alert("My selected rows :  "+selectedValues);
        if(selectedValues>0){
            component.set('v.isLoading', true);
            
        }            
        
        
    },
    salesnamelist : function(component, event, helper) {  
        
        var action = component.get("c.programNameFilter");
        
        
        action.setCallback(this, function(result){
            var state = result.getState();
            // alert(state);
            if (component.isValid() && state === "SUCCESS"){
                var responseValue = result.getReturnValue();
                
                console.log("options"+responseValue);
                component.set("v.optional",responseValue);   
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
                fieldName = 'accountSTName__c'; 
                helper.sortData(cmp, fieldName, sortDirection); 
            }else{
                helper.sortData(cmp, fieldName, sortDirection);
            }
            cmp.set('v.isupdating', false);
        }), 0);
    },
    opencustomizetable : function(component, event, helper) {
        component.set('v.columnsorder', [
            
           {label: 'Total Programs', fieldName:'noOfProgram__c',initialWidth : 150, sortable:'true', type: 'text', value:1},
            {label: 'ST ID',fieldName:'accountSTID__c',initialWidth : 100,sortable:'true', type: 'text',value:2},
            {label: 'ST Short Name',fieldName:'link',initialWidth : 150,sortable:'true', type:'url',typeAttributes: {label: { fieldName: 'accountSTName__c'}, target:'_blank'},value:3},   
            {label: 'Country',fieldName:'accountSTCountry__c',initialWidth : 120, type: 'text',sortable:'true',value:4},
            {label: '% Programs Covered (Total)',fieldName:'totalProgramsCoveredPercent__c',sortable:'true', typeAttributes:{maximumFractionDigits :'0'},initialWidth : 195,wrapText:'true',type: 'number',value:5},
            {label:'Account PTB',fieldName:'overallAccountPriority__c',sortable:'true',initialWidth : 153, type: 'text',value:6},
            {label: 'GL Recommendation',fieldName:'greenlakeoverallPropensity__c',sortable:'true',initialWidth : 170,  type: 'text',value:7},
            //{label: 'Compute IB Footprint ',initialWidth : 180,  type: 'number'},
            // {label: 'Storage IB FootPrint',initialWidth : 180,  type: 'text'},

            {label: 'Compute Size',fieldName:'accountSizeCompute__c',sortable:'true', typeAttributes:{maximumFractionDigits :'0'}, initialWidth : 150, type: 'number',value:8},
            {label: 'Storage Size',fieldName:'accountSizeStorage__c',sortable:'true', typeAttributes:{maximumFractionDigits :'0'},initialWidth : 150, type: 'number',value:9}, 
            {label: 'PN EANV',fieldName:'accountSizePointnext__c',sortable:'true',typeAttributes:{ maximumFractionDigits :'0'}, initialWidth : 120, type: 'number',value:10},
            {label: 'PN Win Back Potential',fieldName:'potentialWinBack__c',sortable:'true',initialWidth : 190,  type: 'text',value:11}
  
            
            
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
        
        //var columnsa = component.get('v.columns');
        //component.set('v.columns', columnsa);
        
        
        
        var action = component.get('c.fetchAccountInfo');
        action.setCallback(this, function(response){
            var state = response.getState();
            
            if(state === 'SUCCESS' || state === 'DRAFT' ){
                var responseValue = response.getReturnValue();
                responseValue.forEach(function(record){
                    record.accountSTName__c = record.accountSTName__c; //Here define your value which you want to display
                    //record.link = 'https://hp--skuid.visualforce.com/apex/skuid__ui?page=ds_PageForAccountRedirection&accountid'+record.accountId__c+'/view' ;
                    //record.link = 'https://hp--gsdr22sp22.lightning.force.com/apex/skuid__ui?page=ds_Account&account=0012700001odEW0AAM&fulfillmentRoute=direct';
                    record.link  ='https://hp--gsdr22sp22.lightning.force.com/lightning/r/Sales_Territory__c/'+record.sfdcId__c+'/view';
                    //record.link  ='/r/Sales_Territory__c/'+record.sfdcId__c+'/view';
                });
                /*  responseValue.forEach(function(responseValue){
                    console.log("Account Name :"+ responseValue.accountSTName__c);
                    responseValue.linkname = '/apex/skuid__ui?page=ds_PageForAccountRedirection&customURL='+Url+'/&stid='+responseValue.accountSTID__c+'&Ltng=L1table';
                }) */
                console.log('responseValue', responseValue);
                component.set("v.partnerList",responseValue); 
                console.log("in apply selected method"); 
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
        //console.log(typeof(usethisvar))
        //console.log(usethisvar)
        //console.log("9310");
        
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
                    //      console.log("in if")
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
        
        
        //console.log(columnsvar);
        //console.log(columnsvarsorted)
        //console.log("checkcolumnsvarsoretedarray")
        component.set("v.columns",columnsvarsorted);
        
        
        
        
        //console.log(usethisvar);
        component.set("v.iscustomizetableopen",false);
    },
    handleClick: function(component,event,helper){
        /*cmp.set('v.isLoading', false);
        var selectedRowsCount = component.get("v.selectedRowsCount")
        if(selectedRowsCount>0){
            cmp.set('v.isLoading', true);
            
        }else{
            cmp.set('v.isLoading', false);
        }*/
    },
    
    downloadAll : function(component, event, helper){
        var action = component.get('c.download');
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
                    "title": 'success',
                    "type": 'success',
                    "message": 'Download request has been submitted successfully',
                    "messageTemplate": '{0} {1}',
                    "messageTemplateData": ['Download request has been submitted successfully.', {
                        url: baseurl,
                        label: 'Click here to view Download Tracker',
                        target:'_Parent'
                    }]
                });
                toastEvent.fire();  
                /*   var toastEvent = $A.get("e.force:showToast");
			toastEvent.setParams({
				title : 'Success Message',
				message: 'Download request has been submitted successfully',
				messageTemplate: 'Record {0} created! See it {1}!',
				duration:'5000',
				key: 'info_alt',
				type: 'success',
				mode: 'pester'
			});
			toastEvent.fire();*/
                
                /* if(responseValue != null && responseValue.length > 0){
                      component.set("v.totalPages", Math.ceil(response.getReturnValue().length/component.get("v.pageSize")));
                      component.set("v.currentPageNumber",1);
                      
                      helper.buildData(component, helper);
                  }*/
            }
            
        });
        $A.enqueueAction(action);
        
    },
    handlestatus:function(cmp,event,helper){
        var element = event.getSource().get("v.name") ;
        console.log(element);
        
        var selectedValue=  cmp.find(element).get("v.value");
        console.log(selectedValue);
        cmp.set("v.searchStatus",selectedValue);
        /*var action; 
        if(selectedValue == ""){
            action = cmp.get("c.fetchSalesProgram");
            
        }else {
            action = cmp.get("c.fetchSalesProgramfilter");
            action.setParams({filter:selectedValue
                             });
        }
        action.setCallback(this, function(result){
            var state = result.getState();
            alert(state);
            if (cmp.isValid() && state === "SUCCESS"){
                console.log("programlist"+result.getReturnValue());
                cmp.set("v.programList",result.getReturnValue());   
            }
            
        });
        
        $A.enqueueAction(action);*/
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
        $A.get('e.force:refreshView').fire();
        
       // var column = component.get('c.applySelectedColumns');
        //console.log("availablecolumns"+column);
       // $A.enqueueAction(column);
        
    }
    
})