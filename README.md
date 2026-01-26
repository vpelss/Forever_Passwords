# About Forever Passwords

Using one secret word or phrase, unique passwords are calculated for each website or program when you need them. Your passwords are 'not stored' on your device or in the cloud.

# How to use Forever_Passwords

- https://vpelss.github.io/Forever_Passwords
- Select an Alias: Usually based on a website url (eg: emogic,com)
- Select a Secret: A long, complex, hard to guess word or phrase (eg: The Sound of Music). 
- Your password is in the Answer box. The Secret and Alias are used together to generate all your Answer/Passwords
- click 'Copy/Save' and use. Note, when you click 'Copy/Save', your url will be saved in the URL/Alias dropdown menu. You can export this Alias list to be used in Forever Passwords in another browser. It is STRONGLY suggested you keep an uptodate backup of this alias list. 
- Please click Clear/Reset after you have pasted your password. This clears your Secret and the clipboard.

eg:
- Alias: www.emogic.com
- Secret: TheSoundOfMusic
- Answer/Password: VZN8y0YedQO8yE+I9soWniRyPhE=

# Recommendations

- store a local copy of this program (Forever Passwords) in the case our emogic.com, github or the internet is temporarily down. Have a backup plan! Download a copy to your PC. File->Save as HTML
- do not use your Secret anywhere else. eg as a password on a web site
- your Secret should be long, complex, and imposible to guess
- Do not save your Secret in the browser cache or in a password manager
- Clear your password in Forever Passwords after use. Click Clear/Reset
- You should use a differnent password on every web service you use. This will happen automatically if you use the site URL as the Alias field. See: https://haveibeenpwned.com/

# PWA

You can now install Forever Passwords as a Proggressive Web App (PWA) if desired. 

- From a PC usually there should be an install icon is just right of the url box
- On a Android phone it is usually under the upper three verical dots, then 'Install App'
- On an IPhone using Chrome, use the share icon on the right of the url bar, then more, then 'Add to Home Screen'. https://vpelss.github.io/Forever_Passwords

# Possible issues

- Single url requires multiple passwords eg: wwww.mysite.com and cpanel.mysite.com : solution, add www or cpanel to the Alias, not just mysite.com
- A website might not like the password generated. eg: too long, no special characters allowed
- If your password is compromised (via shoulder surfing or malware), you need to decide how to generate a new one using your easy to remember rules. Eg: Add 'compromised' to the Alias (emogic.com.compromised) or (1.emogic.com)

Notes: Spaces are not allowed in the Alias field. The reason is that trailing spaces are not visible, but may be present, and this will create a different password and potentially cause confusion.

The following link is a good password policy resource. See how secure your password is.
https://www.grc.com/haystack.htm

# Also

You can do the same password generation from a shell or command line:

On MAC using
echo -n "mysecret+url" | shasum | xxd -r -p | base64

or

On Linux using
echo -n "mysecret+url" | sha1sum | xxd -r -p | base64

backup.php is for browsers that can't run the JS version.

# Based On

Based on PWCalc a password calculator:

https://chrome.google.com/webstore/detail/sha1-password-calculator/gfdaokhcoidlgljipinbbcafapmmdanb

https://extensions.gnome.org/extension/825/password-calculator/

https://bixense.com/pwcalculator/

The programs above, while excellent, are limited to where they can be used. So I wrote Forever_Passwords in HTML/Javascript to attempt to make it accessible to all platforms and browsers. It's single file design allows you to easily store the code locally for stand alone systems. Tested with newest Chrome, Firefox, and Edge.

# Created By

https://www.emogic.com/

