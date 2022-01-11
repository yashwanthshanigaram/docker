public class IB_Opportunity {
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
}