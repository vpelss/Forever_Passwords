# Forever_Passwords

Based on PWCalc : https://chrome.google.com/webstore/detail/sha1-password-calculator/gfdaokhcoidlgljipinbbcafapmmdanb

Why create Forever_Passwords?
The Chrome extension above is limited to use on Chrome only, so I wanted to port it to JS to make it accesible to all platforms and browsers (Android, Linux, etc) and to allow the possiblity to store the code locally for stand alone systems. This is why it is a single index.html file design.

Use:

- run index.html
- Select an Alias - usually based on url
- Select a Secret - a word. phrase, or password
- Password is generated 

Note: Strength lies is having a unique, but easy to remember pattern for site Alias. If it is difficult to guess, your Secret can be simpler. However having both a complex Alias and Secret is the best.

Why is Forever Passords and PWCalc for you?

Password problems:
- Multiple passwords are hard to remember
- You should not reuse passwords. If one site get's hacked, your password is compromised on other sites.
- Passwords should not be written down or stored in any location
- Password Storage solutions can be hacked (not easy), and if it is, all your passwords are compromised 

Solution / Benefits:
Forever_Passwords: Password is not stored anywhere. Password is incredibly complex. Easy to remember how to generate it.

Recommendations:
- 'salt' your Alias. example: mysite.com!!!Jan2018 (eg: if password it to be changed monthly your salt might be !!!Jan2018. Make your salt unique and don't share your salt pattern. Use complex, easy to remember salt.
- Change passwords on regular basis.
- Do not store important passwords in a browser cache!

Possible issues:
- Single url requires multiple passwords eg: wwww.mysite.com and cpanel.mysite.com : solution, add www or cpanel to the Alias
- The site does not like the password generated (no special character in early part of password)
- You can't recreate passwords without this program, but this is the same with ANY password storage programs.
- If password is compromised (via shoulder surfing or malware), you need to decide how to generate a new one using your easy to remember rules.

Notes: Spaces are not allowed in the Alias field. Reason, trailing spaces are not viewable, may be present, and will create a different password.

This link is a good password policy resource:

https://www.grc.com/haystack.htm

FYI, You can do the same password generation:

On MAC using

echo -n "mysecretgmail.com" | shasum | xxd -r -p | base64

or

On Linux using

echo -n "mysecretgmail.com" | sha1sum | xxd -r -p | base64

