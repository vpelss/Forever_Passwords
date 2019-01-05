Forever Passwords will easily create and manage long, complex passwords that are not stored anywhere! 

Why is the Forever Passwords method of generating passwords for you?

Password management recommendations:
- Do not reuse passwords. Reuse of passwords is a bad practice. If one site is hacked, your password is compromised on other sites.
- Do not store passwords anywhere. Passwords should not be written down, stored in any location and not stored by browsers
- Passwords should be long and complex. 
- (This one is my opinion only) Do not use password management software. Do you trust a company with all your passwords? 

Solution and benefits of Forever_Passwords:
Passwords generated for each website are long, unique and complex. The passwords are not stored. You only need to remember one Secret phrase or word to generate all your passwords.

How to use Forever_Passwords:
- run index.html off the website (https://www.emogic.com/Forever_Passwords/) or your locally stored version
- Select an Alias : usually based on url (eg: emogic,com)
- Select a Secret : select a long, complex, and hard to guess word, phrase, or password that will be used, with your Alias, to generate all your passwords (eg: The Sound of Music).
- Forever_Passwords generates a unique, long, complex password based on each of your Alias and Secret combinations
- click 'Copy' and use 

Recommendations:
- do not use your Secret anywhere else
- your secret should be long, complex, and imposible to guess
- store a local copy of this program in the unlikely case our site, emogic.com, is temporarily down or have a backup plan! Download a copy to your PC. File->Save as HTML
- Do not store important passwords in a browser cache or in the cloud
- Clear your password in Forever Passwords after use 
-use a password with an odd number character length. Why? Most passwords have an even number of characters. 

Possible issues:
- Single url requires multiple passwords eg: wwww.mysite.com and cpanel.mysite.com : solution, add www or cpanel to the Alias
- A website might not like the password generated. eg: too long, no special characters allowed
- If your password is compromised (via shoulder surfing or malware), you need to decide how to generate a new one using your easy to remember rules. Eg: Add 'compromised' to the Alias (emogic.com.compromised) 

Notes: Spaces are not allowed in the Alias field. The reason is that trailing spaces are not visible, but may be present, and this will create a different password and potentially cause confusion.

The following link is a good password policy resource. See how secure your password is.
https://www.grc.com/haystack.htm

---------------------

You can do the same password generation from a shell or command line:

On MAC using
echo -n "mysecretgmail.com" | shasum | xxd -r -p | base64

or

On Linux using
echo -n "mysecretgmail.com" | sha1sum | xxd -r -p | base64

index.php is for browsers that can't run the JS version.

-------------------

Based on PWCalc a password calculator:

https://chrome.google.com/webstore/detail/sha1-password-calculator/gfdaokhcoidlgljipinbbcafapmmdanb

https://extensions.gnome.org/extension/825/password-calculator/

https://bixense.com/pwcalculator/

The programs above, while excellent, are limited to where they can be used. So I wrote Forever_Passwords in HTML/Javascript to attempt to make it accessible to all platforms and browsers. It's single file design allows you to easily store the code locally for stand alone systems. Tested with newest Chrome, Firefox, and IE 11.
