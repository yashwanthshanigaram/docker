({
    doInit : function(component, event, helper) { 
        var rule = component.get("v.search");
        console.log("ruleName" + rule);
         var sfdcId_ST = component.get('v.recordId');
         console.log("sfdcId"+sfdcId_ST);
        var stid = component.get("v.stid");
          var action1 = component.get("c.programdetails");
        action1.setParams({'rule':rule,'sfdcId':sfdcId_ST,"accountstid1":stid
        });
        
        action1.setCallback(this, function(result){
            var state = result.getState();
            console.log(state);
            
            if (component.isValid() && state === "SUCCESS"){
                var responseValue = result.getReturnValue();
                 responseValue.forEach(function(record){
                    record.productLine__c = record.productLine__c.replace(/[^,\w\s]/gi, ''); 

                
               });
                 console.log("salesprogramdetailstop "+responseValue);
                component.set("v.ProgramName",responseValue);
            }
            
        });
        var action = component.get("c.programstatus");
         action.setParams({'rule':rule,'sfdcId':sfdcId_ST,"accountstid1":stid
        });
          action.setCallback(this, function(result){
            var state = result.getState();
          console.log(state);
            
            if (component.isValid() && state === "SUCCESS"){
                var responseValue = result.getReturnValue();
                 console.log("salesprogramdetailstop "+responseValue);
                component.set("v.Programstatus",responseValue);
            }
            
        });
        
        $A.enqueueAction(action);
         $A.enqueueAction(action1);
        helper.loadDisposition(component,event,helper);
        helper.loadCategory(component,event,helper);
      
    },
    
    provideFeedback : function(component, event, helper) {
        component.set('v.providefeedback',true);
        
    },
    closePopup: function(component, event, helper) {
        component.set('v.providefeedback',false);
        
    },
    onSubmit: function(component, event, helper) {
          var rule = component.get("v.search");
        console.log("ruleName" + rule);
          var sfdcId_ST = component.get('v.recordId');
         console.log("sfdcId"+sfdcId_ST);
        var dispositionValue = component.get("v.dispositionValue");
        console.log(dispositionValue);
        var categoryValue = component.get("v.categoryValue");
        console.log(categoryValue);
        var comments = component.get("v.comments");
        console.log(comments);
        var stid = component.get("v.stid");
        if(dispositionValue!= 'Cancel Opt Out'){
        if(dispositionValue == "" || categoryValue == "" || comments == ""){
             /*var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
            "title": "Error!",
            "type":"error",
            "message": "All the  required fields must be completed",
            
        });
        toastEvent.fire();*/
            component.set('v.error',true);
            }
            
        else{
        var action = component.get("c.postfeedback");
        action.setParams({
            "dispositionValue":dispositionValue,
             "categoryValue":categoryValue,
             "comments":comments,
             "rule":rule,
            "sfdcId":sfdcId_ST,
            "accountstid1":stid
        });
            action.setCallback(this, function(result){
            var state = result.getState();
                console.log(state);
          if (component.isValid() && state === "SUCCESS"){
                var responseValue = result.getReturnValue();
               var toastEvent = $A.get("e.force:showToast");
        
        toastEvent.setParams({
            "title": "Success!",
            "type":"success",
            "message": "Your feedback has been submitted",
            
        });
        toastEvent.fire();
            }
        });
        
        $A.enqueueAction(action);
        component.set('v.dispositionValue','');
        component.set('v.categoryValue','');
        component.set('v.comments','');
      
        component.set('v.providefeedback',false);
             component.set('v.error',false);
        }}else{
            if(comments == null){
               component.set('v.error',true);
}
            else{
               var action = component.get("c.postfeedback");
        action.setParams({
            "dispositionValue":dispositionValue,
             "categoryValue":categoryValue,
             "comments":comments,
             "rule":rule,
            "sfdcId":sfdcId_ST,
            "accountstid1":stid
        });
            action.setCallback(this, function(result){
            var state = result.getState();
                console.log(state);
          if (component.isValid() && state === "SUCCESS"){
                var responseValue = result.getReturnValue();
               var toastEvent = $A.get("e.force:showToast");
        
        toastEvent.setParams({
            "title": "Success!",
            "type":"success",
            "message": "Your feedback has been submitted",
            
        });
        toastEvent.fire();
            }
        });
        
        $A.enqueueAction(action);
        component.set('v.dispositionValue','');
        component.set('v.categoryValue','');
        component.set('v.comments','');
      
        component.set('v.providefeedback',false);
        component.set('v.error',false);
        }}
                
            
        
       
    },  
    openFeedbackHistory: function(component, event, helper) {
      // Set isModalOpen attribute to true
      component.set("v.isopenFeedbackHistory", true);
   },
  
   closeFeedbackHistory: function(component, event, helper) {
      // Set isModalOpen attribute to false  
      component.set("v.isopenFeedbackHistory", false);
   },
    DownloadAll: function(component, event, helper){
         var rule = component.get("v.search");
        console.log("ruleName" + rule);
         var sfdcId_ST = component.get('v.recordId');
         console.log("sfdcId"+sfdcId_ST);
         var stid = component.get("v.stid");
        console.log("stid"+ stid);
       
        var action = component.get('c.download');
        action.setParams({'rule':rule,'sfdcId':sfdcId_ST,'accountstid1':stid
        });
        action.setCallback(this, function(response){
            var state = response.getState();            
            console.log('state'+state);
            if(state === 'SUCCESS' || state === 'DRAFT' ){
                var responseValue = response.getReturnValue();
                console.log('responseValue', responseValue);
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
                        target:'_Parent'
                    }]
                });
                toastEvent.fire();  
            }
            
        });
        $A.enqueueAction(action);
        
    },
     PickChange : function(component, event, helper) {
        var parentValue = component.find('disposition').get('v.value');
        
        if(parentValue != 'Cancel Opt out')
        component.set('v.disabledPick',false);
        else
        component.set('v.disabledPick',true);
       var dispositionValues = component.get('v.dispositionValue');
       console.log(dispositionValues);
                                
        if(dispositionValues=='Opt out already Covered'){
           var options =[{ value:"Frame Agreement",label:"Frame Agreement"},
                         { value:"Renewal",label:"Renewal"},
                         { value:"Alternative Technology Preferred",label:"Alternative Technology Preferred"},
                         { value:"Other",label:"Other"}];
                          component.set("v.categoryValue",'');
                          component.set("v.categories", options);
                          }else{
                               var options = [
           { value: "Lost to Competitor", label: "Lost to Competitor" },
           { value: "Lost to self Maintainance", label: "Lost to self Maintainance" },
		   { value: "Refresh/Renewal Deferred", label: "Refresh/Renewal Deferred" },
		   { value: "Decision Elsewhere", label: "Decision Elsewhere" },	
			{ value: "Not an End Customer ", label: "Not an End Customer " },	
			{ value: "IB data incorrect", label: "IB data incorrect" },	
			{ value: "Technology Consolidation", label: "Technology Consolidation" },	
			{ value: "Vendor  Consolidation", label: "Vendor  Consolidation" },
			{ value: "Move to Cloud", label: "Move to Cloud" },
            { value: "Merger/Acquisition/Bankruptcy", label: "Merger/Acquisition/Bankruptcy"},
            { value: "Remove All Sales Plays", label: "Remove All Sales Plays"},
			{ value: "Other", label: "Other" }
         ];
            component.set("v.categoryValue",'');
           component.set("v.categories", options);
                         var categoryValue = component.get('v.categoryValue');   
                              console.log(categoryValue);
                          }
    },
    comments: function (cmp, event, helper) {
        var searchFilter = cmp.find('comments').get("v.value");
        console.log(searchFilter); 
        cmp.set("v.comments",searchFilter);
       
        
    },
   
})