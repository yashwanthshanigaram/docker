public class IB_SalesProgramDetails {
    @AuraEnabled
    public static List<SalesProgram__x> programdetails(String rule,String sfdcId,String accountstid1){
          string SoqlQueryString;
        List<SalesProgram__x> accountInfo = New List<SalesProgram__x>();
        
        List<User> lstuser = [Select id,Legacy_Employee_Ref__c from User where Id =: userinfo.getUserId() limit 1];
         String lstuser1 = lstuser[0].Legacy_Employee_Ref__c;
        System.debug('Current User '+lstuser1);
        
        
        List<Sales_Territory__c> STID  = [Select MyComp_Id__c FROM Sales_Territory__c WHERE Id =: sfdcId LIMIT 1];
        List<Account> accountSTID = [Select account_ST_ID__c FROM Account WHERE Id =: sfdcId LIMIT 1];
       
        if(STID.size()>0){
                   List<SalesterritoryRecommendations__x> ruleId = [select ruleId__c from SalesterritoryRecommendations__x where userId__c =: lstuser1 and accountSTID__c =: STID[0].MyComp_Id__c  and sortedRecommendation__c = 'GreenLake, protect, expand, hunt' and viewAll__c ='false'and ruleName__c =: rule ];

                    SoqlQueryString = 'SELECT ruleName__c,SeismicLink_First_desc__c,SeismicLink_Second_desc__c,SeismicLink_Third_desc__c,ResourceLink_First_desc__c,ResourceLink_Second_desc__c,ResourceLink_Third_desc__c,ResourceLink_First__c,ResourceLink_Second__c,ResourceLink_Third__c,SeismicLink_First__c,SeismicLink_Second__c,SeismicLink_Third__c,recommendationValue__c,ruleType__c,productLine__c,description__c FROM SalesProgram__x   WHERE ruleId__c = \'' + ruleId[0].ruleId__c +'\'' ;

                }else{
                    List<SalesterritoryRecommendations__x> ruleId = [select ruleId__c from SalesterritoryRecommendations__x where userId__c =: lstuser1 and accountSTID__c =: accountSTID[0].account_ST_ID__c  and sortedRecommendation__c = 'GreenLake, protect, expand, hunt' and viewAll__c ='false'and ruleName__c =: rule ];

                    SoqlQueryString = 'SELECT ruleName__c,SeismicLink_First_desc__c,SeismicLink_Second_desc__c,SeismicLink_Third_desc__c,ResourceLink_First_desc__c,ResourceLink_Second_desc__c,ResourceLink_Third_desc__c,ResourceLink_First__c,ResourceLink_Second__c,ResourceLink_Third__c,SeismicLink_First__c,SeismicLink_Second__c,SeismicLink_Third__c,recommendationValue__c,ruleType__c,productLine__c,description__c FROM SalesProgram__x   WHERE ruleId__c = \'' + ruleId[0].ruleId__c +'\'' ;

                }
        if(!Test.isRunningTest())accountInfo=Database.query(SoqlQueryString); 
         if(accountInfo.size()>0)
        {
            for(SalesProgram__x p:accountInfo);
        }    
        
        return accountInfo;
    } 
      @AuraEnabled
    public static String programstatus(String rule,String sfdcId){
          string SoqlQueryString;
        List<SalesterritoryRecommendations__x> status = New List<SalesterritoryRecommendations__x>();
        
        List<User> lstuser = [Select id,Legacy_Employee_Ref__c from User where Id =: userinfo.getUserId() limit 1];
         String lstuser1 = lstuser[0].Legacy_Employee_Ref__c;
        System.debug('Current User '+lstuser1);
        
        
        List<Sales_Territory__c> STID = [Select MyComp_Id__c FROM Sales_Territory__c WHERE Id =: sfdcId LIMIT 1];
        List<Account> accountSTID = [Select account_ST_ID__c FROM Account WHERE Id =: sfdcId LIMIT 1];
        if(STID.size()>0){

status = [select recommendationFlag__c from SalesterritoryRecommendations__x where userId__c =: lstuser1 and accountSTID__c =: STID[0].MyComp_Id__c  and sortedRecommendation__c = 'GreenLake, protect, expand, hunt' and viewAll__c ='false'and ruleName__c =: rule ];
                }else{

status = [select recommendationFlag__c from SalesterritoryRecommendations__x where userId__c =: lstuser1 and accountSTID__c =: accountSTID[0].account_ST_ID__c  and sortedRecommendation__c = 'GreenLake, protect, expand, hunt' and viewAll__c ='false'and ruleName__c =: rule ];
                }
             System.debug('Current  Status '+status);
        String status1 = status[0].recommendationFlag__c;
          SoqlQueryString = status1;
         System.debug('soql query'+SoqlQueryString);
        
        
        return SoqlQueryString;
    } 
    
    @AuraEnabled
   public static List<IBProductRecommendation__x> download(String sfdcId, String rule){
        string SoqlQueryString;
        
        List<IBProductRecommendation__x> downloadfile = New List<IBProductRecommendation__x>();
        
        List<User> lstuser = [Select id,Legacy_Employee_Ref__c from User where Id =: userinfo.getUserId() limit 1];
        String lstuser1 = lstuser[0].Legacy_Employee_Ref__c;
        List<Sales_Territory__c> STID  = [Select MyComp_Id__c FROM Sales_Territory__c WHERE Id =: sfdcId LIMIT 1];
        
        List<Account> accountSTID = [Select account_ST_ID__c FROM Account WHERE Id =: sfdcId LIMIT 1];
       List<SalesterritoryRecommendations__x> ruleId = [select ruleId__c from SalesterritoryRecommendations__x where userId__c =: lstuser1 and accountSTID__c =: STID[0].MyComp_Id__c  and sortedRecommendation__c = 'GreenLake, protect, expand, hunt' and viewAll__c ='false'and ruleName__c =: rule ];
         List<SalesterritoryRecommendations__x> recommendationType = [select recommendationType__c from SalesterritoryRecommendations__x where userId__c =: lstuser1 and accountSTID__c =: STID[0].MyComp_Id__c  and sortedRecommendation__c = 'GreenLake, protect, expand, hunt' and viewAll__c ='false'and ruleName__c =: rule ];
       
        System.debug('Current user is  '+ lstuser);
        SoqlQueryString = 'SELECT accountSTID__c,assetSoldThrough__c,asset_status__c,businessUnit__c,contractEndDate__c,contractID__c,csv__c,CurrencyIsoCode,customerId__c,customerName__c,DisplayUrl,eosl__c,evaluationConditionId__c,evaluationMessage__c,ExternalId,finalShipDate__c,finalSupportStatusFlag__c,Id,id__c,potentialValue__c,productAgingStatus__c,productCategory__c,productId__c,ProductLine__c,productName__c,productTypeName__c,productType__c,recommendationId__c,recommendationType__c,ruleDescription__c,ruleId__c,ruleType__c,search__c,serialNumber__c,serviceLevel__c,service_sap_end_of_service_date__c,soldToName__c,sortBy__c,sortDirection__c,supported__c,uniqueId__c,warrantyEndDate__c,warrantyExpiration__c FROM  IBProductRecommendation__x Where userId__c = \'' + lstuser[0].Legacy_Employee_Ref__c + '\'';
        if(STID.size()>0){
            SoqlQueryString = SoqlQueryString +' AND accountSTID__c = \'' + STID[0].MyComp_Id__c + '\'';}
        else{
            SoqlQueryString = SoqlQueryString +' AND accountSTID__c = \'' + accountSTID[0].account_ST_ID__c + '\''; 
        }
        SoqlQueryString = SoqlQueryString +' AND recommendationType__c = \'' + recommendationType[0].recommendationType__c + '\'' ;

        System.debug('date string '+String.valueOf(System.now()));
        System.debug('SOQL query is  '+SoqlQueryString);
        SoqlQueryString = SoqlQueryString + '  AND csv__c = \'true\'';
        if(!Test.isRunningTest())downloadfile=Database.query(SoqlQueryString);         
        if(downloadfile.size()>0)
        {
            for( IBProductRecommendation__x p:downloadfile);
        }    
       
        return downloadfile;
     
    }
    
    /*rfi*/
        @AuraEnabled
    public static List<SalesterritoryRecommendations__x> fetchSalesPrograms(String rule,String sfdcId_ST){
        string SoqlQueryString;
        
        List<SalesterritoryRecommendations__x> program_List = New List<SalesterritoryRecommendations__x>();
        
        List<User> lstuser = [Select id,Legacy_Employee_Ref__c from User where Id =: userinfo.getUserId() limit 1];
         String lstuser1 = lstuser[0].Legacy_Employee_Ref__c;
        System.debug('Current user is '+ lstuser);
        System.debug('Current ST is :::: '+sfdcId_ST );
         List<Sales_Territory__c> STID = [Select MyComp_Id__c FROM Sales_Territory__c WHERE Id =: sfdcId_ST LIMIT 1];
           System.debug('Current accountSTID is :::: '+STID);
       
          List<Account> accountSTID = [Select account_ST_ID__c FROM Account WHERE Id =: sfdcId_ST LIMIT 1];
        
        System.debug('size:'+STID.size());
          if(STID.size()>0){
          List<SalesterritoryRecommendations__x> ruleId = [select ruleId__c from SalesterritoryRecommendations__x where userId__c =: lstuser1 and accountSTID__c =: STID[0].MyComp_Id__c  and sortedRecommendation__c = 'GreenLake, protect, expand, hunt' and viewAll__c ='false'and ruleName__c =: rule ];
            
                }else{
          List<SalesterritoryRecommendations__x> ruleId = [select ruleId__c from SalesterritoryRecommendations__x where userId__c =: lstuser1 and accountSTID__c =: accountSTID[0].account_ST_ID__c  and sortedRecommendation__c = 'GreenLake, protect, expand, hunt' and viewAll__c ='false'and ruleName__c =: rule ];
                }
          //List<SalesterritoryRecommendations__x> ruleId = [select ruleId__c from SalesterritoryRecommendations__x where userId__c =: lstuser1 and accountSTID__c =: STID1  and sortedRecommendation__c = 'GreenLake, protect, expand, hunt' and viewAll__c ='false'and ruleName__c =: rule ];
        if(lstuser.size() > 0 && (STID.size() > 0 || accountSTID.size() > 0) ){
        SoqlQueryString = 'SELECT recommendationFlag__c,recommendationKey__c,recommendationValue__c,ruleDescription__c,ruleName__c,ruleType__c FROM SalesterritoryRecommendations__x   WHERE userId__c =\'' + lstuser[0].Legacy_Employee_Ref__c + '\'';
        }
        if(STID.size()>0){
            SoqlQueryString = SoqlQueryString +' AND accountSTID__c = \'' + STID[0].MyComp_Id__c + '\'';
            
                }else{
                     SoqlQueryString = SoqlQueryString +' AND accountSTID__c = \'' + accountSTID[0].account_ST_ID__c + '\'';
                }
     
        System.debug('date string '+String.valueOf(System.now()));
        System.debug('SOQL query is '+SoqlQueryString);
        
         SoqlQueryString = SoqlQueryString + 'AND ruleName__c  = \''+rule+'\'';
        SoqlQueryString = SoqlQueryString + 'AND sortedRecommendation__c  = \'GreenLake, protect, expand, hunt\'';
        SoqlQueryString = SoqlQueryString + 'AND viewAll__c  = \'false\'';
        
        
     
        if(!Test.isRunningTest())program_List=Database.query(SoqlQueryString);
        if(program_List.size()>0)
        {
            for(SalesterritoryRecommendations__x p:program_List);
        }
        
        return program_List;
    }
    /*qualifyingIB*/
      @AuraEnabled
    public static List<IBProductRecommendation__x> fetchQualifyingIB(String rule,String sfdcId){
          string SoqlQueryString;
        List<IBProductRecommendation__x> accountInfo = New List<IBProductRecommendation__x>();
        
        List<User> lstuser = [Select id,Legacy_Employee_Ref__c from User where Id =: userinfo.getUserId() limit 1];
         String lstuser1 = lstuser[0].Legacy_Employee_Ref__c;
        System.debug('Current User '+lstuser1);
        
        
        List<Sales_Territory__c> STID  = [Select MyComp_Id__c FROM Sales_Territory__c WHERE Id =: sfdcId LIMIT 1];
        
        List<Account> accountSTID = [Select account_ST_ID__c FROM Account WHERE Id =: sfdcId LIMIT 1];
       
         List<SalesterritoryRecommendations__x> ruleId = [select ruleId__c from SalesterritoryRecommendations__x where userId__c =: lstuser1 and accountSTID__c =: STID[0].MyComp_Id__c  and sortedRecommendation__c = 'GreenLake, protect, expand, hunt' and viewAll__c ='false'and ruleName__c =: rule ];
         List<SalesterritoryRecommendations__x> recommendationType = [select recommendationType__c from SalesterritoryRecommendations__x where userId__c =: lstuser1 and accountSTID__c =: STID[0].MyComp_Id__c  and sortedRecommendation__c = 'GreenLake, protect, expand, hunt' and viewAll__c ='false'and ruleName__c =: rule ];

        SoqlQueryString = 'SELECT accountSTID__c,assetSoldThrough__c,asset_status__c,businessUnit__c,contractEndDate__c,contractID__c,csv__c,CurrencyIsoCode,customerId__c,customerName__c,DisplayUrl,eosl__c,evaluationConditionId__c,evaluationMessage__c,ExternalId,finalShipDate__c,finalSupportStatusFlag__c,Id,id__c,potentialValue__c,productAgingStatus__c,productCategory__c,productId__c,ProductLine__c,productName__c,productTypeName__c,productType__c,recommendationId__c,recommendationType__c,ruleDescription__c,ruleId__c,ruleType__c,search__c,serialNumber__c,serviceLevel__c,service_sap_end_of_service_date__c,soldToName__c,sortBy__c,sortDirection__c,supported__c,uniqueId__c,warrantyEndDate__c,warrantyExpiration__c FROM IBProductRecommendation__x WHERE ruleId__c = \'' + ruleId[0].ruleId__c +'\'' ;
        SoqlQueryString = SoqlQueryString +' AND userID__c = \'' + lstuser[0].Legacy_Employee_Ref__c + '\'';
        if(STID.size()>0){
            SoqlQueryString = SoqlQueryString +' AND accountSTID__c = \'' + STID[0].MyComp_Id__c + '\'';}
        else{
            SoqlQueryString = SoqlQueryString +' AND accountSTID__c = \'' + accountSTID[0].account_ST_ID__c + '\''; 
        }
        SoqlQueryString = SoqlQueryString +' AND recommendationType__c = \'' + recommendationType[0].recommendationType__c + '\'' ;
          SoqlQueryString = SoqlQueryString + '  AND csv__c = \'false\'';
         SoqlQueryString = SoqlQueryString + '  LIMIT 1000';
        if(!Test.isRunningTest())accountInfo=Database.query(SoqlQueryString);
         if(accountInfo.size()>0)
        {
            for(IBProductRecommendation__x p:accountInfo);
        }    
        
        return accountInfo;
    } 
    /*postfeedback*/
      @AuraEnabled
    public static void postfeedback(String rule,String sfdcId,string comments,string dispositionValue, string categoryValue){
         // string SoqlQueryString;
        List<IBUserPreference__x> accountInfo = New List<IBUserPreference__x>();
        
        List<User> lstuser = [Select id,Legacy_Employee_Ref__c from User where Id =: userinfo.getUserId() limit 1];
         String lstuser1 = lstuser[0].Legacy_Employee_Ref__c;
        System.debug('Current User '+lstuser1);
        
        
        List<Sales_Territory__c> STID  = [Select MyComp_Id__c FROM Sales_Territory__c WHERE Id =: sfdcId LIMIT 1];
        
        List<Account> accountSTID = [Select account_ST_ID__c FROM Account WHERE Id =: sfdcId LIMIT 1];
       
         List<SalesterritoryRecommendations__x> recommendationId = [select recommendationId__c from SalesterritoryRecommendations__x where userId__c =: lstuser1 and accountSTID__c =: STID[0].MyComp_Id__c  and sortedRecommendation__c = 'GreenLake, protect, expand, hunt' and viewAll__c ='false'and ruleName__c =: rule ];
                 //List<SalesterritoryRecommendations__x> recommendationId = [select re__c from SalesterritoryRecommendations__x where userId__c =: lstuser1 and accountSTID__c =: STID[0].MyComp_Id__c  and sortedRecommendation__c = 'GreenLake, protect, expand, hunt' and viewAll__c ='false'and ruleName__c =: rule ];

         List<SalesterritoryRecommendations__x> recommendationType = [select recommendationType__c from SalesterritoryRecommendations__x where userId__c =: lstuser1 and accountSTID__c =: STID[0].MyComp_Id__c  and sortedRecommendation__c = 'GreenLake, protect, expand, hunt' and viewAll__c ='false'and ruleName__c =: rule ];
       string dismissalkey;
        string dismissalReason;
        if(dispositionValue == 'Opt out-3 months'){
             dismissalKey = 'dt-optout-3months';
             dismissalReason = 'Opt Out 3 Months';
            
        }else if(dispositionValue == 'Opt out-6 months'){
              dismissalKey = 'dt-optout-6months';
             dismissalReason = 'Opt Out 6 Months';
            
        }else if(dispositionValue == 'Opt out-12 months'){
              dismissalKey = 'dt-optout-12months';
             dismissalReason = 'Opt Out 12 Months';
        }else if(dispositionValue == 'Cancel Opt out'){
              dismissalKey = 'dt-optout-cancel';
             dismissalReason = 'Opt Out cancel';
        }else if(dispositionValue == 'Opt out already Covered'){
              dismissalKey = 'dt-optout-alreadycovered';
             dismissalReason = 'Opt Out already covered';
        }
        System.debug(dismissalKey);
        System.debug(dismissalReason);
        IBUserPreference__x postfeedback = new IBUserPreference__x (disposition__c = dispositionValue, reasonCategory__c = categoryValue,comments__c = comments, accountSTID__c =  STID[0].MyComp_Id__c, userId__c = lstuser[0].Legacy_Employee_Ref__c, recordId__c = STID[0].MyComp_Id__c, recordType__c = 'dismissalReason',pageNameCode__c = 'AC',recommendationId__c = recommendationId[0].recommendationId__c,recommendationType__c = recommendationType[0].recommendationType__c, dismissalKey__c = dismissalkey, dismissalReason__c = dismissalReason);
         System.debug(postfeedback);
        Database.insertImmediate (postfeedback);
          
      
    } 
    
    


}