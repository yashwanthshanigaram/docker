({
    init : function(component, event, helper) {
         
        var contractServiceOption=[{label:"CMS", value: "Tier 1", selected: false },
                           { label:"Foundation Care",value: "Tier 2", selected: false },
                           { label:"Other Serivce level",value: "Tier 3", selected: false },
                           { label:"Lifecycle Event Services",value: "Silver", selected: false },
                           { label:"Multi Vendor Support",value: "Gold", selected: false },
                           { label:"Proactive Care Advanced",value: "Bronze", selected: false },
                           { label:"Proactive Care",value: "Red", selected: false },
                            { label:"Nonstop",value: "Red", selected: false },
                            { label:"Datacenter Care Legacy",value: "Red", selected: false }, 
                             { label:"Critical Service Legacy",value: "Red", selected: false }, 
                              { label:"Datacenter Care",value: "Red", selected: false } 
                           ];
        component.set("v.contractServiceOptions", contractServiceOption); 
    },
    definePrgm : function(component, event, helper) {
          component.set("v.form1",true);
       console.log("Inside form1");
      // component.set("v.highlight",true);
        component.set("v.form2",false);
        component.set("v.form3",false);
        component.set("v.form3a",false);
        component.set("v.form3b",false);
        component.set("v.form3c",false);
        component.set("v.form4",false);
        component.set("v.form5",false);
        component.set("v.form6",false); 
       
        //console.log("inside form1");
      /* var action = component.get("c.getSession");
        action.setCallback(this, function(response){
            var state = response.getState();
            //alert(state);
            if(state === 'SUCCESS' || state === 'DRAFT' ){
              var responseVal = response.getReturnValue();
              // console.log(responseVal);
                if(responseVal){
                       var evt = $A.get("e.force:navigateToComponent");
         evt.setParams({
        componentDef : "c:IB_ProgramFlow",       
        componentAttributes: { 
           
            prgmname : responseVal.programName,
            prgmtype : responseVal.programtype,
            prgmdesc : responseVal.programDesc,
            startDate : responseVal.programStartDate,
            endDate : responseVal.programEndDate,
            geo : responseVal.programGeo,
            accValue : responseVal.programAccValue,
            prgmGover : responseVal.programGovernance,
            seismicLink1 : responseVal.programSeismic1,
            seismicLink2 : responseVal.programSeismic2,
            seismicLink3 : responseVal.programSeismic3,
            resourceLink1 : responseVal.programResource1,
            resourceLink2 : responseVal.programResource2,
            resourceLink3 : responseVal.programResource3,
            descriptionLink1 : responseVal.programDescription1,
            descriptionLink2 : responseVal.programDescription2,
            descriptionLink3 : responseVal.programDescription3,
            descriptionLink4 : responseVal.programDescription4,
            descriptionLink5 : responseVal.programDescription5,
            descriptionLink6 : responseVal.programDescription6,
             form1: true
        }
    });    
        evt.fire();
                }
               }
                });
       // console.log("prn"+prn)
        
   
        
                           $A.enqueueAction(action); */
        
        
    },
    
	offering : function(component, event, helper) {
        //console.log('on click'+v.form2)
        component.set("v.form2",true);
        component.set("v.form1",false);
        component.set("v.form3",false);
        component.set("v.form3a",false);
        component.set("v.form3b",false);
        component.set("v.form3c",false);
        component.set("v.form4",false);
        component.set("v.form5",false);
        component.set("v.form6",false); 
        
 /*var action = component.get("c.getSessionf2");
        action.setCallback(this, function(response){
            var state = response.getState();
            //alert(state);
            if(state === 'SUCCESS' || state === 'DRAFT' ){
              var responseVal = response.getReturnValue();
              //  console.log(responseVal.valueOffering);
                if(responseVal){
                       var evt = $A.get("e.force:navigateToComponent");
         evt.setParams({
        componentDef : "c:IB_ProgramFlow",       
        componentAttributes: { 
            form1: false,
             form2: true,
            objectOffering : responseVal.obofferingf2,
            fieldOffering : responseVal.fieldofferingf2,
            operatorOffering : responseVal.optrofferingf2,
            valueOffering : responseVal.valofferingf2,
            descOffering : responseVal.descofferingf2
                   
        }
    });    
        evt.fire();
                }
               
               }
                });
       // console.log("prn"+prn)
        
   
        
                           $A.enqueueAction(action);  */
    },
    
    assignAccnts : function(component, event, helper) {
        
        component.set("v.form1",false);
        component.set("v.form2",false);
        component.set("v.form3",true);
        component.set("v.form3a",false);
        component.set("v.form3b",false);
        component.set("v.form3c",false);
        component.set("v.form4",false);
        component.set("v.form5",false);
        component.set("v.form6",false); 
        
   
    },
        
    SetIB :function(component, event, helper) {
       component.set("v.form1",false);
        component.set("v.form2",false);
        component.set("v.form3",false);
        component.set("v.form3a",true);
        component.set("v.form3b",false);
        component.set("v.form3c",false);
        component.set("v.form4",false);
        component.set("v.form5",false);
        component.set("v.form6",false); 
        
         var newButton = component.find("Checkbox1");
        $A.util.toggleClass(newButton, "slds-show");
        
                
/*var action = component.get("c.getSessionf3");
        action.setCallback(this, function(response){
            var state = response.getState();
            //alert(state);
            if(state === 'SUCCESS' || state === 'DRAFT' ){
              var responseVal = response.getReturnValue();
              //  console.log(responseVal.valueOffering);
                if(responseVal){
                       var evt = $A.get("e.force:navigateToComponent");
         evt.setParams({
        componentDef : "c:IB_ProgramFlow",       
        componentAttributes: { 
            form1: false,
             form2: false,
            form3: false,
            form3a: true,
            
            objectDataSetIb : responseVal.obDataSetIbf3,
            fieldDataSetIb : responseVal.fieldDataSetIbf3,
            operatorDataSetIb : responseVal.optrDataSetIbf3,
            valueDataSetIb : responseVal.valDataSetIbf3,
            descDataSetIb : responseVal.descDataSetIbf3
                   
        }
    });    
        evt.fire();
                }
               
               }
                });

                           $A.enqueueAction(action);  */
    },
    
    setCond :function(component, event, helper) {
       component.set("v.form1",false);
        component.set("v.form2",false);
        component.set("v.form3",false);
        component.set("v.form3a",false);
        component.set("v.form3b",true);
        component.set("v.form3c",false);
        component.set("v.form4",false);
        component.set("v.form5",false);
        component.set("v.form6",false); 
        
         var newButton = component.find("Checkbox1");
        $A.util.toggleClass(newButton, "slds-show");
    },
    Listacc :function(component, event, helper) {
       component.set("v.form1",false);
        component.set("v.form2",false);
        component.set("v.form3",false);
        component.set("v.form3a",false);
        component.set("v.form3b",false);
        component.set("v.form3c",true);
        component.set("v.form4",false);
        component.set("v.form5",false);
        component.set("v.form6",false); 
         var newButton = component.find("checkbox_2");
        $A.util.toggleClass(newButton, "slds-show");
    },
    
  qib : function(component, event, helper) {
     component.set("v.form1",false);
        component.set("v.form2",false);
        component.set("v.form3",false);
        component.set("v.form3a",false);
        component.set("v.form3b",false);
        component.set("v.form3c",false);
        component.set("v.form4",true);
        component.set("v.form5",false);
        component.set("v.form6",false);
    },
    
    evalCond : function(component, event, helper) {
     component.set("v.form1",false);
        component.set("v.form2",false);
        component.set("v.form3",false);
        component.set("v.form3a",false);
        component.set("v.form3b",false);
        component.set("v.form3c",false);
        component.set("v.form4",false);
        component.set("v.form5",true);
        component.set("v.form6",false);
    },
    
     finalRecom : function(component, event, helper) {
          component.set("v.form1",false);
        component.set("v.form2",false);
        component.set("v.form3",false);
        component.set("v.form3a",false);
        component.set("v.form3b",false);
        component.set("v.form3c",false);
        component.set("v.form4",false);
        component.set("v.form5",false);
        component.set("v.form6",true);
    },
    
     NxtSectionF1: function(component, event, helper) {
         
        var programName=component.get('v.prgmname');
         console.log("pn"+programName);
         var programtype=component.get('v.prgmtype');
          console.log("ptype"+programtype);
          var programDesc=component.get('v.prgmdesc');
           var programStartDate=component.get('v.startDate');
           var programEndDate=component.get('v.endDate');
           
            var programGeo=component.get('v.geo');
           var programAccValue=component.get('v.accValue');
            var programGovernance=component.get('v.prgmGover');
         if(programName=="" || programtype =="None"||programDesc==""||programStartDate==""||programEndDate==""||programGeo=="None"||programAccValue==""||programGovernance=="None"){
              component.set('v.error',true);
         }
         else{
          component.set("v.form1",false);
        component.set("v.form2",true);
        component.set("v.form3",false);
        component.set("v.form3a",false);
        component.set("v.form3b",false);
        component.set("v.form3c",false);
        component.set("v.form4",false);
        component.set("v.form5",false);
        component.set("v.form6",false);
             }
       //  component.set("v.form1",false);
       // console.log(component.get("v.form1"));
       
              /*  var action1 = component.get("c.removeSession");
         action1.setCallback(this, function(response){
            var state = response.getState();
            //alert(state);
            if(state === 'SUCCESS' || state === 'DRAFT' ){
              // var responseValue = response.getReturnValue();
               // console.log(result.getReturnValue);
              
              // component.set("v.prgmname",responseValue.programName);

               }
                });
        
        
                           $A.enqueueAction(action1); 
        
        var action = component.get("c.storeSession");
         console.log(component.get('v.accValue'));
        console.log(component.get('v.seismicLink1'));
           console.log(component.get('v.seismicLink2'));
        action.setParams({
            
            programName:component.get('v.prgmname'),
            programtype:component.get('v.prgmtype'),
            programDesc:component.get('v.prgmdesc'),
            programStartDate:component.get('v.startDate'),
            programEndDate:component.get('v.endDate'),
            programGeo:component.get('v.geo'),
            programAccValue:component.get('v.accValue'),
            programGovernance:component.get('v.prgmGover'),
            programSeismic1:component.get('v.seismicLink1'),
            
            programSeismic2:component.get('v.seismicLink2'),
            programSeismic3:component.get('v.seismicLink3'),
            programResource1:component.get('v.resourceLink1'),
            programResource2:component.get('v.resourceLink2'),
            programResource3:component.get('v.resourceLink3'),
            programDescription1:component.get('v.descriptionLink1'),
            programDescription2:component.get('v.descriptionLink2'),
           programDescription3:component.get('v.descriptionLink3'),
            programDescription4:component.get('v.descriptionLink4'),
            programDescription5:component.get('v.descriptionLink5'),
            programDescription6:component.get('v.descriptionLink6')
            
        });
         //var name12=component.get("v.prgmname");
        //console.log("program Name is"+name12);
         
        
        action.setCallback(this, function(response){
            var state = response.getState();
            //alert(state);
            if(state === 'SUCCESS' || state === 'DRAFT' ){
              // var responseValue = response.getReturnValue();
               // console.log(result.getReturnValue);
              
              // component.set("v.prgmname",responseValue.programName);

               }
                });
        
        
                           $A.enqueueAction(action);
        
       
        var evt = $A.get("e.force:navigateToComponent");
    evt.setParams({
        componentDef : "c:IB_ProgramFlow",       
        componentAttributes: {   
            form1: false,
            form2: true
        }
    });      
      evt.fire();  */
    },
   
	dispCampFields : function(component, event, helper) {
		 component.set('v.isfieldVisibleCamp', !component.get('v.isfieldVisibleCamp'));
         component.set('v.isIconVisibleCamp', false);
        component.set('v.campselected','');
	},
      dispFields : function(component, event, helper) {
		 component.set('v.isfieldVisible', !component.get('v.isfieldVisible'));
         component.set('v.isIconVisible', false);
	},
      dispFieldsf3 : function(component, event, helper) {
		 component.set('v.isfieldVisiblef3', !component.get('v.isfieldVisiblef3'));
         component.set('v.isIconVisiblef3', false);
	},
    dispFieldsf4 : function(component, event, helper) {
        
		 component.set('v.isfieldVisiblef4', !component.get('v.isfieldVisiblef4'));
         component.set('v.isIconVisiblef4', false);
       /* component.set('v.objectEvalCond','None');
        component.set('v.fieldEvalCond','None');
        component.set('v.operatorEvalCond','None');
        component.set('v.valueEvalCond','None'); */
	},
    cancel : function(component, event, helper) {
		
         component.set('v.isIconVisible', true);
         component.set('v.isfieldVisible',false);
	},
      cancelDataSet : function(component, event, helper) {
         component.set('v.isIconVisiblef3', true);
         component.set('v.isfieldVisiblef3',false);
	},
     cancelEvalCond : function(component, event, helper) {
         component.set('v.isIconVisiblef4', true);
         component.set('v.isfieldVisiblef4',false);
	},
    
     handleKeyup : function(component, event, helper) {
    var elem = event.getSource().get('v.value');
    var max = 100;  
    var remaining = max - elem.length;
    var used = 100-remaining;  
    component.set('v.charsRemaining', used);  
  },
     handleKeyup1 : function(component, event, helper) {
    var elem = event.getSource().get('v.value');
    var max1 = 200;  
    var remaining2 = max1 - elem.length;
    var used2 = 200-remaining2;  
    component.set('v.charsRemaining2', used2);  
  },
    PrevsecF2: function(component, event, helper) {
        
          component.set("v.form2",false);
        component.set("v.form1",true);
        component.set("v.form3",false);
        component.set("v.form3a",false);
        component.set("v.form3b",false);
        component.set("v.form3c",false);
        component.set("v.form4",false);
        component.set("v.form5",false);
        component.set("v.form6",false); 
      /* var evt = $A.get("e.force:navigateToComponent");
    evt.setParams({
        componentDef : "c:IB_ProgramFlow",       
        componentAttributes: {   
            form2: false,
            form1: true
        }
    });      
      evt.fire(); 
    
        var action = component.get("c.getSession");
        action.setCallback(this, function(response){
            var state = response.getState();
            //alert(state);
            if(state === 'SUCCESS' || state === 'DRAFT' ){
              var responseVal = response.getReturnValue();
              console.log("from flow form 1");
              console.log(responseVal);
                if(responseVal){
                       var evt = $A.get("e.force:navigateToComponent");
         evt.setParams({
        componentDef : "c:IB_ProgramFlow",       
        componentAttributes: { 
           
            prgmname : responseVal.programName,
            prgmtype : responseVal.programtype,
            prgmdesc : responseVal.programDesc,
            startDate : responseVal.programStartDate,
            endDate : responseVal.programEndDate,
            geo : responseVal.programGeo,
            accValue : responseVal.programAccValue,
            prgmGover : responseVal.programGovernance,
            seismicLink1 : responseVal.programSeismic1,
            seismicLink2 : responseVal.programSeismic2,
            seismicLink3 : responseVal.programSeismic3,
            resourceLink1 : responseVal.programResource1,
            resourceLink2 : responseVal.programResource2,
            resourceLink3 : responseVal.programResource3,
            descriptionLink1 : responseVal.programDescription1,
            descriptionLink2 : responseVal.programDescription2,
            descriptionLink3 : responseVal.programDescription3,
            descriptionLink4 : responseVal.programDescription4,
            descriptionLink5 : responseVal.programDescription5,
            descriptionLink6 : responseVal.programDescription6,
             form1: true
        }
    });    
        evt.fire();
                }
               }
                });
       // console.log("prn"+prn)
        
   
        
                           $A.enqueueAction(action);*/

        
     },
        
     NextSecF2: function(component, event, helper) {
         
         var objectf2=component.get('v.objectOffering');
         console.log("object"+objectf2);
        var fieldf2=component.get('v.fieldOffering');
        var optr2=component.get('v.operatorOffering');
        var valf2=component.get('v.valueOffering');
         console.log("valf2"+valf2);
         if(objectf2==""||fieldf2==""||optr2==""||valf2==""){
             component.set('v.error',true);
         }
         else{
            component.set("v.form2",false);
        component.set("v.form1",false);
        component.set("v.form3",true);
        component.set("v.form3a",false);
        component.set("v.form3b",false);
        component.set("v.form3c",false);
        component.set("v.form4",false);
        component.set("v.form5",false);
        component.set("v.form6",false);   
         }
        
         
        /* var action1 = component.get("c.removeSessionf2");
         action1.setCallback(this, function(response){
            var state = response.getState();
             
            //alert(state);
            if(state === 'SUCCESS' || state === 'DRAFT' ){
              // var responseValue = response.getReturnValue();
               // console.log(result.getReturnValue);
              
              // component.set("v.prgmname",responseValue.programName);

               }
                });
        
        
                           $A.enqueueAction(action1); 
         
         var action = component.get("c.storeSessionf2");
         console.log('inside form 2 next');
         
        action.setParams({
          
            obofferingf2:component.get('v.objectOffering'),
            fieldofferingf2:component.get('v.fieldOffering'),
            optrofferingf2:component.get('v.operatorOffering'),
            valofferingf2:component.get('v.valueOffering'),
            descofferingf2:component.get('v.descOffering')

        });
         //var name12=component.get("v.prgmname");
        //console.log("program Name is"+name12);
         
        
        action.setCallback(this, function(response){
            var state = response.getState();
            //alert(state);
            if(state === 'SUCCESS' || state === 'DRAFT' ){
              // var responseValue = response.getReturnValue();
               // console.log(result.getReturnValue);
              
              // component.set("v.prgmname",responseValue.programName);
             // console.log(responseVal.valueOffering);

               }
                });
        
        
                           $A.enqueueAction(action);
        
       var evt = $A.get("e.force:navigateToComponent");
    evt.setParams({
        componentDef : "c:IB_ProgramFlow",       
        componentAttributes: {   
            form1: false,
            form2: false,
            form3: true
        }
    });      
      evt.fire();  */
     
     },
    NextSecF3: function(component, event, helper) {
       component.set("v.form3b",false);
         component.set("v.form2",false);
        component.set("v.form1",false);
        component.set("v.form3",false);
        component.set("v.form3a",true);  
        component.set("v.form3c",false);
        component.set("v.form4",false);
        component.set("v.form5",false);
        component.set("v.form6",false); 
     
     },	
    PrevsecF3a: function(component, event, helper) {
         component.set("v.form3b",false);
          component.set("v.form2",true);
        component.set("v.form1",false);
        component.set("v.form3",false);
        component.set("v.form3a",false);  
        component.set("v.form3c",false);
        component.set("v.form4",false);
        component.set("v.form5",false);
        component.set("v.form6",false); 
    },
     NextSecF3a: function(component, event, helper) {
        
         component.set("v.form3b",true);
          component.set("v.form2",false);
        component.set("v.form1",false);
        component.set("v.form3",false);
        component.set("v.form3a",false);  
        component.set("v.form3c",false);
        component.set("v.form4",false);
        component.set("v.form5",false);
        component.set("v.form6",false); 
         
         // component.set('v.valOptions','');
         // console.log("log 1: 3a"+component.get('v.valOptions'));
         console.log("beFORE SEC 4:"+component.get('v.valueDataSetIb'));
         component.set('v.valueEvalCond', '');
         
         console.log("AFTER SEC 4:"+component.get('v.valueEvalCond'));
      /* var action = component.get("c.storeSessionf3");
        // console.log('inside form 2 next');
         
        action.setParams({
          
            obDataSetIbf3:component.get('v.objectDataSetIb'),
            fieldDataSetIbf3:component.get('v.fieldDataSetIb'),
            optrDataSetIbf3:component.get('v.operatorDataSetIb'),
            valDataSetIbf3:component.get('v.valueDataSetIb'),
            descDataSetIbf3:component.get('v.descDataSetIb')

        });
		
		 action.setCallback(this, function(response){
            var state = response.getState();
            //alert(state);
            if(state === 'SUCCESS' || state === 'DRAFT' ){
			}
                });
		$A.enqueueAction(action);
         console.log("object value is"+component.get('v.objectDataSetIb'));
          console.log("field value is"+component.get('v.fieldDataSetIb'));
          console.log("operator value is"+component.get('v.operatorDataSetIb'));
          console.log("value is"+component.get('v.valueDataSetIb')); */
         
              
	/*var evt = $A.get("e.force:navigateToComponent");
    evt.setParams({
        componentDef : "c:IB_ProgramFlow",       
        componentAttributes: {   
            form1: false,
            form2: false,
            form3: false,
			form3a: false,
			form3b: true,
			
        }
    });      
      evt.fire();  */
     
     },	
    Prevsecf3b: function(component, event, helper) {
         
        component.set("v.form3b",false);
          component.set("v.form2",false);
        component.set("v.form1",false);  
         component.set("v.form3",false);
        component.set("v.form3a",true);  
        component.set("v.form3c",false);
        component.set("v.form4",false);
        component.set("v.form5",false);
        component.set("v.form6",false); 
    },
     NextSecF3b: function(component, event, helper) {
         
         component.set("v.form3b",false);
          component.set("v.form2",false);
        component.set("v.form1",false);  
         component.set("v.form3",false);
        component.set("v.form3a",false);  
        component.set("v.form3c",false);
        component.set("v.form4",true);
        component.set("v.form5",false);
        component.set("v.form6",false); 
         
         // component.set('v.valOptions','');
         //console.log("log 2: 3b"+component.get('v.valOptions'));
         
         console.log("beFORE SEC 4:"+component.get('v.valueDataSetIb'));
         component.set('v.valueEvalCond', '');
         
         console.log("AFTER SEC 4:"+component.get('v.valueEvalCond'));
        // component.set('v.valueEvalCond','');
         // console.log("AFTER SEC 4:"+component.get('v.valueEvalCond'));
       /*var action = component.get("c.storeSessionf2");
         console.log('inside form 2 next');
         
        action.setParams({
          
            obofferingf2:component.get('v.objectOffering'),
            fieldofferingf2:component.get('v.fieldOffering'),
            optrofferingf2:component.get('v.operatorOffering'),
            valofferingf2:component.get('v.valueOffering'),
            descofferingf2:component.get('v.descOffering')

        });
		
		 action.setCallback(this, function(response){
            var state = response.getState();
            //alert(state);
            if(state === 'SUCCESS' || state === 'DRAFT' ){
			}
                });
		$A.enqueueAction(action);
	var evt = $A.get("e.force:navigateToComponent");
    evt.setParams({
        componentDef : "c:IB_ProgramFlow",       
        componentAttributes: {   
            form1: false,
            form2: false,
            form3: false,
			form3a: false,
			form3b: false,
			form4: true
        }
    });      
      evt.fire();  */
     
     },	
    PrevsecF4: function(component, event, helper) {
         component.set("v.form3b",false);
          component.set("v.form2",false);
        component.set("v.form1",false);  
         component.set("v.form3",true);
        component.set("v.form3a",false);  
        component.set("v.form3c",false);
        component.set("v.form4",false);
        component.set("v.form5",false);
        component.set("v.form6",false); 
    },
     NextSecF4: function(component, event, helper) {
          var objectf4=component.get('v.objectEvalCond');
         console.log("object"+objectf4);
        var fieldf4=component.get('v.fieldEvalCond');
        var optr4=component.get('v.operatorEvalCond');
        var valf4=component.get('v.valueEvalCond');
         console.log("valf2"+valf4);
         if(objectf4==""||fieldf4==""||optr4==""||valf4==""){
             component.set('v.error',true);
         }
         else{
           component.set("v.form3b",false);
          component.set("v.form2",false);
        component.set("v.form1",false);  
         component.set("v.form3",false);
        component.set("v.form3a",false);  
        component.set("v.form3c",false);
        component.set("v.form4",false);
        component.set("v.form5",true);
        component.set("v.form6",false);   
         }
          
       /*var action = component.get("c.storeSessionf2");
         console.log('inside form 2 next');
         
        action.setParams({
          
            obofferingf2:component.get('v.objectOffering'),
            fieldofferingf2:component.get('v.fieldOffering'),
            optrofferingf2:component.get('v.operatorOffering'),
            valofferingf2:component.get('v.valueOffering'),
            descofferingf2:component.get('v.descOffering')

        });
		
		 action.setCallback(this, function(response){
            var state = response.getState();
            //alert(state);
            if(state === 'SUCCESS' || state === 'DRAFT' ){
			}
                });
		$A.enqueueAction(action);
	var evt = $A.get("e.force:navigateToComponent");
    evt.setParams({
        componentDef : "c:IB_ProgramFlow",       
        componentAttributes: {   
            form1: false,
            form2: false,
            form3: false,
			form3a: false,
			form3b: false,
			form3c: false,
			form4: false,
            form5: true
        }
    });      
      evt.fire(); */ 
     
     },	
     PrevsecF5: function(component, event, helper) {
         component.set("v.form3b",false);
          component.set("v.form2",false);
        component.set("v.form1",false);  
         component.set("v.form3",false);
        component.set("v.form3a",false);  
        component.set("v.form3c",false);
        component.set("v.form4",true);
        component.set("v.form5",false);
        component.set("v.form6",false); 
     },
     Preview: function(component, event, helper) {
         var links= (component.get('v.seismicLink1')+component.get('v.seismicLink2')+component.get('v.seismicLink3'));
        console.log("links"+links);
         component.set('v.finalsesimiclink',links);
          component.set("v.form3b",false);
          component.set("v.form2",false);
        component.set("v.form1",false);  
         component.set("v.form3",false);
        component.set("v.form3a",false);  
        component.set("v.form3c",false);
        component.set("v.form4",false);
        component.set("v.form5",false);
        component.set("v.form6",true);
         
       /*var action = component.get("c.storeSessionf2");
         console.log('inside form 2 next');
         
        action.setParams({
          
            obofferingf2:component.get('v.objectOffering'),
            fieldofferingf2:component.get('v.fieldOffering'),
            optrofferingf2:component.get('v.operatorOffering'),
            valofferingf2:component.get('v.valueOffering'),
            descofferingf2:component.get('v.descOffering')

        });
		
		 action.setCallback(this, function(response){
            var state = response.getState();
            //alert(state);
            if(state === 'SUCCESS' || state === 'DRAFT' ){
			}
                });
		$A.enqueueAction(action);
	var evt = $A.get("e.force:navigateToComponent");
    evt.setParams({
        componentDef : "c:IB_ProgramFlow",       
        componentAttributes: {   
             form1: false,
            form2: false,
            form3: false,
			form3a: false,
			form3b: false,
			form3c: false,
			form4: false,
			form5: false,
            form6: true
        }
    });      
      evt.fire();  */
     
     },						
        checkbox: function(component, event, helper) {
       
        var checkCmp1 =component.find("checkboxf3a").get("v.checked");
            console.log("checkCmp1"+checkCmp1);
         var checkCmp2 =component.find("checkboxf3c").get("v.checked");
         if(checkCmp1){
           var temp =component.find("checkboxf3c").set("v.checked", false);
        }
            
        component.set('v.withIB', true);
        
         var newButton = component.find("Checkbox1");
        $A.util.toggleClass(newButton, "slds-hide"); 
        
       
        
    },
    checkbox2: function(component, event, helper) {
          var checkCmp1 =component.find("checkboxf3a").get("v.checked");
         var checkCmp2 =component.find("checkboxf3c").get("v.checked");
         if(checkCmp1){
           var temp =component.find("checkboxf3a").set("v.checked", false);
        }
       
        component.set('v.withIB', false);
        
         var newButton = component.find("checkbox_2");
        $A.util.toggleClass(newButton, "slds-hide"); 
    },
    
        searchKeyChange: function(component, event) {
       component.set('v.campaigncodelist',true);
       var searchKey = component.find("searchKey").get("v.value");
        console.log('searchKey:::::'+searchKey);
        if(searchKey.length==1){
            component.set("v.campName",'');
        }
        if(searchKey.length>2){
     component.set("v.campName",'');
                var action = component.get("c.campaignSearch");
         action.setParams({
            "searchKey": searchKey
        });
        action.setCallback(this, function(response){      
            var state = response.getState();     
         
           console.log(state);
            if(state === 'SUCCESS' || state === 'DRAFT' ){

                var responseValue = response.getReturnValue();
               console.log("response is "+responseValue);
                  component.set("v.campName",'');
                if(searchKey){
                component.set("v.campName",responseValue);
                console.log(component.get("v.campName"));
                }
        
        }

        });
            
        $A.enqueueAction(action);
  
        }
        else{
            component.set("v.campName",'');
        }
    },
    
        handleCampselect:function(cmp, event, helper){
         cmp.set('v.campaigncodelist',true);
         var index = event.target.dataset.index;
        console.log(index);
      var thisObjId = event.target.dataset.sfid;
        console.log(thisObjId);
       cmp.set("v.campaigncode",thisObjId);
        var thisId = event.target.id;
       console.log(thisId);
      
       cmp.set('v.campselected', thisObjId);
       //     var camp=[1,2,3];
      var campval= cmp.get('v.campcodeval');
           // console.log("camp val"+campval);
           /* if(campval=='abc'){
               var selectedcode= cmp.get('v.multiplecampaigncode');
           selectedcode.push(thisObjId);
           console.log("multiplecampaigncode final = "+selectedcode)
           //cmp.set('v.multiplecampaigncode',selectedcode);  
                 cmp.set('v.campaigncodelist',false);
            }*/
           cmp.set('v.campaigncodelist',false);
        //     console.log("After camp select"+cmp.get('v.multiplecampaigncode'))
       
        
    },
 handleDeleteRecord:function(cmp,event,helper){
      /* var index = event.target.dataset.index;
        console.log(index);
       
         var thisObjId = event.target.dataset.sfid;
        console.log(thisObjId);*/
         //var self = this;  // safe reference
          var multiplecampaignCode = cmp.get('v.multiplecampaigncode');
        console.log("multiplecampaignCode = "+ multiplecampaignCode);
        //cmp.set('v.campselected', thisObjId);
       var selectedval=cmp.get('v.campselected');
        //console.log("camp code"+ cmp.get('v.campselected'));
    /* var selectedItem = event.currentTarget;
        console.log(selectedItem);
     var index1 = selectedItem.dataset.index;
        console.log(index1);
       var thisObjId = event.target.dataset.sfid;
        console.log(thisObjId); */
      var index = multiplecampaignCode.indexOf(selectedval);
        console.log("index"+index);
             multiplecampaignCode.splice(index, 1);
       //console.log('mulit camp code'+multiplecampaignCode);
        
       // cmp.set("v.multiplecampaigncode", multiplecampaignCode);
        if(multiplecampaignCode==''){
            cmp.set('v.campcodeval','camp');
             cmp.set("v.multiplecampaigncode", multiplecampaignCode);
        }else{
             cmp.set("v.multiplecampaigncode", multiplecampaignCode);
        }
  // console.log("multiplecampaignCode after deletion = "+multiplecampaigncode);         
        
    },
           savecamp : function(component, event, helper) {
               var selectedcode = component.get("v.campaigncode");
               console.log("selectedcode"+selectedcode);
               var mutiplecode= component.get('v.multiplecampaigncode');
               mutiplecode.push(selectedcode);
               component.set('v.multiplecampaigncode',mutiplecode);
              
        component.set('v.Camplistdisp', true);
         component.set('v.isfieldVisibleCamp',false);	
          component.set('v.isIconVisibleCamp', true);  
              
	},  
      
      cancelcamp : function(component, event, helper) {
        component.set('v.isIconVisibleCamp', true);
         component.set('v.isfieldVisibleCamp',false);		
	},  
 /* Define Offering values */
    values : function(component, event, helper) {
         var listOfValues=[];
         var listt;
          var action = component.get('c.getOfferingsdata'); 
        action.setCallback(this, function(response){
            var state = response.getState();
            console.log('state'+state);
            if(state === 'SUCCESS' || state === 'DRAFT' ){
                var responseValue = response.getReturnValue();
                
               console.log('responseValue'+JSON.stringify(responseValue));
               component.set("v.Listvalues", responseValue);
             }
            
        });
        $A.enqueueAction(action); 
     },
    
    saveOffering : function(component, event, helper) {
        var offering=component.find('Listvalues').get('v.selectedItems');
        var offer1=offering.toString();
         console.log("val off"+offer1);
        
        component.set('v.valueOffering',offer1);
        console.log("@@@@"+component.get("v.valueOffering"));
        var object=component.get("v.objectOffering");
        console.log("object val is"+object);
       component.set('v.isfieldVisible',false);
         component.set('v.dataSetFilter',true);
        
        
    },
        /* Assign Accounts */
    
        PrevsecAssgnAcc: function(component, event, helper) {
         
            component.set("v.form2",true);
           component.set("v.form1",false);
           component.set("v.form3",false);
           component.set("v.form3a",false);
           component.set("v.form3b",false);
           component.set("v.form3c",false);
           component.set("v.form4",false);
           component.set("v.form5",false);
           component.set("v.form6",false); 
        },
    /*     DataSet WIth IB - Form3a */
    
    saveDataSet : function(component, event, helper) {
        
        var datasetib=component.get("v.valOptions");
        console.log("data set ib"+datasetib);
        if('v.form3a'){
                component.set('v.form3a_valoptions',datasetib);
               
            }
            
            if('v.form4'){
                console.log("form 4 is"+component.get("v.form4"))
                if(datasetib!=''){
                component.set("v.valOptions",'');
                    console.log("form4 if"+component.get("v.valOptions"));
                   
                    }
            }

        var action = component.get("c.storeSessionf3");
        // console.log('inside form 2 next');
         console.log("value of list"+component.get('v.valueDataSetIb'));
        action.setParams({
          
            obDataSetIbf3:component.get('v.objectDataSetIb'),
            fieldDataSetIbf3:component.get('v.fieldDataSetIb'),
            optrDataSetIbf3:component.get('v.operatorDataSetIb'),
            valDataSetIbf3:component.get('v.valueDataSetIb'),
            descDataSetIbf3:component.get('v.descDataSetIb')

        });
		
		 action.setCallback(this, function(response){
            var state = response.getState();
            //alert(state);
            if(state === 'SUCCESS' || state === 'DRAFT' ){
			}
                });
		$A.enqueueAction(action);
         console.log("object value is"+component.get('v.objectDataSetIb'));
          console.log("field value is"+component.get('v.fieldDataSetIb'));
          console.log("operator value is"+component.get('v.operatorDataSetIb'));
          console.log("value is"+component.get('v.valueDataSetIb'));
        

       component.set('v.isfieldVisible',false);
         component.set('v.dataSetIBFilter',true);
    },
    doInit : function(component, event, helper) {
        
       // helper.objectlist(component, event, helper);
      // console.log("Product list"+component.get("v.valueProduct"));
        
      var contractservicelst;
 var objectVals = [
            {text:"Account", value: "Account"},
            {text:"Contract", value: "Contract"},
           {text:"Opportunity", value: "Opportunity"}
        ];
 
         var fieldPick = {
            "Account" : [
                {text:"On Time Renewal Percentage", value: "On Time Renewal Percentage"},
                {text:"Previous Lost Opportunities", value: "Previous Lost Opportunities"},
                 {text:"Active Datacenter Care Customer", value: "Active Datacenter Care Customer"},
                 {text:"Exposure", value: "Exposure"},
                 {text:"Country", value: "Country"},
                 {text:"Industry", value: "Industry"},
                 {text:"Product Type", value: "OptyProduct Type"},
                 {text:"Model Description", value: "Model Description"},
                 {text:"Product Line", value: "Product Line"},
                 {text:"Lease Maturity Date", value: "Lease Maturity Date"},
                 {text:"Lease Start Date", value: "Lease Start Date"}
            ],
            "Contract" : [
                {text:"Current Support Service Level", value: "Current Support Service Level"},
                {text:"Support Status", value: "Support Status"},
                 {text:"Contract Expiration Date", value: "Contract Expiration Date"}, 
                 {text:"Product Type", value: "Product Type"},
                 {text:"Product Line", value: "Product Line"},
                 {text:"Support Service Level", value: "Support Service Level"},
                {text:"Contract Start Date", value: "Contract Start Date"},
                 {text:"Route To Market", value: "Route To Market"},
                 {text:"Associated With Opportunity", value: "Associated With Opportunity"},
                 {text:"Document Type", value: "Document Type"},
                 {text:"Support Value", value: "Support Value"}
            ],
             "Opportunity" :[
                 {text:"Last Updated Date", value: "Last Updated Date"},
                {text:"Sales Stage", value: "Sales Stage"},
                 {text:"Opportunity Value", value: "Opportunity Value"},
                 {text:"Opportunity Close Date", value: "Opportunity Close Date"},
                 {text:"Opportunity Type", value: "Opportunity Type"},
                 {text:"Opportunity Status", value: "Opportunity Status"},
                 {text:"Route To Market", value: "Route To Market"},
                 {text:"At Risk Flag", value: "At Risk Flag"},
                 {text:"Close Plan", value: "Close Plan"}
                 
             ]
        };
        
        var operatorlist ={
             
             /****** Account Operator Options*****/
            
              "On Time Renewal Percentage" :[
                  {text:"Equals (=)", value: "Equals (=)", str:"="},
                {text:"Not Equals (!=)", value: "Not Equals", str:"!="},
                  {text:"Greater Than (>)", value: "Greater Than (>)", str:">" }, 
                  {text:"Greater Than Equals (>=)", value: "Greater Than Equals (>=)", str:">="},
                  {text:"Less Than (<)", value: "Less Than (<)", str:"<"},
                  {text:"Less Than Equals (<=)", value: "Less Than Equals (<=)", str:"<="}    
            ],
            "Previous Lost Opportunities":[
                {text:"Equals (=)", value: "LostOptyEqual", str:"="},
                {text:"Not Equals (!=)", value: "LostOptyEqual", str:"!="}
                ],
             "Active Datacenter Care Customer":[
                {text:"Equals (=)", value: "AccDatacenter"},
                {text:"Not Equals (!=)", value: "AccDatacenter"}
                ],
            
              "Exposure" :[
                 {text:"Equals (=)", value: "Equals (=)"},
                {text:"Not Equals (!=)", value: "Not Equals (!=)"},
                 {text:"Greater Than (>)", value: "Greater Than (>)"}, 
                 {text:"Greater Than Equals (>=)", value: "Greater Than Equals (>=)"},
                 {text:"Less Than (<)", value: "Less Than (<)"},
                 {text:"Less Than Equals (<=)", value: "Less Than Equals (<=)"}    
            ],
             "Country":[
                {text:"Includes (IN) ", value: "country"},
                {text:"Not Includes (NOT IN)", value: "Line NOT"}
            ],
            "Industry":[
                {text:"Includes (IN) ", value: "Industry"},
                {text:"Not Includes (NOT IN)", value: "Line NOT"}
            ],
            "OptyProduct Type":[
                {text:"Includes (IN) ", value: "OptyProduct IN"},
                {text:"Not Includes (NOT IN)", value: "Type NOT IN"}
            ],
             "OptyProduct Line":[
                {text:"Includes (IN) ", value: "OptyProduct IN"},
                {text:"Not Includes (NOT IN)", value: "Type NOT IN"}
            ],
             "Product Line":[
                {text:"Includes (IN) ", value: "Line IN"},
                {text:"Not Includes (NOT IN)", value: "Line NOT"}
            ],
             "Lease Maturity Date":[         
                {text:"Not Equals (!=)", value: "Not Equals (!=)"},
                 {text:"Greater Than (>)", value: "Greater Than (>)"}, 
                 {text:"Greater Than Equals (>=)", value: "Greater Than Equals (>=)"},
                 {text:"Less Than (<)", value: "Less Than (<)"},
                 {text:"Less Than Equals (<=)", value: "Less Than Equals (<=)"},
                 {text:"NEXT X DAYS", value: "NEXT X DAYS"},
                {text:"LAST X DAYS", value: "LAST X DAYS"}
            ],
             "Lease Start Date":[         
                {text:"Not Equals (!=)", value: "Not Equals (!=)"},
                 {text:"Greater Than (>)", value: "Greater Than (>)"}, 
                 {text:"Greater Than Equals (>=)", value: "Greater Than Equals (>=)"},
                 {text:"Less Than (<)", value: "Less Than (<)"},
                 {text:"Less Than Equals (<=)", value: "Less Than Equals (<=)"},
                 {text:"NEXT X DAYS", value: "NEXT X DAYS"},
                {text:"LAST X DAYS", value: "LAST X DAYS"}
            ],
            
                /****** Contract Operator Options*****/
            
              "Current Support Service Level" :[
                 {text:"Includes (IN) ", value: "(IN)"},
                {text:"Not Includes (NOT IN)", value: "(NOT IN)"}
            ],
            "Support Status":[
                {text:"Equals (=)", value: "contractStatus"},
                {text:"Not Equals (!=)", value: "contractStatus"}
                ],
            "Contract Expiration Date":[         
                {text:"Not Equals (!=)", value: "Not Equals (!=)"},
                 {text:"Greater Than (>)", value: "Greater Than (>)"}, 
                 {text:"Greater Than Equals (>=)", value: "Greater Than Equals (>=)"},
                 {text:"Less Than (<)", value: "Less Than (<)"},
                 {text:"Less Than Equals (<=)", value: "Less Than Equals (<=)"},
                 {text:"NEXT X DAYS", value: "NEXT X DAYS"},
                {text:"LAST X DAYS", value: "LAST X DAYS"}
            ],
            "Product Type":[
                {text:"Includes (IN) ", value: "Type IN"},
                {text:"Not Includes (NOT IN)", value: "Type NOT IN"}
            ],
             "Product Line":[
                {text:"Includes (IN) ", value: "Line IN"},
                {text:"Not Includes (NOT IN)", value: "Line NOT"}
            ],
            "Support Service Level":[
                {text:"Equals (=)", value: "ServiceLevel Equals"},
                {text:"Not Equals (!=)", value: "ServiceLevel Equals"}
                ],
            "Route To Market":[
                {text:"Equals (=)", value: "RTM Equals"},
                {text:"Not Equals (!=)", value: "RTM Equals"}
            ],
            "Associated With Opportunity":[
                {text:"Equals (=)", value: "contractOptyEquals"},
                {text:"Not Equals (!=)", value: "contractOptyEquals"} 
            ],
             "Document Type":[
                {text:"Equals (=)", value: "DocTypeEquals"},
                {text:"Not Equals (!=)", value: "DocTypeEquals"}
                ],
              "Support Value" :[
                 {text:"Equals (=)", value: "Equals (=)"},
                {text:"Not Equals (!=)", value: "Not Equals (!=)"},
                 {text:"Greater Than (>)", value: "Greater Than (>)"}, 
                 {text:"Greater Than Equals (>=)", value: "Greater Than Equals (>=)"},
                 {text:"Less Than (<)", value: "Less Than (<)"},
                 {text:"Less Than Equals (<=)", value: "Less Than Equals (<=)"}
               
            ],
           
            /****** Opportunity Operator Options*****/
           "Last Updated Date":[         
                {text:"Not Equals (!=)", value: "Not Equals (!=)"},
                 {text:"Greater Than (>)", value: "Greater Than (>)"}, 
                 {text:"Greater Than Equals (>=)", value: "Greater Than Equals (>=)"},
                 {text:"Less Than (<)", value: "Less Than (<)"},
                 {text:"Less Than Equals (<=)", value: "Less Than Equals (<=)"},
                 {text:"NEXT X DAYS", value: "NEXT X DAYS"},
                {text:"LAST X DAYS", value: "LAST X DAYS"}
            ],
             "Sales Stage":[
                {text:"Includes (IN) ", value: "Line IN"},
                {text:"Not Includes (NOT IN)", value: "Line NOT"}
            ],
            "Opportunity Value" :[
                 {text:"Equals (=)", value: "Equals (=)"},
                {text:"Not Equals (!=)", value: "Not Equals (!=)"},
                 {text:"Greater Than (>)", value: "Greater Than (>)"}, 
                 {text:"Greater Than Equals (>=)", value: "Greater Than Equals (>=)"},
                 {text:"Less Than (<)", value: "Less Than (<)"},
                 {text:"Less Than Equals (<=)", value: "Less Than Equals (<=)"}      
            ],
             "Opportunity Close Date":[         
                {text:"Not Equals (!=)", value: "Not Equals (!=)"},
                 {text:"Greater Than (>)", value: "Greater Than (>)"}, 
                 {text:"Greater Than Equals (>=)", value: "Greater Than Equals (>=)"},
                 {text:"Less Than (<)", value: "Less Than (<)"},
                 {text:"Less Than Equals (<=)", value: "Less Than Equals (<=)"},
                 {text:"NEXT X DAYS", value: "NEXT X DAYS"},
                {text:"LAST X DAYS", value: "LAST X DAYS"}
            ],
            "Opportunity Type":[
                {text:"Equals (=)", value: "OptyTypeEquals"},
                {text:"Not Equals (!=)", value: "OptyTypeEquals"}
                ],
            "Opportunity Status":[
                {text:"Equals (=)", value: "OptyStatusEquals"},
                {text:"Not Equals (!=)", value: "OptyStatusEquals"}
                ],
            "At Risk Flag":[
                {text:"Equals (=)", value: "RiskFlagEquals"},
                {text:"Not Equals (!=)", value: "RiskFlagEquals"}
                ],
            "Close Plan":[
                {text:"Equals (=)", value: "RiskFlagEquals"},
                {text:"Not Equals (!=)", value: "RiskFlagEquals"}
                ],
            
        };
        
        var valueList={

            "contractStatus":[
                {text:"Active Contract", value: "Active Contract",selected: false},
                {text:"Non Stop Contract-Expired", value: "Non Stop Contract-Expired",selected: false},
                {text:"Active Flex Support", value: "Active Flex Support",selected: false},
                {text:"Non Stop Contract-Active", value: "Non Stop Contract-Active",selected: false},
                {text:"Active Fixed Support", value: "Active Fixed Support",selected: false},
                {text:"Expired Contract", value: "Expired Contract",selected: false},
                {text:"Expired Flex Support", value: "Expired Flex Support",selected: false},
                 {text:"Expired Fixed Support", value: "Expired Fixed Support",selected: false}
            ],
            
            "RTM Equals":[
                 {text:"Direct", value: "Direct",selected: false},
                {text:"Indirect", value: "Indirect", selected: false},
            ],
                
             "RTM Not Equals":[
                  {text:"Direct", value: "Direct",selected: false},
                {text:"Indirect", value: "Indirect",selected: false},
            ],
            "contractOptyEquals":[
                 {text:"Yes", value: "Yes",selected: false},
                {text:"No", value: "No",selected: false},
            ],
            "ServiceLevel Equals" :[
                {text:"CMS", value: "CMS",selected: false},
                {text:"Foundation Care", value: "Foundation Care",selected: false},
                {text:"Other Service Level", value: "Other Service Level",selected: false},
                {text:"Lifecycle Event Services", value: "Lifecycle Event Services"},
                {text:"Multi Vendor Support", value: "Multi Vendor Support"},
                {text:"Proactive Care Advanced", value: "Proactive Care Advanced"},
                {text:"Proactive Care", value: "Proactive Care"},
                 {text:"Nonstop", value: "Nonstop"},
                 {text:"Foundation Care Legacy", value: "Foundation Care Legacy"},  
                 {text:"Critical Service", value: "Critical Service"},  
                 {text:"Datacenter Care", value: "Datacenter Care"},
                 {text:"Flexible capacity", value: "Flexible capacity"}  
            ],
            "DocTypeEquals" :[
               {text:"Nonstop", value: "Nonstop"},
                {text:"Fixed", value: "Fixed"},
                {text:"ZCGD", value: "ZCGD"},
                {text:"ZCMN", value: "ZCMN"},
                {text:"ZDEL", value: "ZDEL"},
                {text:"ZCGC", value: "ZCGC"},
                {text:"ZCLC", value: "ZCLC"},
                 {text:"ZCGN", value: "ZCGN"},
                 {text:"ZDEP", value: "ZDEP"},  
                 {text:"ZCRP", value: "ZCRP"},  
                 {text:"ZDMN", value: "ZDMN"},
                 {text:"ZCRN", value: "ZCRN"}  
                
            ],
            
            /***** Account Value Options *********/
            
           "LostOptyEqual":[
                 {text:"Yes", value: "Yes"},
                {text:"No", value: "No"},
            ],  
            "AccDatacenter":[
                {text:"Yes", value: "Yes"},
                {text:"No", value: "No"},
               ],
            
                /***** Opportunity Value Options *********/
            "RiskFlagEquals":[
                 {text:"True", value: "True"},
                {text:"False", value: "False"},
            ],
            "OptyStatusEquals":[
                 {text:"Open", value: "Open"},
                {text:"Close", value: "Close"},
            ],
            "OptyTypeEquals" :[
               {text:"Renewal", value: "Renewal"},
                {text:"Defend", value: "Defend"},
                {text:"New Business", value: "New Business"},
                {text:"Win Back", value: "Win Back"},
                {text:"Run Rate", value: "Run Rate"},
                {text:"Up Sell", value: "Up Sell"} 
                ]
        };
        component.set('v.objectOptions', objectVals);
        component.set('v.fieldPicklist', fieldPick);
         component.set('v.operatorPicklist', operatorlist);
        component.set('v.valuePicklist', valueList);
        
        component.set('v.evalobjectOptions', objectVals);
        component.set('v.evalfieldPicklist', fieldPick);
         component.set('v.evaloperatorPicklist', operatorlist);
        component.set('v.evalvaluePicklist', valueList);
        //console.log("value is "+valueList);
       // component.set('v.valuePicklist', valueList);
        //console.log("value is "+component.get("v.valueProduct"));
 
    },
 
    PickChange : function(component, event, helper) {
        var parentValue = component.find('objectPicklist').get('v.value');
         var parentValue = component.get('v.objectEvalCond');
        component.set('v.fieldOptions', component.get('v.fieldPicklist')[parentValue]);
         console.log(component.get('v.fieldOptions'));
        if(parentValue != ''){
            component.set('v.operatorOptions','');
        component.set('v.disabledPick',false);
            }
        else
        component.set('v.disabledPick',true);
    },
    
     evalobjectlst : function(component, event, helper) {
       // var parentValue = component.find('evalobjectPicklist').get('v.value');
         var parentValue = component.get('v.objectEvalCond');
        component.set('v.evalfieldOptions', component.get('v.evalfieldPicklist')[parentValue]);
         console.log(component.get('v.evalfieldOptions'));
         //  component.set('v.valOptions','');
        // console.log("log 3:form4"+component.get('v.valOptions'));
        if(parentValue != ''){
            component.set('v.evaloperatorOptions','');
        component.set('v.disabledPick',false);
            }
        else
        component.set('v.disabledPick',true);
    },
    
     evalChangeField : function(component, event, helper) {
         
          
        var parentValue = component.find('evalfieldlist').get('v.value');
         console.log("parent value of"+parentValue);
         
         component.set("v.selectedField",parentValue);
         //
         if(parentValue=="Current Support Service Level"){
          var action = component.get('c.contractServicelst'); 
        action.setCallback(this, function(response){
            var state = response.getState();
            console.log('state'+state);
            if(state === 'SUCCESS' || state === 'DRAFT' ){
                var responseValue = response.getReturnValue();
              
              // console.log('responseValue'+JSON.stringify(responseValue));
              // component.set("v.contractServLst", responseValue);
                
                component.set('v.valOptions',responseValue);
                    console.log('responseValue'+JSON.stringify(responseValue));        
            }
             });
            $A.enqueueAction(action); 
         }
         
         if(parentValue=="Product Type"){
              var action = component.get('c.contractProdlst'); 
        action.setCallback(this, function(response){
            var state = response.getState();
            console.log('state'+state);
            if(state === 'SUCCESS' || state === 'DRAFT' ){
                var responseValue = response.getReturnValue();
                component.set('v.valOptions',responseValue);
                    console.log('responseValue'+JSON.stringify(responseValue));        
            }
             });
            $A.enqueueAction(action); 
         }
                   if(parentValue=="Product Line"){
              var action = component.get('c.contractProdline'); 
        action.setCallback(this, function(response){
            var state = response.getState();
            console.log('state'+state);
            if(state === 'SUCCESS' || state === 'DRAFT' ){
                var responseValue = response.getReturnValue();
                component.set('v.valOptions',responseValue);
                    console.log('responseValue'+JSON.stringify(responseValue));        
            }
             });
            $A.enqueueAction(action); 
         }   
         if(parentValue=="Industry"){
              var action = component.get('c.accIndustry'); 
        action.setCallback(this, function(response){
            var state = response.getState();
            console.log('state'+state);
            if(state === 'SUCCESS' || state === 'DRAFT' ){
                var responseValue = response.getReturnValue();
                component.set('v.valOptions',responseValue);
                    console.log('responseValue'+JSON.stringify(responseValue));        
            }
             });
            $A.enqueueAction(action); 
         }  
          if(parentValue=="Country"){
              var action = component.get('c.accCountry'); 
        action.setCallback(this, function(response){
            var state = response.getState();
            console.log('state'+state);
            if(state === 'SUCCESS' || state === 'DRAFT' ){
                var responseValue = response.getReturnValue();
                component.set('v.valOptions',responseValue);
                    console.log('responseValue'+JSON.stringify(responseValue));        
            }
             });
            $A.enqueueAction(action); 
          }
         if(parentValue=="OptyProduct Type"){
              var action = component.get('c.accProdType'); 
        action.setCallback(this, function(response){
            var state = response.getState();
            console.log('state'+state);
            if(state === 'SUCCESS' || state === 'DRAFT' ){
                var responseValue = response.getReturnValue();
                component.set('v.valOptions',responseValue);
                    console.log('responseValue'+JSON.stringify(responseValue));        
            }
             });
            $A.enqueueAction(action); 
         }   
         if(parentValue=="Sales Stage"){
              var action = component.get('c.optySalesStage'); 
        action.setCallback(this, function(response){
            var state = response.getState();
            console.log('state'+state);
            if(state === 'SUCCESS' || state === 'DRAFT' ){
                var responseValue = response.getReturnValue();
                component.set('v.valOptions',responseValue);
                    console.log('responseValue'+JSON.stringify(responseValue));        
            }
             });
            $A.enqueueAction(action); 
         }   
     //
         
        component.set('v.evaloperatorOptions', component.get('v.evaloperatorPicklist')[parentValue]);
         
   console.log(component.get('v.evaloperatorOptions'));
          if(parentValue != '')
        component.set('v.disabledPick',false);
        else
        component.set('v.disabledPick',true);
       
    },
     onChangeField : function(component, event, helper) {
         
          
        var parentValue = component.find('fieldlist').get('v.value');
         console.log("parent value of"+parentValue);
         
         component.set("v.selectedField",parentValue);
         //
         if(parentValue=="Current Support Service Level"){
          var action = component.get('c.contractServicelst'); 
        action.setCallback(this, function(response){
            var state = response.getState();
            console.log('state'+state);
            if(state === 'SUCCESS' || state === 'DRAFT' ){
                var responseValue = response.getReturnValue();
              
              // console.log('responseValue'+JSON.stringify(responseValue));
              // component.set("v.contractServLst", responseValue);
                
                component.set('v.valOptions',responseValue);
                    console.log('responseValue'+JSON.stringify(responseValue));        
            }
             });
            $A.enqueueAction(action); 
         }
         
         if(parentValue=="Product Type"){
              var action = component.get('c.contractProdlst'); 
        action.setCallback(this, function(response){
            var state = response.getState();
            console.log('state'+state);
            if(state === 'SUCCESS' || state === 'DRAFT' ){
                var responseValue = response.getReturnValue();
                component.set('v.valOptions',responseValue);
                    console.log('responseValue'+JSON.stringify(responseValue));        
            }
             });
            $A.enqueueAction(action); 
         }
                   if(parentValue=="Product Line"){
              var action = component.get('c.contractProdline'); 
        action.setCallback(this, function(response){
            var state = response.getState();
            console.log('state'+state);
            if(state === 'SUCCESS' || state === 'DRAFT' ){
                var responseValue = response.getReturnValue();
                component.set('v.valOptions',responseValue);
                    console.log('responseValue'+JSON.stringify(responseValue));        
            }
             });
            $A.enqueueAction(action); 
         }   
          if(parentValue=="Country"){
              var action = component.get('c.accCountry'); 
        action.setCallback(this, function(response){
            var state = response.getState();
            console.log('state'+state);
            if(state === 'SUCCESS' || state === 'DRAFT' ){
                var responseValue = response.getReturnValue();
                component.set('v.valOptions',responseValue);
                    console.log('responseValue'+JSON.stringify(responseValue));        
            }
             });
            $A.enqueueAction(action); 
         }   
         if(parentValue=="Industry"){
              var action = component.get('c.accIndustry'); 
        action.setCallback(this, function(response){
            var state = response.getState();
            console.log('state'+state);
            if(state === 'SUCCESS' || state === 'DRAFT' ){
                var responseValue = response.getReturnValue();
                component.set('v.valOptions',responseValue);
                    console.log('responseValue'+JSON.stringify(responseValue));        
            }
             });
            $A.enqueueAction(action); 
         }   
         if(parentValue=="OptyProduct Type"){
              var action = component.get('c.accProdType'); 
        action.setCallback(this, function(response){
            var state = response.getState();
            console.log('state'+state);
            if(state === 'SUCCESS' || state === 'DRAFT' ){
                var responseValue = response.getReturnValue();
                component.set('v.valOptions',responseValue);
                    console.log('responseValue'+JSON.stringify(responseValue));        
            }
             });
            $A.enqueueAction(action); 
         }   
         if(parentValue=="Sales Stage"){
              var action = component.get('c.optySalesStage'); 
        action.setCallback(this, function(response){
            var state = response.getState();
            console.log('state'+state);
            if(state === 'SUCCESS' || state === 'DRAFT' ){
                var responseValue = response.getReturnValue();
                component.set('v.valOptions',responseValue);
                    console.log('responseValue'+JSON.stringify(responseValue));        
            }
             });
            $A.enqueueAction(action); 
         }   
     //
         
        component.set('v.operatorOptions', component.get('v.operatorPicklist')[parentValue]);
         
   console.log(component.get('v.operatorOptions'));
          if(parentValue != '')
        component.set('v.disabledPick',false);
        else
        component.set('v.disabledPick',true);
       
    },
     onChangeOperator : function(component, event, helper) {
         
           var fieldValue = component.find('fieldlist').get('v.value');
         console.log("field value of"+fieldValue);
       
        var parentValue = component.find('operatorlist').get('v.value');
         console.log("parent value of"+parentValue);
 
          if((fieldValue === "Current Support Service Level") || (fieldValue === "Product Type")|| (fieldValue ==="Product Line")||(fieldValue ==="Industry")||(fieldValue ==="Sales Stage")||(fieldValue ==="Country")||(fieldValue ==="OptyProduct Type")){
             console.log("inside field value");      
           }else{
         
         component.set('v.valOptions', component.get('v.valuePicklist')[parentValue]);
         
       console.log("options of val"+JSON.stringify(component.get('v.valuePicklist')[parentValue]));
         
         }
         console.log('option after loop'+JSON.stringify(component.get('v.valOptions')));
         
       if(parentValue != '')
        component.set('v.disabledPick',false);
        else
        component.set('v.disabledPick',true);
    },
         evalChangeOperator : function(component, event, helper) {
         
           var fieldValue = component.find('evalfieldlist').get('v.value');
         console.log("field value of"+fieldValue);
       
        var parentValue = component.find('evaloperatorlist').get('v.value');
         console.log("parent value of"+parentValue);
 
           if((fieldValue === "Current Support Service Level") || (fieldValue === "Product Type")|| (fieldValue ==="Product Line")||(fieldValue ==="Industry")||(fieldValue ==="Sales Stage")||(fieldValue ==="Country")||(fieldValue ==="OptyProduct Type")){
             console.log("inside field value");      
           }else{
       
         component.set('v.valOptions', component.get('v.evalvaluePicklist')[parentValue]);
         
       console.log("options of val"+JSON.stringify(component.get('v.evalvaluePicklist')[parentValue]));
         
         }
         console.log('option after loop'+JSON.stringify(component.get('v.valOptions')));
         
       if(parentValue != '')
        component.set('v.disabledPick',false);
        else
        component.set('v.disabledPick',true);
    },
    
    multiselectVal: function(component, event, helper) {
        var values = helper.getSelectedValues(component);
        console.log("initvalues"+values);
        var labels = helper.getSelectedLabels(component);
        console.log("initlabels"+labels);
        helper.setInfoText(component, values, labels);
    },
       handleMouseLeave: function(component, event, helper) {
        component.set("v.dropdownOver", false);
        var mainDiv = component.find('main-div');
        $A.util.removeClass(mainDiv, 'slds-is-open');
    },
    
    handleMouseEnter: function(component, event, helper) {
        component.set("v.dropdownOver", true);
    },
    
     handleSelection: function(component, event, helper) {
        var item = event.currentTarget;
        console.log("hai item"+JSON.stringify(item));
        if (item && item.dataset) {
            var value = item.dataset.value;
            var selected = item.dataset.selected;
            var options = component.get("v.valOptions");
            console.log('responseValue'+JSON.stringify(options));
            if (event) {
                options.forEach(function(element) {
                    if (element.text === value) {
                        element.selected = selected === "true" ? false : true;
                    }
                });
            } else {
                options.forEach(function(element) {
                    if (element.text === value) {
                        element.selected = selected === "true" ? false : true;
                    } else {
                        element.selected = false;
                    }
                });
                var mainDiv = component.find('main-div');
                $A.util.removeClass(mainDiv, 'slds-is-close');
                  
            }
            component.set("v.valOptions", options);
           
        
            var values = helper.getSelectedValues(component);
            component.set("v.valueDataSetIb",JSON.stringify(values));
            console.log("handle values"+JSON.stringify(values));
            
              component.set("v.valueEvalCond",JSON.stringify(values));
            var labels = helper.getSelectedLabels(component);
            helper.setInfoText(component, values, labels);
           // console.log("handle labels"+JSON.stringify(labels));
            helper.despatchSelectChangeEvent(component, values);
        }
    },
        handleMouseOutButton: function(component, event, helper) {
        window.setTimeout(
            $A.getCallback(function() {
                if (component.isValid()) {
                    //if dropdown over, user has hovered over the dropdown, so don't close.
                    if (component.get("v.dropdownOver")) {
                        return;
                    }
                    var mainDiv = component.find('main-div');
                    $A.util.removeClass(mainDiv, 'slds-is-open');
                }
            }), 200
        );
    },
    
   handleClick: function(component, event, helper) {
        var mainDiv = component.find('main-div');
        $A.util.addClass(mainDiv, 'slds-is-open');
    },
    
    /********* DataSet IB Condition Form3b *********/
        openModelFilter: function(component, event, helper) {
      // Set isModalOpen attribute to true
      component.set("v.isModalOpen", true);
   },
  
   closeModelFilter: function(component, event, helper) {
      // Set isModalOpen attribute to false  
      component.set("v.isModalOpen", false);
   },
    addFilter: function(component, event, helper) {
      // Set isModalOpen attribute to false  
      component.set("v.dataSetCond", true);
       component.set("v.isModalOpen", false);
   },
    /*********Eval Condition Form5 *********/ 
    addEvalFilter:function(component, event, helper){
        component.set("v.evalCond", component.get("v.fieldEvalCond") + component.get("v.operatorEvalCond") + component.get("v.valueEvalCond")); 
   console.log("eval condition is"+component.get("v.evalCond"))
        component.set("v.evalCondition", true);
        component.set("v.isModalOpen", false);
},
        saveEvalCond : function(component, event, helper) {

      /*  var action = component.get("c.storeSessionf3");
        // console.log('inside form 2 next');
         console.log("value of list"+component.get('v.valueDataSetIb'));
        action.setParams({
          
            obDataSetIbf3:component.get('v.objectDataSetIb'),
            fieldDataSetIbf3:component.get('v.fieldDataSetIb'),
            optrDataSetIbf3:component.get('v.operatorDataSetIb'),
            valDataSetIbf3:component.get('v.valueDataSetIb'),
            descDataSetIbf3:component.get('v.descDataSetIb')

        });
		
		 action.setCallback(this, function(response){
            var state = response.getState();
            //alert(state);
            if(state === 'SUCCESS' || state === 'DRAFT' ){
			}
                });
		$A.enqueueAction(action);
         console.log("object value is"+component.get('v.objectDataSetIb'));
          console.log("field value is"+component.get('v.fieldDataSetIb'));
          console.log("operator value is"+component.get('v.operatorDataSetIb'));
          console.log("value is"+component.get('v.valueDataSetIb')); */
        
     /* var sizecount=component.get('v.count');
            sizecount = sizecount+1;
             component.set('v.count',sizecount);
            console.log("count is"+sizecount);*/
       component.set('v.isfieldVisiblef4',false);
         component.set('v.evalCondDataSet',true);
         component.set('v.isIconVisiblef4',true)
         
    },
    
    /***** Final Form ********/
    Prevsecf6: function(component, event, helper) {
        component.set("v.form3b",false);
          component.set("v.form2",false);
        component.set("v.form1",false);  
         component.set("v.form3",false);
        component.set("v.form3a",false);  
        component.set("v.form3c",false);
        component.set("v.form4",false);
        component.set("v.form5",true);
        component.set("v.form6",false); 
    },
    
    Savedraft: function(component, event, helper) {
       
        // var Nameprgm=component.get('v.prgmname');
        
         var programFilter=component.get('c.newprogram');

        programFilter.setParams({
            
              programName:component.get('v.prgmname'),
            programtype:component.get('v.prgmtype'),
            programDesc:component.get('v.prgmdesc'),
            programStartDate:component.get('v.startDate'),
            programEndDate:component.get('v.endDate'),
            campaignName:component.get('v.campselected'),
            programGeo:component.get('v.geo'),
            programAccValue:component.get('v.accValue'),
            programGovernance:component.get('v.prgmGover'),
            programSeismic1:component.get('v.seismicLink1'),
         // programSeismic2:component.get('v.seismicLink2'),
          //  programSeismic3:component.get('v.seismicLink3'),
            programResource1:component.get('v.resourceLink1'),
          //  programResource2:component.get('v.resourceLink2'),
          //  programResource3:component.get('v.resourceLink3'),
            programDescription1:component.get('v.descriptionLink1'),
          //  programDescription2:component.get('v.descriptionLink2'),
          // programDescription3:component.get('v.descriptionLink3'),//
          //  programDescription4:component.get('v.descriptionLink4'),
          //  programDescription5:component.get('v.descriptionLink5'),
          //  programDescription6:component.get('v.descriptionLink6')
            
            obofferingf2:component.get('v.objectOffering'),
            fieldofferingf2:component.get('v.fieldOffering'),
            optrofferingf2:component.get('v.operatorOffering'),
            valofferingf2:component.get('v.valueOffering'),
           // descofferingf2:component.get('v.descOffering'),
           
            obofferingf4:component.get('v.objectEvalCond'),
            fieldofferingf4:component.get('v.fieldEvalCond'),
            optrofferingf4:component.get('v.operatorEvalCond'),
            valofferingf4:component.get('v.valueEvalCond'),
            
            evalcondf5:component.get('v.evalCond'),
            salesplayf5:component.get('v.salesplay'),
            
             recomrankingf5:component.get('v.recomranking'),
            
        });
        console.log("salesplay"+component.get('v.salesplay'));
         console.log("recomranking"+component.get('v.recomranking'));
        programFilter.setCallback(this, function(response) {
           
            var state = response.getState();
           console.log(state);
            if (component.isValid() && state === "SUCCESS"){
                var responseValue = response.getReturnValue();
               console.log('responsevalue of submit'+JSON.stringify(responseValue));
              //  component.set("v.programList",response.getReturnValue());   
               
                
    }
              });
         $A.enqueueAction(programFilter);
    },
   
    openModelDraft: function(component, event, helper) {
      // Set isModalOpen attribute to true
      component.set("v.isModalOpen", true);
         var programFilter=component.get('c.newprogram');

        programFilter.setParams({
            
              programName:component.get('v.prgmname'),
            programtype:component.get('v.prgmtype'),
            programDesc:component.get('v.prgmdesc'),
            programStartDate:component.get('v.startDate'),
            programEndDate:component.get('v.endDate'),
            campaignName:component.get('v.campselected'),
            programGeo:component.get('v.geo'),
            programAccValue:component.get('v.accValue'),
            programGovernance:component.get('v.prgmGover'),
            programSeismic1:component.get('v.seismicLink1'),
         // programSeismic2:component.get('v.seismicLink2'),
          //  programSeismic3:component.get('v.seismicLink3'),
            programResource1:component.get('v.resourceLink1'),
          //  programResource2:component.get('v.resourceLink2'),
          //  programResource3:component.get('v.resourceLink3'),
            programDescription1:component.get('v.descriptionLink1'),
          //  programDescription2:component.get('v.descriptionLink2'),
          // programDescription3:component.get('v.descriptionLink3'),//
          //  programDescription4:component.get('v.descriptionLink4'),
          //  programDescription5:component.get('v.descriptionLink5'),
          //  programDescription6:component.get('v.descriptionLink6')
            
            obofferingf2:component.get('v.objectOffering'),
            fieldofferingf2:component.get('v.fieldOffering'),
            optrofferingf2:component.get('v.operatorOffering'),
            valofferingf2:component.get('v.valueOffering'),
           // descofferingf2:component.get('v.descOffering'),
           
            obofferingf4:component.get('v.objectEvalCond'),
            fieldofferingf4:component.get('v.fieldEvalCond'),
            optrofferingf4:component.get('v.operatorEvalCond'),
            valofferingf4:component.get('v.valueEvalCond'),
            
            evalcondf5:component.get('v.evalCond'),
            salesplayf5:component.get('v.salesplay'),
            
             recomrankingf5:component.get('v.recomranking'),
            
        });
        console.log("salesplay"+component.get('v.salesplay'));
         console.log("recomranking"+component.get('v.recomranking'));
        programFilter.setCallback(this, function(response) {
           
            var state = response.getState();
           console.log(state);
            if (component.isValid() && state === "SUCCESS"){
                var responseValue = response.getReturnValue();
               console.log('responsevalue of submit'+JSON.stringify(responseValue));
                component.set("v.ruleId",responseValue);   
               
                
    }
              });
         $A.enqueueAction(programFilter);
   },
      closeModelDraft: function(component, event, helper) {
      // Set isModalOpen attribute to false  
      component.set("v.isModalOpen", false);
   },
    createNewProgram: function(component, event, helper) {
        var evt = $A.get("e.force:navigateToComponent");
    evt.setParams({
        componentDef : "c:IB_ProgramFlow",       
        componentAttributes: {   
         
        }
    });      
      evt.fire();  
    },
    viewProgram: function(component, event, helper) {
        var ruleid=component.get("v.ruleId");
        console.log("ruleId for detail page"+ruleid);
        var urlEvent = $A.get("e.force:navigateToURL");
    urlEvent.setParams({
      "url": 'https://'+window.location.hostname+'/lightning/n/Program_Detail?c__ruleId='+ruleid
    });
    urlEvent.fire();
    
    },
    viewAllProgram: function(component, event, helper) {
         var urlEvent = $A.get("e.force:navigateToURL");
    urlEvent.setParams({
      "url": 'https://'+window.location.hostname+'/lightning/n/Program_Management'
    });
    urlEvent.fire();
    }
    
})