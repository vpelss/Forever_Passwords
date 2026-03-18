//set all elements at start elTimerAlert, etc
//to do pop up copied to clipboard asking to clear it after use!
//test for browser functionality
//imprort/export to file

//set element variables
let elementMenuIcon = document.getElementById("menu_icon");
let elementXIcon = document.getElementById("x_icon");
let elementAlias = document.getElementById("Alias");
let elementXdeleteAlias= document.getElementById("xDeleteAlias");
let elementSecret = document.getElementById("Secret");
let elementAnswer = document.getElementById("Answer");
let elementCharacterModifications = document.getElementById("character_modifications");
let elementExplainSpecialCharacters = document.getElementById("explainSpecialCharacters");
let elementResize = document.getElementById("resize");

window.addEventListener("load",BuildAliasSelect); //same as document.body.onload
elementMenuIcon.addEventListener("click", openMenu);
elementXIcon.addEventListener("click", closeMenu);
elementAlias.addEventListener("click", function () {
  this.select();
  this.value = "";
  GeneratePW();
});
elementAlias.addEventListener("keyup", GeneratePW);
elementAlias.addEventListener("change", AliasChanged.bind(this.value));
elementXdeleteAlias.addEventListener("click", function () {
  if (
    confirm(
      "This will delete " +
        elementAlias.value +
        " from your list. Are you sure?"
    )
  ) {
    Delete();
  }
});
elementSecret.addEventListener("keyup", GeneratePW);
elementAnswer.addEventListener("click", function () {
  copyToClipboardId("Answer");
});
elementCharacterModifications.addEventListener("click", GeneratePW);
elementExplainSpecialCharacters.addEventListener("click", function () {
    alert(
      "No Special Characters: Replaces base64 special characters + with X, / with Q, and = (base64 padding) with Z. \n\nForce Special Characters: If no special characters, replace last character with a ="
    );
  });
elementResize.addEventListener("change", GeneratePW);
document.getElementById("copyButton").addEventListener("click", function () {
  GeneratePW();
  addAliasToList();
  copyToClipboardId("Answer");
});
document
  .getElementById("clearReset")
  .addEventListener("click", resetAllData);
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
let secondsToErase = 30;
let countdown;
let countdowninterval;
let errorArray = [];

wrapPWA();

function openMenu() {
  document.getElementById("main_page_component").style.display = "none";
  document.getElementById("menu_page_component").style.display = "block";
  elementMenuIcon.style.display = "none";
  elementXIcon.style.display = "inline";
}

function closeMenu() {
  document.getElementById("main_page_component").style.display = "block";
  document.getElementById("menu_page_component").style.display = "none";
 elementMenuIcon.style.display = "inline";
  elementXIcon.style.display = "none";
}

function CheckForNoSpaces(id) {
  let t = document.getElementById(id);
  if (t.value.match(/\s/g)) {
    alert("Sorry, you are not allowed to enter any spaces");
    t.value = t.value.replace(/\s/g, "");
  }
}

function tick() {
  //every second count down one
  countdown--;
  document.getElementById("timerAlert").innerHTML =
    "Auto cleared in " + countdown + " seconds";
  if (countdown <= 0) {
    stopTimer();
    resetAllData();
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

function resetAllData() {
  elementAlias.value = "";
  document.getElementById("AliasComment").value = "";
  elementSecret.value = "";
 elementAnswer.value = "";
  elementResize.value = 28;
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

async function GeneratePW() {
  //async as we use promise based window.crypto.subtle.digest in this function
  try {
    stopTimer();
    let Alias = elementAlias.value;
    CheckForNoSpaces("Alias");
    let Secret = elementSecret.value;
    if (Secret === "") {
      elementAnswer.value = "";
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
    let size = elementResize.options[
      elementResize.selectedIndex
    ].value;
    PW = PW.slice(0, size);

    let pattern;
    if (
     elementCharacterModifications.value ==
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
      elementCharacterModifications.value ==
      "force_special_characters"
    ) {
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
  let Alias = elementAlias.value;

  //find and set Character_Types radio input
  let character_modifications_element = document.getElementById(
    "character_modifications"
  );
  let character_modifications = character_modifications_element.value;

  GlobalAssociativeArray[Alias] = {
    comment: document.getElementById("AliasComment").value,
    resize: elementResize.value,
    character_modifications: character_modifications
  }; //set as associative array

  VarToLocalStorage();
  BuildAliasSelect();
}

function Delete() {
  let SelectedName = elementAlias.value; //get Selected name
  let x = document.getElementById(SelectedName);
  x.remove(x.selectedIndex);
  //delete item from associative array
  delete GlobalAssociativeArray[SelectedName];
  VarToLocalStorage();
  elementAlias.value = "";
}

function VarToLocalStorage() {
  let AliasListString = JSON.stringify(GlobalAssociativeArray);
    localStorage.FP = AliasListString; 
  }

function LocalStorageToVar() {
    if (typeof localStorage.FP === "undefined") {
      return;
    } //nothing to restore
    GlobalAssociativeArray = JSON.parse(localStorage.FP);
}

function AliasChanged(value) {
  elementResize.value = 28; //for the case of Saved_Local_Aliases that has no possible length set. 28 is default
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
 elementResize.value = 28; //default
  if (typeof GlobalAssociativeArray[Alias].resize != "undefined") {
    elementResize.value =
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