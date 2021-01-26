class Response {
  constructor(body) {
    this.textOutput = ContentService.createTextOutput(
      JSON.stringify(body)
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
