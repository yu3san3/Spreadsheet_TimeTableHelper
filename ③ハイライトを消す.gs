//どれだけ背景が汚くなっても、これを実行すれば背景が全て透明になるよ。


//ーーーここから処理ーーー
function main3() {

  displayTargetLog()

  //sheetを取得
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);

  //rangeを取得
  const range = getEachRange(sheet, startAlphabet, startRow, endAlphabet, endRow)
  const bandMemberRange = range.bandMember

  //背景を透明に設定
  bandMemberRange.setBackground(null);
}