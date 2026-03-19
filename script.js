"use strict";

if (! testBrowser) {
  alert("Browser not supported");
}

let GlobalAssociativeArray = {}; //Alias list + comments and settings //use JSON associative array to squash duplicates
let secondsToErase = 30;
let countdown;
let countdowninterval;
let errorArray = [];

//set element variables
let elementMenuIcon = document.getElementById("menu_icon");
let elementXIcon = document.getElementById("x_icon");
let elementAlias = document.getElementById("Alias");
let elementXdeleteAlias = document.getElementById("xDeleteAlias");
let elementSecret = document.getElementById("Secret");
let elementAnswer = document.getElementById("Answer");
let elementCharacterModifications = document.getElementById(
  "character_modifications"
);
let elementExplainSpecialCharacters = document.getElementById(
  "explainSpecialCharacters"
);
let elementResize = document.getElementById("resize");
let elementCopyButton = document.getElementById("copyButton");
let elementClearReset = document.getElementById("clearReset");
let elementClearTimer = document.getElementById("clearTimer");
let elementGetAliasList = document.getElementById("getAliasList");
let elementSetAliasList = document.getElementById("saveAliasList");
let elementExportAll = document.getElementById("exportAll");
let elementFileInput = document.getElementById("fileInput");
let elementFileOutput = document.getElementById("fileOutput");
let elementJsonSave = document.getElementById("JSONSave");
let elementTempDialog = document.getElementById("tempDialog");
let elementAliasComment = document.getElementById("AliasComment");
let elementMainPageComponent = document.getElementById("main_page_component");
let elementMenuPageComponent = document.getElementById("menu_page_component");
let elementTimerAlert = document.getElementById("timerAlert");
let elementDataList = document.getElementById("dataList");

window.addEventListener("load", buildAliasSelect); //same as document.body.onload
elementMenuIcon.addEventListener("click", openMenu);
elementXIcon.addEventListener("click", closeMenu);
elementAlias.addEventListener("click", function () {
  this.select();
  this.value = "";
  generatePw();
});
elementAlias.addEventListener("keyup", generatePw);
elementAlias.addEventListener("change", aliasChanged);
elementXdeleteAlias.addEventListener("click", function () {
  if (
    confirm(
      "This will delete " +
        elementAlias.value +
        " from your list. Are you sure?"
    )
  ) {
    deleteFromAliasList();
  }
});
elementSecret.addEventListener("keyup", generatePw);
elementAnswer.addEventListener("click", function () {
   generatePw();
  copyToClipboardElement(elementAnswer);
  tempMessage("Password has been copied to the clipboard. It is suggested you click the Clear/Reset button after use.", 5000);
});
elementCharacterModifications.addEventListener("click", generatePw);
elementExplainSpecialCharacters.addEventListener("click", function () {
  alert(
    "No Special Characters: Replaces base64 special characters + with X, / with Q, and = (base64 padding) with Z. \n\nForce Special Characters: If no special characters, replace last character with a ="
  );
});
elementResize.addEventListener("change", generatePw);
elementCopyButton.addEventListener("click", function () {
  generatePw();
  addAliasToList();
  copyToClipboardElement(elementAnswer);
  tempMessage("Password has been copied to the clipboard. It is suggested you click the Clear/Reset button after use.<p></p>Website / Alias saved to list. It is reccomended that you backup this list.", 5000);
});
elementClearReset.addEventListener("click", resetAllData);
elementClearTimer.addEventListener("click", stopTimer);
elementGetAliasList.addEventListener("click", getAliasList);
elementSetAliasList.addEventListener("click", function () {
  if (
    confirm(
      "This will overwrite your current Website Alias list. Are you sure?"
    )
  ) {
    saveAliasList();
  }
});
elementExportAll.addEventListener("click", function () {
  if (
    confirm(
      "This will export all Alias, settings, and comments to clipboard. Are you sure?"
    )
  ) {
    exportAll();
  }
});
elementFileInput.addEventListener("change", importFromFile);
elementFileOutput.addEventListener("click", exportToFile);

wrapPWA();

function openMenu() {
  elementMainPageComponent.style.display = "none";
  elementMenuPageComponent.style.display = "block";
  elementMenuIcon.style.display = "none";
  elementXIcon.style.display = "inline";
}

function closeMenu() {
  elementMainPageComponent.style.display = "block";
  elementMenuPageComponent.style.display = "none";
  elementMenuIcon.style.display = "inline";
  elementXIcon.style.display = "none";
}

function checkForNoSpaces(el) {
  if (el.value.match(/\s/g)) {
    alert(
      "Sorry, you are not allowed to enter any spaces. Space has been removed."
    );
    el.value = el.value.replace(/\s/g, "");
  }
}

function tick() {
  //every second count down one
  countdown--;
  elementTimerAlert.innerHTML = "Auto cleared in " + countdown + " seconds";
  if (countdown <= 0) {
    stopTimer();
    resetAllData();
    elementTimerAlert.innerHTML =
      "<font color=red>Important: Alias and Secret and clipboard were deleted</font>";
  }
}

function startTimer() {
  //on copy button or click on answer
  elementTimerAlert.innerHTML = "";
  countdown = secondsToErase;
  countdowninterval = setInterval(tick, 1000);
}

function stopTimer() {
  //after count downs OR typing -> generatePw() OR clear_reset
  clearInterval(countdowninterval);
  elementTimerAlert.innerHTML = "";
}

function resetAllData() {
  elementAlias.value = "";
  elementAliasComment.value = "";
  elementSecret.value = "";
  elementAnswer.value = "";
  elementResize.value = 28;
  copyToClipboardText("Clipboard Cleared");
}

//async function copyToClipboardId(id) {
async function copyToClipboardElement(el) {
  //let text = document.getElementById(id).value;
  let text = el.value;
  await copyToClipboardText(text);
  if (elementClearTimer.checked) {
    startTimer();
  } else {
    //clearPasswordRequest();
  }
}

function clearPasswordRequest() {
  let clearMe = confirm(
    "ERASE CLIPBOARD, ALIAS AND SECRET NOW ???\n\nYour password is saved on the clipboard.\nIt is suggested to paste your password now,\nthen click OK to clear all settings and the passwords from the clipboard (secure)\nOR\nCancel to leave it as is. (not secure)"
  );
  if (clearMe === true) {
    resetAllData();
  }
}

async function copyToClipboardText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    postError(err);
  }
}

async function generatePw() {
  //async as we use promise based window.crypto.subtle.digest in this function
  try {
    stopTimer();
    let Alias = elementAlias.value;
    checkForNoSpaces(elementAlias);
    let Secret = elementSecret.value;
    checkForNoSpaces(elementSecret);
    if (Secret === "") {
      elementAnswer.value = "";
      return;
    }
    let total = Secret + Alias;

    const TE = new TextEncoder();
    let tempUint8Array = TE.encode(total);
    //coud use alternates https://gist.github.com/romeoh/3302256 or www.movable-type.co.uk/scripts/sha1.html
    let hashed = await window.crypto.subtle.digest("SHA-1", tempUint8Array);
    tempUint8Array = new Uint8Array(hashed);
    let PW = tempUint8Array.toBase64();

    //size adjust first!
    let size = elementResize.options[elementResize.selectedIndex].value;
    PW = PW.slice(0, size);

    let pattern;
    if (elementCharacterModifications.value == "no_special_characters") {
      //use capital X , Q , Z least used letters
      pattern = /[+]/g;
      PW = PW.replace(pattern, "X");
      pattern = /[/]/g;
      PW = PW.replace(pattern, "Q");
      pattern = /[=]/g;
      PW = PW.replace(pattern, "Z");
    }
    if (elementCharacterModifications.value == "force_special_characters") {
      //check for + , / , = . If not, replace last char with =
      pattern = /[+/=]/g;
      if (!pattern.test(PW)) {
        PW = PW.replace(/.$/, "=");
      }
    }
    elementAnswer.value = PW;
  } catch (err) {
    postError(err);
  }
}

function buildAliasSelect() {
  //runs on start up
  localStorageToVar();
  elementDataList.innerHTML = ""; //erase current list
  // take GlobalAssociativeArray and add index to <select>
  for (let index in GlobalAssociativeArray)
    if (GlobalAssociativeArray.hasOwnProperty(index)) {
      let option = document.createElement("option");
      option.id = index;
      option.text = index;
      elementDataList.appendChild(option);
    }
}

function addAliasToList() {
  let Alias = elementAlias.value;
  //find and set Character_Types radio input
  let character_modifications = elementCharacterModifications.value;

  GlobalAssociativeArray[Alias] = {
    comment: elementAliasComment.value,
    resize: elementResize.value,
    character_modifications: character_modifications
  }; //set as associative array

  varToLocalStorage();
  buildAliasSelect();
}

function deleteFromAliasList() {
  let SelectedName = elementAlias.value; //get Selected name
  //??
  let x = document.getElementById(SelectedName);
  x.remove(x.selectedIndex);
  //delete item from associative array
  delete GlobalAssociativeArray[SelectedName];
  varToLocalStorage();
  elementAlias.value = "";
}

function varToLocalStorage() {
  let AliasListString = JSON.stringify(GlobalAssociativeArray);
  localStorage.FP = AliasListString;
}

function localStorageToVar() {
  if (typeof localStorage.FP === "undefined") {
    return;
  } //nothing to restore
  GlobalAssociativeArray = JSON.parse(localStorage.FP);
}

function aliasChanged() {
  elementResize.value = 28; //for the case of Saved_Local_Aliases that has no possible length set. 28 is default
  let Alias = elementAlias.value; //get Selected Alias
  //exit if Alias does not exist. For 1st dummy option
  if (typeof GlobalAssociativeArray[Alias] == "undefined") {
    generatePw(); //for Saved_Local_Aliases option that does not exist in the GlobalAssociativeArray by design
    elementAliasComment.value = ""; //clear comments
    return;
  }
  //Get Comment
  if (typeof GlobalAssociativeArray[Alias].comment != "undefined") {
    elementAliasComment.value = GlobalAssociativeArray[Alias].comment;
  } else {
    elementAliasComment.value = "";
  }
  //get rezize
  elementResize.value = 28; //default
  if (typeof GlobalAssociativeArray[Alias].resize != "undefined") {
    elementResize.value = GlobalAssociativeArray[Alias].resize;
  }

  //look for old radio style and remove it
  if (typeof GlobalAssociativeArray[Alias].NoSpecialCharacters != "undefined") {
    if (GlobalAssociativeArray[Alias].NoSpecialCharacters == true) {
      GlobalAssociativeArray[Alias].character_modifications =
        "no_special_characters";
      elementCharacterModifications.value =
        GlobalAssociativeArray[Alias].character_modifications;
    } else {
      GlobalAssociativeArray[Alias].character_modifications =
        "no_character_modifications";
      elementCharacterModifications.value =
        GlobalAssociativeArray[Alias].character_modifications;
    }
    GlobalAssociativeArray[Alias].NoSpecialCharacters = undefined; //remove it if we save!
  }
  if (
    typeof GlobalAssociativeArray[Alias].character_modifications != "undefined"
  ) {
    elementCharacterModifications.value =
      GlobalAssociativeArray[Alias].character_modifications;
  } else {
    //set default
    elementCharacterModifications.value = "no_character_modifications";
  }
  generatePw();
}

function getAliasList() {
  localStorageToVar();
  elementJsonSave.value = JSON.stringify(GlobalAssociativeArray, null, "\t");
}

function saveAliasList() {
  if (elementJsonSave.value == "") {
    GlobalAssociativeArray = {};
  } else {
    GlobalAssociativeArray = JSON.parse(elementJsonSave.value);
  }
  varToLocalStorage();
  buildAliasSelect();
}

function exportAll() {
  localStorageToVar();
  copyToClipboardText(JSON.stringify(GlobalAssociativeArray));
  alert("All your Alias, settings, and comments are on the clipboard!");
}

async function importFromFile() {
  try {
    //set up file reader
    const reader = new FileReader();
    reader.onload = () => {
      // Read the file
      let jsonString = reader.result;
      elementJsonSave.value = jsonString;
      saveAliasList();
      tempMessage("Website Alias list imported", 3000);
    };
    reader.onerror = () => {
      postMessage("Error reading the file. Please try again.", "error");
    };

    if (
      !confirm(
        "This will overwrite your current Website Alias list. Are you sure?"
      )
    ) {
      return;
    }
    let file = elementFileInput.files[0];
    reader.readAsText(file);
  } catch (err) {
    postError(err);
  }
}

async function exportToFile() {
  //https://codepen.io/vpelss/pen/ZYpLOQj
  //using <a> download attribute
  try {
    let jsonObject = getAliasList();
    let jsonString = elementJsonSave.value;
    //it needs download="myDbName.txt"
    elementFileOutput.href = "data:text/plain;base64," + btoa(jsonString);
  } catch (err) {
    postError(err);
  }
}

function tempMessage(message, ms) {
  elementTempDialog.innerHTML = message;
  elementTempDialog.showModal();
  setTimeout(function () {
    elementTempDialog.close();
  }, ms);
}

function testBrowser() {
  try {
    //test for various functionality and alert. Note that we don't halt. It still may work without all functionailty.
    if (!("localStorage" in window && window.localStorage !== null)) {
      throw {
        name: "Error",
        message: "HTML5 Storage is not supported in this browser"
      };
    }
    if (typeof AudioContext == "undefined") {
      throw {
        name: "Error",
        message: "AudioContext is not supported in this browser"
      };
    }
    if (typeof window.crypto.subtle == "undefined") {
      throw {
        name: "Error",
        message: "window.crypto.subtle is not supported in this browser"
      };
    }
    let myDialog = document.createElement("dialog");
    if (typeof myDialog.showModal == "undefined") {
      throw {
        name: "Error",
        message: "showModal() is not supported in this browser"
      };
    }
    //html5
    if (typeof navigator.geolocation == "undefined") {
      throw {
        name: "Error",
        message: "HTML5 is not supported in this browser"
      };
    }
    if (typeof navigator.clipboard.writeText == "undefined") {
      throw {
        name: "Error",
        message:
          "navigator.clipboard.writeText is not supported in this browser"
      };
    }
    if (typeof FileReader == "undefined") {
      throw {
        name: "Error",
        message: "FileReader is not supported in this browser"
      };
    }
    //pwa
    if (typeof navigator.getInstalledRelatedApps == "undefined") {
      throw {
        name: "Error",
        message:
          "navigator.getInstalledRelatedApps is not supported in this browser"
      };
    }
    if (typeof URL == "undefined") {
      throw {
        name: "Error",
        message: "URL is not supported in this browser"
      };
    }
  } catch (err) {
    postError(err);
    alert(
      "Incompatible browser. If you are seeing this error, please consider using the newest Chrome, Edge, Safari. You may encounter limited or no functionality if you continue. \n\n" +
        err
    );
    return false;
  }
  return true;
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