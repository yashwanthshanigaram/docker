({
    doInit : function(component, event, helper) {
        //var actions = helper.getRowActions.bind(this, component);
        
           
          component.set('v.columns', [
         
              {label: 'Program Name',initialWidth:220,type:'button', class :'ProgramName',cellAttributes: { alignment: 'left' },typeAttributes:{label:{fieldName: 'ruleName__c'},name:{fieldName:'Name'},variant:'base'},sortable:'true'},
              
               {label: 'Program Description', fieldName: 'ruleDescription__c',sortable:'true'},

              {label: 'Sales Program Status', fieldName: 'recommendation__c',sortable:'true'},
              {label: 'Program Type', fieldName: 'ruleType__c',value:3,sortable:'true'},
              {label: 'Estimated Value', fieldName: 'recommendationValue__c',type:'currency', currencyCode: 'USD',cellAttributes: { alignment: 'right' },typeAttributes: { minimumFractionDigits: '0',currencyCode: 'USD'},sortable:'true'},
              {label: 'Reason for Inclusion',fieldName: 'recommendationKey__c',type:'text',cellAttributes: { alignment: 'left' },sortable:'true'}         
        ]);	
        
        var sfdcId_ST = component.get('v.recordId');
         console.log("sfdcId"+sfdcId_ST);
         var action = component.get('c.fetchSalesPrograms');
         action.setParams({
            'sfdcId_ST':sfdcId_ST,
        });
           action.setCallback(this, function(response){
               
              var state = response.getState();
              
             // alert(state);
             
              if(state === 'SUCCESS' || state === 'DRAFT' ){
              var responseValue = response.getReturnValue();
              console.log('responseValue', responseValue);
              component.set("v.ProgramList",responseValue); 
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
              
              var availableColumns = [ {label: 'Program Governance',value:1},
              {label: 'Sales Program Status',value:2},
              {label: 'Program Type',value:3},
              {label: 'Program Name',value:4},
              {label: 'Program Description',value:5},
              {label: 'Estimated Value',type:'currency',cellAttributes: { alignment: 'left' },value:6},
              {label: 'Reason for Inclusion',value:7}];              

        component.set("v.options", availableColumns);
       
        var abc= "v.columns";
       console.log(abc);
       var valuearray=[];
       var item;
        availableColumns.forEach(function (item) {
           valuearray.push(item.value); 
        });
       //console.log(valuearray);
        component.set("v.values", valuearray);
              
	},
     close: function(component, event, helper) {
      // Set isModalOpen attribute to false  
      component.set("v.isLoading", false);
   },
              
   
  
   closeModel: function(component, event, helper) {
      // Set isModalOpen attribute to false  
      component.set("v.isModalOpen", false);
   },
              
        handleRowAction :function(cmp,event,helper){
        cmp.set("v.isLoading", false);

        var action = event.getParam('action');
        var row = event.getParam('row');
        //console.log('*****row:'+JSON.stringify(row));
        //console.log(JSON.stringify(action));
       
            console.log("button"+row.ruleName__c);
            var ruleName = row.ruleName__c;
            console.log(ruleName);
            cmp.set("v.ruleName",ruleName);
             cmp.set("v.isLoading", true);
            
        
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
    opencustomize: function(component, event, helper) {
        
       	component.set("v.iscustomizeColumn",true) ;
    },
     handleChange: function (cmp, event) {
         
         
        // This will contain an array of the "value" attribute of the selected options
        var selectedOptionValue = event.getParam("value");
         
         //console.log(typeof(selectedOptionValue));
         var string123 = selectedOptionValue.toString();
         alert("Option selected with value: '" + selectedOptionValue.toString() + "'");
         
         var array123 = JSON.parse("[" + string123 + "]");
         
         var refreshvalues;
         
             cmp.set('v.globalvar',array123);
             
         
         

         //cmp.set('v.globalvar',array123);
         
        
    },
    
    closecustomize : function(component, event, helper) {
        component.set("v.iscustomizeColumn",false);
        
    },
    
    applySelectedColumns: function(component, event, helper){
        
          //var columnsa = component.get('v.columns');
          //component.set('v.columns', columnsa);
        
          
                        
         var action = component.get("c.fetchSalesPrograms");
           action.setCallback(this, function(response){
              var state = response.getState();
              
              if(state === 'SUCCESS' || state === 'DRAFT' ){
              var responseValue = response.getReturnValue();
                  
              console.log(responseValue);
                  component.set("v.ProgramList",responseValue);
                 if(responseValue != null && responseValue.length > 0){
                      component.set("v.totalPages", Math.ceil(response.getReturnValue().length/component.get("v.pageSize")));
                      component.set("v.currentPageNumber",1);
                      helper.setPageDataAsPerPagination(component, helper);
                  }
              }
    });
              $A.enqueueAction(action);
        
        var usethisvar= component.get('v.globalvar');
        //console.log(typeof(usethisvar))
        //console.log(usethisvar)
        //console.log("9310");
        
        var columnsvar=component.get('v.columns');
        //var columnsvalues=[];
        var result=[];
       
        
        
        //console.log(columnsvar.length);
        for( var i = 0; i < columnsvar.length; i++){ 
            if(columnsvar[i].value == 1 || columnsvar[i].value == 2 || columnsvar[i].value == 3 || columnsvar[i].value == 4 || columnsvar[i].value == 5 || columnsvar[i].value == 6 || columnsvar[i].value == 7 || columnsvar[i].value == 8 || columnsvar[i].value == 9 || columnsvar[i].value == 10 || columnsvar[i].value == 1 || columnsvar[i].value == 11 || columnsvar[i].value == 12 || columnsvar[i].value == 13 || columnsvar[i].value == 14 || columnsvar[i].value == 15 || columnsvar[i].value == 16 || columnsvar[i].value == 17 || columnsvar[i].value == 18 )
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
        component.set("v.iscustomizeColumn",false);
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
  
})