({
    //get Contact List from apex controller
    doInit : function(component, event, helper) {
        var action = component.get("c.getData");
        action.setParams({
        });

        
        action.setCallback(this, function(response){
            var state = response.getState();
            //alert(state);
            if(state === 'SUCCESS' || state === 'DRAFT' ){
                var responseValue = response.getReturnValue();
               // console.log(result.getReturnValue);
                component.set("v.contactList",responseValue);   
                if(responseValue != null && responseValue.length > 0){
                    component.set("v.totalPages", Math.ceil(response.getReturnValue().length/component.get("v.pageSize")));
                    component.set("v.currentPageNumber",1);
                    
                    helper.buildData (component, helper);
                }else{
                    component.set("v.totalPages", Math.ceil(response.getReturnValue().length/component.get("v.pageSize")));
                    component.set("v.currentPageNumber",0);
                    helper.buildData(component, helper);
                }
            }
        });
        $A.enqueueAction(action);
        
             var defaultColumns=[ 
            
           {label: 'Active',fieldName:'',sortable:'true', type: 'text',value:"1"}, 
            {label: 'User Name',fieldName:'',sortable:'true', type: 'text',value:"2"},  
            {label: 'Emp Id',fieldName:'', sortable:'true',type: 'text',value:"3"},
            {label: 'Email',fieldName:'',sortable:'true',type: 'text',value:"4"},
            {label: 'IBAS/IBS',fieldName:'',sortable:'true', type: 'text',value:"5"},
            {label: 'SmartIB',fieldName:'',sortable:'true',type: 'String',value:"6"},
            {label: 'Digital Seller Assistant',fieldName:'',sortable:'true',type: 'text',value:"7"},
            {label: 'HIT',fieldName:'',sortable:'true',type: 'date',value:"8"},
            {label: 'FLM',fieldName:'',sortable:'true',type: 'date',value:"9"},
            {label: 'Business-Planner',fieldName:'', sortable:'true',type: 'number',value:"10"},
            {label: 'Program Mgm',fieldName:'',sortable:'true',type: 'date',value:"11"}
            
        ];
        
        var availableColumns = ["1", "2","3","4","5","6","7","8","9","10"];
        
        component.set("v.options", defaultColumns);
        component.set("v.values", availableColumns);
    },
       addNew : function(component, event, helper) {
      var evt = $A.get("e.force:navigateToComponent");
    evt.setParams({
        componentDef : "c:AddNewUser",       
        componentAttributes: {     
        }
    });      
      evt.fire();  
    },
     
  opencustomizetable : function(component, event, helper) {
        component.set('v.columnsorder', [
            
           {label: 'Active',fieldName:'',sortable:'true', type: 'text',value:"1"}, 
            {label: 'User Name',fieldName:'',sortable:'true', type: 'text',value:"2"},  
            {label: 'Emp Id',fieldName:'', sortable:'true',type: 'text',value:"3"},
            {label: 'Email',fieldName:'',sortable:'true',type: 'text',value:"4"},
            {label: 'IBAS/IBS',fieldName:'',sortable:'true', type: 'text',value:"5"},
            {label: 'SmartIB',fieldName:'',sortable:'true',type: 'String',value:"6"},
            {label: 'Digital Seller Assistant',fieldName:'',sortable:'true',type: 'text',value:"7"},
            {label: 'HIT',fieldName:'',sortable:'true',type: 'date',value:"8"},
            {label: 'FLM',fieldName:'',sortable:'true',type: 'date',value:"9"},
            {label: 'Business-Planner',fieldName:'', sortable:'true',type: 'number',value:"10"},
            {label: 'Program Mgm',fieldName:'',sortable:'true',type: 'date',value:"11"}
                     
        ]);
        
        component.set("v.iscustomizetableopen", true);
        
    },
    closecustomizetable : function(component, event, helper) {
        component.set("v.iscustomizetableopen", false);
        
    },
     applySelectedColumns: function(component, event, helper){
       
         var usethisvar= component.get('v.globalvar');
        var columnsvar=component.get('v.columnsorder');
        component.set("v.sortedBy", false);
            component.set("v.sortedDirection", false);
        
        var result=[];
  
        for( var i = 0; i < columnsvar.length; i++){ 
            if(columnsvar[i].value == 1 || columnsvar[i].value == 2 || columnsvar[i].value == 3 || columnsvar[i].value == 4 || columnsvar[i].value == 5 || columnsvar[i].value == 6 || columnsvar[i].value == 7 || columnsvar[i].value == 8 || columnsvar[i].value == 9 || columnsvar[i].value == 10 ||  columnsvar[i].value == 11 || columnsvar[i].value == 12 || columnsvar[i].value == 13 || columnsvar[i].value == 14 || columnsvar[i].value == 15 || columnsvar[i].value == 16 || columnsvar[i].value == 17 || columnsvar[i].value == 18 )
            {
                continue;
            }
            var c=0;            
            for ( var j = 0; j < usethisvar.length; j++ ){               
                if ( columnsvar[i].value === usethisvar[j]) {                     
                    break;          
                }
                else{   
                    c++;
                }
            }
            
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
                    
                    columnsvarsorted[j] = columnsvar[i];
                }
            }
        }
        
        component.set("v.columns",columnsvarsorted);
        component.set("v.iscustomizetableopen",false); 
     },
         handleChange: function (cmp, event) {
         
        var selectedOptionValue = event.getParam("value"); 
        var string123 = selectedOptionValue.toString();
        var array123 = JSON.parse("[" + string123 + "]");       
        var refreshvalues;        
        cmp.set('v.globalvar',array123);    
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

})