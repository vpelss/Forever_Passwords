# Forever_Passwords

Based on : https://chrome.google.com/webstore/detail/sha1-password-calculator/gfdaokhcoidlgljipinbbcafapmmdanb

You can do the same:
On MAC
echo -n "mysecretgmail.com" | shasum | xxd -r -p | base64
or
On Linux
echo -n "mysecretgmail.com" | sha1sum | xxd -r -p | base64

Why create Forever_Passwords?
The Chrome extension is limited to use on Chrome only, so I wanted to port it to JS to make it accesible to all platforms and to allow the possiblity to store locally for stand alone systems. Thus the single index.html file design.

Use:
1 Select an Alias
2. Select a Secret
3. Password is generated.

Note: Strength lies is having a unique, but easy to remember pattern for site Alias. If it is difficult to guess, your Secret can be simpler. However having both a complex Alias and Secret is the best.

Password problems:
- Multiple passwords are hard to remember
- You should not reuse passwords. If one site get's hacked, your password is compromised on other sites.
- Passwords should not be written down or stored in any location
- Password Storage solutions can be hacked (not easy), and if it is, all your passwords are compromised 

Solution:
Forever_Passwords: Password is not stored anywhere. Password is incredibly complex. Easy to remember how to generate it.

Recommendations:
- 'salt' your Alias. example: mysite.com!!!Jan2018 (eg: if password it to be changed monthly your salt might be !!!Jan2018. Make your salt unique and don't share your salt pattern. Use complex, easy to remember salt.
- Change passwords on regular basis.
- Do not store important passwords in a browser cache!

Possible issues:
- Single url requires multiple passwords eg: www.mysite.com cpanel.mysite.com
- Site does not like passwod generated (no special character in early part of password)
- Can't recreate password without copy, or access to, program. Same as password storage programs.
- If password is compromised, you need to decide how to generate a new one using your easy to remember rules.

Notes: Spaces are not allowed in the Alias field. Reason, trailing spaces are not viewable, may be present, and will create a different password.

https://www.grc.com/haystack.htm

