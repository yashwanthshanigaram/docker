@IsTest(SeeAllData=true)
class IB_ViewAllSalesPrograms_Test {
        class Mock extends IB_ExternalQuery
        {
            final List<SalesterritoryRecommendations__x> externalRecords;
            Mock(List<SalesterritoryRecommendations__x> externalRecords)
            {
                this.externalRecords = externalRecords;
            }
    
            protected override List<SObject> passThrough(string extQuery)
            {
                return externalRecords;
            }
        }
    
        @IsTest static void testStuff()
        {
            list<SalesterritoryRecommendations__x> apiResponse = new list<SalesterritoryRecommendations__x>();
            Sales_Territory__c newST = [Select id From Sales_Territory__c limit 1];
            List<SalesterritoryRecommendations__x> mockRecords = new List<SalesterritoryRecommendations__x>();
            SalesterritoryRecommendations__x mockRecord1 = new SalesterritoryRecommendations__x(recommendation__c='123');
            mockRecords.add(mockRecord1);
            IB_ExternalQuery.setMock(new Mock(mockRecords));
            
            Test.startTest();
            apiResponse = ViewAllSalesPrograms_Shamanth.fetchSalesPrograms(newST.Id);
            Test.stopTest();
    
            system.debug('API Response in test class : ' + apiResponse);

            // make assertions
        }
}