({
    loadDisposition : function(component, event, helper) {  
        
        var opts = [
            { value: "Opt Out - 3 Months", label: "Opt out- very short term (3 months)" },
           { value: "Opt Out - 6 Months", label: "Opt out-short term (6 months)" },
		   { value: "Opt Out - 12 Months", label: "Opt out-mid term (12 months)" },
             { value: "Opt Out - Already Covered", label: "Opt out - Long term (5 years) or already Covered" },		 
		   { value: "Cancel Opt Out", label: "Delete Previosly Provided Feedback"}
           
         ];
         component.set("v.dispositions", opts);
         
    },
    loadCategory: function (component, event, helper) {
       
        var options = [
           { value: "Lost to Competitor", label: "Lost to Competitor" },
           { value: "Lost to self Maintainance", label: "Lost to self Maintainance" },
		   { value: "Refresh/Renewal Deferred", label: "Refresh/Renewal Deferred" },
		   { value: "Decision Elsewhere", label: "Decision Elsewhere" },	
			{ value: "Not an End Customer ", label: "Not an End Customer " },	
			{ value: "IB data incorrect", label: "IB data incorrect" },	
			{ value: "Technology Consolidation", label: "Technology Consolidation" },	
			{ value: "Vendor  Consolidation", label: "Vendor  Consolidation" },
			{ value: "Move to Cloud", label: "Move to Cloud" },
            { value: "Merger/Acquisition/Bankruptcy", label: "Merger/Acquisition/Bankruptcy"},
            { value: "Remove All Sales Plays", label: "Remove All Sales Plays"},
			{ value: "Other", label: "Other" }
         ];
           component.set("v.categories", options);
       
    },
})