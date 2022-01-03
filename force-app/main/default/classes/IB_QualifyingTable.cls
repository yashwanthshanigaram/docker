public class IB_QualifyingTable {
      @AuraEnabled
    public static List<ProductsRecommendation__x> programdetails(String rule,String sfdcId){
          string SoqlQueryString;
        List<ProductsRecommendation__x> accountInfo = New List<ProductsRecommendation__x>();
        
        List<User> lstuser = [Select id,Legacy_Employee_Ref__c from User where Id =: userinfo.getUserId() limit 1];
         String lstuser1 = lstuser[0].Legacy_Employee_Ref__c;
        System.debug('Current User '+lstuser1);
        
        
        List<Sales_Territory__c> STID  = [Select MyComp_Id__c FROM Sales_Territory__c WHERE Id =: sfdcId LIMIT 1];
         //String STID1 = STID[0].MyComp_Id__c;
        //System.debug('Current STID'+STID1);
        //List<Account> accountSTID = [Select account_ST_ID__c FROM Account WHERE Id =: sfdcId LIMIT 1];
        //String accountSTID1 = accountSTID[0].account_ST_ID__c;
        // System.debug('Current accountSTID is :::: '+accountSTID1);
       
         List<SalesterritoryRecommendations__x> ruleId = [select ruleId__c from SalesterritoryRecommendations__x where userId__c =: lstuser1 and accountSTID__c =: STID[0].MyComp_Id__c  and sortedRecommendation__c = 'GreenLake, protect, expand, hunt' and viewAll__c ='false'and ruleName__c =: rule ];

        SoqlQueryString = 'SELECT accountSTID__c,assetSoldThrough__c,asset_status__c,businessUnit__c,contractEndDate__c,contractID__c,csv__c,CurrencyIsoCode,customerId__c,customerName__c,DisplayUrl,eosl__c,evaluationConditionId__c,evaluationMessage__c,ExternalId,finalShipDate__c,finalSupportStatusFlag__c,Id,id__c,potentialValue__c,productAgingStatus__c,productCategory__c,productId__c,ProductLine__c,productName__c,productTypeName__c,productType__c,recommendationId__c,recommendationType__c,ruleDescription__c,ruleId__c,ruleType__c,search__c,serialNumber__c,serviceLevel__c,service_sap_end_of_service_date__c,soldToName__c,sortBy__c,sortDirection__c,supported__c,uniqueId__c,warrantyEndDate__c,warrantyExpiration__c FROM ProductsRecommendation__x WHERE ruleId__c = \'' + ruleId[0].ruleId__c +'\'' ;
        SoqlQueryString = SoqlQueryString +' AND userID__c = \'' + lstuser[0].Legacy_Employee_Ref__c + '\'';
        SoqlQueryString = SoqlQueryString +' AND accountSTID__c = \'' + STID[0].MyComp_Id__c + '\'';
        SoqlQueryString = SoqlQueryString +' AND recommendationType__c = '+' '+rule ;
      
         if(accountInfo.size()>0)
        {
            for(ProductsRecommendation__x p:accountInfo);
        }    
        
        return accountInfo;
    } 
    

}