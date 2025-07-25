
# About

With Forever Passwords, your passwords are not stored anywhere. Passwords are Calculated using SHA Hash.

Forever Passwords generates a unique SHA password for each website that is long and complex (impossible to guess and difficult for shoulder surffing). You only need to remember one Secret phrase or word to generate all your passwords. The passwords are not stored anywhere but generated when you need them. This gives you peace of mind that your passwords are not store in the cloud, or transfered over the internet. 

You can now install as a Proggressive Web App (PWA) in your modern browser. On a desktop usually an install icon is just right of the url box. On a phone it is usually under the uper threee dots or maybe under share icon on an iphone and may say 'Add to Home Screen'. <a href="https://vpelss.github.io/Forever_Passwords" target="blank">ffffffffffffffffp</a>

# How to use Forever_Passwords

- run index.html off the website (https://vpelss.github.io/Forever_Passwords) or your locally stored version
- Select an Alias : usually based on url (eg: emogic,com)
- Select a Secret : select a long, complex, and hard to guess word, phrase, or password that will be used, with your Alias, to generate all your passwords (eg: The Sound of Music).
- Forever_Passwords generates a unique, long, complex password based on each of your Alias and Secret combinations
- click 'Copy' and use. Note, when you click 'Copy', your url will be saved in the URL/Alias dropdown menu. You can export this Alias list to be used on another pc/browser. It is STRONGLY suggested you keep a backup of this alias list.
- Please click Clear/Reset after you have pasted your password. This clears your secret and the clipboard.

eg:
- alias: a
- secret: b 
- always produces password: bAWWuKxgkZEYGpBRfVHAtIbyN5k=
- (never use a simple secret as per this example)

# Recommendations

- do not use your Secret anywhere else. eg as a password on a web site
- your Secret should be long, complex, and imposible to guess
- store a local copy of this program (Forever Passwords) in the case our emogic.com, github or yor internet is temporarily down. Have a backup plan! Download a copy to your PC. File->Save as HTML
- Do not save your Secret in the browser cache or in a password manager
- Clear your password in Forever Passwords after use. Click Clear/Reset
- You should use a differnent password on every web service you use. See: https://haveibeenpwned.com/. This will happen automatically if you use the site URL as the Alias field.

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

# to do:

- timed clear wipes clipboard
- check box for ensure special character 
