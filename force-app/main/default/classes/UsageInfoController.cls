/**
 * @description       : UsageInfoUpdate
 * @author            : Girish Patel
 * @group             : Development
 * @last modified on  : 31-03-2023
 * @last modified by  : Girish Patel
**/

public without sharing class UsageInfoController {
    
    /**
     * @description pass the South Africa id to the method
     * @author Girish Patel | 31-03-2023
     * @param String said as South Africa Id
     **/
    @AuraEnabled
    public static void createOrUpdateSAIDUsageInfo(String said){
        List<South_African_ID_Usage__c> listSouthAfricaIdUsage = [SELECT Id, Name, Times_of_Usage__c FROM South_African_ID_Usage__c WHERE Name =:said LIMIT 1];
        
        if(listSouthAfricaIdUsage != null && listSouthAfricaIdUsage.size() > 0){
            
            update new South_African_ID_Usage__c(
                Id = listSouthAfricaIdUsage[0].Id, 
                Times_of_Usage__c = listSouthAfricaIdUsage[0].Times_of_Usage__c + 1
            );
        } else {
            
            insert new South_African_ID_Usage__c(Name = said, Times_of_Usage__c = 1);
        }
    }
}