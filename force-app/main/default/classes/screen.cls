public class screen{
    @AuraEnabled
        Public static List< IBNextUserAuthorization__x> getData(){
        //get all contact list
       return [SELECT apps__c,Business_Planner__c,createdDate__c,CurrencyIsoCode,DisplayUrl,DSA__c,DS__c,Email__c,ExternalId,filterBy__c,HIT__c,Id,id__c,isActive__c,isEnabled__c,lastModifiedDate__c,page__c,programIndexGeo__c,programManagementGeo__c,Program_Index__c,search__c,SmartIB_Management__c,SmartIB__c,userAccessLevel__c,UserAccessValue_UI__c,userAccessValue__c,userDomainId__c,userId__c,userName__c,userNtRegion__c FROM IBNextUserAuthorization__x LIMIT 1000];
    
}

}