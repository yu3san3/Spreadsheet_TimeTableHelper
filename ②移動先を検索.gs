//連続出演が発生したバンド(以後、バンドAと呼ぶ)の行数を入れると、交換対象の候補(バンドB)が出力される。

//例えば、「11, 15」のように表示されたら、11行目と15行目のバンドBの枠に、バンドAを入れ替えられることを意味する。
//つまり、バンドAをバンドBの枠で出演させても、その前後で、2回連続で出演する羽目になる人が出ない。
//ただし、バンどBをバンドAに入れ替えても安全かどうかは考慮されないので注意。

//連続出演が発生した行
const rawToSearch = 24


//ーーーここから処理ーーー
function main2() {

  displayTargetLog()

  //sheetを取得
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);

  //探す対象のrangeを取得
  const range = getEachRange(sheet, startAlphabet, startRow, endAlphabet, endRow)
  const bandNameRange = range.bandName
  const bandMemberRange = range.bandMember
  const performanceTimeRange = range.performanceTime

  //居場所を探したいバンドのrangeを取得
  const searchTargetRange = getEachRange(sheet, startAlphabet, rawToSearch, endAlphabet, rawToSearch)
  const searchTargetBandNameRange = searchTargetRange.bandName
  const searchTargetBandMemberRange = searchTargetRange.bandMember

  //居場所を探したいバンドの情報を取得
  const searchTargetBandName = searchTargetBandNameRange.getValues()[0]
  const searchTargetBandMembers = searchTargetBandMemberRange.getValues()[0]
  Logger.log(searchTargetBandName + ' 😍 メンバー: ' + searchTargetBandMembers)

  //データを取得
  var bandData = getBandData(bandNameRange, bandMemberRange, performanceTimeRange);
  var bandMembers = bandData.bandMembers;

  printSafeZones(searchTargetBandMembers, bandMembers)
}

function printSafeZones(searchTargetBandMembers, bandMembers) {
  
  loop: for (var i = 1; i < bandMembers.length; i++) {
    
    if (i >= bandMembers.length - 1) { continue }

    //前後の出演時間のバンドメンバーを取得
    var previousRow = bandMembers[i - 1];
    var nextRow = bandMembers[i + 1];
      
    //現在の行と次の行を比較
    for (var j = 0; j < searchTargetBandMembers.length; j++) {

      const member = searchTargetBandMembers[j]

      //メンバーが空っぽならcontinue
      if (member === '') { continue }

      //前後の出演時間に同じ人がいたら外のfor文をcontinue
      if ( previousRow.includes(member) || nextRow.includes(member) ) {
        continue loop;
      }
    }

    Logger.log(i + startRow)
  }
}



