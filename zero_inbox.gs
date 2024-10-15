/**
 * Logs email statistics for the previous day.
 * 
 * This function collects the number of emails received, completed, and left in the inbox for the previous day.
 * It then calculates a score based on unhandled emails and appends the data to a Google Sheet.
 */
function main() {
  const ONE_DAY_MS = 24 * 60 * 60 * 1000;
  const date = new Date(Date.now() - ONE_DAY_MS)
  const formattedDate = Utilities.formatDate(date, Session.getScriptTimeZone(), 'yyyy-MM-dd');
  const [completed, received, left] = getEmailsStats(date);
  const score = Math.max(0, completed - left * 5)

  appendStats([formattedDate, received, completed, left, score])
}

/**
 * Sets up a daily trigger for the `run` function at 12 PM.
 * 
 * Deletes any existing triggers and creates a new one to 
 * run the `main` function every day at noon.
 */
function install() {
  // Delete all existing triggers in a cleaner way using forEach
  ScriptApp.getProjectTriggers().forEach(trigger => ScriptApp.deleteTrigger(trigger));

  // Create a new trigger to run the 'run' function every day at 12 PM
  ScriptApp.newTrigger('main')
    .timeBased()
    .atHour(12)
    .everyDays(1)
    .create();
}

/**
 * Appends email statistics and calculates the total score in the Google Sheet.
 * 
 * This function appends a row of email stats to the spreadsheet and calculates the total score
 * by adding the current score to the previous total, if available.
 *
 * @param {Array} dataArray - An array containing date, received emails, completed emails, left emails, and score.
 */
function appendStats(dataArray) {
  const sheet = SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID')).getSheets()[0];
  const lastRow = sheet.getRange('A:A').getValues().filter(String).length;

  // Define references for current and total scores
  const currentScoreRef = sheet.getRange(lastRow + 1, dataArray.length).getA1Notation();
  const totalScoreRef = sheet.getRange(lastRow, dataArray.length + 1).getA1Notation();
  const newScoreRef = sheet.getRange(lastRow + 1, dataArray.length + 1).getA1Notation();

  // Set total score formula
  let totalScoreFormula = `=${currentScoreRef}`
  if(lastRow > 1) {
    totalScoreFormula += ` + ${totalScoreRef}`
  }

  // Set level formula
  const levelFormula = `=FLOOR(${newScoreRef}/1000)`

  sheet.appendRow([...dataArray, totalScoreFormula, levelFormula]);
}

/**
 * Retrieves email statistics for a given date.
 * 
 * Fetches the total number of emails received, emails completed (no longer in the inbox), 
 * and the number of emails left in the inbox up to the end of the given day.
 *
 * @param {Date} date - The date for which to gather email stats.
 * @returns {Array} - An array containing [completed emails, received emails, inbox emails].
 */
function getEmailsStats(date) {
  const timeZone = Session.getScriptTimeZone()
  const formattedDate = Utilities.formatDate(date, timeZone, 'yyyy-MM-dd');
  const nextDay = Utilities.formatDate(new Date(date.getTime() + 24 * 60 * 60 * 1000), timeZone, 'yyyy-MM-dd');

  const getEmails = query => GmailApp.getMessagesForThreads(GmailApp.search(query, 0, 200)).flat();

  const newMessages = getEmails(`in:anywhere after:${formattedDate} before:${nextDay}`)
  const inboxMessages = getEmails(`in:inbox before:${nextDay}`)
  const completed = newMessages.filter(email => !email.isInInbox()).length;

  return [completed, newMessages.length, inboxMessages.length]
}