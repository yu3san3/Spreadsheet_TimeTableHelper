//左上のセルと右下のセルを指定してこのプログラムを実行すれば、連続した出演が色付きでマークされる。

//黄色は、その下に出演が連続していることを示す。赤色は、出演が連続した人が上にいることを示す。
//なお、sheetの名前の指定は、①、②、③のプログラムで共通のものを使う。

//sheetの名前を指定(①、②、③のプログラムで共通して用いられる)
const sheetName = 'タイムテーブル'

//左上のセルを選択(バンド名が書いてある、最も左上にある部分)
const startAlphabet = 'B'
const startRow = 4

//右下のセルを選択(出演時間が書いてある、最も右下の部分)
const endAlphabet = 'J'
const endRow = 35


//ーーーここから処理ーーー
function main1() {

  displayTargetLog()

  //sheetを取得
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);

  //rangeを取得
  const range = getEachRange(sheet, startAlphabet, startRow, endAlphabet, endRow)
  const bandNameRange = range.bandName
  const bandMemberRange = range.bandMember
  const performanceTimeRange = range.performanceTime

  //データを取得
  var bandData = getBandData(bandNameRange, bandMemberRange, performanceTimeRange);
  var bandMembers = bandData.bandMembers;

  //重複している項目にハイライトをつける
  highlightCellsIfNeeded(bandMemberRange, bandMembers)
}

function highlightCellsIfNeeded(range, bandMembers) {

  //各行の背景色を保持するための二重配列
  var backgrounds = bandMembers.map(row => row.map(() => null));

  for (var i = 0; i < bandMembers.length; i++) {

    //nextRowを取得するときのオーバーフロー防止
    if (i >= bandMembers.length - 1) { continue }
    
    var currentRow = bandMembers[i];
    var nextRow = bandMembers[i + 1];
    
    //現在の行と次の行を比較
    for (var j = 0; j < currentRow.length; j++) {
      //配列が空っぽならcontinue
      if (currentRow[j] === "") { continue }

      // 現在の要素が次の行にもあれば背景色を設定
      if ( nextRow.includes(currentRow[j]) ) {
        const nextRowTarget = nextRow.indexOf(currentRow[j])
        backgrounds[i][j] = '#FFFF00'; //塗りつぶし色を黄色に指定
        backgrounds[i + 1][nextRowTarget] = '#FF0000'
      }
    }
  }

  range.setBackgrounds(backgrounds);
}

