public class ProgramID {
 
 @AuraEnabled   
 public static List<SalesProgram__x> programLink(String ruleId){
        
     String SoqlQueryString;
     List<SalesProgram__x> totalrec = New List<SalesProgram__x>();
     
        SoqlQueryString = 'SELECT offerings__c,createdDate__c,description__c,effectiveEndDate__c,effectiveStartDate__c,ExternalId,Id,id__c,isActive__c,programGovernance__c,programType__c,recommendationType__c,recommendationValue__c,region__c,ruleId__c,ruleName__c,ruleType__c,status__c,search__c,userId__c,totalRecords__c,SeismicLink_First__c,SeismicLink_Second__c,SeismicLink_Third__c,ResourceLink_First__c,ResourceLink_Second__c,ResourceLink_Third__c,recommendationEvaluationReadout__c,uploadedSTIdList__c,ResourceLink_First_desc__c,ResourceLink_Third_desc__c,ResourceLink_Second_desc__c,SeismicLink_First_desc__c,SeismicLink_Second_desc__c,SeismicLink_Third_desc__c FROM SalesProgram__x ';
                
        SoqlQueryString = SoqlQueryString + 'WHERE ruleId__c =  \'' + ruleId +'\''; //ruleId__c='PR-KUME0OJ01633940554'];
     
     if(!Test.isRunningTest())totalrec=Database.query(SoqlQueryString); 
     return totalrec;
    } 
    
    @AuraEnabled
    public static list<String> getCampaign(String ruleId){
        String SoqlQueryString;
        
        List<SalesProgram__x> CampaignList = New List<SalesProgram__x>();
        
        SoqlQueryString = 'SELECT campaign__c FROM SalesProgram__x'; 
  		SoqlQueryString = SoqlQueryString + ' WHERE ruleId__c =  \'' + ruleId +'\''; //'PR-KUME0OJ01633940554'];
        
        if(!Test.isRunningTest())CampaignList=Database.query(SoqlQueryString); 
 			System.debug('i am here' +CampaignList);
				List<String> str1	= new list<String>();
            	for (SalesProgram__x c  : CampaignList ){
               		String str = c.campaign__c;
               		System.debug('campaignName' +str);
               		List<Object> untyped = (List<Object>)JSON.deserializeUntyped(str);
                  		for(Object obj: untyped){
                        Map<String, Object> data = (Map<String, Object>)obj;
                    		system.debug('Inside if');
                         	String cmp1 = String.valueof(data.get('campaignName'));
                         	str1.add(cmp1);
                         	//System.debug('I am inside'+cmp1);
                  }
         }
	return (str1);
}
    @AuraEnabled
    public static list<String> getOfferings(String ruleId){
          
        String SoqlQueryString; 
       	List<SalesProgram__x> OfferingList = new List<SalesProgram__x>();
        
        SoqlQueryString = 'SELECT offerings__c FROM SalesProgram__x';
        SoqlQueryString = SoqlQueryString + ' WHERE ruleId__c =  \'' + ruleId +'\''; //'PR-KUME0OJ01633940554'];
 			System.debug('i am here' +OfferingList);
        if(!Test.isRunningTest())OfferingList = Database.query(SoqlQueryString); 
				list<String> str1 = new list<String>();
            	for (SalesProgram__x c  : OfferingList ){
               		String str = c.offerings__c;
               		System.debug('OfferingsName: ' +str);
               	Map<String, Object> untyped = (Map<String, Object>) JSON.deserializeUntyped(str);
                  		
                    	//for(Object obj: untyped){
                
                         	String cmp1 = String.valueof(untyped.get('object'));
                            String cmp2 = String.valueof(untyped.get('uiLabel'));
							String cmp3 = String.valueof(untyped.get('operator'));
                    		String cmp4 = String.valueof(untyped.get('uiValue'));
                    		String cmp5 = String.valueof(untyped.get('selectionDescription'));
                         	//str1 = cmp1 +' where '+cmp2+' '+cmp3+' '+cmp4;
                         	String cmp = cmp1 +' where '+cmp2+' '+cmp3+' '+cmp4;
                            str1.add(cmp);    
                    		/*str1.add(cmp1);
                    		str1.add(cmp2);
                    		str1.add(cmp3);
                    		str1.add(cmp4);
                    		str1.add(cmp5);*/
                    		
                         	
                 // }
         }
	return (str1);

}
     @AuraEnabled
    public static list<String> getEvaluationRules(String ruleId){
          
        String SoqlQueryString; 
       	List<SalesProgram__x> EvaluationRulesList = new List<SalesProgram__x>();
        
        SoqlQueryString = 'SELECT evaluationRules__c FROM SalesProgram__x';
        SoqlQueryString = SoqlQueryString + ' WHERE search__c =  \'' + ruleId +'\''; //'PR-KUME0OJ01633940554'];
        
 			//System.debug('i am here' +EvaluationRulesList);
        if(!Test.isRunningTest())EvaluationRulesList = Database.query(SoqlQueryString); 
           //System.debug('i am here' +EvaluationRulesList);
			
        		list<String> str1 = new list<String>();
            		for (SalesProgram__x c  : EvaluationRulesList ){
               		String str = c.evaluationRules__c;
               		//System.debug('EvaluationRules: ' +str);
                    
               	List<Object> untyped = (List<Object>)JSON.deserializeUntyped(str);
                  		for(Object obj: untyped){
                        Map<String, Object> data = (Map<String, Object>)obj;
                
                         	String cmp1 = String.valueof(data.get('object'));
                            String cmp2 = String.valueof(data.get('uiLabel'));
							String cmp3 = String.valueof(data.get('operator'));
							String cmp4 = String.valueof(data.get('uiValue'));
                            //String cmp5 = String.valueof(data.get('selectionDescription'));
                         	
                         	String cmp = cmp1 +' where '+cmp2+' '+cmp3+' '+cmp4;
                            
                            str1.add(cmp);    
                    		/*str1.add(cmp1);
                    		str1.add(cmp2);
                    		str1.add(cmp3);
                    		str1.add(cmp4);
                    		//str1.add(cmp5);*/
                         	
                         	
                  }
         }
	return (str1);
}
     @AuraEnabled
    public static list<String> getEvaluationRulesObj(String ruleId){
          
        String SoqlQueryString; 
       	List<SalesProgram__x> EvaluationRulesList = new List<SalesProgram__x>();
        
        SoqlQueryString = 'SELECT evaluationRules__c FROM SalesProgram__x';
        SoqlQueryString = SoqlQueryString + ' WHERE search__c =  \'' + ruleId +'\''; //'PR-KUME0OJ01633940554'];
        
 			//System.debug('i am here' +EvaluationRulesList);
        if(!Test.isRunningTest())EvaluationRulesList = Database.query(SoqlQueryString); 
           //System.debug('i am here' +EvaluationRulesList);
			
        		list<String> str1 = new list<String>();
            		for (SalesProgram__x c  : EvaluationRulesList ){
               		String str = c.evaluationRules__c;
               		//System.debug('EvaluationRules: ' +str);
                    
               	List<Object> untyped = (List<Object>)JSON.deserializeUntyped(str);
                  		for(Object obj: untyped){
                        Map<String, Object> data = (Map<String, Object>)obj;
                
                         	String cmp1 = String.valueof(data.get('object'));
                            /*String cmp2 = String.valueof(data.get('uiLabel'));
							String cmp3 = String.valueof(data.get('operator'));
							String cmp4 = String.valueof(data.get('uiValue'));
                            String cmp5 = String.valueof(data.get('selectionDescription'));
                         	
                         	String cmp = cmp1 +' where '+cmp2+' '+cmp3+' '+cmp4;
                            
                            str1.add(cmp);    
                    		str1.add(cmp2);
                    		str1.add(cmp3);
                    		str1.add(cmp4);
                    		str1.add(cmp5);*/
                         	str1.add(cmp1);
                         	
                  }
         }
	return (str1);
}
    
    @AuraEnabled
    public static list<String> getEvaluationCondition(String ruleId){
          
        String SoqlQueryString; 
       	List<SalesProgram__x> EvaluationCondition = new List<SalesProgram__x>();
        
        SoqlQueryString = 'SELECT evaluationConditions__c FROM SalesProgram__x';
        SoqlQueryString = SoqlQueryString + ' WHERE search__c =  \'' + ruleId +'\''; //'PR-KUME0OJ01633940554'];
        
 			System.debug('i am here' +EvaluationCondition);
        if(!Test.isRunningTest())EvaluationCondition = Database.query(SoqlQueryString); 
            
 			System.debug('i am here' +EvaluationCondition);
				list<String> str1 = new list<String>();
        	
        	for (SalesProgram__x c  : EvaluationCondition ){
                	String str = c.evaluationConditions__c;
               		System.debug('evaluationCondition: ' +str);
                
               	List<Object> untyped = (List<Object>)JSON.deserializeUntyped(str);
                  		for(Object obj: untyped){
                        Map<String,Object> data = (Map<String,Object>)obj;
                           
                            String cmp1 = String.valueof(data.get('evaluationMessage'));
                         	String cmp2 = 'SP'+String.valueof(data.get('priority'));
                            /*String cmp3 = String.valueof(data.get('evaluationConditionDisplay'));
                            String cmp4 = String.valueof(data.get('postCondition'));*/
                			
                            str1.add(cmp1);    
                         	str1.add(cmp2);
                            /*str1.add(cmp4);
                            str1.add(cmp3);*/
                  }
         }
	return (str1);

}
    
    @AuraEnabled
    public static list<String> getECReccLogic(String ruleId){
        String SoqlQueryString; 
       	List<SalesProgram__x> ECReccLogic = new List<SalesProgram__x>();
        
        SoqlQueryString = 'SELECT evaluationConditions__c FROM SalesProgram__x';
        SoqlQueryString = SoqlQueryString + ' WHERE search__c =  \'' + ruleId +'\''; //'PR-KUME0OJ01633940554'];
 			System.debug('i am here' +ECReccLogic);
        if(!Test.isRunningTest())ECReccLogic = Database.query(SoqlQueryString); 
        
        System.debug('i am here' +ECReccLogic);
		list<String> str1 = new list<String>();
        	
        	for (SalesProgram__x c  : ECReccLogic ){
                	String str = c.evaluationConditions__c;
               		System.debug('evaluationCondition: ' +str);
                
               	List<Object> untyped = (List<Object>)JSON.deserializeUntyped(str);
                  		for(Object obj: untyped){
                        Map<String,Object> data = (Map<String,Object>)obj;
                           
                            String cmp3 = String.valueof(data.get('evaluationConditionDisplay'));
                            String cmp4 = String.valueof(data.get('postCondition'));
                			
                            str1.add(cmp4);    
                         	str1.add(cmp3);
                            
                  }
         }
	return (str1);

}
    @AuraEnabled
    public static list<String> getSelectionRules(String ruleId){
        String SoqlQueryString; 
       	List<SalesProgram__x> SelectionRulesList = new List<SalesProgram__x>();
        
        SoqlQueryString = 'SELECT selectionRules__c FROM SalesProgram__x';
        SoqlQueryString = SoqlQueryString + ' WHERE search__c =  \'' + ruleId +'\''; //'PR-KUME0OJ01633940554'];
        
 			System.debug('i am here' +SelectionRulesList);
        if(!Test.isRunningTest())SelectionRulesList = Database.query(SoqlQueryString); 
          
          System.debug('i am here' +SelectionRulesList);
				list<String> str1 = new list<String>();
            	for (SalesProgram__x c  : SelectionRulesList ){
               		String str = c.selectionRules__c;
               		System.debug('SelectionRules: ' +str);
                 List<Object> untyped = (List<Object>)JSON.deserializeUntyped(str);   
               	
                  		for(Object obj: untyped){
                		Map<String,Object> data = (Map<String,Object>)obj;
                         	String cmp1 = String.valueof(data.get('object'));
                            String cmp2 = String.valueof(data.get('uiLabel'));
							String cmp3 = String.valueof(data.get('operator'));
							String cmp4 = String.valueof(data.get('uiValue'));
                            String cmp5 = String.valueof(data.get('selectionDescription'));
                         	
                         	String cmp = cmp1 +' where '+cmp2+' '+cmp3+' '+cmp4;
                            
                            str1.add(cmp);    
                    		str1.add(cmp1);
                    		str1.add(cmp2);
                    		str1.add(cmp3);
                    		str1.add(cmp4);
                    		str1.add(cmp5);
                         	
                  }
         }
         
	return (str1);

}
       @AuraEnabled
    public static list<String> getSelectionCondition(String ruleId){
        String SoqlQueryString; 
       	List<SalesProgram__x> SelectionCondition = new List<SalesProgram__x>();
        
        SoqlQueryString = 'SELECT selectionConditions__c FROM SalesProgram__x';
        SoqlQueryString = SoqlQueryString + ' WHERE search__c =  \'' + ruleId +'\''; //'PR-KUME0OJ01633940554'];
        
 			System.debug('i am here' +SelectionCondition);
        if(!Test.isRunningTest())SelectionCondition = Database.query(SoqlQueryString); 
          
         	System.debug('i am here' +SelectionCondition);
				list<String> str1 = new list<String>();
            	for (SalesProgram__x c  : SelectionCondition ){
               		String str = c.selectionConditions__c;
               		System.debug('selectionCondition: ' +str);
               	List<Object> untyped = (List<Object>) JSON.deserializeUntyped(str);
                  		for(Object obj: untyped){
                			Map<String,Object> data = (Map<String,Object>)obj;
                         	String cmp1 = String.valueof(data.get('selectionConditionDisplay'));
                            str1.add(cmp1);    
                         	
                  }
         }
	return (str1);

}
    @AuraEnabled
    public static void  deletedetails(String ruleIdp){
  
  	String SoqlQueryString;
		
	List<SalesProgram__x> deleteRecords = New List<SalesProgram__x>();
        
		//if(!String.Isblank(ruleIds)) ruleIds=String.escapeSingleQuotes(ruleIds);
			SoqlQueryString = 'SELECT Id from SalesProgram__x WHERE ruleId__c =\'' + ruleIdp +'\'';
			
			System.debug('SOQL query is  '+SoqlQueryString);
		if(!Test.isRunningTest())deleteRecords=Database.query(SoqlQueryString); 
        
		/*if(deleteRecords.size()>0)
        {
            for(SalesProgram__x p:deleteRecords);
        }  */  
		Database.DeleteResult[] drList = Database.deleteAsync(deleteRecords);	
		
}  
    /* @AuraEnabled
    public static void  EditProgram(String ruleIds){
  
		string SoqlQueryString;
		List<SalesProgram__x> editRecords = New List<SalesProgram__x>();
        //List<SalesProgram__x> deleteRecords = [SELECT Id from SalesProgram__x WHERE ruleId__c IN: ruleIds];
		if(!String.Isblank(ruleIds)) ruleIds=String.escapeSingleQuotes(ruleIds);
			SoqlQueryString = 'SELECT Id from SalesProgram__x WHERE ruleId__c =\'' + ruleIds +'\'';
			//SoqlQueryString = 'SELECT Id from SalesProgram__x WHERE ruleId__c = \'PR-KUME0OJ01633940554 \'';
			System.debug('SOQL query is  '+SoqlQueryString);
		if(!Test.isRunningTest())editRecords=Database.query(SoqlQueryString); 
        
		if(editRecords.size()>0)
        {
            for(SalesProgram__x p:editRecords);
        }    
		Database.editResult[] drList = Database.deleteAsync(deleteRecords);	
        system.debug('delete record is'+drList);
} */ 
}