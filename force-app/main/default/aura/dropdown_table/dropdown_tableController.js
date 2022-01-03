({
    doInit : function(component, event, helper) {
        var currentUser= $A.get( "$SObjectType.CurrentUser.Id" ); /* Updated */
     
        console.log("@@childComponent Method Called"+currentUser); /* Updated */
      
        var selectedRecord = component.get('v.selectedObject');/* Updated */

        var accStIdList = selectedRecord;/* Updated */
         
    
        var statusfilter = component.get('v.statusfilter');
        console.log('salesprogram status filter '+statusfilter);
        var SearchStr=component.get('v.searchedObject');
        console.log(SearchStr);
         var PrgmNameFilter=component.get('v.programSalesNamefilter');
        console.log("salesprgm name is "+PrgmNameFilter);
      
         console.log("@@childComponent Method Called List"+accStIdList);
        component.set('v.columns', [
            {label: 'Account ST ID',fieldName:'accountSTID__c',initialWidth : 120,sortable:'true', type: 'text'},
            {label: 'Program Governance',fieldName:'programGovernance__c',initialWidth : 150,sortable:'true', type: 'text'},
            {label: 'Sales Program Status',fieldName:'recommendation__c',initialWidth : 140,sortable:'true',  type: 'text'},  
            // {label: 'Program Name', fieldName:'link',typeAttributes: {label: { fieldName: 'ruleName__c'}},target:'_blank', initialWidth : 160,sortable:'true', type: 'url'},
           {label: 'Program Name',initialWidth:220,type:'button', class :'ProgramName',cellAttributes: { alignment: 'left' },typeAttributes:{label:{fieldName: 'ruleName__c'},name:{fieldName:'Name'},variant:'base'},sortable:'true'},
            //{label: 'Program Name',fieldName:'linkname',initialWidth : 150,sortable:'true', type:'url',typeAttributes: {label: { fieldName: 'ruleName__c'}, target:'_blank'}}, 
            {label: 'Program Description',fieldName:'ruleDescription__c',initialWidth : 200,sortable:'true', type: 'text'},
            {label:'Estimated Expected Value',initialWidth : 150,sortable:'true', fieldName: 'recommendationValue__c',type: 'number'},
            {label: 'Reason for Inclusion',initialWidth : 310,sortable:'true', fieldName: 'evaluationMessage__c', type: 'text'}

            
        ]);
         
        var action = component.get('c.salesProgramEligibility');
        action.setParams({
            'userId':currentUser,
            'AccSTIdList':accStIdList,
            'SearchStr':SearchStr,
            'PrgmNameFilter':PrgmNameFilter.toString(),
            'statusfilter':statusfilter.toString()
        }); /* Updated */
        action.setCallback(this, function(response){
            var state = response.getState();
          //  alert(state);
            if(state === 'SUCCESS' || state === 'DRAFT' ){
                var responseValue = response.getReturnValue();
               // var params = '';
                console.log('responseValue', responseValue);
                 responseValue.forEach(function(record){
                       record.ruleName__c = record.ruleName__c; //Here define your value which you want to display
                      // var rfi = encodeURI(record.evaluationMessage__c);
                       var rfi = record.evaluationMessage__c;
                      // var rfi = encodeURIComponent(record.evaluationMessage__c);
    					//record.link = 'ds_Sales_Program_Detail'+record.sfdcId__c+'/view' ;
                    var params = "accountSTId="+record.accountSTID__c+"&userId="+record.userId__c+"&ruleId="+record.ruleId__c+"&ruleName="+record.ruleName__c+"&recommendationFlag="+record.recommendationFlag__c+"&recommendation="+record.recommendation__c+"&evaluationMessage="+rfi+"&recommendationType="+record.ruleType__c+"&isLightning=yes";
                     //var params = "{{$Param.accountSTId}}="+record.accountSTID__c+"&{{$Param.userId}}="+currentUser+"&{{$Param.ruleId}}="+record.ruleId__c+"&{{$Param.ruleName}}="+record.ruleName__c+"&{{$Param.recommendationFlag}}="+record.recommendationFlag__c+"&{{$Param.recommendation}}="+record.recommendation__c+"&{{$Param.evaluationMessage}}="+rfi+"&{{$Param.recommendationId__c}}="+record.recommendation__c+"&{{$Param.recommendationType}}="+record.ruleType__c+"&isLightning=true";
                    // var params = "accountSTId='100063'&userId='0051V000004w18CQAQ'&ruleId='PR-KJJSIU951609838911'&ruleName='GreenLake New Logo'&recommendationFlag='Dark Green+'&recommendation='Tagged Opportunity exists&evaluationMessage="+rfi+"&recommendationId__c="+record.recommendation__c+"&recommendationType="+record.ruleType__c+"&isLightning=true";
                  //  var params ='accountSTId=291023&userId=60135492&ruleId=27PR-KJJSIU951609838911&ruleName=GreenLake New Logo&recommendationFlag=Dark Green&recommendation=Tagged Opportunity exists&evaluationMessage=You may be eligible for the GREENLAKE NEW CUSTOMER BONUS with this account which has not yet bought GreenLake but is highly likely to do so. This account shows investment signals in the following workload areas, ranked in order from highest to lowest: HPC (High), SAP (High), Data Protection (High), VDI (High), AI/ML Ops (High); consider leading with the relevant GreenLake workload sales play. If this account is eligible for an infrastructure sales programs, consider using as a compelling event and leading with the relevant GreenLake infrastructure sales play. This account has Datacenter Care and HPEFS; consider leveraging relationships for the sales approach. Click the sales briefcase link for resources to engage this customer on the GreenLake journey&recommendationType=expand&isLightning=true';   
                     console.log("my params ::"+params);
                     console.log("recordlink"+record.link);
                     record.link= encodeURI('https://hp--gsdr22sp22.lightning.force.com/apex/skuid__ui?page=ds_Sales_Program_Detail&'+params);
                     
                     // record.link= 'https://hp--gsdr22sp22.lightning.force.com/lightning/n/Sales_Program_Details/'+params;
                           console.log("recordlink ::"+record.link);
                     //record.link = 'https://hp--gsdr22sp22.lightning.force.com/apex/skuid__ui?page=ds_Account&account=0012700001odEW0AAM&fulfillmentRoute=direct';
                   }); 
               
               // responseValue.linkname = '/apex/skuid__ui?page=ds_PageForAccountRedirection&customURL='+Url+'/&stid='+responseValue.accountSTID__c+'&Ltng=L1table';
                component.set("v.salesprogramList",responseValue);
                if(responseValue != null && responseValue.length > 0){
                    component.set("v.totalPages", Math.ceil(response.getReturnValue().length/component.get("v.pageSize")));
                    component.set("v.currentPageNumber",1);
                    helper.buildData(component, helper);
                }
            }
        });
        $A.enqueueAction(action);
        
    },
    
    updateColumnSorting: function (cmp, event, helper) {
        cmp.set('v.isupdating', true);
        setTimeout($A.getCallback(function() {
            var fieldName = event.getParam('fieldName');
            var sortDirection = event.getParam('sortDirection');
            cmp.set("v.sortedBy", fieldName);
            cmp.set("v.sortedDirection", sortDirection);
            if ( fieldName === 'link'){
                fieldName = 'ruleName__c'; 
                helper.sortData(cmp, fieldName, sortDirection); 
            }else{
                     helper.sortData(cmp, fieldName, sortDirection);
                }
            cmp.set('v.isupdating', false);
        }), 0);
    },
    

    onNext : function(component, event, helper) {        
        var pageNumber = component.get("v.currentPageNumber");
        component.set("v.currentPageNumber", pageNumber+1);
        helper.buildData(component, helper);
    },
        /* closeModal:function(component,event,helper){    
        var cmpTarget = component.find('Modalbox');
        var cmpBack = component.find('Modalbackdrop');
        $A.util.removeClass(cmpBack,'slds-backdrop--open');
        $A.util.removeClass(cmpTarget, 'slds-fade-in-open'); 
    },
    openModal: function(component,event,helper) {
        var cmpTarget = component.find('Modalbox');
        var cmpBack = component.find('Modalbackdrop');
        $A.util.addClass(cmpTarget, 'slds-fade-in-open');
        $A.util.addClass(cmpBack, 'slds-backdrop--open'); 
    },*/
    
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
    
    
})