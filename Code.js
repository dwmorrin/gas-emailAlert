/** Web App that can generate Gmail emails when hit */

// request.body contains parsed JSON sent by client
let request;

function main(rawRequest) {
  try {
    processRawRequest(rawRequest); // handles specifics of Apps Script request format
    sendEmail(); // sends off an email
    return response(); // HTTP response for client
  } catch (error) {
    if (error instanceof BadRequestException)
      return errorResponse(error.message);
    logError(error);
    return errorResponse("?");
  }
}

// GET requests enter here
function doGet(rawRequest) {
  return main(rawRequest);
}

// POST requests enter here
function doPost(rawRequest) {
  return main(rawRequest);
}

// checks for request data and either updates request or throws error
function processRawRequest(rawRequest) {
  if (!rawRequest || !rawRequest.postData || !rawRequest.postData.contents)
    throw new BadRequestException("no data");
  const body = tryJsonParse(rawRequest.postData.contents);
  if (!body) throw new BadRequestException("could not parse data");
  // you could also check for some body.secret or otherwise formatted data
  // structure to prevent someone from just pinging your app and triggering
  // an email
  request = { body };
}

// on success...
function sendEmail() {
  const body = JSON.stringify(request.body);
  const template = HtmlService.createTemplateFromFile("EmailTemplate");
  template.body = body;

  MailApp.sendEmail({
    to: env.email.to,
    subject: "Alert",
    body,
    htmlBody: template.evaluate().getContent(),
  });
}

// Helper utilities

function tryJsonParse(s) {
  try {
    return JSON.parse(s);
  } catch (e) {
    return null;
  }
}

// on success, returns this to client
function response() {
  return new Response(request).textOutput;
}

// on error, returns this to client
function errorResponse(message) {
  return new Response(message).textOutput;
}

// Just putting the default error into the console just displays the name
// This tries to unpack the most useful info, falling back to less useful
function logError(error) {
  console.log(error.stack || error.message || error.name);
}
