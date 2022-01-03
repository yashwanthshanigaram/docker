({
    
    init : function(component, event, helper) {
     
	component.set('v.columns', [  
        {label: 'Active', fieldName:'isActive__c',editable:'true',initialWidth : 80, disable:'true', type: 'boolean', value:1},
            {label: 'UserName',fieldName:'userName__c',editable:'true',initialWidth : 80,sortable:'true', type: 'text',value:2},
            {label: 'Legacy Employee Id',fieldName:'userId__c',editable:'true',initialWidth : 150, type:'text',sortable:'true',typeAttributes: {label: { fieldName: 'accountSTName__c'}, target:'_blank'},value:3},   
            {label: 'Email',fieldName:'Email__c',editable:'true',initialWidth : 100, type: 'text',value:4,sortable:'true'},
            {label: 'IBAS/IBS',fieldName:'isActive__c',sortable:'true', typeAttributes:{maximumFractionDigits :'0'},initialWidth : 165,wrapText:'true',type: 'number',value:5},
            {label:'Smart IB',fieldName:'SmartIB__c',sortable:'true',initialWidth : 130, type: 'boolean',value:6},
            {label: 'DigitalSeller Assistant',fieldName:'DSA__c',sortable:'true',initialWidth : 140,  type: 'text',value:7},
            
        {label: 'HIT',fieldName:'HIT__c',sortable:'true', type:'boolean'},
            {label: 'FLM',fieldName:'accountSizeStorage__c',sortable:'true', typeAttributes:{maximumFractionDigits :'0'},initialWidth : 130, type: 'number',value:9}, 
        {label: 'BUssiness Planner',fieldName:'Business_Planner__c',sortable:'true',type:'boolean'},
        {label: 'Program Management',fieldName:'programManagementGeo__c',sortable:'true',type:'text', initialWidth : 100, type: 'number',value:10},
        {label: 'Program Index',fieldName:'Program_Index__c',sortable:'true',type:'boolean' ,initialWidth : 100, type: 'text',value:10},
        {label: 'Program Name',type:'checkbox-button', class :'ProgramName',typeAttributes:{label:{fieldName: 'isActive__c',type:'boolean'},name:{fieldName:'isActive__c'},variant:'base'},sortable:'true'},

                 
        ]);	
        var apps = component.get("v.apps"); 
         
        var action = component.get("c.getData");
        
       // action.setParams({
       // "apps":apps
       // });
        action.setCallback(this, function(response){
           
            var state = response.getState();
             alert(state);
            
            if(state === 'SUCCESS' || state === 'DRAFT' ){

                var responseValue = response.getReturnValue();
                
              
               
                component.set("v.partnerList",responseValue);
                
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
 
    
    
    updateselectedtext: function (cmp, event, helper) {
         var selRows = event.getParam('selectedRows');
        console.log('selRows -> ' + JSON.stringify(selRows));
          //cmp.set("v.selection",false);
        var selectedRowsIds = [];
        for(var i=0;i<selRows.length;i++){
            selectedRowsIds.push(selRows[i].Id); 
            selRows[i].Id = false;
           console.log('selectedRowsIds -> ' + selectedRowsIds);
        } 
        cmp.set()
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
    save:function(component,event, helper){
        
    }
    
  
})