({
	setInfoText: function(component, values, labels) {
        if (labels.length === 0) {
            component.set("v.infoText", "None");
        }
        if (labels.length === 1) {
            component.set("v.infoText", labels[0]);
        }
        else if (labels.length > 1) {
            component.set("v.infoText", labels.length + " options selected");
        }
        component.set("v.selectedItems",values);
    },
    setInfoTextf4: function(component, values, labels) {
        if (labels.length === 0) {
            component.set("v.infoText", "None");
        }
        if (labels.length === 1) {
            component.set("v.infoText", labels[0]);
        }
        else if (labels.length > 1) {
            component.set("v.infoText", labels.length + " options selected");
        }
        component.set("v.selectedItems",values);
    },

    getSelectedValues: function(component){
        var options = component.get("v.valOptions");
       // console.log('options:='+JSON.stringify(options));
        var values = [];
        if(options!==undefined){
            options.forEach(function(element) {
                if (element.selected) {
                    values.push(element.text);
                }
            });
        }
        return values;
    },

    getSelectedLabels: function(component){
        var options = component.get("v.valOptions");
       // console.log('labels:='+JSON.stringify(options));
        var labels = [];
        if(options!==undefined){
            options.forEach(function(element) {
                if (element.selected) {
                    labels.push(element.text);
                }
            });  
        }
        return labels;
    },
    getSelectedValuesf4: function(component){
        var options = component.get("v.valOptionsf4");
       // console.log('options:='+JSON.stringify(options));
        var values = [];
        if(options!==undefined){
            options.forEach(function(element) {
                if (element.selected) {
                    values.push(element.text);
                }
            });
        }
        return values;
    },

    getSelectedLabelsf4: function(component){
        var options = component.get("v.valOptionsf4");
       // console.log('labels:='+JSON.stringify(options));
        var labels = [];
        if(options!==undefined){
            options.forEach(function(element) {
                if (element.selected) {
                    labels.push(element.text);
                }
            });  
        }
        return labels;
    },
    despatchSelectChangeEvent: function(component,values){
        var compEvent = component.getEvent("selectChange");
        compEvent.setParams({ "values": values });
        compEvent.fire();
    },
     despatchSelectChangeEventf4: function(component,values){
        var compEvent = component.getEvent("selectChange");
        compEvent.setParams({ "values": values });
        compEvent.fire();
    }
})