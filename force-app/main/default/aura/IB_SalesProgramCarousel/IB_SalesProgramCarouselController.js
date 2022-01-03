({
  
    doInit : function(component, event, helper) {
         var sfdcId_ST = component.get('v.recordId');
         console.log("sfdcId"+sfdcId_ST);
        var navService = component.find("navService");
        
   

         var sfdcId_ST = component.get('v.recordId');
         console.log("sfdcId"+sfdcId_ST);
         var offset = component.get('v.offset');
         var limit = component.get('v.limit');
        var action = component.get("c.getProgramList");
       action.setParams({'limit1':limit,'offset':offset,'sfdcId_ST':sfdcId_ST
        });
       
        action.setCallback(this, function(result){
            var state = result.getState();
            //alert(state);
            console.log(state);
            if (component.isValid() && state === "SUCCESS"){
                console.log("programlist"+result.getReturnValue());
                component.set("v.programList",result.getReturnValue());   
            }
            component.set("v.symbol","<");
        });
        $A.enqueueAction(action);
        
       var action = component.get("c.getProgramListCount");
       action.setParams({'sfdcId_ST':sfdcId_ST
        });
       
        action.setCallback(this, function(result){
            var state = result.getState();
            //(state);
            if (component.isValid() && state === "SUCCESS"){
                component.set("v.programListCount",result.getReturnValue()); 
               
               
            }
            component.set("v.symbol","<");
           
        });
        $A.enqueueAction(action);
         var action = component.get("c.getSTName");
       action.setParams({'sfdcId_ST':sfdcId_ST
        });
       
        action.setCallback(this, function(result){
            var state = result.getState();
            //alert(state);
            
            if (component.isValid() && state === "SUCCESS"){
                component.set("v.stdetails",result.getReturnValue()); 
               
               
            }
            
        });
        $A.enqueueAction(action);
        
    },
     loadMorePrograms : function(component, event, helper) {
           var sfdcId_ST = component.get('v.recordId');
         console.log("sfdcId"+sfdcId_ST);
         var offset = component.get('v.offset');
         var limit = component.get('v.limit');
         
         var step = limit-offset;
        var name = event.getSource().get("v.name");
         console.log('name'+name);

         if(name =='next'){
            
             offset = offset+step;
             limit= limit+step;
             
         }else{
            
             offset = offset-step;
             limit= limit-step;
             
         }
        
         console.log('limit::'+limit +'offset::'+offset );
         var action = component.get("c.getProgramList");
        action.setParams({ 'limit1':limit,'offset':offset,'sfdcId_ST':sfdcId_ST
        });
        action.setCallback(this, function(result){
            var state = result.getState();
            if (component.isValid() && state === "SUCCESS"){
                component.set("v.programList",result.getReturnValue());   
            }
            component.set("v.symbol","<");
            component.set('v.offset',offset); 
            component.set('v.limit',limit);
        });
        $A.enqueueAction(action);
     },
     openModel: function(component, event, helper) {
      // Set isModalOpen attribute to true
      component.set("v.isModalOpen", true);
   },
  
   closeModel: function(component, event, helper) {
      // Set isModalOpen attribute to false  
      component.set("v.isModalOpen", false);
   },
    navigate: function(cmp, event, helper){
        //alert();
      cmp.set("v.tabId", "four");
      var navService = cmp.find("navService");
     
        var pageReference = cmp.get("v.pageReference");
        //  console.log('pageReference:'+JSON.stringify(pageReference));
       event.preventDefault();
        
        navService.navigate(pageReference); 
    },
     toggleOptionalTab: function (cmp) {
        cmp.set("v.tabId", "four");
    },
     loadTabs: function (cmp, event) {
        var tab = event.getSource();
        switch (tab.get('v.id')) {
            case 'accounts' :
                this.injectComponent('c:IB_ViewAllSalesPrograms', tab);
                break;
            case 'cases' :
                this.injectComponent('c:myCaseComponent', tab);
                break;
        }
    },
    injectComponent: function (name, target) {
        $A.createComponent(name, {
        }, function (contentComponent, status, error) {
            if (status === "SUCCESS") {
                target.set('v.body', contentComponent);
            } else {
                throw new Error(error);
            }
        });
    },
    handleClick: function(cmp) {
        cmp.set("v.tabId", "one");
    },
    handleChange: function(cmp) {
        //Display content on the Item Three tab
        var selected = cmp.get("v.tabId");
        cmp.find("tabs").set("v.selectedTabId", selected);
    },
    navigate1:function(cmp,event,helper){
       console.log(event); 
      var index = event.target.dataset.index;
        console.log(index);
         var thisObjId = event.target.dataset.sfid;
        console.log(thisObjId);
        cmp.set("v.search",thisObjId);
         var thisId = event.target.id;
        console.log(thisId);
       
       
       
       
         cmp.set("v.isModalOpen",true);
        
    }
      
     

        
     
 
})