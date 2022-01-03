({


 buildData : function(component, helper) {
        var data = [];
        var pageNumber = component.get("v.currentPageNumber");
        var pageSize = component.get("v.pageSize");
        var allData = component.get("v.salesprogramList");
        var x = (pageNumber-1)*pageSize;
         //creating data-table data
         for(var i=x; i<(pageNumber)*pageSize; i++){
            console.log("inside for loop");
            if(allData[i]){
                data.push(allData[i]);
            }
            
        }
       
         component.set("v.data", data);
        component.set("v.allData",data);
        
        this.generatePageList(component, pageNumber);
    },
    
    /*
     * this function generate page list
     * */
    generatePageList : function(component, pageNumber){
        pageNumber = parseInt(pageNumber);
        var pageList = [];
        var totalPages = component.get("v.totalPages");
        if(totalPages >1){
            if(totalPages <= 10){
                var counter = 1;
                console.log("counter ==> "+counter);
                for(counter; counter < (totalPages); counter++){
                    pageList.push(counter);
                } 
            } else{
                if(pageNumber < 5){
                    pageList.push(2, 3, 4, 5, 6);
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
     sortData: function (cmp, fieldName, sortDirection) {
        var data = cmp.get("v.salesprogramList");
        var reverse = sortDirection !== 'asc';
          if (fieldName == 'link') {
            data.sort(this.sortBy('ruleName__c', reverse))
        } else {
            data.sort(this.sortBy(fieldName, reverse));            
        }
      /*  data = Object.assign([],
            data.sort(this.sortBy(fieldName, reverse ? -1 : 1))
        );*/
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
})