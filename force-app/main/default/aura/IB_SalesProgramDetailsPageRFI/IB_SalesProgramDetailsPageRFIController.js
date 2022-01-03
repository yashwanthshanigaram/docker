({
	doInit : function(component, event, helper) {
         var rule = component.get("v.search");
        console.log("ruleName" + rule);
        var sfdcId_ST = component.get('v.recordId');
         console.log("sfdcId"+sfdcId_ST);
         var action = component.get('c.fetchSalesPrograms');
        
         action.setParams({
            'rule':rule,'sfdcId_ST':sfdcId_ST,
        });
           action.setCallback(this, function(response){
              var state = response.getState();
               //alert(state);
              if(state === 'SUCCESS' || state === 'DRAFT' ){
              var responseValue = response.getReturnValue();
              console.log('responseValue', responseValue);
              component.set("v.programList",responseValue); 
                  
              }
    });
              $A.enqueueAction(action);
		
	}
})