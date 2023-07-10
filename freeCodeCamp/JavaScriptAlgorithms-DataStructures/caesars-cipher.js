function rot13(str) {
  const decoded = str.replace(/[a-z]/gi, letter => {
    return String.fromCharCode(
      letter.charCodeAt(0) + 
      (letter.toLowerCase() <= 'm' ? 13 : - 13)
    )
  })

  return decoded;
}

rot13("SERR PBQR PNZC");