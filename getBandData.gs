function getBandData(bandNameRange, bandMemberRange, performanceTimeRange) {
  
  // B列からバンドの名前を取得
  var bandNames = bandNameRange.getValues()
  
  // C17からI44までの範囲からバンドメンバーの名前を取得
  var bandMembers = bandMemberRange.getValues();
  
  // J列から出演時間を取得
  var performanceTimes = performanceTimeRange.getValues()

  // 必要なデータをオブジェクトとして返す
  return {
    bandNames: bandNames,
    bandMembers: bandMembers,
    performanceTimes: performanceTimes
  };
}
