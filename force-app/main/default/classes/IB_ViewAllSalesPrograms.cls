public class IB_ViewAllSalesPrograms {
   @AuraEnabled
    public static List<SalesterritoryRecommendations__x> fetchSalesPrograms(String sfdcId_ST){
        string SoqlQueryString;
        
        List<SalesterritoryRecommendations__x> program_List = New List<SalesterritoryRecommendations__x>();
        
        List<User> lstuser = [Select id,Legacy_Employee_Ref__c from User where Id =: userinfo.getUserId() limit 1];
        System.debug('Current user is '+ lstuser);
        System.debug('Current ST is :::: '+sfdcId_ST );
         List<Sales_Territory__c> STID = [Select MyComp_Id__c FROM Sales_Territory__c WHERE Id =: sfdcId_ST LIMIT 1];
           List<Account> accountSTID = [Select account_ST_ID__c FROM Account WHERE Id =: sfdcId_ST LIMIT 1];
         accountSTID1 = accountSTID[0].account_ST_ID__c;
         System.debug('Current accountSTID is :::: '+accountSTID);
         if(lstuser.size() > 0 && (STID.size() > 0 )){
        SoqlQueryString = 'SELECT recommendationFlag__c,recommendationKey__c,recommendationValue__c,ruleDescription__c,ruleName__c,ruleType__c FROM SalesterritoryRecommendations__x   WHERE userId__c = \'' + lstuser[0].Legacy_Employee_Ref__c + '\'';
        }
        //SoqlQueryString = 'SELECT id,ruleName__c FROM SalesterritoryRecommendations__x where userId__c = \'' + lstuser[0].Legacy_Employee_Ref__c + '\'';
        if(STID.size()>0){
            SoqlQueryString = SoqlQueryString +' AND accountSTID__c = \'' + STID[0].MyComp_Id__c + '\'';
            
                }else{
                     SoqlQueryString = SoqlQueryString +' AND accountSTID__c = \'' + accountSTID[0].account_ST_ID__c + '\'';
                }
        System.debug('date string '+String.valueOf(System.now()));
        System.debug('SOQL query is '+SoqlQueryString);
        //SoqlQueryString = SoqlQueryString + 'AND accountSTID__c = \'All\'';
        SoqlQueryString = SoqlQueryString + 'AND sortedRecommendation__c  = \'GreenLake, protect, expand, hunt\'';
        SoqlQueryString = SoqlQueryString + 'AND viewAll__c  = \'false\'';
         System.debug('SOQL query is '+SoqlQueryString);
        
        
     
        if(!Test.isRunningTest())program_List=Database.query(SoqlQueryString);
        if(program_List.size()>0)
        {
            for(SalesterritoryRecommendations__x p:program_List);
        }
        
        return program_List;
    }
    
}