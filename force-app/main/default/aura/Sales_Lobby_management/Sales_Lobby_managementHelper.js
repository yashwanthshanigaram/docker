({
  convertArrayOfObjectsToCSV : function(component,objectRecords){
        var csvStringResult, counter, keys, columnDivider, lineDivider;


       /* if (objectRecords == null || !objectRecords.length) {
            return null;
         }*/

        columnDivider = ',';
        lineDivider =  '\n';

        keys = ['Product_Line','Growth_Area_Model'];

        csvStringResult = '';
        csvStringResult += keys.join(columnDivider);
        csvStringResult += lineDivider;

        for(var i=0; i < objectRecords.length; i++){   
            counter = 0;

             for(var sTempkey in keys) {
                var skey = keys[sTempkey] ;  

                  if(counter > 0){ 
                      csvStringResult += columnDivider; 
                   }   

               csvStringResult += '"'+ objectRecords[i][skey]+'"'; 

               counter++;

            } 
             csvStringResult += lineDivider;
          } 

        return csvStringResult;        
    },
})