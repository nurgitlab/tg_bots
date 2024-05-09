function isWin (percents) {
    return Math.floor(Math.random() * 100) + 1 <= percents
}

exports.isWin = isWin