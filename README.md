Why is the Forever Passwords method of generating passwords for you?

Password management recommendations:
- Do nor reuse passwords. Reuse of passwords is a bad practice. If one site get's hacked, your password is compromised on other sites.
- Do not store passwords anywhere. Passwords should not be written down or stored in any location, even stored by browsers
- Do not use password management software. Password Storage solutions can potentially be hacked. If that happens, all your passwords are compromised 
- Passwords should be long, complex, and random. Multiple passwords are hard to remember

Solution and benefits of Forever_Passwords:
All passwords for each website is unique. The passwords are not stored. The passwords are incredibly complex. However the method to generate them is easy to remember.

How to use Forever_Passwords:
- run index.html off the website (https://www.emogic.com/Forever_Passwords/) or your locally stored version
- Select an Alias : usually based on url
- Select a Secret : a word, phrase, or password
- Password is generated : copy and use 

Note: For security reasons, use a unique, but easy to remember, pattern for the Alias. If it is difficult to guess, your Secret can be simpler. However having both a complex Alias and Secret is the best.

Recommendations:
- store a local copy of this program in the unlikely case our site, emogic.com, is temporarily down or have a backup plan!
- 'salt' your Alias. example: mysite.com!!!Jan2018 (eg: if your password must be changed monthly your salt might be !!!Jan2018. Make your salt unique and don't share your salt pattern. Use complex, but easy to remember, 'salt'.
- Change passwords on regular basis
- Do not store important passwords in a browser cache
-clear your password in Forever Passwords after use 

Possible issues:
- Single url requires multiple passwords eg: wwww.mysite.com and cpanel.mysite.com : solution, add www or cpanel to the Alias
- A website might not like the password generated. I have not encountered this yet.
- You can't generate your passwords without this program or an equivilent (see below). But this is the same with ANY password storage programs.
- If your password is compromised (via shoulder surfing or malware), you need to decide how to generate a new one using your easy to remember rules.
- Some sites (eg: cibc.com) have disabled copy and paste. They actually actively promote weak passwords. Possible solutions: Search for and install RightToCopy addin or disable js temporarily. 

Notes: Spaces are not allowed in the Alias field. The reason is that trailing spaces are not visible, but may be present, and this will create a different password.

The following link is a good password policy resource. See how secure your password is.
https://www.grc.com/haystack.htm

---------------------

You can do the same password generation:

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
