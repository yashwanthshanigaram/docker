public class Management2 {
     @AuraEnabled
        Public static List< IBNextUserAuthorization__x> getData(String SearchStr,string tablesearch){
         string SoqlQueryString;
         List<IBNextUserAuthorization__x> accountInfo = New List<IBNextUserAuthorization__x>();
           // return [SELECT apps__c,Business_Planner__c,createdDate__c,CurrencyIsoCode,DisplayUrl,DSA__c,DS__c,Email__c,ExternalId,filterBy__c,HIT__c,Id,id__c,isActive__c,isEnabled__c,lastModifiedDate__c,page__c,programIndexGeo__c,programManagementGeo__c,Program_Index__c,search__c,SmartIB_Management__c,SmartIB__c,userAccessLevel__c,UserAccessValue_UI__c,userAccessValue__c,userDomainId__c,userId__c,userName__c,userNtRegion__c FROM IBNextUserAuthorization__x LIMIT 1000];
    
      SoqlQueryString = 'SELECT apps__c,Business_Planner__c,createdDate__c,CurrencyIsoCode,DisplayUrl,DSA__c,DS__c,Email__c,ExternalId,filterBy__c,HIT__c,Id,id__c,isActive__c,isEnabled__c,lastModifiedDate__c,page__c,programIndexGeo__c,programManagementGeo__c,Program_Index__c,search__c,SmartIB_Management__c,SmartIB__c,userAccessLevel__c,UserAccessValue_UI__c,userAccessValue__c,userDomainId__c,userId__c,userName__c,userNtRegion__c FROM IBNextUserAuthorization__x';
       if(!String.Isblank(SearchStr)) SoqlQueryString = SoqlQueryString +  '  WHERE filterBy__c = \'' + SearchStr +'\''+'  AND isEnabled__c = \'true\'';
       if(!String.Isblank(tablesearch)) SoqlQueryString = SoqlQueryString +  '  AND search__c = \'' + tablesearch +'\'';
       //SoqlQueryString = SoqlQueryString +  '  AND isEnabled__c = \'true\'';
        SoqlQueryString = SoqlQueryString +  '  LIMIT 1000';
         System.debug('SOQL query is  '+SoqlQueryString);

        if(!Test.isRunningTest())accountInfo=Database.query(SoqlQueryString); 
            System.debug('date string '+String.valueOf(System.now())); 
            
 return accountInfo;
}
       /*@AuraEnabled
    public static List<IBNextUserAuthorization__x> appCustomWrapListMthd(){
       List<IBNextUserAuthorization__x> newStudent = new List<IBNextUserAuthorization__x>();       
       List<IBNextUserAuthorization__x> custWrapObj = new  List<IBNextUserAuthorization__x>();            
       List<IBNextUserAuthorization__x> newStudentView =[Select Id, userName__c, Email__c From IBNextUserAuthorization__x];
            
        for(IBNextUserAuthorization__x studentObj:newStudentView){            
           custWrapObj.add(new IBNextUserAuthorization__x(studentObj.userName__c, studentObj.Email__c,studentObj.Id, false));   
        }
        return custWrapObj;
    }*/
     @AuraEnabled
    public static IBNextUserAuthorization__x saveEdited(string active, string DSA, string smartib, String HIT ,Id recId){
        system.debug('==recId=='+recId);
        
        IBNextUserAuthorization__x newStudentView =[Select Id, userName__c, Email__c,DSA__c,apps__c From IBNextUserAuthorization__x Where Id=:recId];
        newStudentView.DSA__c = DSA;
        newStudentView.HIT__c= HIT;
        newStudentView.SmartIB__c= smartib;
        update newStudentView;
        return newStudentView;        
    }

}