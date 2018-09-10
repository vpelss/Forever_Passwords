# Forever_Passwords

Based on : https://chrome.google.com/webstore/detail/sha1-password-calculator/gfdaokhcoidlgljipinbbcafapmmdanb

On MAC
echo -n "mysecretgmail.com" | shasum | xxd -r -p | base64
or
On Linux
echo -n "mysecretgmail.com" | sha1sum | xxd -r -p | base64

The Chrome extension is limited to use on Chrome only, so I wanted to port it to JS to make it accesible to all platforms and to allow the possiblity to store locally for stand alone systems. Thus the single index.html file design.

Use:

1. Select an Alias
2. Select a Secret
3. Password is generated.

Note: Strength lies is having 

Password problems:
1. Multiple passwords are hard to remember
2. You should not reuse passwords
3. Passwords should not be written down or stored in any location
4. 

Recommendations:
1. 'salt' your Alias. example: mysite.comJan2018 (if password it to be changed monthly. Make your salt unique and don't share
2. 





Possible problems:
1. Single url requires multiple passwords eg: www.mysite.com cpanel.mysite.com
2. Site does not like passwod generated (no special character in early part of password)
3. 
