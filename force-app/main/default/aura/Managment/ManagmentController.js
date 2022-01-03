({
	init : function(component, event, helper) {
        
          var statusLst=[  {label:'All', value: "all", selected: false },
                           { label:'Active',value: "Active", selected: false },
                           { label:"Draft",value: "Draft", selected: false },
                           { label:"Expired",value: "Expired", selected: false },
                           { label:"Inactive",value: "Inactive", selected: false }
                          
                           ];
        component.set("v.StatusPickList", statusLst);
//        component.set('v.TotalCount',[{fieldName:'totalRecords__c',type: 'number'}]);
		 component.set('v.columns', [
             {label: 'Program Name',fieldName:'ruleName__c',sortable:'true', type: 'text',value:1}, 
             {label: 'Program Id',fieldName:'link',sortable:'true', type: 'url',typeAttributes: {label: { fieldName: 'ruleId__c'}},value:2},  
            {label: 'Description',fieldName:'description__c', sortable:'true',type: 'text',value:3},
            {label: 'GEO',fieldName:'region__c',sortable:'true',type: 'text',value:4},
            {label: 'Type',fieldName:'programType__c',sortable:'true', type: 'text',value:5},
            {label: 'Offering',fieldName:'offerings__c',sortable:'true',type: 'String',value:6},
            {label: 'Status',fieldName:'status__c',sortable:'true',type: 'text',value:7},
            {label: 'Effective Start Date',fieldName:'effectiveStartDate__c',sortable:'true',type: 'date',value:8},
            {label: 'Effective End Date',fieldName:'effectiveEndDate__c',sortable:'true',type: 'date',value:9},
            {label: 'Estimated Program Value',fieldName:'recommendationValue__c', sortable:'true',type: 'number',value:10},
            {label: 'Date Created',fieldName:'createdDate__c',sortable:'true',type: 'date',value:11}
        ]);	
         var count=[];
           var action = component.get('c.ProgramTableDemo'); 
        action.setCallback(this, function(response){
            var state = response.getState();
            console.log('state'+state);
            if(state === 'SUCCESS' || state === 'DRAFT' ){
                var responseValue = response.getReturnValue();
                
         
                
                   responseValue.forEach(function(record){
                    record.ruleId__c = record.ruleId__c;    
                    record.link  ='https://hp--gsdr22sp22.lightning.force.com/lightning/r/'+record.ruleId__c+'/view';
                     
                });
                responseValue.forEach(function(record){
                     
                      count=record.totalRecords__c; 
                     console.log("count is"+count);
                    
                });
                 // component.set('v.TotalCount',count);
                
                
               console.log('responseValue'+JSON.stringify(responseValue));
               component.set("v.programList", responseValue);
                console.log("ProgramList"+responseValue);
                //component.set("v.allData",responseValue);
          
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
            
           {label: 'Program Name',fieldName:'ruleName__c',sortable:'true', type: 'text',value:"1"}, 
            {label: 'Program Id',fieldName:'ruleId__c',sortable:'true', type: 'text',value:"2"},  
            {label: 'Description',fieldName:'description__c', sortable:'true',type: 'text',value:"3"},
            {label: 'GEO',fieldName:'region__c',sortable:'true',type: 'text',value:"4"},
            {label: 'Type',fieldName:'programType__c',sortable:'true', type: 'text',value:"5"},
            {label: 'Offering',fieldName:'offerings__c',sortable:'true',type: 'String',value:"6"},
            {label: 'Status',fieldName:'status__c',sortable:'true',type: 'text',value:"7"},
            {label: 'Effective Start Date',fieldName:'effectiveStartDate__c',sortable:'true',type: 'date',value:"8"},
            {label: 'Effective End Date',fieldName:'effectiveEndDate__c',sortable:'true',type: 'date',value:"9"},
            {label: 'Estimated Program Value',fieldName:'recommendationValue__c', sortable:'true',type: 'number',value:"10"},
            {label: 'Date Created',fieldName:'createdDate__c',sortable:'true',type: 'date',value:"11"}
            
        ];
        
        var availableColumns = ["1", "2","3","4","5","6","7","8","9","10","11"];
        
        component.set("v.options", defaultColumns);
        component.set("v.values", availableColumns);
	},
    
    program:function(component, event, helper) {
        console.log("Event fired");
          var evt = $A.get("e.force:navigateToComponent");
    evt.setParams({
        componentDef : "c:ProgramFlow", 
       
        componentAttributes: {
            
        }
    });
        evt.fire();
        
    },
     opencustomizetable : function(component, event, helper) {
        component.set('v.columnsorder', [
            
           {label: 'Program Name',fieldName:'ruleName__c',sortable:'true', type: 'text',value:1}, 
            {label: 'Program Id',fieldName:'ruleId__c',sortable:'true', type: 'text',value:2},  
            {label: 'Description',fieldName:'description__c', sortable:'true',type: 'text',value:3},
            {label: 'GEO',fieldName:'region__c',sortable:'true',type: 'text',value:4},
            {label: 'Type',fieldName:'programType__c',sortable:'true', type: 'text',value:5},
            {label: 'Offering',fieldName:'offerings__c',sortable:'true',type: 'String',value:6},
            {label: 'Status',fieldName:'status__c',sortable:'true',type: 'text',value:7},
            {label: 'Effective Start Date',fieldName:'effectiveStartDate__c',sortable:'true',type: 'date',value:8},
            {label: 'Effective End Date',fieldName:'effectiveEndDate__c',sortable:'true',type: 'date',value:9},
            {label: 'Estimated Program Value',fieldName:'recommendationValue__c', sortable:'true',type: 'number',value:10},
            {label: 'Date Created',fieldName:'createdDate__c',sortable:'true',type: 'date',value:11}
                     
        ]);
        
        component.set("v.iscustomizetableopen", true);
        
    },
    closecustomizetable : function(component, event, helper) {
        component.set("v.iscustomizetableopen", false);
        
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
        component.set("v.iscustomizetableopen",false); 
     },
     handleChange: function (cmp, event) {
         
        var selectedOptionValue = event.getParam("value"); 
        var string123 = selectedOptionValue.toString();
        var array123 = JSON.parse("[" + string123 + "]");       
        var refreshvalues;        
        cmp.set('v.globalvar',array123);    
    },
    
      updateselectedtext: function (cmp, event, helper) {
        if(!cmp.get("v.hasPageChanged") || cmp.get("v.initialLoad")){                                           
            cmp.set("v.initialLoad", false);         
            var selectedRows = event.getParam('selectedRows');
            console.log("Current Selected rows=="+selectedRows);
            var selectedRowsString = JSON.stringify(selectedRows);
            console.log("Selected Rows==="+JSON.stringify(selectedRows));
            var allSelectedRows = cmp.get("v.selection");
            console.log("ALL Selcted Rows="+allSelectedRows);
                           
                var currentPageRecs = cmp.get("v.data");
            console.log("page rec"+currentPageRecs);
                var i=0;
               currentPageRecs.forEach(function(row){
                    i++;
                    console.log('Rule_ID :: ' + i + ' :: ' + row.ruleId__c);
                   
                    
                    if(selectedRowsString.includes(row.ruleId__c)){
                        console.log("Inside selectedrow if==");
                        if(!allSelectedRows.includes(row.ruleId__c))  
                        {
                            allSelectedRows.push(row.ruleId__c);
                            console.log("Inside allSelectedRows if==");
                        }
                    } else{
                        var allRows= allSelectedRows.indexOf(row.ruleId__c);
                        console.log(allRows);
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
    handleSelected: function (component, event, helper) {
          var statusLst=  component.find("StatusPickList").get("v.selectedItems");
         console.log("statuspickLst for multi select sales program status:::"+statusLst);
         var SearchStr=component.get('v.tableSearch');
        
         var programFilter=component.get("c.ProgramTableDemo");

        programFilter.setParams({
            'statusFilters':statusLst.toString(),
            'SearchStr':SearchStr
        });
        
        programFilter.setCallback(this, function(response) {
           
            var state = response.getState();
           console.log(state);
            if (component.isValid() && state === "SUCCESS"){
                var responseValue = response.getReturnValue();
               console.log('responsevalue of submit'+JSON.stringify(responseValue));
                component.set("v.programList",response.getReturnValue());   
                responseValue.forEach(function(record){
                    record.ruleId__c = record.ruleId__c;    
                    record.link  ='https://hp--gsdr22sp22.lightning.force.com/lightning/r/'+record.ruleId__c+'/view';
                     
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
         $A.enqueueAction(programFilter);
    },
    
        searchTable: function (cmp, event, helper) {
        var searchFilter = event.getSource().get("v.value");
            console.log('Searched String is:'+searchFilter);
        cmp.set("v.tableSearch",searchFilter);
        
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
    
    downloadFeedbck:function(component,event,helper){
        
            var ruleIds = component.get('v.allSelectedRows');
         console.log("List of RuleIds"+ruleIds);
        
                var action = component.get('c.downloadFeedback');
        action.setParams({
            'ruleIds':ruleIds,
        }); /* Updated */
        
        action.setCallback(this, function(response){
            var state = response.getState();
            console.log('state'+state);
            if(state === 'SUCCESS' || state === 'DRAFT' ){
                
                var responseValue = response.getReturnValue();
                console.log('responseValue', responseValue);
               component.set("v.programList", responseValue);
                console.log("ProgramList"+responseValue);
                component.set("v.allData",responseValue);
                
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
        },
    
        closeModal:function(component,event,helper){    
        var cmpTarget = component.find('Modalbox');
        var cmpBack = component.find('Modalbackdrop');
        $A.util.removeClass(cmpBack,'slds-backdrop--open');
        $A.util.removeClass(cmpTarget, 'slds-fade-in-open'); 
    },
    openmodal: function(component,event,helper) {
        var cmpTarget = component.find('Modalbox');
        var cmpBack = component.find('Modalbackdrop');
        $A.util.addClass(cmpTarget, 'slds-fade-in-open');
        $A.util.addClass(cmpBack, 'slds-backdrop--open'); 
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
        
        component.set("v.spinner", true); 
        console.log("i am spinner");
    },
    
     
    hideSpinner : function(component,event,helper){
           
        component.set("v.spinner", false);
    },
        Reset : function(component, event, helper) {
        component.find('SearchBox').set('v.value','');
        component.set('v.tableSearch',"");
     
        var childcomponent=component.find('StatusPickList');
            var options = childcomponent.get("v.options_");
            childcomponent.set("v.infoText", "None");
            options.forEach(function(element) {
                    element.selected = false;
            });
            childcomponent.set("v.options_",options);
        component.find('StatusPickList').set('v.selectedItems','');
            
              var column = component.get('c.init');
        $A.enqueueAction(column);
        }
})