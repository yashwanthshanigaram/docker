public class Managment 
{
    @AuraEnabled
    public static List<SalesProgram__x> searchcampaign(String searchKey) 
    {
        
        List<sObject> SoqlQueryString=new List<sObject>();
        system.debug('searchkeyvalue'+searchKey);
        
        if(String.isNotBlank(searchKey)){
            
            SoqlQueryString = [SELECT campaignName__c,ruleName__c,campaignCode__c FROM SalesProgram__x WHERE search__c =:+'\'' + searchKey +'\''];
            
            system.debug('SoqlQueryString is = '+SoqlQueryString);
        }
        
        return SoqlQueryString;
    }
    
    @AuraEnabled
    public static void storeSession(String programName,String programtype,string programDesc,String programStartDate,String programEndDate,String programGeo, String programAccValue,
                                    String programGovernance, String programSeismic1,String programSeismic2,String programSeismic3,String programResource1,String programResource2,
                                    String programResource3,String programDescription1,String programDescription2,String programDescription3,String programDescription4,String programDescription5,String programDescription6
                                   )
    {
        Map<String,String> mymap = new Map<String,String>();
        mymap.put('programName',programName);
        mymap.put('programtype',programtype);
        mymap.put('programDesc',programDesc);
        mymap.put('programStartDate',programStartDate);
        mymap.put('programEndDate',programEndDate);
        mymap.put('programGeo',programGeo);
        mymap.put('programAccValue',programAccValue);
        mymap.put('programGovernance',programGovernance);
        mymap.put('programSeismic1',programSeismic1);
        mymap.put('programSeismic2',programSeismic3);
        mymap.put('programSeismic3',programSeismic3);
        mymap.put('programResource1',programResource1);
        mymap.put('programResource2',programResource2);
        mymap.put('programResource3',programResource3);
        mymap.put('programDescription1',programDescription1);
        mymap.put('programDescription2',programDescription2);
        mymap.put('programDescription3',programDescription3);
        mymap.put('programDescription4',programDescription4);
        mymap.put('programDescription5',programDescription5);
        mymap.put('programDescription6',programDescription6);
        
        Cache.Org.put('local.ProgramManagement.mymap', mymap);
        system.debug('programName'+mymap);
        
        Cache.Org.get('local.ProgramManagement.mymap');
        system.debug('programName for get'+Cache.Org.get('local.ProgramManagement.mymap'));
    }
    @AuraEnabled
    public static Object getSession()
    {
        system.debug('programName'+Cache.Org.get('local.ProgramManagement.mymap'));  
        return Cache.Org.get('local.ProgramManagement.mymap');
        
        //return Cache.Session.get('programName');
        
    }
    
    @AuraEnabled
    public static void storeSessionf2(String obofferingf2,String fieldofferingf2,String optrofferingf2,String valofferingf2,String descofferingf2)
    {
        Map<String,String> mymap2 = new Map<String,String>();
        mymap2.put('obofferingf2',obofferingf2);
        mymap2.put('fieldofferingf2',fieldofferingf2);
        mymap2.put('optrofferingf2',optrofferingf2);
        mymap2.put('valofferingf2',valofferingf2);
        mymap2.put('descofferingf2',descofferingf2);
        
        
        Cache.Org.put('local.ProgramManagement.mymap2', mymap2);
        system.debug('programName'+mymap2);
        
        Cache.Org.get('local.ProgramManagement.mymap2');
        system.debug('programName for get'+Cache.Org.get('local.ProgramManagement.mymap2'));
    }
    
    @AuraEnabled
    public static Object getSessionf2()
    {
        system.debug('programName'+Cache.Org.get('local.ProgramManagement.mymap2'));  
        return Cache.Org.get('local.ProgramManagement.mymap2');
        
        //return Cache.Session.get('programName');
        
    }
    @AuraEnabled
    public static Object removeSessionf2()
    {
        system.debug('programName'+Cache.Org.get('local.ProgramManagement.mymap2'));  
        return Cache.Org.get('local.ProgramManagement.mymap2');
        
        //return Cache.Session.get('programName');
        
    }
    
    @AuraEnabled
    public static Object removeSession()
    {
        system.debug('programName'+Cache.Org.get('local.ProgramManagement.mymap'));  
        return Cache.Org.get('local.ProgramManagement.mymap');
        
        //return Cache.Session.get('programName');
        
    }
    
    
    @AuraEnabled
    public static list<wrapperOption> getOfferingsdata(){
        
        List<wrapperOption> listOption = new List<wrapperOption>();
        List<RuleManagementMetadata__x> Offeringsdata = [SELECT value__c FROM RuleManagementMetadata__x where recommendationType__c='programOffering'];
        System.debug('i am here'+Offeringsdata);
        String strTest = Offeringsdata[0].value__c;
        system.debug('strtest'+strTest);
        String[] arrTest = strTest.split(',');
        List<String> finalstr=new List<String>();
        System.debug('value list'+arrTest.size());
        
        for(String arr: arrTest){
            //String[] arrTest1 = arr.split(',');
            //System.debug()
            // finalstr.add(st2[1]);
            if(arr.contains('value')){
                string[] st2=arr.split(':');
                if(st2.size()==2){
                    String st3=st2[1].remove('}');
                    String st4=st3.remove('"');
                    // finalstr.add(st4);
                    listOption.add(new wrapperOption(st4)) ;
                    
                }
            }
            
        }
        system.debug('logeed value is'+listOption);
        return(listOption);
        
    }
    
    public class wrapperOption{
        @AuraEnabled public String str;
        @AuraEnabled public boolean selected;
        
        public wrapperOption(String st4){
            str= st4;
            selected=false;
        }
    }
    
    @AuraEnabled
    public static list<wrappercontractlst> contractServicelst(){
        
        List<wrappercontractlst> listOption = new List<wrappercontractlst>();
        List<RuleManagementMetadata__x> Offeringsdata = [SELECT contractCurrentSupportServiceLevel__c FROM RuleManagementMetadata__x where recommendationType__c='programObjects'];
        System.debug('i am here'+Offeringsdata);
        String strTest = Offeringsdata[0].contractCurrentSupportServiceLevel__c;
        system.debug('strtest'+strTest);
        String[] arrTest = strTest.split(',');
        List<String> finalstr=new List<String>();
        System.debug('value list'+arrTest.size());
        
        for(String arr: arrTest){
            //String[] arrTest1 = arr.split(',');
            //System.debug()
            // finalstr.add(st2[1]);
            if(arr.contains('value')){
                string[] st2=arr.split(':');
                if(st2.size()==2){
                    String st3=st2[1].remove('}');
                    String st4=st3.remove('"');
                    // finalstr.add(st4);
                    listOption.add(new wrappercontractlst(st4)) ;
                    
                }
            }
            
        }
        system.debug('logeed value is'+listOption);
        return(listOption);
        
    }
    
    public class wrappercontractlst{
        @AuraEnabled public String text;
        @AuraEnabled public String value;
        @AuraEnabled public boolean selected;
        
        public wrappercontractlst(String st4){
            text= st4;
            value=st4;
            selected=false;
        }
    }
    
    @AuraEnabled
    public static list<wrappercontractProdlst> contractProdlst(){
        
        List<wrappercontractProdlst> listOption = new List<wrappercontractProdlst>();
        List<RuleManagementMetadata__x> Offeringsdata = [SELECT contractProductType__c FROM RuleManagementMetadata__x where recommendationType__c='programObjects'];
        System.debug('i am here'+Offeringsdata);
        String strTest = Offeringsdata[0].contractProductType__c;
        system.debug('strtest'+strTest);
        String[] arrTest = strTest.split(',');
        List<String> finalstr=new List<String>();
        System.debug('value list'+arrTest.size());
        
        for(String arr: arrTest){
            //String[] arrTest1 = arr.split(',');
            //System.debug()
            // finalstr.add(st2[1]);
            if(arr.contains('value')){
                string[] st2=arr.split(':');
                if(st2.size()==2){
                    String st3=st2[1].remove('}');
                    String st4=st3.remove('"');
                    // finalstr.add(st4);
                    listOption.add(new wrappercontractProdlst(st4)) ;
                    
                }
            }
            
        }
        system.debug('logeed value is'+listOption);
        return(listOption);
        
    }
    
    public class wrappercontractProdlst{
        @AuraEnabled public String text;
        @AuraEnabled public String value;
        @AuraEnabled public boolean selected;
        
        public wrappercontractProdlst(String st4){
            text= st4;
            value=st4;
            selected=false;
        }
    }
    
    @AuraEnabled
    public static list<wrappercontractProdline> contractProdline(){
        
        List<wrappercontractProdline> listOption = new List<wrappercontractProdline>();
        List<RuleManagementMetadata__x> Offeringsdata = [SELECT contractProductLine__c  FROM RuleManagementMetadata__x where recommendationType__c='programObjects'];
        System.debug('i am here'+Offeringsdata);
        String strTest = Offeringsdata[0].contractProductLine__c;
        system.debug('strtest'+strTest);
        String[] arrTest = strTest.split(',');
        List<String> finalstr=new List<String>();
        System.debug('value list'+arrTest.size());
        
        for(String arr: arrTest){
            //String[] arrTest1 = arr.split(',');
            //System.debug()
            // finalstr.add(st2[1]);
            if(arr.contains('value')){
                string[] st2=arr.split(':');
                if(st2.size()==2){
                    String st3=st2[1].remove('}');
                    String st4=st3.remove('"');
                    // finalstr.add(st4);
                    listOption.add(new wrappercontractProdline(st4)) ;
                    
                }
            }
            
        }
        system.debug('logeed value is'+listOption);
        return(listOption);
        
    }
    
    public class wrappercontractProdline{
        @AuraEnabled public String text;
        @AuraEnabled public String value;
        @AuraEnabled public boolean selected;
        
        public wrappercontractProdline(String st4){
            text= st4;
            value=st4;
            selected=false;
        }
    }
    
    @AuraEnabled
    public static list<wrapperAccIndustry> accIndustry(){
        
        List<wrapperAccIndustry> listOption = new List<wrapperAccIndustry>();
        List<RuleManagementMetadata__x> Offeringsdata = [SELECT accountIndustry__c FROM RuleManagementMetadata__x where recommendationType__c='programObjects'];
        System.debug('i am here'+Offeringsdata);
        String strTest = Offeringsdata[0].accountIndustry__c;
        system.debug('strtest'+strTest);
        String[] arrTest = strTest.split(',');
        List<String> finalstr=new List<String>();
        System.debug('value list'+arrTest.size());
        
        for(String arr: arrTest){
            //String[] arrTest1 = arr.split(',');
            //System.debug()
            // finalstr.add(st2[1]);
            if(arr.contains('value')){
                string[] st2=arr.split(':');
                if(st2.size()==2){
                    String st3=st2[1].remove('}');
                    String st4=st3.remove('"');
                    // finalstr.add(st4);
                    listOption.add(new wrapperAccIndustry(st4)) ;
                    
                }
            }
            
        }
        system.debug('logeed value is'+listOption);
        return(listOption);
        
    }
    
    public class wrapperAccIndustry{
        @AuraEnabled public String text;
        @AuraEnabled public String value;
        @AuraEnabled public boolean selected;
        
        public wrapperAccIndustry(String st4){
            text= st4;
            value=st4;
            selected=false;
        }
    }
    @AuraEnabled
    public static list<wrapperAcctype> accProdType(){
        
        List<wrapperAcctype> listOption = new List<wrapperAcctype>();
        List<RuleManagementMetadata__x> Offeringsdata = [SELECT accountProductType__c FROM RuleManagementMetadata__x where recommendationType__c='programObjects'];
        System.debug('i am here'+Offeringsdata);
        String strTest = Offeringsdata[0].accountProductType__c;
        system.debug('strtest'+strTest);
        String[] arrTest = strTest.split(',');
        List<String> finalstr=new List<String>();
        System.debug('value list'+arrTest.size());
        
        for(String arr: arrTest){
            //String[] arrTest1 = arr.split(',');
            //System.debug()
            // finalstr.add(st2[1]);
            if(arr.contains('value')){
                string[] st2=arr.split(':');
                if(st2.size()==2){
                    String st3=st2[1].remove('}');
                    String st4=st3.remove('"');
                    // finalstr.add(st4);
                    listOption.add(new wrapperAcctype(st4)) ;
                    
                }
            }
            
        }
        system.debug('logeed value is'+listOption);
        return(listOption);
        
    }
    
    public class wrapperAcctype{
        @AuraEnabled public String text;
        @AuraEnabled public String value;
        @AuraEnabled public boolean selected;
        
        public wrapperAcctype(String st4){
            text= st4;
            value=st4;
            selected=false;
        }
    }
    
    @AuraEnabled
    public static list<wrapperOptyStages> optySalesStage(){
        
        List<wrapperOptyStages> listOption = new List<wrapperOptyStages>();
        List<RuleManagementMetadata__x> Offeringsdata = [SELECT opportunityCurrentStage__c FROM RuleManagementMetadata__x where recommendationType__c='programObjects'];
        System.debug('i am here'+Offeringsdata);
        String strTest = Offeringsdata[0].opportunityCurrentStage__c;
        system.debug('strtest'+strTest);
        String[] arrTest = strTest.split(',');
        List<String> finalstr=new List<String>();
        System.debug('value list'+arrTest.size());
        
        for(String arr: arrTest){
            //String[] arrTest1 = arr.split(',');
            //System.debug()
            // finalstr.add(st2[1]);
            if(arr.contains('value')){
                string[] st2=arr.split(':');
                if(st2.size()==2){
                    String st3=st2[1].remove('}');
                    String st4=st3.remove('"');
                    // finalstr.add(st4);
                    listOption.add(new wrapperOptyStages(st4)) ;
                    
                }
            }
            
        }
        system.debug('logeed value is'+listOption);
        return(listOption);
        
    }
    
    public class wrapperOptyStages{
        @AuraEnabled public String text;
        @AuraEnabled public String value;
        @AuraEnabled public boolean selected;
        
        public wrapperOptyStages(String st4){
            text= st4;
            value=st4;
            selected=false;
        }
    }
    
    @AuraEnabled
    public static void storeSessionf3(String obDataSetIbf3,String fieldDataSetIbf3,String optrDataSetIbf3,String valDataSetIbf3,String descDataSetIbf3)
    {
        Map<String,String> mymap3 = new Map<String,String>();
        mymap3.put('obDataSetIbf3',obDataSetIbf3);
        mymap3.put('fieldDataSetIbf3',fieldDataSetIbf3);
        mymap3.put('optrDataSetIbf3',optrDataSetIbf3);
        mymap3.put('valDataSetIbf3',valDataSetIbf3);
        mymap3.put('descDataSetIbf3',descDataSetIbf3);
        
        
        Cache.Org.put('local.ProgramManagement.mymap3', mymap3);
        system.debug('programName'+mymap3);
        
        Cache.Org.get('local.ProgramManagement.mymap3');
        system.debug('programName for get'+Cache.Org.get('local.ProgramManagement.mymap3'));
    }
    
    @AuraEnabled
    public static Object getSessionf3()
    {
        system.debug('programName'+Cache.Org.get('local.ProgramManagement.mymap3'));  
        return Cache.Org.get('local.ProgramManagement.mymap3');
        
        //return Cache.Session.get('programName');
        
    }
    @AuraEnabled
    public static Object removeSessionf3()
    {
        system.debug('programName'+Cache.Org.get('local.ProgramManagement.mymap3'));  
        return Cache.Org.get('local.ProgramManagement.mymap3');
        
        //return Cache.Session.get('programName');
        
    }
    @AuraEnabled
    public static List<SalesProgram__x> campaignSearch(String searchKey) {
        
        List<sObject> SoqlQueryString=new List<sObject>();
        system.debug('searchkeyvalue'+searchKey);
        
        if(String.isNotBlank(searchKey)){
            
            SoqlQueryString = [SELECT campaignName__c,ruleName__c,campaignCode__c FROM SalesProgram__x WHERE search__c =:+'\'' + searchKey +'\''];
            
            system.debug('SoqlQueryString is = '+SoqlQueryString);
        }
        
        return SoqlQueryString;
    }
    @AuraEnabled
    public static void EditProgram(String ruleId,String programName,String programtype, String progStatus, string programDesc,String programStartDate,String programEndDate,String programGeo, String programAccValue,String programGovernance, String programSeismic1,String programSeismic2,String programSeismic3,String programResource1,String programResource2,String programResource3,String programDescription1,String programDescription2,String programDescription3,String programDescription4,String programDescription5,String programDescription6,String progOffering,String programisActive,String contractServiceOptions,String dataSetIBFilter,String objectOptions,String fieldPicklist,String fieldOptions,String operatorPicklist)
        /*String valuePicklist,String valOptions,String operatorOptions,String valueProduct,String objectDataSetIb,String fieldDataSetIb,String operatorDataSetIb,String valueDataSetIb,String descDataSetIn,String objectEvalCond,String fieldEvalCond,String operatorEvalCond,String valueEvalCond,String descEvalCond,String evalobjectOptions,String evalfieldPicklist,String evalfieldOptions,String evaloperatorPicklist,String evalvaluePicklist,String evalvalOptions,String evaloperatorOption*/
    {
        String SoqlQueryString;
        SalesProgram__x updateProgram = new SalesProgram__x();
        
        SoqlQueryString = 'SELECT Id, ruleName__c,recommendationType__c,ruleType__c,status__c, description__c, createdDate__c, effectiveStartDate__c, effectiveEndDate__c, region__c, programGovernance__c, programType__c, isActive__c, requestType__c, recommendationValue__c, targetType__c, fileKey__c, ruleTypeAbbreviation__c, frequency__c, recommendationEvaluationReadout__c, recommendationEvaluationCondition__c, userId__c, userFullName__c, selectionRules__c, selectionConditions__c, evaluationRules__c, evaluationConditions__c, campaign__c, offerings__c from SalesProgram__x WHERE ruleId__c =\'' + ruleId +'\'';
        SoqlQueryString = SoqlQueryString + ' and userId__c=\'21725101\' and id__c = \''+ ruleId + '\'';
        system.debug(SoqlQueryString);
        
        if(!Test.isRunningTest())updateProgram=Database.query(SoqlQueryString);
        if (programName != null){
            updateProgram.ruleName__c = programName;}
        updateProgram.recommendationType__c = 'Program';
        if(programtype != null){
            updateProgram.ruleType__c = programtype;}
        if(progStatus != null){
            updateProgram.status__c = progStatus;}
        if (programDesc != null){
            updateProgram.description__c = programDesc;}
        if(programStartDate != null){
            updateProgram.effectiveStartDate__c = programStartDate;}
        if(programEndDate != null){
            updateProgram.effectiveEndDate__c = programEndDate;}
        updateProgram.campaign__c = '[{"campaignCode":"78645","campaignName":"test"}]';
        if(programGeo != null){
            updateProgram.region__c = programGeo;}
        if(programAccValue != null){
            updateProgram.recommendationValue__c = programAccValue;}
        if(programGovernance != null){
            updateProgram.programGovernance__c = programGovernance;}
        if(programtype != null){
            updateProgram.programType__c = programtype;}
        if(programSeismic1 != null){
            updateProgram.SeismicLink_First__c = programSeismic1;}
        if(programDescription1 != null){
            updateProgram.SeismicLink_First_desc__c = programDescription1;}
        if(programSeismic2 != null){
            updateProgram.SeismicLink_Second__c = programSeismic2;}
        if(programDescription2 != null){
            updateProgram.SeismicLink_Second_desc__c = programDescription2;}
        if(programSeismic3 != null){
            updateProgram.SeismicLink_Third__c = programSeismic3;}
        if(programDescription3 != null){
            updateProgram.SeismicLink_Third_desc__c = programDescription3;}
        if(programResource1 != null){
            updateProgram.ResourceLink_First__c = programResource1;}
        if(programDescription4 != null){
            updateProgram.ResourceLink_First_desc__c = programDescription4;}
        if(programResource2 != null){
            updateProgram.ResourceLink_Second__c = programResource2;}
        if(programDescription5 != null){
            updateProgram.ResourceLink_Second_desc__c = programDescription5;}
        if(programResource3 != null){
            updateProgram.ResourceLink_Third__c = programResource3;}
        if(programDescription6 != null){
            updateProgram.ResourceLink_Third_desc__c = programDescription6;}
        if(progOffering != null){
            updateProgram.offerings__c = progOffering; }//'[{ "uiValue" : "S4 - Apollo 4000;S4 - Apollo 4K & Data Plt;S4 - Apollo 4000", "uiLabel" : "Product Line", "selectionDescription" : "-", "operator" : "IN", "object" : "product"}]';
        updateProgram.selectionRules__c = '[{"selectionDescription" : "E","object" : "opportunity","operator" : "<","uiValue" : "1","uiValue":"product"}]';
        updateProgram.selectionConditions__c = '[{"selectionConditionDisplay" : "(1.CurrentStage :1)"}]';
        updateProgram.uploadedSTIdList__c = 'true';
        updateProgram.evaluationConditions__c = '[{"evaluationConditionDisplay" : "1.PreviousLostOpportunities : Yes","postCondition" : "No","evaluationMessage" : "TestingEvaluationConditions","priority" : "1"}]';
        updateProgram.evaluationRules__c = '[{"object" : "TestingEvaluation","uiLabel" : "Date", "operator" : ">","uiValue" : "1999-12-12"}]';
        updateProgram.isActive__c = 'programisActive';
        
        updateProgram.createdDate__c = '03-01-2022';
        updateProgram.requestType__c = 'edit';
        updateProgram.targetType__c = 'List';
        updateProgram.fileKey__c = 'test';
        updateProgram.ruleTypeAbbreviation__c = 'PG';
        updateProgram.frequency__c = '1';
        updateProgram.recommendationEvaluationReadout__c = 'test';
        updateProgram.recommendationEvaluationCondition__c='((EVAL1 AND EVAL2) OR EVAL3)';
        
        //SalesProgram__x program = new SalesProgram__x();
        /*String[] object1 = new string[]{'TestingEvaluation1','TestingEvaluation2','TestingEvaluation3'};
String[] uiLabel= new string[]{'Date','Number','Value'};
String[] operator= new string[]{'>','=','<'};
String[] uiValue= new string[]{'1999-12-12','5000','900'};
list<String> msg1 = new list<String>();
String msg2 ;

for(Integer i=0;i<object1.size();i++)
{
map<String,Object> msg = new map<String,Object>();
msg.put('object', object1[i]);
msg.put('uiLabel', uiLabel[i]);
msg.put('operator', operator[i]);
msg.put('uiValue', uiValue[i]);

msg2 = JSON.serialize(msg);
msg1.add(msg2);
}
String msg3 = msg1.toString();
String msg4 = msg3.remove('(');
String msg5 = msg4.remove(')');

updateProgram.evaluationRules__c = '[' +msg5+']';*/
        Database.SaveResult drList = Database.updateAsync(updateProgram);
        system.debug('drList '+drList);
        if (drList.isSuccess()) {
            // Operation was successful, so get the ID of the record that was processed
            System.debug('Successfully updated : ' + drList.getId());
        }
        else {
            // Operation failed, so get all errors
            for(Database.Error err : drList.getErrors()) {
                System.debug('The following error has occurred.');
                System.debug(err.getStatusCode() + ': ' + err.getMessage());
                System.debug('Fields that affected this error: ' + err.getFields());
                
            }
        }
    }
    @AuraEnabled   
    public static List<SalesProgram__x> programLink(String ruleId){
        
        String SoqlQueryString;
        List<SalesProgram__x> totalrec = New List<SalesProgram__x>();
        
        SoqlQueryString = 'SELECT offerings__c,createdDate__c,description__c,effectiveEndDate__c,effectiveStartDate__c,ExternalId,Id,id__c,isActive__c,programGovernance__c,programType__c,recommendationType__c,recommendationValue__c,region__c,ruleId__c,ruleName__c,ruleType__c,status__c,search__c,userId__c,totalRecords__c,SeismicLink_First__c,SeismicLink_Second__c,SeismicLink_Third__c,ResourceLink_First__c,ResourceLink_Second__c,ResourceLink_Third__c,recommendationEvaluationReadout__c,uploadedSTIdList__c,ResourceLink_First_desc__c,ResourceLink_Third_desc__c,ResourceLink_Second_desc__c,SeismicLink_First_desc__c,SeismicLink_Second_desc__c,SeismicLink_Third_desc__c FROM SalesProgram__x ';
        
        SoqlQueryString = SoqlQueryString + 'WHERE ruleId__c =  \'' + ruleId +'\'';
        
        if(!Test.isRunningTest())totalrec=Database.query(SoqlQueryString); 
        return totalrec;
    } 
    
    @AuraEnabled
    public static list<String> getCampaign(String ruleId){
        String SoqlQueryString;
        
        List<SalesProgram__x> CampaignList = New List<SalesProgram__x>();
        
        SoqlQueryString = 'SELECT campaign__c FROM SalesProgram__x'; 
        SoqlQueryString = SoqlQueryString + ' WHERE ruleId__c =  \'' + ruleId +'\''; 
        
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
            }
        }
        return (str1);
    }
    @AuraEnabled
    public static list<String> getOfferings(String ruleId){
        
        String SoqlQueryString; 
        List<SalesProgram__x> OfferingList = new List<SalesProgram__x>();
        
        SoqlQueryString = 'SELECT offerings__c FROM SalesProgram__x';
        SoqlQueryString = SoqlQueryString + ' WHERE ruleId__c =  \'' + ruleId +'\'';
        System.debug('i am here' +OfferingList);
        if(!Test.isRunningTest())OfferingList = Database.query(SoqlQueryString); 
        list<String> str1 = new list<String>();
        for (SalesProgram__x c  : OfferingList ){
            String str = c.offerings__c;
            System.debug('OfferingsName: ' +str);
            Map<String, Object> untyped = (Map<String, Object>) JSON.deserializeUntyped(str);
            String cmp1 = String.valueof(untyped.get('object'));
            String cmp2 = String.valueof(untyped.get('uiLabel'));
            String cmp3 = String.valueof(untyped.get('operator'));
            String cmp4 = String.valueof(untyped.get('uiValue'));
            String cmp5 = String.valueof(untyped.get('selectionDescription'));
            
            String cmp = cmp1 +' where '+cmp2+' '+cmp3+' '+cmp4;
            str1.add(cmp);    
            str1.add(cmp1);
            str1.add(cmp2);
            str1.add(cmp3);
            str1.add(cmp4);
            str1.add(cmp5);
            
        }
        return (str1);
        
    }
    @AuraEnabled
    public static Map<String, list<String> > getEvaluationRules(String ruleId){
        
        String SoqlQueryString; 
        List<SalesProgram__x> EvaluationRulesList = new List<SalesProgram__x>();
        
        SoqlQueryString = 'SELECT evaluationRules__c FROM SalesProgram__x';
        SoqlQueryString = SoqlQueryString + ' WHERE search__c =  \'' + ruleId +'\''; 
        
        if(!Test.isRunningTest())EvaluationRulesList = Database.query(SoqlQueryString); 
        
        List<SalesProgram__x> CampaignList = New List<SalesProgram__x>();
        
        if(!Test.isRunningTest())CampaignList=Database.query(SoqlQueryString); 
        System.debug('i am here' +CampaignList);
        List<String> str1	= new list<String>();
        String str = CampaignList[0].evaluationRules__c;
        System.debug('campaignName' +str);
        String str2 = str.remove('[');
        String str3 = str2.remove(']');
        String str4 = str3.remove('"');
        String str5 = str4.replace(':','=');
        String[] str6=str5.split('}');			
        for(Integer i=0;i<str6.size();i++){
            str1.add(str6[i]);
        }
        Map < String, list<String> > strA1 = new Map < String, list<String> >();
        
        for(Integer i=0;i<EvaluationRulesList.size();i++ ){
            String strA2 = EvaluationRulesList[i].evaluationRules__c;
            List<Object> untyped = (List<Object>)JSON.deserializeUntyped(strA2);
            System.debug('untyuyped'+untyped.size());
            for(Integer j=0;j<untyped.size();j++){
                Map<String, Object> data = (Map<String, Object>)untyped[j];
                
                String cmp1 = String.valueof(data.get('object'));
                String cmp2 = String.valueof(data.get('uiLabel'));
                String cmp3 = String.valueof(data.get('operator'));
                String cmp4 = String.valueof(data.get('uiValue'));
                
                String cmp = cmp1 +' where '+cmp2+' '+cmp3+' '+cmp4;
                List<String> mst= new List<String>();
                mst.add(cmp1);
                mst.add(cmp2);
                mst.add(cmp3);
                mst.add(cmp4);
                strA1.put(cmp, mst);
            }
        }	
        return (strA1);
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
                str1.add(cmp1);    
                str1.add(cmp2);
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
    public static Map<String, list<String> > getSelectionRules(String ruleId){
        
        String SoqlQueryString; 
        List<SalesProgram__x> SelectionRulesList = new List<SalesProgram__x>();
        
        SoqlQueryString = 'SELECT selectionRules__c FROM SalesProgram__x';
        SoqlQueryString = SoqlQueryString + ' WHERE search__c =  \'' + ruleId +'\''; 
        
        if(!Test.isRunningTest())SelectionRulesList = Database.query(SoqlQueryString); 
        
        List<SalesProgram__x> CampaignList = New List<SalesProgram__x>();
        
        if(!Test.isRunningTest())CampaignList=Database.query(SoqlQueryString); 
        System.debug('i am here' +CampaignList);
        List<String> str1	= new list<String>();
        String str = CampaignList[0].selectionRules__c;
        System.debug('SelectionRuleName' +str);
        String str2 = str.remove('[');
        String str3 = str2.remove(']');
        String str4 = str3.remove('"');
        String str5 = str4.replace(':','=');
        String[] str6=str5.split('}');			
        for(Integer i=0;i<str6.size();i++){
            str1.add(str6[i]);
        }
        Map < String, list<String> > strA1 = new Map < String, list<String> >();
        
        for(Integer i=0;i<SelectionRulesList.size();i++ ){
            String strA2 = SelectionRulesList[i].selectionRules__c;
            List<Object> untyped = (List<Object>)JSON.deserializeUntyped(strA2);
            System.debug('untyuyped'+untyped.size());
            for(Integer j=0;j<untyped.size();j++){
                Map<String, Object> data = (Map<String, Object>)untyped[j];
                
                String cmp1 = String.valueof(data.get('object'));
                String cmp2 = String.valueof(data.get('uiLabel'));
                String cmp3 = String.valueof(data.get('operator'));
                String cmp4 = String.valueof(data.get('uiValue'));
                String cmp5 = String.valueof(data.get('selectionDescription'));
                
                String cmp = cmp1 +' where '+cmp2+' '+cmp3+' '+cmp4;
                List<String> mst= new List<String>();
                mst.add(cmp1);
                mst.add(cmp2);
                mst.add(cmp3);
                mst.add(cmp4);
                mst.add(cmp5);
                strA1.put(cmp, mst);
            }
        }	
        return (strA1);
    }
    @AuraEnabled
    public static list<String> getSelectionCondition(String ruleId){
        String SoqlQueryString; 
        List<SalesProgram__x> SelectionCondition = new List<SalesProgram__x>();
        
        SoqlQueryString = 'SELECT selectionConditions__c FROM SalesProgram__x';
        SoqlQueryString = SoqlQueryString + ' WHERE search__c =  \'' + ruleId +'\''; 
        
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
        SoqlQueryString = 'SELECT Id from SalesProgram__x WHERE ruleId__c =\'' + ruleIdp +'\'';
        
        if(!Test.isRunningTest())deleteRecords=Database.query(SoqlQueryString); 
        
        Database.DeleteResult[] drList = Database.deleteAsync(deleteRecords);	
        
    } 
    @AuraEnabled
    public static void newprogram(String programName,String programtype, string programDesc,String programStartDate,String programEndDate,String campaignName,String programGeo, String programAccValue,String programGovernance, String programSeismic1,String programResource1,String programDescription1,String programDescription4,String obofferingf2,String fieldofferingf2,String optrofferingf2,String valofferingf2,
         String obofferingf4,String fieldofferingf4,String optrofferingf4 ,String valofferingf4 ,String evalcondf5,String salesplayf5,String recomrankingf5)/*,String valueEvalCond,String descEvalCond,String evalobjectOptions,String evalfieldPicklist,String evalfieldOptions,String evaloperatorPicklist,String evalvaluePicklist,String evalvalOptions,String evaloperatorOption*/
    {
        SalesProgram__x program = new SalesProgram__x();
        program.recommendationType__c='Program';
        program.ruleName__c=programName;
        program.ruleType__c=programtype;
        program.status__c='Draft';
        program.description__c = programDesc;
        program.createdDate__c = date.today().format();
        program.effectiveStartDate__c=programStartDate;
        program.effectiveEndDate__c = programEndDate;
        program.region__c=programGeo;
        program.programGovernance__c=programGovernance;
        program.programType__c='Protect';
        program.isActive__c='false';
        program.requestType__c='new';
        program.recommendationValue__c=programAccValue;
        program.targetType__c='test';
        program.fileKey__c='test';
        program.ruleTypeAbbreviation__c='Test';
        program.frequency__c='1';
        program.recommendationEvaluationReadout__c='new';
        program.recommendationEvaluationCondition__c='((EVAL1 AND EVAL2) OR EVAL3)';
        program.userId__c='21725101';
        program.userFullName__c='Simona Iacob';
        program.selectionRules__c= '[{"selectionDescription" : "E","object" : "opportunity","operator" : "<","uiValue" : "1","uiValue":"product"}]';
        program.selectionConditions__c='[{"selectionConditionDisplay" : "(1.CurrentStage :1)"}]';
        //program.evaluationRules__c='[{"object" : "TestingEvaluation","uiLabel" : "Date", "operator" : ">","uiValue" : "1999-12-12"}]';
        program.evaluationConditions__c='[{"evaluationConditionDisplay" : "1.PreviousLostOpportunities : Yes","postCondition" : "No","evaluationMessage" : "TestingEvaluationConditions","priority" : "1"}]';
        
        //program.campaign__c='[{"campaignName": "TestingCampInsert1"},{"campaignName" : "TestingCampInsert2"}]';
        // program.offerings__c= '[{ "uiValue" : , "uiLabel" : , "selectionDescription" : "-", "operator" : , "object" : }]';
        
        // SalesProgram__x program = new SalesProgram__x();
        map<String,Object> campaign = new map<String,Object>();
        campaign.put('campaignName',campaignName);
       
        
        program.campaign__c = '[' +JSON.serialize(campaign)+']';
        
        map<String,Object> f2 = new map<String,Object>();
        f2.put('object', obofferingf2);
        f2.put('uiLabel', fieldofferingf2);
        f2.put('operator', optrofferingf2);
        f2.put('uiValue','S4 - Apollo 4000');
        
        program.offerings__c = '[' +JSON.serialize(f2)+']';
         System.debug('prgm offering'+program.offerings__c);
        
        map<String,Object> msg = new map<String,Object>();
        msg.put('object', obofferingf4);
        msg.put('uiLabel', fieldofferingf4);
        msg.put('operator', optrofferingf4);
        msg.put('uiValue', valofferingf4);
        
        program.evaluationRules__c = '[' +JSON.serialize(msg)+']';
         System.debug('evaluationRules__c'+program.evaluationRules__c);
        
         map<String,Object> f5 = new map<String,Object>();
        f5.put('evaluationConditionDisplay',evalcondf5);
        f5.put('postCondition','No');
        f5.put('evaluationMessage',salesplayf5);
        f5.put('priority',recomrankingf5);
        
        program.evaluationConditions__c = '[' +JSON.serialize(f5)+']'; 
        
        Database.SaveResult srList = Database.insertImmediate(program);
        system.debug('Database save = '+srList);
        //for (Database.SaveResult sr : srList) {
        if (srList.isSuccess()) {
            // Operation was successful, so get the ID of the record that was processed
            System.debug('Successfully inserted : ' + srList);
        }
        else {
            // Operation failed, so get all errors
            for(Database.Error err : srList.getErrors()) {
                System.debug('The following error has occurred.');
                System.debug(err.getStatusCode() + ': ' + err.getMessage());
                System.debug('Fields that affected this error: ' + err.getFields());
                
            }
        }
        //SalesProgram__x afterInsert=[SELECT Id,ruleId__c,ruleName__c FROM SalesProgram__x WHERE Id=:srList.Id];
        //system.debug('after insert ruleid'+afterInsert);
    }    
}