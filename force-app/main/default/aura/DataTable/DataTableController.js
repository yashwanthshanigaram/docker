({
	doInit : function(component, event, helper) {
          component.set('v.columns', [
             {label: '',fieldName:'', type:'image', cellAttributes: { iconName: 'utility:forward'}},
            {label: 'Partner Territory', fieldName: 'Partner_Territory__c', type: 'text'},
            {label: 'HIT Level Membership', fieldName: 'Hit_Level_Membership__c', type: 'text'},
            {label: 'Customer ST Name', fieldName: 'Customer_ST_Name__c', type: 'text'},
            {label: 'Customer ST ID', fieldName: 'Customer_ST_ID__c', type: 'text'},
            {label: 'PTB ', fieldName: 'PTB__c', type: 'text'},
            {label: 'Customer Segment', fieldName: 'Customer_Segment__c', type: 'text'},
            {label: 'Primary Seller', fieldName: 'Primary_Seller__c', type: 'text'}, 
            {label: 'Sales Program', fieldName: 'Sales_Program__c', type: 'text'},
            {label: 'Toatl IB Potential $', fieldName: 'Total_IB_Potential__c', type: 'currency'},
            {label: 'IB Potential - Compute $', fieldName: 'IB_Potential__c', type: 'currency'},
            {label: 'IB Potential - Storage $', fieldName: 'IB_Potential_Storage__c', type: 'currency'},
            {label: 'IB Potential - Greenlake $', fieldName: 'IB_Potential_Green__c', type: 'currency'},
            {label: 'IB Potential - Pointnext $', fieldName: 'IB_Potentials__c', type: 'currency'},
             {label: 'Total Programs ', fieldName: 'Total_Programs__c', type: 'number'},
             {label: 'Total Customer Activation (%) for the Named Partner', fieldName: 'Total_Customer_Activation__c', type: 'number'}
                     
        ]);	
         var action = component.get('c.fetchCustomer');
           action.setCallback(this, function(response){
              var state = response.getState();
              alert(state);
              if(state === 'SUCCESS' || state === 'DRAFT' ){
              var responseValue = response.getReturnValue();
              console.log('responseValue', responseValue);
              component.set('v.data', responseValue);
              }
    });
              $A.enqueueAction(action);
              
	}
    
})