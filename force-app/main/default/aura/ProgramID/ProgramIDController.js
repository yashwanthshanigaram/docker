({
	doInit : function(component, event, helper) {
        
        var rlId = component.get("v.pageReference.state.c__ruleId");
        var detailPage=component.get("c.programLink");
        detailPage.setParams({
               'ruleId':rlId
           });
        detailPage.setCallback(this, function(response) {
            var state = response.getState();
           console.log(state);
            /*var getUrlParameter = function getUrlParameter(sParam) {
                var sPageURL = decodeURIComponent(window.location.search.substring(1)),
                    sURLVariables = sPageURL.split('&'),
                    sParameterName,
                    i;

                for (i = 0; i < sURLVariables.length; i++) {
                    sParameterName = sURLVariables[i].split('=');

                    if (sParameterName[0] === 'ruleId') {
                        return sParameterName[1] === undefined ? true : sParameterName[1];
                    }
                }
            };

            component.set("v.ruleId", getUrlParameter('ruleId'));
          detailPage.setParams({
               'ruleId':component.get("v.ruleId")
           }); */
            if (component.isValid() && state === "SUCCESS"){
                var responseValue = response.getReturnValue();
               console.log('responsevalue of submit'+JSON.stringify(responseValue));
                component.set("v.programFields",response.getReturnValue());   
            }  
        });
        
        
        var campaignDtls=component.get("c.getCampaign");
        campaignDtls.setParams({
               'ruleId':rlId
           });       
        campaignDtls.setCallback(this, function(response) {
           var state = response.getState();
           console.log(state);
            if (component.isValid() && state === "SUCCESS"){
                var responseValue1 = response.getReturnValue();
           	    console.log('responsevalue of submit'+JSON.stringify(responseValue1));
                component.set("v.campaignNames",response.getReturnValue());   
            }  
        });
        
        var offeringsDtls=component.get("c.getOfferings");
        offeringsDtls.setParams({
               'ruleId':rlId
           });        
        offeringsDtls.setCallback(this, function(response) {
           var state = response.getState();
           console.log(state);
            if (component.isValid() && state === "SUCCESS"){
                var responseValue2 = response.getReturnValue();
           	    console.log('responsevalue of submit'+JSON.stringify(responseValue2));
                component.set("v.offerings",response.getReturnValue());   
            }  
        });
        var evaluationRulesDtls=component.get("c.getEvaluationRules");
        evaluationRulesDtls.setParams({
               'ruleId':rlId
           });        
        evaluationRulesDtls.setCallback(this, function(response) {
           var state = response.getState();
           console.log(state);
            if (component.isValid() && state === "SUCCESS"){
                var responseValue3 = response.getReturnValue();
           	    console.log('responsevalue of submit'+JSON.stringify(responseValue3));
                component.set("v.evaluationRules",response.getReturnValue());   
            }  
        });
        
        var selectionRulesDtls=component.get("c.getSelectionRules");
        selectionRulesDtls.setParams({
               'ruleId':rlId
           }); 
        selectionRulesDtls.setCallback(this, function(response) {
           var state = response.getState();
           console.log(state);
            if (component.isValid() && state === "SUCCESS"){
                var responseValue4 = response.getReturnValue()
           	    console.log('responsevalue of submit'+JSON.stringify(responseValue4));
                component.set("v.selectionRules",response.getReturnValue());   
            }  
        });
        var selectionCondition=component.get("c.getSelectionCondition");
        selectionCondition.setParams({
               'ruleId':rlId
           }); 
        selectionCondition.setCallback(this, function(response) {
           var state = response.getState();
           console.log(state);
            if (component.isValid() && state === "SUCCESS"){
                var responseValue5 = response.getReturnValue();
           	    console.log('responsevalue of submit'+JSON.stringify(responseValue5));
                component.set("v.SelectionConditions",response.getReturnValue());   
            }  
        });
        var evaluationCondition=component.get("c.getEvaluationCondition");
        evaluationCondition.setParams({
               'ruleId':rlId
           }); 
        evaluationCondition.setCallback(this, function(response) {
           var state = response.getState();
           console.log(state);
            if (component.isValid() && state === "SUCCESS"){
                var responseValue6 = response.getReturnValue();
           	    console.log('responsevalue of submit'+JSON.stringify(responseValue6));
                component.set("v.salesPlayName",response.getReturnValue());  
                
            }  
        });
        var ECReccLogic=component.get("c.getECReccLogic");
        ECReccLogic.setParams({
               'ruleId':rlId
           }); 
        ECReccLogic.setCallback(this, function(response) {
           var state = response.getState();
           console.log(state);
            if (component.isValid() && state === "SUCCESS"){
                var responseValue7 = response.getReturnValue();
           	    console.log('responsevalue of submit'+JSON.stringify(responseValue7));
                component.set("v.ReccLogic",response.getReturnValue());  
                 
            }  
        });
        var evaluationRulesObj=component.get("c.getEvaluationRulesObj");
        evaluationRulesObj.setParams({
               'ruleId':rlId
           }); 
        evaluationRulesObj.setCallback(this, function(response) {
           var state = response.getState();
           console.log(state);
            if (component.isValid() && state === "SUCCESS"){
                var responseValue8 = response.getReturnValue();
           	    console.log('responsevalue of submit'+JSON.stringify(responseValue8));
                component.set("v.EvRuleDtlsObj",response.getReturnValue());  
            }  
        });
        
         $A.enqueueAction(detailPage); 
		 $A.enqueueAction(campaignDtls);
         $A.enqueueAction(offeringsDtls);
         $A.enqueueAction(evaluationRulesDtls);
         $A.enqueueAction(evaluationRulesObj);
         $A.enqueueAction(selectionRulesDtls);
         $A.enqueueAction(selectionCondition);
         $A.enqueueAction(evaluationCondition);
         $A.enqueueAction(ECReccLogic);
        
         
	},
    DeleteProgram:function(component,event,helper){
		var rulId = component.get("v.pageReference.state.c__ruleId");
			console.log('ruleId'+rulId);
        component.find('notifLib').showNotice({
            "message": "Are you Sure you want to Delete the Selected Programs?"})
        var action=component.get("c.deletedetails");
        action.setParams({
               'ruleIdp':rulId
           });
        //console.log('ruleIdp'+ruleIdp);
        action.setCallback(this, function(response){
            var statep = response.getState();
            console.log('state'+statep);
            if(statep === 'SUCCESS' || statep === 'DRAFT' ){
             component.find('notifLib').showNotice({
            "message": "Program deleted Successfully"})   
            }
            
        });
        $A.enqueueAction(action); 
        var url = component.get("c.gotoURL");
        $A.enqueueAction(url);
       

        },
 
     program:function(component, event, helper) {
        console.log("Event fired");
          var evt = $A.get("e.force:navigateToComponent");
    evt.setParams({
        componentDef : "c:SalesProgram", 
       
        componentAttributes: {
            
        }
    });
        evt.fire();
        
    },
    reInit : function(component, event, helper) {
        $A.get('e.force:refreshView').fire();
    },
    gotoURL : function (component, event, helper) {
        var urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
          "url": "https://hp--gsdr22sp22.lightning.force.com/lightning/n/Program_Management"
        });
        urlEvent.fire();
    }

    
    
})