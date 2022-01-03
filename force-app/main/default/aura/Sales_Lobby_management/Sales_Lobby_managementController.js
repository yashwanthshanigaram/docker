({
	
   	    downloadCsv : function(component,event,helper){

        var stockData = component.get("v.ListOfContact");

        var csv = helper.convertArrayOfObjectsToCSV(component,stockData);   
        console.log("CSV");
        // if (csv == null){return;} 

         var hiddenElement = document.createElement('a');
          hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
          hiddenElement.target = '_self';  
          hiddenElement.download = 'Sample Excel.csv';  
         // document.body.appendChild(hiddenElement);
          hiddenElement.click(); 
        }, 
     uploadFinish: function (cmp, event) {
        // Get the list of uploaded files
        var uploadedFiles = event.getParam("files");
         var fileName = uploadedFiles[0].name;
          
         cmp.set("v.fname",fileName);
         console.log("fileName"+fileName);
         //var file = event.getSource().get("v.files")[0];
         //console.log(file);
         var file = cmp.find("upload").get("v.files")[0];
         if (file) {
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
            console.log("I am here");
            //var result = helper.csv2Json(evt.target.result);
           var csv=evt.target.result;
             console.log('Incoming csv = ' + csv);
        
        //var array = [];
        var arr = []; 
        
        arr =  csv.split('\n');
       // console.log('Array  = '+array);
         console.log('arr = '+arr);
        arr.pop();
        var jsonObj = [];
        var headers = arr[0].split(',');
        for(var i = 1; i < arr.length; i++) {
            var data = arr[i].split(',');
            var obj = {};
            for(var j = 0; j < data.length; j++) {
                obj[headers[j].trim()] = data[j].trim();
                console.log('obj headers = ' + obj[headers[j].trim()]);
            }
            jsonObj.push(obj);
        }
        var json = JSON.stringify(jsonObj);
        console.log('json = '+ json);
            
            cmp.set("v.jsonValue",json);
            
            console.log(JSON.parse(json));
        }
        reader.onerror = function (evt) {
            console.log("error reading file");
        }
    }
         /*
        //alert("Files uploaded : " + uploadedFiles.length);
         var fileName = uploadedFiles[0].name; 
        //var fileName = uploadedFiles[0].files;
        const uploadedFiles1 = event.detail.files;
        alert('No. of files uploaded : ' + uploadedFiles1.length);
         console.log("fileName"+fileName);
         cmp.set("v.fname",fileName);
         //var file = cmp.find("file").getElement();
         //if (event.getSource().get("v.files").length > 0) {
         // var file = event.getSource().get("v.files")[0];
         //var file = uploadedFiles[0].getElement();
         // console.log("file logged is"+file);
           //if (fileName) {
           
        var reader = new FileReader();
       // reader.readAsText(fileName, "UTF-8");
       console.log('reader');
        reader.onload = function () {
            //console.log('reading file'+evt.target.result);
           // var result = helper.CSV2JSON(evt.target.result);
            var fileContents = reader.result;
            console.log("filecontent "+fileContents);
           // console.log(JSON.parse(result));
        }
        reader.onerror = function (evt) {
            console.log("error reading file");
        }
          // }
   // }
        // Get the file name
        //uploadedFiles.forEach(file => console.log(file.name));
        //*/
    },
    
    handleUpload : function(component, event, helper) {
        
         var excelJson=component.get('v.jsonValue');
        console.log("the excel value is"+excelJson);
         var programFilter=component.get("c.insertData");

        programFilter.setParams({
            'jsonstring':excelJson.toString(),    
        });
        
        programFilter.setCallback(this, function(response) {
           
            var state = response.getState();
           console.log(state);
            if (component.isValid() && state === "SUCCESS"){
                //var responseValue = response.getReturnValue();
              // console.log('responsevalue of submit'+JSON.stringify(responseValue));
               // component.set("v.programList",response.getReturnValue());   
                component.find('notifLib').showNotice({
            
                    "message": "File Uploaded Successfully"})
                      
            }  
        });
         $A.enqueueAction(programFilter);
    }, 
        

    /*    //var file = component.find("upload").getElement().files[0];
        //var fileInput = component.get("upload").getElement();
        //var file = fileInput.files[0];
        var fileInput = event.getParam("files");
        console.log("file logged is"+fileInput);
    if (file) {
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
            var result = helper.CSV2JSON(evt.target.result);
            console.log(JSON.parse(result));
        }
        reader.onerror = function (evt) {
            console.log("error reading file");
        }
    }
    },
    handleFilesChange : function(component, event, helper) {
        var fileName = 'No File Selected..';
        var fileOutput = {};

//        if (event.getSource().get("v.files").length > 0) {
            var file = event.getSource().get("v.files")[0];
            fileName = file['name'];
            var reader = new FileReader();
            reader.onload = function(e) {
                var contents = e.target.result;
                fileOutput = JSON.parse(contents);
                //will display the file text in console
                //
                console.log(fileOutput);
                component.set('v.jsonFileText', JSON.stringify(fileOutput)); 
                component.set("v.fileName", fileName);
            }
            reader.readAsText(file);



   //    }
    }*/
    
  handleFilesChange : function(component, event, helper) {
        var fileName = 'No File Selected..';
        var fileOutput = {};
        var contents = '';
        if (event.getSource().get("v.files").length > 0) {
            var action = component.get('c.getString');
            var file = event.getSource().get("v.files")[0];
            fileName = file['name'];
            //fileResult ;
            //console.log(fileResult);
            var reader = new FileReader();
            reader.onload = function(e) {
                var dataURL = reader.result;
                console.log(dataURL);

            }
            reader.readAsText(file);
            var test = reader;
            console.log(test);
            action.setParams({
                contents : test
            });

            action.setCallback(this, function(response){
                if(response.getState() === "SUCCESS"){
                    component.set("v.fileName", fileName);
                }
                else {
                    console.log('NO');
                }
            });
            $A.enqueueAction(action);

        }
    }
})