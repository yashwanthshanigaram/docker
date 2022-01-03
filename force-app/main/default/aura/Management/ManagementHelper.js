({
    buildData : function(component, helper) {
        var data = [];
        var pageNumber = component.get("v.currentPageNumber");
        var pageSize = component.get("v.pageSize");
        var allData = component.get("v.filteredData");
        console.log("allData"+JSON.stringify(allData));
        var x = (pageNumber-1)*pageSize;
        console.log(x);
        
         if(allData!=null){
             for(var i=x; i<(pageNumber)*pageSize; i++){
           console.log("inside for loop");
            if(allData[i]){
                data.push(allData[i]);
            }
            
        }
         }      
        console.log("data"+data);
        component.set("v.contactList", data);
        
        this.generatePageList(component, pageNumber);
    },
    
    
    generatePageList : function(component, pageNumber){
        pageNumber = parseInt(pageNumber);
        var pageList = [];
        var totalPages = component.get("v.totalPages");
        if(totalPages > 1){
            if(totalPages <= 10){
                var counter = 1;
                console.log("counter ==> "+counter);
                for(counter; counter < (totalPages); counter++){
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
        console.log("totalPages=====>"+totalPages);
        console.log("pagelist ---> "+pageList[0]);
    },
      viewRecord : function(component, event, selectedAccountId) {
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            "recordId": selectedAccountId,
            "slideDevName": "detail"
        });
        navEvt.fire();
    },
     
    editRecord : function(component, event, selectedAccountId) {
        var editRecordEvent = $A.get("e.force:editRecord");
        editRecordEvent.setParams({
            "recordId": selectedAccountId
        });
        editRecordEvent.fire();
    },
    refreshView : function(component, event, helper) {
		 $A.get('e.force:refreshView').fire();
	}

})