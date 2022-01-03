({
    //get Contact List from apex controller
    doInit : function(component, event, helper) {
        var action = component.get("c.getData");
         action.setCallback(this, function(response){
            var state = response.getState();
            alert(state);
            if(state === 'SUCCESS' || state === 'DRAFT' ){
                var responseValue = response.getReturnValue(); 
                component.set("v.filteredData",responseValue);
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
    },
      searchTable: function (cmp, event, helper) {
        var searchFilter = event.getSource().get("v.value");
       
        cmp.set("v.tableSearch",searchFilter);
        
    },
   handleChange: function (cmp, event) {
         
        var selectedOptionValue = event.getParam("value"); 
        var string123 = selectedOptionValue.toString();
        var array123 = JSON.parse("[" + string123 + "]");       
        var refreshvalues;        
        cmp.set('v.globalvar',array123);    
    },
    //Select all contacts
    handleSelectAllContact: function(component, event, helper) {
        var getID = component.get("v.contactList");
        var checkvalue = component.find("selectAll").get("v.value");        
        var checkContact = component.find("checkContact"); 
        if(checkvalue == true){
            for(var i=0; i<checkContact.length; i++){
                checkContact[i].set("v.value",true);
            }
        }
        else{ 
            for(var i=0; i<checkContact.length; i++){
                checkContact[i].set("v.value",false);
            }
        }
    },
     
    //Process the selected contacts
    handleSelectedContacts: function(component, event, helper) {
        var selectedContacts = [];
        var checkvalue = component.find("checkContact");
         
        if(!Array.isArray(checkvalue)){
            if (checkvalue.get("v.value") == true) {
                selectedContacts.push(checkvalue.get("v.text"));
            }
        }else{
            for (var i = 0; i < checkvalue.length; i++) {
                if (checkvalue[i].get("v.value") == true) {
                    selectedContacts.push(checkvalue[i].get("v.text"));
                }
            }
        }
        console.log('selectedContacts-' + selectedContacts);
    },
    handleRowAction: function (component, event, helper) {
        var selectedAction = event.detail.menuItem.get("v.value");
        var selectedAccountId = event.getSource().get("v.value");
        switch (selectedAction) {
            case 'edit':
                helper.editRecord(component, event, selectedAccountId);
                break;
            case 'view':
                helper.viewRecord(component, event, selectedAccountId);
                break;
        }
    },
     ModalOpen : function(component, event, helper) {
        component.set("v.iscustomizetableopen", true);
        
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
    handleSelected: function(component, event, helper){
         var apps = component.get("v.RTM"); 
        var tablesearch = component.get("v.tableSearch");
        console.log("tablesearch"+tablesearch);
        console.log("SearchString"+apps)
         
        var action = component.get("c.getData");
        
        action.setParams({
        "SearchStr":apps,
        "tablesearch":tablesearch   
        });
        action.setCallback(this, function(response){
           
            var state = response.getState();
             //alert(state);
            
            if(state === 'SUCCESS' || state === 'DRAFT' ){

                var responseValue = response.getReturnValue();
                
              
               
                component.set("v.filteredData",responseValue);
                
                //component.set("v.allData",responseValue);
                
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
      
                 
         
    
    },
    openpopup:function(component,event,helper){
        component.set("v.iscustomizetableopen",true);
         var cmpTarget = component.find('Modalbox');
        var cmpBack = component.find('Modalbackdrop');
        $A.util.addClass(cmpTarget, 'slds-fade-in-open');
        $A.util.addClass(cmpBack, 'slds-backdrop--open'); 
    },
    closepopup:function(component,event,helper){
    component.set("v.iscustomizetableopen",false);
          var cmpTarget = component.find('Modalbox');
        var cmpBack = component.find('Modalbackdrop');
        $A.util.removeClass(cmpTarget, 'slds-fade-in-open');
        $A.util.removeClass(cmpBack, 'slds-backdrop--open'); 
        
},
     modalpopup:function(component,event,helper){
        component.set("v.modalpopup",true);
         var cmpTarget = component.find('Modalbox1');
        var cmpBack = component.find('Modalbackdrop');
        $A.util.addClass(cmpTarget, 'slds-fade-in-open');
        $A.util.addClass(cmpBack, 'slds-backdrop--open'); 
    },
    closemodalpopup:function(component,event,helper){
    component.set("v.modalpopup",false);
          var cmpTarget = component.find('Modalbox1');
        var cmpBack = component.find('Modalbackdrop1');
        $A.util.removeClass(cmpTarget, 'slds-fade-in-open');
        $A.util.removeClass(cmpBack, 'slds-backdrop--open'); 
        
},
    editTalent : function( component, event, helper ) {
       // alert("edit");
       // component.set("v.EditMode",true);
        var index = event.target.dataset.index;
        console.log(index);
        var thisObjId = event.target.dataset.sfid;
        console.log(thisObjId);
         var thisId = event.target.id;
        console.log(thisId);
        var wrapListItems = component.get( "v.contactList" );  
        console.log(JSON.stringify(wrapListItems));
        component.set('v.recSelectId',thisId);
        for ( var i = 0; i < wrapListItems.length; i++ ) {
            if(wrapListItems[i].EditMode == true){
                var eventToast = $A.get("e.force:showToast");
                eventToast.setParams({
                    "title":'Error',
                    "type":'error',
                    "message":'You can edit only one record at a time.'
                });
                eventToast.fire();
                return false;
            }
            wrapListItems[i].EditMode = false;
        }
        wrapListItems[index].EditMode = true;
        component.set( "v.contactList", wrapListItems );        
    },
     cancelEdit : function(component, event, helper) {        
        var index = event.target.dataset.index;
        var wrapListItems = component.get( "v.contactList" );
        wrapListItems[index].EditMode = false;
        component.set( "v.contactList", wrapListItems );         
         helper.refreshView(component);
    },
    
    saveEditedTalent:function(component, event, helper){
        
          var action = component.get("c.saveEdited");
        var active = component.find('active').get('v.name');
        console.log(active);
      
        var IBAS = component.find('IBAS').get('v.name');
        console.log(IBAS);
        var smartib = component.find('smartib').get('v.name');
        console.log(smartib);
        var DSA = component.find('DSA').get('v.name');
        console.log(DSA);
         var HIT = component.find('HIT').get('v.name');
        console.log(HIT);
        var FLM = component.find('FLM').get('v.name');
        console.log(FLM);
         var bussines  = component.find('bussines').get('v.name');
        console.log(bussines);
         var programmanagementgeo = component.find('programmanagementgeo').get('v.name');
        console.log(programmanagementgeo);
         var Program = component.find('Program').get('v.name');
        console.log(Program);
         var feedbackvalidation = component.find('feedbackvalidation').get('v.name');
        console.log(feedbackvalidation);
         var sales = component.find('sales').get('v.name');
        console.log(sales);
 
        var recIdName = component.get('v.Id');        
        action.setParams({"active":active, "smartib":smartib, "DSA":DSA, "HIT":HIT});
        action.setCallback(this, function(response){
            var state = response.getState();
            
            if(state == "SUCCESS"){
                var result = response.getReturnValue();
                var index = event.target.dataset.index;
                 helper.refreshView(component);
                component.set('v.recSelectId',null);
                var eventToast = $A.get("e.force:showToast");
                eventToast.setParams({
                    "title":'Success',
                    "type":'success',
                    "message":'Record updated successfully.'
                   });
                 eventToast.fire();                 
            }
        });
        $A.enqueueAction(action);
      
    },
    
    deleteRowId:function(component,event,helper){
        alert("delete");
        var sfid = event.target.dataset.sfid;        
        var action =component.get('c.delectRecId');       
        action.setParams({'delRecId':sfid});
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state == 'SUCCESS'){
                var result = response.getReturnValue();                
                var wrapListItems = component.get( "v.wrapListItems" );
                component.set( "v.contactList", wrapListItems );
                helper.refreshView(component);
                //alert('record deleted successfully');                
                var eventToast = $A.get("e.force:showToast");
                eventToast.setParams({
                    "title":'Success',
                    "type":'success',
                    "message":'Record deleted successfully.'
                   });
                 eventToast.fire();
            }
        });
        $A.enqueueAction(action);
    }, 
    cancel:function(component,event,helper){
         helper.refreshView(component);
    }
    
    
})