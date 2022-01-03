public class IB_Opportunity {
    @AuraEnabled
    public static List<SalesProgram__x> programdetails(String rule,String sfdcId){
          string SoqlQueryString;
        List<SalesProgram__x> accountInfo = New List<SalesProgram__x>();
        
        List<User> lstuser = [Select id,Legacy_Employee_Ref__c from User where Id =: userinfo.getUserId() limit 1];
         String lstuser1 = lstuser[0].Legacy_Employee_Ref__c;
        System.debug('Current User '+lstuser1);
        
        
        List<Sales_Territory__c> STID  = [Select MyComp_Id__c FROM Sales_Territory__c WHERE Id =: sfdcId LIMIT 1];
         String STID1 = STID[0].MyComp_Id__c;
        System.debug('Current STID'+STID1);
        List<SalesterritoryRecommendations__x> ruleId = [select ruleId__c from SalesterritoryRecommendations__x where userId__c =: lstuser1 and accountSTID__c =: STID1  and sortedRecommendation__c = 'GreenLake, protect, expand, hunt' and viewAll__c ='false'and ruleName__c =: rule ];
        List<SalesProgram__x> ruleId2 = [select effectiveStartDate__c from SalesProgram__x where ruleId__c =: ruleId[0].ruleId__c ];

        // List<SalesterritoryRecommendations__x> status = [select recommendationFlag__c from SalesterritoryRecommendations__x where userId__c =: lstuser1 and accountSTID__c =: STID1  and sortedRecommendation__c = 'GreenLake, protect, expand, hunt' and viewAll__c ='false'and ruleName__c =: rule ];
        SoqlQueryString = 'select id, CloseDate, account.Account_ST_ID__c, Opportunity_Sales_Stage__c from Opportunity where CloseDate >= \'' + ruleId2[0].effectiveStartDate__c  +'\'';
        
        SoqlQueryString = SoqlQueryString +  'AND account.Account_ST_ID__c = \'' + STID[0].MyComp_Id__c +'\'';
         SoqlQueryString = SoqlQueryString +  'AND  Opportunity_Sales_Stage__c != error ';
        
         if(!Test.isRunningTest())accountInfo=Database.query(SoqlQueryString); 
         if(accountInfo.size()>0)
        {
            for(SalesProgram__x p:accountInfo);
        }    
        //System.debug('< prospectList_Final > '+prospectList_Final);
        return accountInfo;
    } 

}