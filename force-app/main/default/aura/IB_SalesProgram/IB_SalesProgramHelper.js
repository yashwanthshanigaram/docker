({
    loadDisposition : function(component, event, helper) {  
        
        var opts = [
            { value: "Opt out-3 months", label: "Opt out-3 months" },
           { value: "Opt out-6 months", label: "Opt out-6 months" },
		   { value: "Opt out-12 months", label: "Opt out-12 months" },
		   { value: "Cancel Opt out", label: "Cancel Opt out" },
		   { value: "Opt out already Covered", label: "Opt out already Covered" }		 
         ];
         component.set("v.dispositions", opts);
         
    },
    loadCategory: function (component, event, helper) {
        /*var dispositionValues = component.get('v.dispositionValue');
       console.log(dispositionValues);
       if(dispositionValues!='Opt out already Covered'){*/
        var options = [
           { value: "Lost to Competitor", label: "Lost to Competitor" },
           { value: "Lost to self Maintainance", label: "Lost to self Maintainance" },
		   { value: "Refresh or renewal deferred", label: "Refresh or renewal deferred" },
		   { value: "Cancel Opt out", label: "Cancel Opt out" },
		   { value: "Decision Elsewhere", label: "Decision Elsewhere" },	
			{ value: "Not an End Customer ", label: "Not an End Customer " },	
			{ value: "IB data incorrect", label: "IB data incorrect" },	
			{ value: "Technology Consolidation", label: "Technology Consolidation" },	
			{ value: "Vendor  Consolidation", label: "Vendor  Consolidation" },
			{ value: "Move to Cloud", label: "Move to Cloud" },
			{ value: "Other", label: "Other" }
         ];
           component.set("v.categories", options);
       /*else{
            var options =[{ value:"Frame Agreement",label:"Frame Agreement"},
                         { value:"Renewal",label:"Renewal"},
                         { value:"Alternative Technology Preferred",label:"Alternative Technology Preferred"},
                         { value:"Other",label:"Other"}];
                          component.set("v.categories", options);
                          
        }*/
    },
})