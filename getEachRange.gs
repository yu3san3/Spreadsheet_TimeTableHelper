function getEachRange(sheet, startAlphabet, startRow, endAlphabet, endRow) {
  //バンド名のrange
  const bandNameRangeStr = startAlphabet + startRow + ':' + startAlphabet + endRow
  //バンドメンバーのrange
  const startMemberAlphabet = getSurroundingLetters(startAlphabet).next
  const endMemberAlphabet = getSurroundingLetters(endAlphabet).previous
  const bandMemberRangeStr = startMemberAlphabet + startRow + ':' + endMemberAlphabet + endRow
  //出演時間のrange
  const performanceTimeRangeStr = endAlphabet + startRow + ':' + endAlphabet + endRow

  const bandNameRange = sheet.getRange(bandNameRangeStr)
  const bandMemberRange = sheet.getRange(bandMemberRangeStr)
  const performanceTimeRange = sheet.getRange(performanceTimeRangeStr)

  return {
    bandName: bandNameRange,
    bandMember: bandMemberRange,
    performanceTime: performanceTimeRange
  };
}

function getSurroundingLetters(letter) {
  const charCode = letter.charCodeAt(0);
  
  // アルファベットの範囲をチェックし、範囲外であれば`undefined`を返す
  const previousLetter = charCode > 'A'.charCodeAt(0) ? String.fromCharCode(charCode - 1) : undefined;
  const nextLetter = charCode < 'Z'.charCodeAt(0) ? String.fromCharCode(charCode + 1) : undefined;

  return {
    previous: previousLetter,
    next: nextLetter
  };
}