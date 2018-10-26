function generateAlpha() {
	var plainAlpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var specAlpha = '1234567890.,?\'"!@#$% &*()_';
	var masterAlpha = '';
	var tmpChar;
	
	var checked = document.getElementById('chkSpc').checked;
	
	if (checked) {	
		while (masterAlpha.length < 52) {	
			if ((getRandomInt(1,3) % 2) == 0) {			
				tmpChar = plainAlpha.charAt(getRandomInt(0,26));
				if (masterAlpha.indexOf(tmpChar) == -1) {				
					masterAlpha += tmpChar;				
				}			
			} else {			
				tmpChar = specAlpha.charAt(getRandomInt(0,26));
				if (masterAlpha.indexOf(tmpChar) == -1) {				
					masterAlpha += tmpChar;				
				}			
			}		
		}	
	} else {	
		while (masterAlpha.length < 26) {		
			tmpChar = plainAlpha.charAt(getRandomInt(0,26));
			if (masterAlpha.indexOf(tmpChar) == -1) {			
				masterAlpha += tmpChar;			
			}		
		}	
	}
	document.getElementById('masterAlpha').value = masterAlpha;
}
			
function encrypt() {

	var en_cipherKey = document.getElementById('cipherKey').value.toUpperCase();
	var en_alphabet = document.getElementById('masterAlpha').value.toUpperCase();
	var en_plainText = document.getElementById('plainText').value.toUpperCase();
	var en_cipherKeyArr = en_cipherKey.split('||');
	var en_cipherText = '';
	var en_cipherCharIndex = 0;
	var en_keyLoopCount = 0;
	var offset = 0;
	var advVal = document.getElementById('chkAdv').checked;
	for (var x in en_cipherKeyArr) {
		en_cipherKey = en_cipherKeyArr[x];
		if (en_cipherText != "") {en_plainText = en_cipherText;en_cipherText = '';}
		if (advVal == false) {
			for (var i = 0; i < en_plainText.length; i++) {
				en_cipherCharIndex = en_alphabet.indexOf(en_plainText.charAt(i)) + en_alphabet.indexOf(en_cipherKey.charAt(en_keyLoopCount));
				if (en_cipherCharIndex >= en_alphabet.length) {en_cipherCharIndex = en_cipherCharIndex - en_alphabet.length;}
				en_cipherText += en_alphabet.charAt(en_cipherCharIndex);
				en_keyLoopCount++;
				if (en_keyLoopCount == en_cipherKey.length) {en_keyLoopCount = 0;}
			}
		} else {
			for (var i = 0; i < en_plainText.length; i++) {
				en_cipherCharIndex = en_alphabet.indexOf(en_plainText.charAt(i)) + en_alphabet.indexOf(en_cipherKey.charAt(en_keyLoopCount)) - offset;
				if (en_cipherCharIndex >= en_alphabet.length) {
					en_cipherCharIndex = en_cipherCharIndex - en_alphabet.length;
				} else if (en_cipherCharIndex < 0) {
					en_cipherCharIndex = en_cipherCharIndex + en_alphabet.length;
				}
				en_cipherText += en_alphabet.charAt(en_cipherCharIndex);
				en_keyLoopCount++;
				offset++;
				if (en_keyLoopCount == en_cipherKey.length) {en_keyLoopCount = 0;}
				if (offset == en_alphabet.length) {offset = 0;}
			}
		}
		en_keyLoopCount = 0;
		offset = 0;
	}
	document.getElementById('cipherText').value = en_cipherText;
}
			
function decrypt() {
	var de_cipherKey = document.getElementById('cipherKey').value.toUpperCase();
	var de_alphabet = document.getElementById('masterAlpha').value.toUpperCase();
	var de_cipherText = document.getElementById('cipherText').value.toUpperCase();
	var de_cipherKeyArr = de_cipherKey.split('||');
	var de_plainText = '';
	var de_cipherCharIndex = 0;
	var de_keyLoopCount = 0;
	var offset = 0;
	var advVal = document.getElementById('chkAdv').checked;
	for (var x in de_cipherKeyArr) {
		de_cipherKey = de_cipherKeyArr[(de_cipherKeyArr.length - 1) - x];
		if (de_plainText != "") {de_cipherText = de_plainText;de_plainText = '';}
		if (advVal == false) {
			for (var i = 0; i < de_cipherText.length; i++) {
				de_cipherCharIndex = de_alphabet.indexOf(de_cipherText.charAt(i)) - de_alphabet.indexOf(de_cipherKey.charAt(de_keyLoopCount));
				if (de_cipherCharIndex < 0) {de_cipherCharIndex = de_cipherCharIndex + de_alphabet.length;}
				de_plainText += de_alphabet.charAt(de_cipherCharIndex);
				de_keyLoopCount++;
				if (de_keyLoopCount == de_cipherKey.length) {de_keyLoopCount = 0;}
			}
		} else {
			for (var i = 0; i < de_cipherText.length; i++) {
				de_cipherCharIndex = de_alphabet.indexOf(de_cipherText.charAt(i)) - de_alphabet.indexOf(de_cipherKey.charAt(de_keyLoopCount)) + offset;
				if (de_cipherCharIndex < 0) {
					de_cipherCharIndex = de_cipherCharIndex + de_alphabet.length;
				} else if (de_cipherCharIndex >= de_alphabet.length) {
					de_cipherCharIndex = de_cipherCharIndex - de_alphabet.length;
				}
				de_plainText += de_alphabet.charAt(de_cipherCharIndex);
				de_keyLoopCount++;
				offset++;
				if (de_keyLoopCount == de_cipherKey.length) {de_keyLoopCount = 0;}
				if (offset == de_alphabet.length) {offset = 0;}
			}
		}
		de_keyLoopCount = 0;
		offset = 0;
	}	
	document.getElementById('plainText').value = de_plainText;
}
			
function parse() {
	var enc_alphabet = document.getElementById('masterAlpha').value.toUpperCase();
	var enc_plainText = document.getElementById('plainText').value.toUpperCase();
	var enc_key = document.getElementById('cipherKey').value.toUpperCase();
	var returnString = '';
	var returnKey = '';
	var tmpKey = '';
	for (var i = 0; i < enc_plainText.length; i++) {
		if (enc_alphabet.indexOf(enc_plainText[i]) != -1) {
			returnString += enc_plainText[i];
		}
	}
	document.getElementById('plainText').value = returnString;
	var keyArr = enc_key.split('||');
	for (var x in keyArr) {
		tmpKey = keyArr[x];
		keyArr[x] = '';
		for (var i = 0; i < tmpKey.length; i++) {
			if (enc_alphabet.indexOf(tmpKey[i]) != -1) {
				keyArr[x] += tmpKey[i];
			}
		}
	}
	for (var x in keyArr) {
		if (x < keyArr.length - 1) {
		returnKey += keyArr[x] + '||';
		} else {returnKey += keyArr[x];}
	}
	document.getElementById('cipherKey').value = returnKey;
}
			
function swap() {
	var plain = document.getElementById('plainText').value;
	if (plain != '') {
		document.getElementById('cipherText').value = plain;
		document.getElementById('plainText').value = '';
	}
}
			
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}