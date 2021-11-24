// TODO: Modify this function
function generateShortCode(storeId, transactionId) {
  let sId = storeId.toString(36);
  let tId = transactionId.toString(36);

  let d = new Date();
  let date = d.getDate().toString(36);
  let month = d.getMonth().toString(36);
  let year = d.getFullYear().toString();
  year = parseInt(year.substring(2, year.length)).toString(36);

  if (sId.length < 2) sId = '0' + sId;
  while (tId.length < 3) tId = '0' + tId;

  return sId + tId + date + month + year;
}

// TODO: Modify this function
function decodeShortCode(shortCode) {
  let code = shortCode;

  let pDate = new Date();
  let date = parseInt(code[5], 36);
  let month = parseInt(code[6], 36);
  let year = parseInt(code.substring(7), 36);
  year = '20' + year.toString();

  pDate.setDate(date);
  pDate.setMonth(month);
  pDate.setFullYear(parseInt(year));

  return {
    storeId: parseInt(code.substring(0, 2), 36),
    shopDate: pDate,
    transactionId: parseInt(code.substring(2, 5), 36),
  };
}

// ------------------------------------------------------------------------------//
// --------------- Don't touch this area, all tests have to pass --------------- //
// ------------------------------------------------------------------------------//
function RunTests() {
  var storeIds = [175, 42, 0, 9];
  var transactionIds = [9675, 23, 123, 7];

  storeIds.forEach(function (storeId) {
    transactionIds.forEach(function (transactionId) {
      var shortCode = generateShortCode(storeId, transactionId);
      var decodeResult = decodeShortCode(shortCode);
      $('#test-results').append(
        '<div>' + storeId + ' - ' + transactionId + ': ' + shortCode + '</div>'
      );
      AddTestResult('Length <= 9', shortCode.length <= 9);
      AddTestResult('Is String', typeof shortCode === 'string');
      AddTestResult('Is Today', IsToday(decodeResult.shopDate));
      AddTestResult('StoreId', storeId === decodeResult.storeId);
      AddTestResult('TransId', transactionId === decodeResult.transactionId);
    });
  });
}

function IsToday(inputDate) {
  // Get today's date
  var todaysDate = new Date();
  // call setHours to take the time out of the comparison
  return inputDate.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0);
}

function AddTestResult(testName, testResult) {
  var div = $('#test-results').append(
    "<div class='" +
      (testResult ? 'pass' : 'fail') +
      "'><span class='tname'>- " +
      testName +
      "</span><span class='tresult'>" +
      testResult +
      '</span></div>'
  );
}
