# Forever_Passwords

Based on : https://chrome.google.com/webstore/detail/sha1-password-calculator/gfdaokhcoidlgljipinbbcafapmmdanb

On MAC
echo -n "mysecretgmail.com" | shasum | xxd -r -p | base64
or
On Linux
echo -n "mysecretgmail.com" | sha1sum | xxd -r -p | base64

The Chrome extension is limited to use on Chrome only, so I wanted to port it to JS to make it accesible to all platforms and to allow the possiblity to store locally for stand alone systems. Thus the single index.html file design.\



