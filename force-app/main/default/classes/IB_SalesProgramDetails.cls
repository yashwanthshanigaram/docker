public class IB_SalesProgramDetails {
    @AuraEnabled
    public static List<SalesProgram__x> programdetails(String rule,String sfdcId,String accountstid1){
          string SoqlQueryString;
        List<SalesProgram__x> accountInfo = New List<SalesProgram__x>();
                /*updated*/

        List<User> lstuser = [Select id,Legacy_Employee_Ref__c from User where Id =: userinfo.getUserId() limit 1];
         String lstuser1 = lstuser[0].Legacy_Employee_Ref__c;
        System.debug('Current User '+lstuser1);
                 System.debug('updated ' );

        
        List<Sales_Territory__c> SalesterritorySTID  = [Select MyComp_Id__c FROM Sales_Territory__c WHERE Id =: sfdcId LIMIT 1];
        List<Account> accountSTID = [Select account_ST_ID__c FROM Account WHERE Id =: sfdcId LIMIT 1];
       String accounstID2 = accountstid1;
        System.debug(accounstID2);
        String STID;
        if(accounstID2 != null){
            STID = accounstID2;
        }else{
       
        if(SalesterritorySTID.size()>0){
            STID = SalesterritorySTID[0].MyComp_Id__c;
        }else{
            STID = accountSTID[0].account_ST_ID__c;
        }
        }
        
        /*if(STID.size()>0){
                   List<SalesterritoryRecommendations__x> ruleId = [select ruleId__c from SalesterritoryRecommendations__x where userId__c =: lstuser1 and accountSTID__c =: STID[0].MyComp_Id__c  and sortedRecommendation__c = 'GreenLake, protect, expand, hunt' and viewAll__c ='false'and ruleName__c =: rule ];

                    SoqlQueryString = 'SELECT ruleName__c,SeismicLink_First_desc__c,SeismicLink_Second_desc__c,SeismicLink_Third_desc__c,ResourceLink_First_desc__c,ResourceLink_Second_desc__c,ResourceLink_Third_desc__c,ResourceLink_First__c,ResourceLink_Second__c,ResourceLink_Third__c,SeismicLink_First__c,SeismicLink_Second__c,SeismicLink_Third__c,recommendationValue__c,ruleType__c,productLine__c,description__c FROM SalesProgram__x   WHERE ruleId__c = \'' + ruleId[0].ruleId__c +'\'' ;

                }else{
                    List<SalesterritoryRecommendations__x> ruleId = [select ruleId__c from SalesterritoryRecommendations__x where userId__c =: lstuser1 and accountSTID__c =: accountSTID[0].account_ST_ID__c  and sortedRecommendation__c = 'GreenLake, protect, expand, hunt' and viewAll__c ='false'and ruleName__c =: rule ];

                    SoqlQueryString = 'SELECT ruleName__c,SeismicLink_First_desc__c,SeismicLink_Second_desc__c,SeismicLink_Third_desc__c,ResourceLink_First_desc__c,ResourceLink_Second_desc__c,ResourceLink_Third_desc__c,ResourceLink_First__c,ResourceLink_Second__c,ResourceLink_Third__c,SeismicLink_First__c,SeismicLink_Second__c,SeismicLink_Third__c,recommendationValue__c,ruleType__c,productLine__c,description__c FROM SalesProgram__x   WHERE ruleId__c = \'' + ruleId[0].ruleId__c +'\'' ;

                }*/
           List<SalesterritoryRecommendations__x> ruleId = [select ruleId__c from SalesterritoryRecommendations__x where userId__c =: lstuser1 and accountSTID__c =: STID  and sortedRecommendation__c = 'GreenLake, protect, expand, hunt' and viewAll__c ='false'and ruleName__c =: rule ];
        System.debug(ruleId);
           SoqlQueryString = 'SELECT ruleName__c,SeismicLink_First_desc__c,SeismicLink_Second_desc__c,SeismicLink_Third_desc__c,ResourceLink_First_desc__c,ResourceLink_Second_desc__c,ResourceLink_Third_desc__c,ResourceLink_First__c,ResourceLink_Second__c,ResourceLink_Third__c,SeismicLink_First__c,SeismicLink_Second__c,SeismicLink_Third__c,recommendationValue__c,ruleType__c,productLine__c,description__c FROM SalesProgram__x   WHERE ruleId__c = \'' + ruleId[0].ruleId__c +'\'' ;


        if(!Test.isRunningTest())accountInfo=Database.query(SoqlQueryString); 
         if(accountInfo.size()>0)
        {
            for(SalesProgram__x p:accountInfo);
        }    
        
        return accountInfo;
    } 
      @AuraEnabled
    public static String programstatus(String rule,String sfdcId,String accountstid1){
          string SoqlQueryString;
        List<SalesterritoryRecommendations__x> status = New List<SalesterritoryRecommendations__x>();
        
        List<User> lstuser = [Select id,Legacy_Employee_Ref__c from User where Id =: userinfo.getUserId() limit 1];
         String lstuser1 = lstuser[0].Legacy_Employee_Ref__c;
        System.debug('Current User '+lstuser1);
        
        
        List<Sales_Territory__c> SalesterritorySTID = [Select MyComp_Id__c FROM Sales_Territory__c WHERE Id =: sfdcId LIMIT 1];
        List<Account> accountSTID = [Select account_ST_ID__c FROM Account WHERE Id =: sfdcId LIMIT 1];
        
          String accounstID2 = accountstid1;
        System.debug(accounstID2);
        String STID;
        if(accounstID2 != null){
            STID = accounstID2;
        }else{
       
        if(SalesterritorySTID.size()>0){
            STID = SalesterritorySTID[0].MyComp_Id__c;
        }else{
            STID = accountSTID[0].account_ST_ID__c;
        }
        }
        /*if(STID.size()>0){

status = [select recommendationFlag__c from SalesterritoryRecommendations__x where userId__c =: lstuser1 and accountSTID__c =: STID[0].MyComp_Id__c  and sortedRecommendation__c = 'GreenLake, protect, expand, hunt' and viewAll__c ='false'and ruleName__c =: rule ];
                }else{

status = [select recommendationFlag__c from SalesterritoryRecommendations__x where userId__c =: lstuser1 and accountSTID__c =: accountSTID[0].account_ST_ID__c  and sortedRecommendation__c = 'GreenLake, protect, expand, hunt' and viewAll__c ='false'and ruleName__c =: rule ];
                }*/
        status = [select recommendationFlag__c from SalesterritoryRecommendations__x where userId__c =: lstuser1 and accountSTID__c =: STID  and sortedRecommendation__c = 'GreenLake, protect, expand, hunt' and viewAll__c ='false'and ruleName__c =: rule ];

             System.debug('Current  Status '+status);
        String status1 = status[0].recommendationFlag__c;
          SoqlQueryString = status1;
         System.debug('soql query'+SoqlQueryString);
        
        
        return SoqlQueryString;
    } 
    
    @AuraEnabled
   public static List<IBProductRecommendation__x> download(String sfdcId, String rule,String accountstid1){
        string SoqlQueryString;
        
        List<IBProductRecommendation__x> downloadfile = New List<IBProductRecommendation__x>();
        
        List<User> lstuser = [Select id,Legacy_Employee_Ref__c from User where Id =: userinfo.getUserId() limit 1];
        String lstuser1 = lstuser[0].Legacy_Employee_Ref__c;
        List<Sales_Territory__c> SalesterritorySTID  = [Select MyComp_Id__c FROM Sales_Territory__c WHERE Id =: sfdcId LIMIT 1];
        
        List<Account> accountSTID = [Select account_ST_ID__c FROM Account WHERE Id =: sfdcId LIMIT 1];
        String accounstID2 = accountstid1;
        System.debug(accounstID2);
        String STID;
        if(accounstID2 != null){
            STID = accounstID2;
        }else{
       
        if(SalesterritorySTID.size()>0){
            STID = SalesterritorySTID[0].MyComp_Id__c;
        }else{
            STID = accountSTID[0].account_ST_ID__c;
        }
        }
       List<SalesterritoryRecommendations__x> ruleId = [select ruleId__c from SalesterritoryRecommendations__x where userId__c =: lstuser1 and accountSTID__c =: STID  and sortedRecommendation__c = 'GreenLake, protect, expand, hunt' and viewAll__c ='false'and ruleName__c =: rule ];
         List<SalesterritoryRecommendations__x> recommendationType = [select recommendationType__c from SalesterritoryRecommendations__x where userId__c =: lstuser1 and accountSTID__c =: STID  and sortedRecommendation__c = 'GreenLake, protect, expand, hunt' and viewAll__c ='false'and ruleName__c =: rule ];
       
        System.debug('Current user is  '+ lstuser);
        SoqlQueryString = 'SELECT accountSTID__c,assetSoldThrough__c,asset_status__c,businessUnit__c,contractEndDate__c,contractID__c,csv__c,CurrencyIsoCode,customerId__c,customerName__c,DisplayUrl,eosl__c,evaluationConditionId__c,evaluationMessage__c,ExternalId,finalShipDate__c,finalSupportStatusFlag__c,Id,id__c,potentialValue__c,productAgingStatus__c,productCategory__c,productId__c,ProductLine__c,productName__c,productTypeName__c,productType__c,recommendationId__c,recommendationType__c,ruleDescription__c,ruleId__c,ruleType__c,search__c,serialNumber__c,serviceLevel__c,service_sap_end_of_service_date__c,soldToName__c,sortBy__c,sortDirection__c,supported__c,uniqueId__c,warrantyEndDate__c,warrantyExpiration__c FROM  IBProductRecommendation__x Where userId__c = \'' + lstuser[0].Legacy_Employee_Ref__c + '\'';
       	SoqlQueryString = SoqlQueryString +' AND  ruleId__c = \'' + ruleId[0].ruleId__c +'\'';
       /* if(STID.size()>0){
            SoqlQueryString = SoqlQueryString +' AND accountSTID__c = \'' + STID[0].MyComp_Id__c + '\'';}
        else{
            SoqlQueryString = SoqlQueryString +' AND accountSTID__c = \'' + accountSTID[0].account_ST_ID__c + '\''; 
        }*/
        SoqlQueryString = SoqlQueryString +' AND accountSTID__c = \'' + STID + '\''; 
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
    public static List<SalesterritoryRecommendations__x> fetchSalesPrograms(String rule,String sfdcId_ST,String accountstid1){
        string SoqlQueryString;
        
        List<SalesterritoryRecommendations__x> program_List = New List<SalesterritoryRecommendations__x>();
        
        List<User> lstuser = [Select id,Legacy_Employee_Ref__c from User where Id =: userinfo.getUserId() limit 1];
         String lstuser1 = lstuser[0].Legacy_Employee_Ref__c;
        System.debug('Current user is '+ lstuser);
        System.debug('Current ST is :::: '+sfdcId_ST );
         List<Sales_Territory__c> SalesterritorySTID = [Select MyComp_Id__c FROM Sales_Territory__c WHERE Id =: sfdcId_ST LIMIT 1];
           System.debug('Current accountSTID is :::: '+SalesterritorySTID);
       
          List<Account> accountSTID = [Select account_ST_ID__c FROM Account WHERE Id =: sfdcId_ST LIMIT 1];
          String accounstID2 = accountstid1;
        System.debug(accounstID2);
        String STID;
        if(accounstID2 != null){
            STID = accounstID2;
        }else{
       
        if(SalesterritorySTID.size()>0){
            STID = SalesterritorySTID[0].MyComp_Id__c;
        }else{
            STID = accountSTID[0].account_ST_ID__c;
        }
        }
        
        //System.debug('size:'+STID.size());
          /*if(STID.size()>0){
          List<SalesterritoryRecommendations__x> ruleId = [select ruleId__c from SalesterritoryRecommendations__x where userId__c =: lstuser1 and accountSTID__c =: STID[0].MyComp_Id__c  and sortedRecommendation__c = 'GreenLake, protect, expand, hunt' and viewAll__c ='false'and ruleName__c =: rule ];
            
                }else{
          List<SalesterritoryRecommendations__x> ruleId = [select ruleId__c from SalesterritoryRecommendations__x where userId__c =: lstuser1 and accountSTID__c =: accountSTID[0].account_ST_ID__c  and sortedRecommendation__c = 'GreenLake, protect, expand, hunt' and viewAll__c ='false'and ruleName__c =: rule ];
                }*/
         List<SalesterritoryRecommendations__x> ruleId = [select ruleId__c from SalesterritoryRecommendations__x where userId__c =: lstuser1 and accountSTID__c =: STID  and sortedRecommendation__c = 'GreenLake, protect, expand, hunt' and viewAll__c ='false'and ruleName__c =: rule ];

        if(lstuser.size() > 0 ){
        SoqlQueryString = 'SELECT recommendationFlag__c,recommendationKey__c,recommendationValue__c,ruleDescription__c,ruleName__c,ruleType__c,evaluationMessage__c FROM SalesterritoryRecommendations__x   WHERE userId__c =\'' + lstuser[0].Legacy_Employee_Ref__c + '\'';
        }
        /*if(STID.size()>0){
            SoqlQueryString = SoqlQueryString +' AND accountSTID__c = \'' + STID[0].MyComp_Id__c + '\'';
            
                }else{
                     SoqlQueryString = SoqlQueryString +' AND accountSTID__c = \'' + accountSTID[0].account_ST_ID__c + '\'';
                }*/
                     SoqlQueryString = SoqlQueryString +' AND accountSTID__c = \'' + STID + '\'';

     
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
    public static List<IBProductRecommendation__x> fetchQualifyingIB(String rule,String sfdcId,String accountstid1){
          string SoqlQueryString;
        List<IBProductRecommendation__x> accountInfo = New List<IBProductRecommendation__x>();
        
        List<User> lstuser = [Select id,Legacy_Employee_Ref__c from User where Id =: userinfo.getUserId() limit 1];
         String lstuser1 = lstuser[0].Legacy_Employee_Ref__c;
        System.debug('Current User '+lstuser1);
          System.debug('updated ');

        
        List<Sales_Territory__c> SalesterritorySTID  = [Select MyComp_Id__c FROM Sales_Territory__c WHERE Id =: sfdcId LIMIT 1];
        
        List<Account> accountSTID = [Select account_ST_ID__c FROM Account WHERE Id =: sfdcId LIMIT 1];
        /* String STID;
        if(SalesTerritoryID.size()>0){
            STID = SalesTerritoryID[0].MyComp_Id__c;
        }else{
            STID = accountSTID[0].account_ST_ID__c;
        }*/
          String accounstID2 = accountstid1;
        System.debug(accounstID2);
        String STID;
        if(accounstID2 != null){
            STID = accounstID2;
        }else{
       
        if(SalesterritorySTID.size()>0){
            STID = SalesterritorySTID[0].MyComp_Id__c;
        }else{
            STID = accountSTID[0].account_ST_ID__c;
        }
        }
       
         List<SalesterritoryRecommendations__x> ruleId = [select ruleId__c from SalesterritoryRecommendations__x where userId__c =: lstuser1 and accountSTID__c =: STID  and sortedRecommendation__c = 'GreenLake, protect, expand, hunt' and viewAll__c ='false'and ruleName__c =: rule ];
         List<SalesterritoryRecommendations__x> recommendationType = [select recommendationType__c from SalesterritoryRecommendations__x where userId__c =: lstuser1 and accountSTID__c =: STID  and sortedRecommendation__c = 'GreenLake, protect, expand, hunt' and viewAll__c ='false'and ruleName__c =: rule ];

SoqlQueryString = 'SELECT accountSTID__c,assetSoldThrough__c,asset_status__c,businessUnit__c,contractEndDate__c,contractID__c,csv__c,CurrencyIsoCode,customerId__c,customerName__c,DisplayUrl,eosl__c,evaluationConditionId__c,evaluationMessage__c,ExternalId,finalShipDate__c,finalSupportStatusFlag__c,Id,id__c,potentialValue__c,productAgingStatus__c,productCategory__c,productId__c,ProductLine__c,productName__c,productTypeName__c,productType__c,recommendationId__c,recommendationType__c,ruleDescription__c,ruleId__c,ruleType__c,search__c,serialNumber__c,serviceLevel__c,service_sap_end_of_service_date__c,soldToName__c,sortBy__c,sortDirection__c,supported__c,uniqueId__c,warrantyEndDate__c,warrantyExpiration__c,dealResellerName__c,leaseContractId__c,dealResellerPartnerProfileId__c,leaseContractStartDate__c,leaseMaturityDate__c,resellerName__c FROM IBProductRecommendation__x WHERE ruleId__c = \'' + ruleId[0].ruleId__c +'\'' ;        SoqlQueryString = SoqlQueryString +' AND userID__c = \'' + lstuser[0].Legacy_Employee_Ref__c + '\'';
        /*if(SalesTerritoryID.size()>0){
            SoqlQueryString = SoqlQueryString +' AND accountSTID__c = \'' + STID + '\'';}
        else{
            SoqlQueryString = SoqlQueryString +' AND accountSTID__c = \'' + STID + '\''; 
        }*/
       SoqlQueryString = SoqlQueryString +' AND accountSTID__c = \'' + STID + '\''; 

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
    public static void postfeedback(String rule,String sfdcId,string comments,string dispositionValue, string categoryValue, String accountstid1){
         // string SoqlQueryString;
        List<IBUserPreference__x> accountInfo = New List<IBUserPreference__x>();
        
        List<User> lstuser = [Select id,Legacy_Employee_Ref__c from User where Id =: userinfo.getUserId() limit 1];
         String lstuser1 = lstuser[0].Legacy_Employee_Ref__c;
        System.debug('Current User '+lstuser1);
        
        
        List<Sales_Territory__c> SalesterritorySTID  = [Select MyComp_Id__c FROM Sales_Territory__c WHERE Id =: sfdcId LIMIT 1];
        
        List<Account> accountSTID = [Select account_ST_ID__c FROM Account WHERE Id =: sfdcId LIMIT 1];
       string STID;
        if(accountstid1 != null){
            STID = accountstid1;
        }else{
        if(SalesterritorySTID.size()>0){
            STID = SalesterritorySTID[0].MyComp_Id__c;
        }else{
            STID = accountSTID[0].account_ST_ID__c;
        }
        }
         List<SalesterritoryRecommendations__x> recommendationId = [select recommendationId__c from SalesterritoryRecommendations__x where userId__c =: lstuser1 and accountSTID__c =: STID  and sortedRecommendation__c = 'GreenLake, protect, expand, hunt' and viewAll__c ='false'and ruleName__c =: rule ];
                 //List<SalesterritoryRecommendations__x> recommendationId = [select re__c from SalesterritoryRecommendations__x where userId__c =: lstuser1 and accountSTID__c =: STID[0].MyComp_Id__c  and sortedRecommendation__c = 'GreenLake, protect, expand, hunt' and viewAll__c ='false'and ruleName__c =: rule ];

         List<SalesterritoryRecommendations__x> recommendationType = [select recommendationType__c from SalesterritoryRecommendations__x where userId__c =: lstuser1 and accountSTID__c =: STID  and sortedRecommendation__c = 'GreenLake, protect, expand, hunt' and viewAll__c ='false'and ruleName__c =: rule ];
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
        IBUserPreference__x postfeedback = new IBUserPreference__x (disposition__c = dispositionValue, reasonCategory__c = categoryValue,comments__c = comments, accountSTID__c =  STID, userId__c = lstuser[0].Legacy_Employee_Ref__c, recordId__c = STID, recordType__c = 'dismissalReason',pageNameCode__c = 'AC',recommendationId__c = recommendationId[0].recommendationId__c,recommendationType__c = recommendationType[0].recommendationType__c, dismissalKey__c = dismissalkey, dismissalReason__c = dismissalReason);
         System.debug(postfeedback);
        Database.insertImmediate (postfeedback);
          
      
    }
    
    /*IB_Opportunity*/
 @AuraEnabled
    public static List<Opportunity> AssociatedOpportunity (String rule,String sfdcId,String accountstid1){
          //string SoqlQueryString;
        //List<SalesProgram__x> accountInfo = New List<SalesProgram__x>();
                /*updated*/

        User lstuser= [Select Legacy_Employee_Ref__c from User where Id =: userinfo.getUserId() limit 1];
       //system.debug(lstuser);
        /*String SalesTerritoryID = [Select MyComp_Id__c FROM Sales_Territory__c WHERE Id =: sfdcId LIMIT 1].MyComp_Id__c;
        system.debug(SalesTerritoryID);
        String accountSTID = [Select account_ST_ID__c FROM Account WHERE Id =: sfdcId LIMIT 1].account_ST_ID__c;
         system.debug(accountSTID);
         String STID;
        if(SalesTerritoryID!=null || SalesTerritoryID == 'undefined' ){
            STID = SalesTerritoryID;
            
        }else{
            STID = accountSTID;
        }*/
          List<Sales_Territory__c> SalesterritorySTID  = [Select MyComp_Id__c FROM Sales_Territory__c WHERE Id =: sfdcId LIMIT 1];
        
        List<Account> accountSTID = [Select account_ST_ID__c FROM Account WHERE Id =: sfdcId LIMIT 1];
         /*String STID;
        if(SalesTerritoryID.size()>0){
            STID = SalesTerritoryID[0].MyComp_Id__c;
        }else{
            STID = accountSTID[0].account_ST_ID__c;
        }*/
         String accounstID2 = accountstid1;
        System.debug(accounstID2);
        String STID;
        if(accounstID2 != null){
            STID = accounstID2;
        }else{
       
        if(SalesterritorySTID.size()>0){
            STID = SalesterritorySTID[0].MyComp_Id__c;
        }else{
            STID = accountSTID[0].account_ST_ID__c;
        }
        }
       
        
		string ruleId = [select ruleId__c from SalesterritoryRecommendations__x where userId__c =: lstuser.Legacy_Employee_Ref__c and accountSTID__c =: STID and sortedRecommendation__c = 'GreenLake, protect, expand, hunt' and viewAll__c ='false'and ruleName__c =: rule ].ruleId__c;
		//system.debug(ruleId);
        string esd = [select effectiveStartDate__c from SalesProgram__x where ruleId__c =: ruleId ].effectiveStartDate__c;
        //system.debug(esd);
		Date startdate = date.valueof(esd);
		// system.debug(startdate);
        String ProgramPl = [select productLines__c from SalesProgram__x where ruleId__c =: ruleId ].productLines__c;
        //system.debug(ProgramPl);
		set<string> pl = new set<string>();
        string productspl1= ProgramPl.replace('[','').replace(']','').replace('"','');
		//system.debug(productspl1);
        list<string> productlines=productspl1.split(',');
        //system.debug(productlines);
        
        for (string s: productlines){
		pl.add(s);  //add to a set pl so that it can be used in the next optyline query.  
		//system.debug(s);   
		}
		//system.debug(pl);
        
        List<OpportunityLineItem> OpportunitiesFinal = [Select Tier_1_Sub_Total__c,OpportunityID from OpportunityLineItem where(Opportunity.Account.Account_ST_ID__c = :STID) and (OpportunityStage__c != 'Error') and (Product_Line__c IN :pl) and (Opportunity.CloseDate >= :startdate) ];
        system.debug(OpportunitiesFinal);
        
        
        set<string> Opps = new set<string>();
        
        for (OpportunityLineItem Op:OpportunitiesFinal){
			Opps.add(Op.OpportunityID);  //add to a set S1 so that it can be used in the next optyline query.  
			//system.debug(Op);
			}
        //system.debug(Opps);
        AggregateResult[] gr = [select OpportunityID, sum(Tier_1_Sub_Total__c) tp from OpportunityLineItem where OpportunityID IN: Opps and Product_Line__c IN :pl group by OpportunityID ];
        
        set<string> OppsFinal = new set<string>();
        for (AggregateResult ar : gr)  {
            if ((decimal) (ar.get('tp'))>=10000){
            	OppsFinal.add((string)(ar.get('OpportunityId')));
            }
                //System.debug('Opportunity ID' + ar.get('OpportunityId'));
    		//System.debug('Total amount' + ar.get('tp'));
			}
			//System.debug (OppsFinal);

		List<Opportunity> finalOpp =  [select Id,Owner.Id,Owner.Name, Opportunity_Owner__c,Campaign_Influence_id__c, Opportunity_Name__c, Opportunity_ID__c, Account.Account_ST_Name__c,Account.Account_ST_ID__c, CloseDate, Opportunity_Sales_Stage__c, Opportunity_Update__c, Description, 	Type, Forecast_Category__c, Pipeline_Exclusion__c, Win_Loss_Reason__c, RecordTypeId, Owner_Company_Type__c, Max_Book_Ship_Date__c, OwnerRoleType__c, Customer_Engagement__c, Fulfillment__c, Days_since_last_modified__c, Order_Exists__c, Partner_Company__c, Current_Stage_days__c, Tier_1_Opportunity_Value__c,Primary_Campaign_Name__c from Opportunity where id in:Oppsfinal];
		//system.debug(finalOpp);
		 /* if(!Test.isRunningTest())accountInfo=Database.query(SoqlQueryString); 
         if(accountInfo.size()>0)
        {
            for(SalesProgram__x p:accountInfo);
        }*/    
        //System.debug('< prospectList_Final > '+prospectList_Final);
        return finalOpp;
    }


		@AuraEnabled
		public static List<string> ProgramCampaign (String rule,String sfdcId,String accountstid1){


		User lstuser= [Select Legacy_Employee_Ref__c from User where Id =: userinfo.getUserId() limit 1];
       system.debug(lstuser);
       /* String SalesTerritoryID = [Select MyComp_Id__c FROM Sales_Territory__c WHERE Id =: sfdcId LIMIT 1].MyComp_Id__c;
        //system.debug(STID);
        String accountSTID = [Select account_ST_ID__c FROM Account WHERE Id =: sfdcId LIMIT 1].account_ST_ID__c;
           String STID;
        if(SalesTerritoryID!=null || SalesTerritoryID == 'undefined' ){
            STID = SalesTerritoryID;
            
        }else{
            STID = accountSTID;
        }*/
              List<Sales_Territory__c> SalesterritorySTID  = [Select MyComp_Id__c FROM Sales_Territory__c WHERE Id =: sfdcId LIMIT 1];
        
        List<Account> accountSTID = [Select account_ST_ID__c FROM Account WHERE Id =: sfdcId LIMIT 1];
        /* String STID;
        if(SalesTerritoryID.size()>0){
            STID = SalesTerritoryID[0].MyComp_Id__c;
        }else{
            STID = accountSTID[0].account_ST_ID__c;
        }*/
         String accounstID2 = accountstid1;
        System.debug(accounstID2);
        String STID;
        if(accounstID2 != null){
            STID = accounstID2;
        }else{
       
        if(SalesterritorySTID.size()>0){
            STID = SalesterritorySTID[0].MyComp_Id__c;
        }else{
            STID = accountSTID[0].account_ST_ID__c;
        }
        }
       
        string ruleId = [select ruleId__c from SalesterritoryRecommendations__x where userId__c =: lstuser.Legacy_Employee_Ref__c and accountSTID__c =: STID and sortedRecommendation__c = 'GreenLake, protect, expand, hunt' and viewAll__c ='false'and ruleName__c =: rule ].ruleId__c;
		system.debug(ruleId);
        list<SalesProgram__x> CampaignList = [select campaign__c from SalesProgram__x where ruleId__c =: ruleId ];
        //system.debug(CampaignList);

		List<String> str1 = new list<String>();
		for (SalesProgram__x c : CampaignList ){
		String str = c.campaign__c;
		System.debug('campaignName' +str);
		List<Object> untyped = (List<Object>)JSON.deserializeUntyped(str);
		for(Object obj: untyped){
		Map<String, Object> data = (Map<String, Object>)obj;
		system.debug('Inside if');
		String cmp1 = String.valueof(data.get('campaignId'));
		str1.add(cmp1);
        System.debug('I am inside'+cmp1);
        }
        }
return (str1);
}
    /*feedback history*/
      @AuraEnabled
    public static List<IBUserPreference__x> fetchHistory(String rule, String sfdcId,String accountstid1){
        string SoqlQueryString;
                /*updated*/

        List<IBUserPreference__x> program_List = New List<IBUserPreference__x>();
        
        List<User> lstuser = [Select id,Legacy_Employee_Ref__c from User where Id =: userinfo.getUserId() limit 1];
        String lstuser1 = lstuser[0].Legacy_Employee_Ref__c;
        System.debug('Current User '+lstuser1);
        
        
        List<Sales_Territory__c> SalesterritorySTID = [Select MyComp_Id__c FROM Sales_Territory__c WHERE Id =: sfdcId LIMIT 1];
        // String STID1 = STID[0].MyComp_Id__c;
         List<Account> accountSTID = [Select account_ST_ID__c FROM Account WHERE Id =: sfdcId LIMIT 1];
                String accounstID2 = accountstid1;
        System.debug(accounstID2);
        String STID;
        if(accounstID2!= null){
            STID = accounstID2;
        }else{
       
        if(SalesterritorySTID.size()>0){
            STID = SalesterritorySTID[0].MyComp_Id__c;
        }else{
            STID = accountSTID[0].account_ST_ID__c;
        }
        }
        
        
         //System.debug('Current ST is :::: '+STID1);
        List<SalesterritoryRecommendations__x> programId = [select recommendationId__c from SalesterritoryRecommendations__x where userId__c =: lstuser1 and accountSTID__c =: STID  and sortedRecommendation__c = 'GreenLake, protect, expand, hunt' and viewAll__c ='false'and ruleName__c =: rule ];
        
         
        SoqlQueryString = 'SELECT  disposition__c, reasonCategory__c,comments__c,createdDateTimeUTC__c,email__c FROM IBUserPreference__x   WHERE programId__c =\'' + programId[0].recommendationId__c + '\'AND accountSTID__c = \'' + STID + '\'' ;
        
  
        System.debug('date string '+String.valueOf(System.now()));
        System.debug('SOQL query is '+SoqlQueryString);
                 System.debug('updated ' );

        
        
     
        if(!Test.isRunningTest())program_List=Database.query(SoqlQueryString);
        if(program_List.size()>0)
        {
            for(IBUserPreference__x p:program_List);
        }
        
        return program_List;
    }
}