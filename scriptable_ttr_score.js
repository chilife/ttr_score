/* Christian Schmidt 2021
   returns TTR & Q-TTR for your account.
  Credantials in Params required: username,password
*/
  
  async function createWidget() {  
  // Create new empty ListWidget instance
  let listwidget = new ListWidget();
  // Set new background color
  listwidget.backgroundColor = new Color("#000000");
  //curl ttr
  let ttr_stats = await getMyTtr();
  
  // Add TTR
  console.log(ttr_stats.body);
  body_ttr = JSON.parse(ttr_stats.body);
  console.log(body_ttr);
  
  if (body_ttr.ttr > 0) {
    // Add widget heading
    let heading = listwidget.addText("🏓Mein TTR🏓");
    heading.centerAlignText();
    heading.font = Font.lightSystemFont(15);
    heading.textColor = new Color("#ffffff");

    // Spacer between heading and launch date
    listwidget.addSpacer(5);
  
    //TTR adding to Widget if available (only premium accounts)
    let ttr = listwidget.addText(body_ttr.ttr);
    ttr.centerAlignText();
    ttr.font = Font.lightSystemFont(30);
    ttr.textColor = new Color("#ffffff");
    
    // Spacer between heading and launch date
    listwidget.addSpacer(15);
  }
  
  // Add widget heading
  let qttrHeading = listwidget.addText("🏓Mein QTTR🏓");
  qttrHeading.centerAlignText();
  qttrHeading.font = Font.lightSystemFont(15);
  qttrHeading.textColor = new Color("#dddddd");

  // Spacer between heading and launch date
  listwidget.addSpacer(5);
  
  // Add QTTR
  let qttr = listwidget.addText(body_ttr.qttr);
  qttr.centerAlignText();
  qttr.font = Font.lightSystemFont(30);
  qttr.textColor = new Color("#dddddd");
  

  // Return the created widget
  return listwidget;
}

let widget = await createWidget();

// Check where the script is running
if (config.runsInWidget) {
  // Runs inside a widget so add it to the homescreen widget
  Script.setWidget(widget);
} else {
  // Show the medium widget inside the app
  widget.presentMedium();
}

//calls getMyTtr function on amazon aws lambda function
async function getMyTtr() {
  var login = new Object();
  login.mail = "christian@schmidt-burgholzhausen.de";
  login.pw  = "myt1scht3nn1s";
  //login.mail = "kristina";
  //login.pw  = "butterfly";
  console.log(args.widgetParameter)
  // add login credentials as arguments
  if(args.widgetParameter != null) {
    console.log("There is two params")
    login.mail=args.widgetParameter.split(",")[0];
    login.pw=args.widgetParameter.split(",")[1];
  }
 
  
  //lambda function URL
  let url = "https://st2en8hrtk.execute-api.eu-west-1.amazonaws.com/v1"
  
  // Initialize new request
  let request = new Request(url);
  request.headers = login;
  console.log(request);  

  // Execute the request and parse the response as json
  const response = await request.loadJSON();
  console.log("Response: ");
  console.log(response);
  // Return the returned ttr scores
  return response;
}

Script.complete();