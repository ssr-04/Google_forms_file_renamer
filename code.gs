// Author: Sachin M Sabariram (@ssr-04)
// 2022 (distribued under Open source )


function myFunction() {
var ui = SpreadsheetApp.getUi();
var prompt1 = ui.prompt("Enter your Google drive folder id");
var driveID = prompt1.getResponseText();
console.log(driveID);
var prompt2 = ui.prompt("Enter your form id");
var formID = prompt2.getResponseText();
var form = FormApp.openById(formID); //DDD
var formResponses = form.getResponses();
var title = form.getTitle();
var baseString = 'https://drive.google.com/file/d/';
var endString = '/view?usp=drivesdk';
  
var folder = DriveApp.getFolderById(driveID);
var files = folder.getFiles();
 
  while (files.hasNext()) {
    var file = files.next();
    for (var i = 0; i < formResponses.length; i++) {
      var formResponse = formResponses[i];
      var itemResponses = formResponse.getItemResponses();
      var itemResponseId = itemResponses[0];
      var itemResponsename = itemResponses[1];
      var itemResponseFile = itemResponses[2];
      
      var file_ID = itemResponseFile.getResponse();
      
      //Creates the file name based on the first two form responses and form title (eg. name = "response1" + "response2" + "title"
      var newName = itemResponseId.getResponse() + " " + itemResponsename.getResponse() + " "+ title; 
      
      //Creates folder name based on second response in forms
      var url = baseString + file_ID + endString;
      var urlCheck = file.getUrl();
      if ( url == urlCheck) {
        var modName = newName + ".pdf";
        file.setName(modName);
      }
    }
  }
}
