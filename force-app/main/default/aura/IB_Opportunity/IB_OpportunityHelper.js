({
    
    buildData : function(component, helper) {
        
        var data = [];
        var pageNumber = component.get("v.currentPageNumber");
        var pageSize = component.get("v.pageSize");
        var allData = component.get("v.partnerList");
        
        console.log("Selection items"+component.get("v.selection"));
        
       //var Vselected= component.get("v.selection");
        //component.set("v.selection",Vselected);
        
       // var currentPageNumber=component.get("v.currentPageNumber");
        //ar selectedRows= component.find("customerTable").getSelectedRows();
          //console.log("Inside if"+JSON.stringify(selectedRows));
        
       
        var x = (pageNumber-1)*pageSize;
        
        for(var i=x; i<(pageNumber)*pageSize; i++){
            console.log("inside for loop");
            if(allData[i]){
                data.push(allData[i]);
            }
            
        }
       
        
            component.set("v.data", data); 
       
      
        this.generatePageList(component, pageNumber);
    },
    
    
    generatePageList : function(component, pageNumber){
        pageNumber = parseInt(pageNumber);
        var pageList = [];
        var totalPages = component.get("v.totalPages");
        if(totalPages >1){
            if(totalPages <= 10){
                var counter = 1;
                for(; counter < (totalPages); counter++){
                    pageList.push(counter);
                } 
            } else{
                if(pageNumber < 5){
                    pageList.push(1, 2, 3, 4, 5, 6);
                } else{
                    if(pageNumber>(totalPages-5)){
                        pageList.push(totalPages-5, totalPages-4, totalPages-3, totalPages-2, totalPages-1);
                    } else{
                        pageList.push(pageNumber-2, pageNumber-1, pageNumber, pageNumber+1, pageNumber+2);
                    }
                }
            }
        }
        component.set("v.pageList", pageList);
    },
    
    sortData: function (cmp, fieldName, sortDirection) {
        var data = cmp.get("v.partnerList");//updated allData
        console.log(data.length);
        var reverse = sortDirection !== 'asc';
        if (fieldName == 'link') {
            data.sort(this.sortBy('accountSTName__c', reverse))
        } else {
            data.sort(this.sortBy(fieldName, reverse));            
        }
       
       cmp.set("v.data", data);
       if(data!= null && data.length > 0){
           cmp.set("v.totalPages", Math.ceil(data.length/cmp.get("v.pageSize")));
           cmp.set("v.currentPageNumber",1);
           this.buildData(cmp);
       }
       
   },
    
    
    sortBy: function (field, reverse, primer) {
        var key = primer
        ? function(x) {
            return primer(x[field]);
        }
        : function(x) {
            return x[field];
        };
        reverse = !reverse ? 1 : -1;
        return function (a, b) {
            var A = key(a);
            var B = key(b);
            return reverse * ((A > B) - (B > A));
        };
        
        
        
    },
    loadData:function(component, event, helper){
         var rule = component.get("v.search");
		console.log("ruleName" + rule);
		var sfdcId_ST = component.get('v.recordId');
		console.log("sfdcId"+sfdcId_ST);
        var  action = component.get('c.ProgramCampaign');
          action.setParams({'rule':rule,'sfdcId':sfdcId_ST
});
             action.setCallback(this, function(response){
              var state = response.getState();
            // alert(state);
               if(state === 'SUCCESS' || state === 'DRAFT' ){
              var programcampaigns = response.getReturnValue();
              console.log('programresponseValue', JSON.stringify(programcampaigns));
                
              component.set("v.campaign", programcampaigns); 
                   var campaign = component.get('v.campaign');
               console.log("campaign"+campaign);
                   
                       }
    });
        $A.enqueueAction(action);
        
    }
    
  
    
})