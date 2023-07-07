function palindrome(str) {
	const cleanedStr = str.match(/[a-zA-Z0-9]/gi).join('');
	const reversedStr = cleanedStr.split('').reverse().join('');

	if (cleanedStr.toLowerCase() == reversedStr.toLowerCase()) {
		return true;
	}

	return false;
}

palindrome('eye');
