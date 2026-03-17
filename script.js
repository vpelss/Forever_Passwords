//to do pop up copied to clipboard asking to clear it after use!
//remove cookies
//test for browser functionality
//set all elements at start elTimerAlert, etc
//imprort/export to file

//set events
document.getElementById("menu_icon").addEventListener("click", openMenu);
document.getElementById("x_icon").addEventListener("click", closeMenu);
document.getElementById("Alias").addEventListener("click", function () {
  this.select();
  this.value = "";
  GeneratePW();
});
document.getElementById("Alias").addEventListener("keyup", GeneratePW);
document
  .getElementById("Alias")
  .addEventListener("change", AliasChanged.bind(this.value));
document.getElementById("xDeleteAlias").addEventListener("click", function () {
  if (
    confirm(
      "This will delete " +
        document.getElementById("Alias").value +
        " from your list. Are you sure?"
    )
  ) {
    Delete();
  }
});
document.getElementById("Secret").addEventListener("keyup", GeneratePW);
document.getElementById("Answer").addEventListener("click", function () {
  copyToClipboardId("Answer");
});
document
  .getElementById("character_modifications")
  .addEventListener("click", GeneratePW);
document
  .getElementById("explainSpecialCharacters")
  .addEventListener("click", function () {
    alert(
      "No Special Characters: Replaces base64 special characters + with X, / with Q, and = (base64 padding) with Z. \n\nForce Special Characters: If no special characters, replace last character with a ="
    );
  });
document.getElementById("resize").addEventListener("change", GeneratePW);
document.getElementById("copyButton").addEventListener("click", function () {
  GeneratePW();
  addAliasToList();
  copyToClipboardId("Answer");
});
document
  .getElementById("clearReset")
  .addEventListener("click", clear_reset_data);
document.getElementById("clearTimer").addEventListener("click", stopTimer);
document.getElementById("getAliasList").addEventListener("click", getAliasList);
document.getElementById("saveAliasList").addEventListener("click", function () {
  if (confirm("This will update your Alias list. Are you sure?")) {
    saveAliasList();
  }
});
document.getElementById("exportAll").addEventListener("click", function () {
  if (
    confirm(
      "This will export all Alias, settings, and comments to clipboard. Are you sure?"
    )
  ) {
    exportAll();
  }
});

let GlobalAssociativeArray = {}; //Alias list + comments and settings //use JSON associative array to squash duplicates
let errorArray = [];
let forever = new Date("October 17, 2050 03:24:00");
let yesterday = new Date("October 17, 2000 03:24:00");
let Cookie = {};
Cookie.day = 86400000;
Cookie.week = Cookie.day * 7;
Cookie.month = Cookie.day * 31;
Cookie.year = Cookie.day * 365;

wrapPWA();

function openMenu() {
  document.getElementById("main_page_component").style.display = "none";
  document.getElementById("menu_page_component").style.display = "block";
  document.getElementById("menu_icon").style.display = "none";
  document.getElementById("x_icon").style.display = "inline";
}

function closeMenu() {
  document.getElementById("main_page_component").style.display = "block";
  document.getElementById("menu_page_component").style.display = "none";
  document.getElementById("menu_icon").style.display = "inline";
  document.getElementById("x_icon").style.display = "none";
}

if (!supports_html5_storage()) {
  alert(
    "This browser does not support local storage. Limited Alias list size as we are using cookies."
  );
}

document.body.onload = function () {
  BuildAliasSelect();
};

function CheckForNoSpaces(id) {
  let t = document.getElementById(id);
  if (t.value.match(/\s/g)) {
    alert("Sorry, you are not allowed to enter any spaces");
    t.value = t.value.replace(/\s/g, "");
  }
}

document.addEventListener("dcopy", function (e) {
  e.clipboardData.setData(
    "text/plain",
    document.getElementById("Answer").value
  );
});

let secondsToErase = 30;
let countdown;
let countdowninterval;

function tick() {
  //every second count down one
  countdown--;
  document.getElementById("timerAlert").innerHTML =
    "Auto cleared in " + countdown + " seconds";
  if (countdown <= 0) {
    stopTimer();
    clear_reset_data();
    document.getElementById("timerAlert").innerHTML =
      "<font color=red>Important: Alias and Secret and clipboard were deleted</font>";
  }
}

function startTimer() {
  //on copy button or click on answer
  document.getElementById("timerAlert").innerHTML = "";
  countdown = secondsToErase;
  countdowninterval = setInterval(tick, 1000);
}

function stopTimer() {
  //after count downs OR typing -> GeneratePW() OR clear_reset
  clearInterval(countdowninterval);
  document.getElementById("timerAlert").innerHTML = "";
}

function clear_reset_data() {
  document.getElementById("Alias").value = "";
  document.getElementById("AliasComment").value = "";
  document.getElementById("Secret").value = "";
  document.getElementById("Answer").value = "";
  document.getElementById("resize").value = 28;
  copyToClipboardText("cleared");
}

async function copyToClipboardId(id) {
  let text = document.getElementById(id).value;
  await copyToClipboardText(text);
  if (document.getElementById("clearTimer").checked) {
    startTimer();
  } else {
    clearRequest();
  }
}

function clearRequest() {
  let clearMe = confirm(
    "ERASE CLIPBOARD, ALIAS AND SECRET NOW ???\n\nYour password is saved on the clipboard.\nIt is suggested to paste your password now,\nthen click OK to clear all settings and the passwords from the clipboard (secure)\nOR\nCancel to leave it as is. (not secure)"
  );
  if (clearMe === true) {
    clear_reset_data();
  }
}

async function copyToClipboardText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    postError(err);
  }
}

//async as we use promise based window.crypto.subtle.digest in this function
async function GeneratePW() {
  try {
    stopTimer();
    let Alias = document.getElementById("Alias").value;
    CheckForNoSpaces("Alias");
    let Secret = document.getElementById("Secret").value;
    if (Secret === "") {
      document.getElementById("Answer").value = "";
      return;
    }
    let total = Secret + Alias;

    const TE = new TextEncoder();
    let tempUint8Array = TE.encode(total);
    //coud use alternates https://gist.github.com/romeoh/3302256 or www.movable-type.co.uk/scripts/sha1.html
    hashed = await window.crypto.subtle.digest("SHA-1", tempUint8Array);
    tempUint8Array = new Uint8Array(hashed);
    PW = tempUint8Array.toBase64();

    //size adjust first!
    let size = document.getElementById("resize").options[
      document.getElementById("resize").selectedIndex
    ].value;
    PW = PW.slice(0, size);

    let pattern;
    if (
      document.getElementById("character_modifications").value ==
      "no_special_characters"
    ) {
      //use capital X , Q , Z least used letters
      pattern = /[+]/g;
      PW = PW.replace(pattern, "X");
      pattern = /[/]/g;
      PW = PW.replace(pattern, "Q");
      pattern = /[=]/g;
      PW = PW.replace(pattern, "Z");
    }
    if (
      document.getElementById("character_modifications").value ==
      "force_special_characters"
    ) {
      //check for + , / , = . If not, replace last char with =
      pattern = /[+/=]/g;
      if (!pattern.test(PW)) {
        PW = PW.replace(/.$/, "=");
      }
    }
    document.getElementById("Answer").value = PW;
  } catch (err) {
    postError(err);
  }
}

function BuildAliasSelect() {
  //runs on start up
  LocalStorageToVar();
  document.getElementById("dataList").innerHTML = ""; //erase current list
  // take GlobalAssociativeArray and add index to <select>
  for (let index in GlobalAssociativeArray)
    if (GlobalAssociativeArray.hasOwnProperty(index)) {
      let x = document.getElementById("dataList");
      let option = document.createElement("option");
      option.id = index;
      option.text = index;
      x.appendChild(option);
    }
}

function addAliasToList() {
  let Alias = document.getElementById("Alias").value;

  //find and set Character_Types radio input
  let character_modifications_element = document.getElementById(
    "character_modifications"
  );
  let character_modifications = character_modifications_element.value;

  GlobalAssociativeArray[Alias] = {
    comment: document.getElementById("AliasComment").value,
    resize: document.getElementById("resize").value,
    character_modifications: character_modifications
  }; //set as associative array

  VarToLocalStorage();
  BuildAliasSelect();
}

function Delete() {
  let SelectedName = document.getElementById("Alias").value; //get Selected name
  let x = document.getElementById(SelectedName);
  x.remove(x.selectedIndex);
  //delete item from associative array
  delete GlobalAssociativeArray[SelectedName];
  VarToLocalStorage();
  document.getElementById("Alias").value = "";
}

function VarToLocalStorage() {
  let AliasListString = JSON.stringify(GlobalAssociativeArray);
  if (supports_html5_storage()) {
    localStorage.FP = AliasListString;
    setCookie("AliasList", "", yesterday, "", "", ""); //erase cookie as we want to use local storage now.
  } else {
    //save to cookie
    setCookie("AliasList", AliasListString, forever, "", "", "");
  }
}

function LocalStorageToVar() {
  if (supports_html5_storage()) {
    if (typeof localStorage.FP === "undefined") {
      return;
    } //nothing to restore
    GlobalAssociativeArray = JSON.parse(localStorage.FP);
  } else {
    let data = getCookie("AliasList") || "{}";
    GlobalAssociativeArray = JSON.parse(data);
  }
}

function getCookie(name) {
  let cookies = document.cookie;
  let start = cookies.indexOf(name + "=");
  if (start == -1) return null;
  let len = start + name.length + 1;
  let end = cookies.indexOf(";", len);
  if (end == -1) end = cookies.length;
  return unescape(cookies.substring(len, end));
}

function setCookie(name, value, expires, path, domain, secure) {
  value = escape(value);
  expires = expires ? ";expires=" + expires.toGMTString() : "";
  path = path ? ";path=" + path : "";
  domain = domain ? ";domain=" + domain : "";
  secure = secure ? ";secure" : "";

  document.cookie = name + "=" + value + expires + path + domain + secure;
}

function AliasChanged(value) {
  document.getElementById("resize").value = 28; //for the case of Saved_Local_Aliases that has no possible length set. 28 is default
  let Alias = value; //get Selected Alias
  //exit if Alias does not exist. For 1st dummy option
  if (typeof GlobalAssociativeArray[Alias] == "undefined") {
    GeneratePW(); //for Saved_Local_Aliases option that does not exist in the GlobalAssociativeArray by design
    document.getElementById("AliasComment").value = ""; //clear comments
    return;
  }
  //Get Comment
  if (typeof GlobalAssociativeArray[Alias].comment != "undefined") {
    document.getElementById("AliasComment").value =
      GlobalAssociativeArray[Alias].comment;
  } else {
    document.getElementById("AliasComment").value = "";
  }
  //get rezize
  document.getElementById("resize").value = 28; //default
  if (typeof GlobalAssociativeArray[Alias].resize != "undefined") {
    document.getElementById("resize").value =
      GlobalAssociativeArray[Alias].resize;
  }

  let character_modifications_element = document.getElementById(
    "character_modifications"
  );
  //look for old radio style and remove it
  if (typeof GlobalAssociativeArray[Alias].NoSpecialCharacters != "undefined") {
    if (GlobalAssociativeArray[Alias].NoSpecialCharacters == true) {
      GlobalAssociativeArray[Alias].character_modifications =
        "no_special_characters";
      character_modifications_element.value =
        GlobalAssociativeArray[Alias].character_modifications;
    } else {
      GlobalAssociativeArray[Alias].character_modifications =
        "no_character_modifications";
      character_modifications_element.value =
        GlobalAssociativeArray[Alias].character_modifications;
    }
    GlobalAssociativeArray[Alias].NoSpecialCharacters = undefined; //remove it if we save!
  }
  if (
    typeof GlobalAssociativeArray[Alias].character_modifications != "undefined"
  ) {
    character_modifications_element.value =
      GlobalAssociativeArray[Alias].character_modifications;
  } else {
    //set default
    character_modifications_element.value = "no_character_modifications";
  }
  GeneratePW();
}

function getAliasList() {
  LocalStorageToVar();
  document.getElementById("JSONSave").value = JSON.stringify(
    GlobalAssociativeArray,
    null,
    "\t"
  );
}

function saveAliasList() {
  if (document.getElementById("JSONSave").value == "") {
    GlobalAssociativeArray = {};
  } else {
    GlobalAssociativeArray = JSON.parse(
      document.getElementById("JSONSave").value
    );
  }
  VarToLocalStorage();
  BuildAliasSelect();
}

function exportAll() {
  LocalStorageToVar();
  copyToClipboardText(JSON.stringify(GlobalAssociativeArray));
  alert("All your Alias, settings, and comments are on the clipboard!");
}

function supports_html5_storage() {
  try {
    return "localStorage" in window && window.localStorage !== null;
    //return false;
  } catch (e) {
    return false;
  }
}

function wrapPWA() {
  //button to install PWA : https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/How_to/Trigger_install_prompt
  const installButton = document.getElementById("installPWA");
  let installPrompt = null;

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    installPrompt = event;
    installButton.removeAttribute("hidden");
  });

  installButton.addEventListener("click", async () => {
    if (!installPrompt) {
      return;
    }
    const result = await installPrompt.prompt();
    console.log(`Install prompt was: ${result.outcome}`);
    disableInAppInstallPrompt();
  });

  function disableInAppInstallPrompt() {
    installPrompt = null;
    installButton.setAttribute("hidden", "");
  }

  window.addEventListener("appinstalled", () => {
    disableInAppInstallPrompt();
  });

  window.addEventListener("beforeinstallprompt", async (event) => {
    const relatedApps = await navigator.getInstalledRelatedApps();

    // Search for a specific installed platform-specific app
    const psApp = relatedApps.find((app) => app.id === "/Forever_Passwords/");
    if (psApp) {
      event.preventDefault();
      // Update UI as appropriate
    }
  });
}

function postError(err) {
  console.error(err);
  errorArray.push({ Name: err.name, Message: err.message, Stack: err.stack });
  let errorString = JSON.stringify(errorArray, null, "\t");
  document.getElementById("error").innerHTML = "Errors:<br>" + errorString;
}