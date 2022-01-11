({
  doInit: function(component, event, helper) {
    var rule = component.get("v.search");
    console.log("ruleName" + rule);
    var sfdcId_ST = component.get("v.recordId");
    console.log("sfdcId" + sfdcId_ST);
    var stid = component.get("v.stid");
    component.set("v.globalvar", ["1", "2", "3", "4", "5", "6"]);
    component.set("v.columns", [
      {
        label: "Opportunity Owner",
        sortable: "true",
        initialWidth: 200,
        fieldName: "OwnerNames",
        type: "url",
        typeAttributes: { label: { fieldName: "OwnerName" }, target: "_blank" },
        value: 1
      },
      {
        label: "Opportunity Name",
        sortable: "true",
        initialWidth: 440,
        fieldName: "Opportunity_Name",
        type: "url",
        typeAttributes: {
          label: { fieldName: "Opportunity_Name__c" },
          target: "_blank"
        },
        value: 2
      },
      {
        label: "HPE Opportunity ID ",
        sortable: "true",
        fieldName: "Opportunity_ID__c",
        initialWidth: 200,
        type: "text",
        value: 3
      },
      {
        label: "Account ST ID",
        sortable: "true",
        initialWidth: 200,
        fieldName: "AccountSTID",
        type: "text",
        value: 4
      },
      {
        label: "Account ST Name",
        sortable: "true",
        initialWidth: 240,
        fieldName: "AccountSTName",
        type: "text",
        value: 5
      },
      {
        label: "Tagged",
        sortable: "true",
        initialWidth: 220,
        fieldName: "tagged",
        type: "text",
        value: 6
      },
      {
        label: "Campaign Influence",
        sortable: "true",
        initialWidth: 220,
        fieldName: "Primary_Campaign_Name__c",
        type: "text",
        value: 7
      },
      {
        label: "Close Date",
        sortable: "true",
        initialWidth: 220,
        fieldName: "CloseDate",
        type: "date",
        value: 8
      },
      {
        label: "Sales Stage",
        sortable: "true",
        initialWidth: 220,
        fieldName: "Opportunity_Sales_Stage__c",
        type: "text",
        value: 9
      },
      {
        label: "Total Value to HPE Converted",
        sortable: "true",
        initialWidth: 220,
        fieldName: "Tier_1_Opportunity_Value__c",
        type: "currency",
		currencyCode: 'USD',
		cellAttributes: { alignment: 'right' },
		typeAttributes: { minimumFractionDigits: 0,maximumFractionDigits: 0,currencyCode: 'USD'},
        value: 10
      },
      {
        label: "Type",
        initialWidth: 220,
        sortable: "true",
        fieldName: "Type",
        type: "text",
        value: 11
      },
      {
        label: "Pipeline Exclusion ",
        sortable: "true",
        fieldName: "Pipeline_Exclusion__c",
        initialWidth: 200,
        type: "text",
        value: 12
      }
    ]);
    helper.loadData(component, event, helper);
    var action = component.get("c.AssociatedOpportunity");
    action.setParams({ rule: rule, sfdcId: sfdcId_ST, accountstid1: stid });
    action.setCallback(this, function(response) {
      var state = response.getState();
      //alert(state);
      if (state === "SUCCESS" || state === "DRAFT") {
        var responseValue = response.getReturnValue();
        console.log("responseValue", responseValue);
        //  var rows = response.getReturnValue();
       /* for (var i = 0; i < responseValue.length; i++) {
          var row = responseValue[i];
          if (row.Account) row.AccountSTName = row.Account.Account_ST_Name__c;
          if (row.Account) row.AccountSTID = row.Account.Account_ST_ID__c;
          if (row.Owner) row.OwnerName = row.Owner.Name;
        }*/

        // component.set("v.columns", row);
        // component.set("v.partnerList",responseValue);
        //responseValue.forEach(function(record){
        //record.Opportunity_Name= 'https://'+window.location.hostname+'/lightning/r/Opportunity/'+record.Id+'/view' ; //Here define your value which you want to display
        //record.OwnerNames = 'https://'+window.location.hostname+'/lightning/r/Opportunity/'+record.Owner.Id+'/view';
        // });
        var campaign = component.get("v.campaign");
        //var campaignIdArray = campaign.split(",");
        console.log("campaign" + campaign);
        var programcampaignArray = [];
        for (var i = 0; i < campaign.length; i++) {
          programcampaignArray.push(campaign[i]);
          console.log(programcampaignArray[i]);
        }
        //programcampaignArray = ['70127000001ALwmAAG'];

        console.log("programcampaignArray" + programcampaignArray);
        for (var i = 0; i < responseValue.length; i++) {
             var row = responseValue[i];
          if (row.Account) row.AccountSTName = row.Account.Account_ST_Name__c;
          if (row.Account) row.AccountSTID = row.Account.Account_ST_ID__c;
          if (row.Owner) row.OwnerName = row.Owner.Name;
          var opptyCampaignInfluence =
            row.Campaign_Influence_id__c;
          console.log("opptyCampaignInfluence = " + opptyCampaignInfluence);
          var opptyCampaignArray = [];
          if (
            opptyCampaignInfluence !== undefined &&
            opptyCampaignInfluence.length > 0
          ) {
            opptyCampaignArray = opptyCampaignInfluence.split(",");
            console.log("opptyCampaignArray=" + opptyCampaignArray);
            console.log(
              "opptyCampaignArray length =" + opptyCampaignArray.length
            );
          }
          let tagged = "No";
          if (
            programcampaignArray.length > 0 &&
            opptyCampaignArray.length > 0
          ) {
            for (var index = 0; index < programcampaignArray.length; index++) {
              var programCampaignId = programcampaignArray[index];
              console.log("programCampaignId" + programCampaignId);
              console.log(opptyCampaignArray + "includes" + programCampaignId);
              if (opptyCampaignArray.includes(programCampaignId)) {
                tagged = "Yes";

                break;
              }
            }
           
          }
             console.log("tagged i = " + tagged);
            row.Opportunity_Name =
              "https://" +
              window.location.hostname +
              "/lightning/r/Opportunity/" +
              row.Id +
              "/view"; //Here define your value which you want to display
            row.OwnerNames =
              "https://" +
              window.location.hostname +
              "/lightning/r/Opportunity/" +
              row.Owner.Id +
              "/view";
            row.tagged = tagged;

          //var finalresult = component.get("v.partnerList");
          // console.log("finalresult length = "+finalresult.length);
          /* responseValue.forEach(function(record) {
            record.Opportunity_Name =
              "https://" +
              window.location.hostname +
              "/lightning/r/Opportunity/" +
              record.Id +
              "/view"; //Here define your value which you want to display
            record.OwnerNames =
              "https://" +
              window.location.hostname +
              "/lightning/r/Opportunity/" +
              record.Owner.Id +
              "/view";
            record.tagged = tagged;
          });*/
        }
        component.set("v.partnerList", responseValue);
        if (responseValue != null && responseValue.length > 0) {
          component.set(
            "v.totalPages",
            Math.ceil(
              response.getReturnValue().length / component.get("v.pageSize")
            )
          );
          component.set("v.currentPageNumber", 1);

          helper.buildData(component, helper);
        } else {
          component.set(
            "v.totalPages",
            Math.ceil(
              response.getReturnValue().length / component.get("v.pageSize")
            )
          );
          component.set("v.currentPageNumber", 0);
          helper.buildData(component, helper);
        }
      }
    });
    $A.enqueueAction(action);

    var defaultColumns = [
      {
        label: "Opportunity Owner",
        sortable: "true",
        initialWidth: 200,
        fieldName: "OwnerNames",
        type: "url",
        typeAttributes: { label: { fieldName: "OwnerName" }, target: "_blank" },
        value: "1"
      },
      {
        label: "Opportunity Name",
          sortable: "true",
        initialWidth: 440,
        fieldName: "Opportunity_Name",
        type: "url",
        typeAttributes: {
          label: { fieldName: "Opportunity_Name__c" },
          target: "_blank"
        },
        value: "2"
      },
      {
        label: "HPE Opportunity ID ",
          sortable: "true",
        fieldName: "Opportunity_ID__c",
        initialWidth: 200,
        type: "text",
        value: "3"
      },
      {
        label: "Account ST ID",
          sortable: "true",
        initialWidth: 200,
        fieldName: "AccountSTID",
        type: "text",
        value: "4"
      },
      {
        label: "Account ST Name",
          sortable: "true",
        initialWidth: 240,
        fieldName: "AccountSTName",
        type: "text",
        value: "5"
      },
      {
        label: "Tagged",
          sortable: "true",
        initialWidth: 220,
        fieldName: "tagged",
        type: "text",
        value: "6"
      },
      {
        label: "Campaign Influence",
          sortable: "true",
        initialWidth: 220,
        fieldName: "Primary_Campaign_Name__c",
        type: "text",
        value: "7"
      },
      {
        label: "Close Date",
          sortable: "true",
        initialWidth: 220,
        fieldName: "CloseDate",
        type: "date",
        value: "8"
      },
      {
        label: "Sales Stage",
          sortable: "true",
        initialWidth: 220,
        fieldName: "Opportunity_Sales_Stage__c",
        type: "text",
        value: "9"
      },
      {
         label: "Total Value to HPE Converted",
        sortable: "true",
        initialWidth: 220,
        fieldName: "Tier_1_Opportunity_Value__c",
        type: "currency",
		currencyCode: 'USD',
		cellAttributes: { alignment: 'right' },
		typeAttributes: { minimumFractionDigits: 0,maximumFractionDigits: 0,currencyCode: 'USD'},
        value: 10
      },
      {
        label: "Type",
        initialWidth: 220,
          sortable: "true",
        fieldName: "Type",
        type: "text",
        value: "11"
      },
      {
        label: "Pipeline Exclusion",
          sortable: "true",
        fieldName: "Pipeline_Exclusion__c",
        initialWidth: 200,
        type: "text",
        value: "12"
      },

      {
        label: "HPE Opportunity Update",
          sortable: "true",
        fieldName: "Opportunity_Update__c",
        initialWidth: 200,
        type: "text",
        value: "13"
      },
      {
        label: "Opporuntiy Description",
          sortable: "true",
        fieldName: "Description",
        initialWidth: 200,
        type: "text",
        value: "14"
      },

      {
        label: "Forcast Category ",
          sortable: "true",
        fieldName: "Forecast_Category__c",
        initialWidth: 200,
        type: "text",
        value: "15"
      },
      {
        label: "Win/Lost Reason",
          sortable: "true",
        fieldName: "Win_Loss_Reason__c",
        initialWidth: 200,
        type: "text",
        value: "16"
      },
      {
        label: "Record Type ID",
          sortable: "true",
        fieldName: "RecordTypeId",
        initialWidth: 200,
        type: "text",
        value: "17"
      },
      {
        label: "Owner Company Type",
          sortable: "true",
        fieldName: "Owner_Company_Type__c",
        initialWidth: 200,
        type: "text",
        value: "18"
      },
      {
        label: "Max Book/Ship Date",
          sortable: "true",
        fieldName: "Max_Book_Ship_Date__c",
        initialWidth: 200,
        type: "text",
        value: "19"
      },
      {
        label: "Owner Role Type",
          sortable: "true",
        initialWidth: 200,
        fieldName: "OwnerRoleType__c",
        type: "text",
        value: "20"
      },
      {
        label: "Customer Engagement",
          sortable: "true",
        initialWidth: 200,
        fieldName: "Customer_Engagement__c",
        type: "text",
        value: "21"
      },

      {
        label: "Fulfillment",
          sortable: "true",
        initialWidth: 200,
        fieldName: "Fulfillment__c",
        type: "text",
        value: "22"
      },
      {
        label: "Days since last modified",
          sortable: "true",
        initialWidth: 200,
        fieldName: "Days_since_last_modified__c",
        type: "text",
        value: "23"
      },
      {
        label: "Order Exits",
          sortable: "true",
        initialWidth: 200,
        fieldName: "Order_Exists__c",
        type: "text",
        value: "24"
      },

      {
        label: "Partner Company",
          sortable: "true",
        initialWidth: 200,
        fieldName: "Partner_Company__c",
        type: "text",
        value: "25"
      },
      {
        label: "Current Stage # days",
          sortable: "true",
        initialWidth: 200,
        fieldName: "Current_Stage_days__c",
        type: "text",
        value: "26"
      }
    ];

    var availableColumns = [];

    component.set("v.options", defaultColumns);
    component.set("v.values", availableColumns);

    component.set("v.requiredOptions", [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12"
    ]);
  },
  onNext: function(component, event, helper) {
    var pageNumber = component.get("v.currentPageNumber");
    component.set("v.currentPageNumber", pageNumber + 1);
    helper.buildData(component, helper);
  },

  onPrev: function(component, event, helper) {
    var pageNumber = component.get("v.currentPageNumber");
    component.set("v.currentPageNumber", pageNumber - 1);
    helper.buildData(component, helper);
  },

  processMe: function(component, event, helper) {
    component.set("v.currentPageNumber", parseInt(event.target.name));
    helper.buildData(component, helper);
  },

  onFirst: function(component, event, helper) {
    component.set("v.currentPageNumber", 1);
    helper.buildData(component, helper);
  },

  onLast: function(component, event, helper) {
    component.set("v.currentPageNumber", component.get("v.totalPages"));
    var totalList = component.get("v.pageList");
    var lastIndex = totalList.length - 1;
    console.log("Selected Page==>" + totalList[lastIndex]);
    console.log("Current Page==>" + component.get("v.currentPageNumber"));
    helper.buildData(component, helper);
  },

  opencustomizetable: function(component, event, helper) {
    component.set("v.columnsorder", [
      {
        label: "Opportunity Owner",
        sortable: "true",
        initialWidth: 200,
        fieldName: "OwnerNames",
        type: "url",
        typeAttributes: { label: { fieldName: "OwnerName" }, target: "_blank" },
        value: "1"
      },
      {
        label: "Opportunity Name",
        sortable: "true",
        initialWidth: 440,
        fieldName: "Opportunity_Name",
        type: "url",
        typeAttributes: {
          label: { fieldName: "Opportunity_Name__c" },
          target: "_blank"
        },
        value: "2"
      },
      {
        label: "HPE Opportunity ID",
        sortable: "true",
        fieldName: "Opportunity_ID__c",
        initialWidth: 200,
        type: "text",
        value: "3"
      },
      {
        label: "Account ST ID",
        sortable: "true",
        initialWidth: 200,
        fieldName: "AccountSTID",
        type: "text",
        value: "4"
      },
      {
        label: "Account ST Name",
        sortable: "true",
        initialWidth: 240,
        fieldName: "AccountSTName",
        type: "text",
        value: "5"
      },
      {
        label: "Tagged",
        initialWidth: 220,
        sortable: "true",
        fieldName: "tagged",
        type: "text",
        value: "6"
      },
      {
        label: "Campaign Influence",
        sortable: "true",
        initialWidth: 220,
        fieldName: "Primary_Campaign_Name__c",
        type: "text",
        value: "7"
      },
      {
        label: "Close Date",
        sortable: "true",
        initialWidth: 220,
        fieldName: "CloseDate",
        type: "date",
        value: "8"
      },
      {
        label: "Sales Stage",
        sortable: "true",
        initialWidth: 220,
        fieldName: "Opportunity_Sales_Stage__c",
        type: "text",
        value: "9"
      },
      {
         label: "Total Value to HPE Converted",
        sortable: "true",
        initialWidth: 220,
        fieldName: "Tier_1_Opportunity_Value__c",
        type: "currency",
		currencyCode: 'USD',
		cellAttributes: { alignment: 'right' },
		typeAttributes: { minimumFractionDigits: 0,maximumFractionDigits: 0,currencyCode: 'USD'},
        value: 10
      },
      {
        label: "Type",
        initialWidth: 220,
        sortable: "true",
        fieldName: "Type",
        type: "text",
        value: "11"
      },
      {
        label: "Pipeline Exclusion",
        sortable: "true",
        fieldName: "Pipeline_Exclusion__c",
        initialWidth: 200,
        type: "text",
        value: "12"
      },
      {
        label: "HPE Opportunity Update",
        sortable: "true",
        fieldName: "Opportunity_Update__c",
        initialWidth: 200,
        type: "text",
        value: "13"
      },
      {
        label: "Opporuntiy Description",
        sortable: "true",
        fieldName: "Description",
        initialWidth: 200,
        type: "text",
        value: "14"
      },
      {
        label: "Forcast Category",
        sortable: "true",
        fieldName: "Forecast_Category__c",
        initialWidth: 200,
        type: "text",
        value: "15"
      },
      {
        label: "Win/Lost Reason",
        sortable: "true",
        fieldName: "Win_Loss_Reason__c",
        initialWidth: 200,
        type: "text",
        value: "16"
      },
      {
        label: "Record Type ID",
        sortable: "true",
        fieldName: "RecordTypeId",
        initialWidth: 200,
        type: "text",
        value: "17"
      },
      {
        label: "Owner Company Type",
        sortable: "true",
        fieldName: "Owner_Company_Type__c",
        initialWidth: 200,
        type: "text",
        value: "18"
      },
      {
        label: "Max Book/Ship Date",
        sortable: "true",
        fieldName: "Max_Book_Ship_Date__c",
        initialWidth: 200,
        type: "text",
        value: "19"
      },
      {
        label: "Owner Role Type",
        sortable: "true",
        initialWidth: 200,
        fieldName: "OwnerRoleType__c",
        type: "text",
        value: "20"
      },
      {
        label: "Customer Engagement",
        sortable: "true",
        initialWidth: 200,
        fieldName: "Customer_Engagement__c",
        type: "text",
        value: "21"
      },
      {
        label: "Fulfillment",
        sortable: "true",
        initialWidth: 200,
        fieldName: "Fulfillment__c",
        type: "text",
        value: "22"
      },
      {
        label: "Days since last modified",
        sortable: "true",
        initialWidth: 200,
        fieldName: "Days_since_last_modified__c",
        type: "text",
        value: "23"
      },
      {
        label: "Order Exits",
        sortable: "true",
        initialWidth: 200,
        fieldName: "Order_Exists__c",
        type: "text",
        value: "24"
      },
      {
        label: "Partner Company",
        sortable: "true",
        initialWidth: 200,
        fieldName: "Partner_Company__c",
        type: "text",
        value: "25"
      },
      {
        label: "Current Stage # days",
        sortable: "true",
        initialWidth: 200,
        fieldName: "Current_Stage_days__c",
        type: "text",
        value: "26"
      }
    ]);
    component.set("v.iscustomizetableopen", true);
  },

  closecustomizetable: function(component, event, helper) {
    component.set("v.iscustomizetableopen", false);
  },
  handleChange: function(cmp, event) {
    // This will contain an array of the "value" attribute of the selected options
    var selectedOptionValue = event.getParam("value");

    //console.log(typeof(selectedOptionValue));
    var string123 = selectedOptionValue.toString();
    //alert("Option selected with value: '" + selectedOptionValue.toString() + "'");

    var array123 = JSON.parse("[" + string123 + "]");

    var refreshvalues;

    cmp.set("v.globalvar", array123);
  },

  applySelectedColumns: function(component, event, helper) {
    var rule = component.get("v.search");
    console.log("ruleName" + rule);
    var sfdcId_ST = component.get("v.recordId");
    console.log("sfdcId" + sfdcId_ST);
    var action = component.get("c.AssociatedOpportunity");
    action.setParams({ rule: rule, sfdcId: sfdcId_ST });
    action.setCallback(this, function(response) {
      var state = response.getState();
      //alert(state);
      if (state === "SUCCESS" || state === "DRAFT") {
        var responseValue = response.getReturnValue();
        console.log("responseValue", responseValue);
       
        var campaign = component.get("v.campaign");
        //var campaignIdArray = campaign.split(",");
        console.log("campaign" + campaign);
        var programcampaignArray = [];
        for (var i = 0; i < campaign.length; i++) {
          programcampaignArray.push(campaign[i]);
          console.log(programcampaignArray[i]);
        }
        console.log("programcampaignArray" + programcampaignArray);
        for (var i = 0; i < responseValue.length; i++) {
             var row = responseValue[i];
          if (row.Account) row.AccountSTName = row.Account.Account_ST_Name__c;
          if (row.Account) row.AccountSTID = row.Account.Account_ST_ID__c;
          if (row.Owner) row.OwnerName = row.Owner.Name;
          var opptyCampaignInfluence =
            row.Campaign_Influence_id__c;
          console.log("opptyCampaignInfluence = " + opptyCampaignInfluence);
          var opptyCampaignArray = [];
          if (
            opptyCampaignInfluence !== undefined &&
            opptyCampaignInfluence.length > 0
          ) {
            opptyCampaignArray = opptyCampaignInfluence.split(",");
            console.log("opptyCampaignArray=" + opptyCampaignArray);
            console.log(
              "opptyCampaignArray length =" + opptyCampaignArray.length
            );
          }
          let tagged = "No";
          if (
            programcampaignArray.length > 0 &&
            opptyCampaignArray.length > 0
          ) {
            for (var index = 0; index < programcampaignArray.length; index++) {
              var programCampaignId = programcampaignArray[index];
              console.log("programCampaignId" + programCampaignId);
              console.log(opptyCampaignArray + "includes" + programCampaignId);
              if (opptyCampaignArray.includes(programCampaignId)) {
                tagged = "Yes";

                break;
              }
            }
           
          }
             console.log("tagged i = " + tagged);
            row.Opportunity_Name =
              "https://" +
              window.location.hostname +
              "/lightning/r/Opportunity/" +
              row.Id +
              "/view"; //Here define your value which you want to display
            row.OwnerNames =
              "https://" +
              window.location.hostname +
              "/lightning/r/Opportunity/" +
              row.Owner.Id +
              "/view";
            row.tagged = tagged;

        }
           component.set("v.partnerList", responseValue);

        if (responseValue != null && responseValue.length > 0) {
          component.set(
            "v.totalPages",
            Math.ceil(
              response.getReturnValue().length / component.get("v.pageSize")
            )
          );
          component.set("v.currentPageNumber", 1);

          helper.buildData(component, helper);
        } else {
          component.set(
            "v.totalPages",
            Math.ceil(
              response.getReturnValue().length / component.get("v.pageSize")
            )
          );
          component.set("v.currentPageNumber", 0);
          helper.buildData(component, helper);
        }
      }
    });
    $A.enqueueAction(action);

    var usethisvar = component.get("v.globalvar");
    //console.log(typeof(usethisvar))
    //console.log(usethisvar)
    //console.log("9310");

    var columnsvar = component.get("v.columnsorder");
    //var columnsvalues=[];
    var result = [];

    //console.log(columnsvar.length);
    for (var i = 0; i < columnsvar.length; i++) {
      if (
        columnsvar[i].value == 1 ||
        columnsvar[i].value == 2 ||
        columnsvar[i].value == 3 ||
        columnsvar[i].value == 4 ||
        columnsvar[i].value == 5 ||
        columnsvar[i].value == 6 ||
        columnsvar[i].value == 7 ||
        columnsvar[i].value == 8 ||
        columnsvar[i].value == 9 ||
        columnsvar[i].value == 10 ||
        columnsvar[i].value == 1 ||
        columnsvar[i].value == 11 ||
        columnsvar[i].value == 12 ||
        columnsvar[i].value == 13 ||
        columnsvar[i].value == 14 ||
        columnsvar[i].value == 15 ||
        columnsvar[i].value == 16 ||
        columnsvar[i].value == 17 ||
        columnsvar[i].value == 18
      ) {
        continue;
      }
      var c = 0;
      //  console.log("i"+columnsvar[i].value);
      for (var j = 0; j < usethisvar.length; j++) {
        //    console.log(usethisvar[j]);
        if (columnsvar[i].value === usethisvar[j]) {
          //      console.log("in if")
          break;
        } else {
          //    console.log("in else")
          c++;
        }
      }
      //console.log("c"+c);
      //console.log(usethisvar.length);
      if (c == usethisvar.length) {
        columnsvar.splice(i, 1);
        i--;
      }
    }

    var columnsvarsorted = [];

    for (var j = 0; j < usethisvar.length; j++) {
      for (var i = 0; i < columnsvar.length; i++) {
        if (usethisvar[j] == columnsvar[i].value) {
          //console.log(columnsvar[i]);
          columnsvarsorted[j] = columnsvar[i];
        }
      }
    }

    //console.log(columnsvar);
    //console.log(columnsvarsorted)
    //console.log("checkcolumnsvarsoretedarray")
    component.set("v.columns", columnsvarsorted);

    //console.log(usethisvar);
    component.set("v.iscustomizetableopen", false);
  },
  updateColumnSorting: function(cmp, event, helper) {
    cmp.set("v.isupdating", true);

    setTimeout(
      $A.getCallback(function() {
        var fieldName = event.getParam("fieldName");
          console.log("FieldName = "+fieldName);
        var sortDirection = event.getParam("sortDirection");
        cmp.set("v.sortedBy", fieldName);
        cmp.set("v.sortedDirection", sortDirection);
        if (fieldName === "Opportunity_Name") {
          fieldName = "Opportunity_Name__c";
          helper.sortData(cmp, fieldName, sortDirection);
        } else if (fieldName ==="OwnerNames"){
           fieldName = "OwnerName";
          helper.sortData(cmp, fieldName, sortDirection); 
        }
            else {
          helper.sortData(cmp, fieldName, sortDirection);
        }
        cmp.set("v.isupdating", false);
      }),
      0
    );
  }
});