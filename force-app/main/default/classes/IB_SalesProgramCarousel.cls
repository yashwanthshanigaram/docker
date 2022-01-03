public class IB_SalesProgramCarousel {
      @AuraEnabled
    public static List<SalesTerritorySalesProgram__x> getProgramList(Integer offset,Integer limit1,String sfdcId_ST){
        string SoqlQueryString;
        
        List<SalesTerritorySalesProgram__x> program_List = New List<SalesTerritorySalesProgram__x>();
       
        List<User> lstuser = [Select id,Legacy_Employee_Ref__c from User where Id =: userinfo.getUserId() limit 1];
        System.debug('Current user is '+ lstuser);
        System.debug('Current ST is :::: '+sfdcId_ST );
        
         List<Sales_Territory__c> STID = [Select MyComp_Id__c FROM Sales_Territory__c WHERE Id =: sfdcId_ST LIMIT 1];
         List<Account> accountSTID = [Select account_ST_ID__c FROM Account WHERE Id =: sfdcId_ST LIMIT 1];
          System.debug('Current accountSTID is :::: '+accountSTID);
         if(lstuser.size() > 0 && (STID.size() > 0 || accountSTID.size() > 0 )){
        SoqlQueryString = 'SELECT accountSTID__c,CurrencyIsoCode,DisplayUrl,endDate__c,ExternalId,Id,id__c,inActiveReason__c,lastModifiedDate__c,priority__c,programGovernance__c,ranking2__c,ranking__c,recommendationFlag__c,recommendationId__c,recommendationKeyId__c,recommendationKey__c,recommendationLabel__c,recommendationTypeAbbreviation__c,recommendationType__c,recommendationValue__c,recommendation__c,region__c,ruleDescription__c,ruleId__c,ruleName__c,ruleType__c,sortedRecommendation__c,startDate__c,status__c,userId__c FROM SalesTerritorySalesProgram__x where  userId__c =\'' + lstuser[0].Legacy_Employee_Ref__c +'\'';
        }
         if(STID.size()>0){
            SoqlQueryString = SoqlQueryString +' AND accountSTID__c = \'' + STID[0].MyComp_Id__c + '\'';
            
                }else {
                     SoqlQueryString = SoqlQueryString +' AND accountSTID__c = \'' + accountSTID[0].account_ST_ID__c + '\'';
                }
        
        System.debug('date string '+String.valueOf(System.now()));
        System.debug('SOQL query is '+SoqlQueryString);
        //SoqlQueryString = SoqlQueryString + ' LIMIT' +' '+ limit1;
         SoqlQueryString = SoqlQueryString + 'LIMIT 5';
        SoqlQueryString = SoqlQueryString + ' OFFSET' +' '+ offset;
        
        if(!Test.isRunningTest())program_List=Database.query(SoqlQueryString);
        if(program_List.size()>0)
        {
            for(SalesTerritorySalesProgram__x p:program_List);
        }
        
        return program_List;
    }
    @AuraEnabled
    Public static List<SalesTerritorySalesProgram__x> getProgramListCount(String sfdcId_ST){
         string SoqlQueryString;
        
        List<SalesTerritorySalesProgram__x> program_ListCount = New List<SalesTerritorySalesProgram__x>();
        
        List<User> lstuser = [Select id,Legacy_Employee_Ref__c from User where Id =: userinfo.getUserId() limit 1];
        System.debug('Current user is '+ lstuser);
        System.debug('Current ST is :::: '+sfdcId_ST );
         List<Sales_Territory__c> STID = [Select MyComp_Id__c FROM Sales_Territory__c WHERE Id =: sfdcId_ST LIMIT 1];
        if(lstuser.size() > 0 && STID.size() > 0){
           SoqlQueryString = 'SELECT totalRecords__c FROM SalesTerritorySalesProgram__x where  userId__c =\'' + lstuser[0].Legacy_Employee_Ref__c + '\' AND accountSTID__c = \'' + STID[0].MyComp_Id__c + '\'' ;
        }  
        System.debug('SoqlQueryString ProgramCount'+SoqlQueryString);
         if(!Test.isRunningTest())program_ListCount=Database.query(SoqlQueryString);
         if(program_ListCount.size()>0)
        {
            for(SalesTerritorySalesProgram__x p:program_ListCount);
        }
        
        return program_ListCount;
    }
  @AuraEnabled
    public static List<Sales_Territory__c> getSTName(String sfdcId_ST){
        string SoqlQueryString;
        
       // List<SalesTerritorySalesProgram__x> program_List = New List<SalesTerritorySalesProgram__x>();
       
        
       
         List<Sales_Territory__c> STIDDetails = [Select MyComp_Id__c,MyComp_Sales_Territory_Name__c FROM Sales_Territory__c WHERE Id =: sfdcId_ST LIMIT 1];
          List<Account> accountSTID = [Select account_ST_ID__c FROM Account WHERE Id =: sfdcId_ST LIMIT 1];
        // if(lstuser.size() > 0 && STID.size() > 0){
        //}
        
              
        /*if(!Test.isRunningTest())program_List=Database.query(SoqlQueryString);*/
        /*if(STIDDetails.size()>0)
        {
            for(Sales_Territory__c p:STIDDetails);
        }*/
        
        return STIDDetails;
       

    }
}