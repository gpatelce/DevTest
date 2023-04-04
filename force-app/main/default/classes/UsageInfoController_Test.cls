/**
 * @description       : UsageInfoUpdate Test Class
 * @author            : Girish Patel
 * @group             : Development
 * @last modified on  : 31-03-2023
 * @last modified by  : Girish Patel
**/
@IsTest
public class UsageInfoController_Test {    
    @isTest
    public static void createOrUpdateSAIDUsageInfo_whenPassedExistingSAID_shouldIncreaseTheUsageCount() {
        //given
        insert new South_African_ID_Usage__c(Name = 'ExistingSAID', Times_of_Usage__c = 1);
        
        //when
        Test.startTest();
        	UsageInfoController.createOrUpdateSAIDUsageInfo('ExistingSAID');
        Test.stopTest();
        
        //then
        List<South_African_ID_Usage__c> saIdUsagesAfterCall = [SELECT Id, Name, Times_of_Usage__c FROM South_African_ID_Usage__c WHERE Name = 'ExistingSAID'];
        System.assertEquals(1, saIdUsagesAfterCall.size(), 'Invalid number of usage record against SAID');
        System.assertEquals(2, saIdUsagesAfterCall[0].Times_of_Usage__c, 'Invalid number of times SAID used');
    }
    
    @isTest
    public static void createOrUpdateSAIDUsageInfo_whenPassedNewSAID_shouldSetTheUsageCountToOne() {
        //given
        
        //when
        Test.startTest();
        	UsageInfoController.createOrUpdateSAIDUsageInfo('NewSAID');
        Test.stopTest();
        
        //then
        List<South_African_ID_Usage__c> saIdUsagesAfterCall = [SELECT Id, Name, Times_of_Usage__c FROM South_African_ID_Usage__c WHERE Name = 'NewSAID'];
        System.assertEquals(1, saIdUsagesAfterCall.size(), 'Invalid number of usage record against SAID');
        System.assertEquals(1, saIdUsagesAfterCall[0].Times_of_Usage__c, 'Invalid number of times SAID used');
    }
}