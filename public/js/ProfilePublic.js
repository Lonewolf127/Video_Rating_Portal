let arr = { Username: "", PhoneNo: "", Password: "" };
function edit_button() {
  document.getElementById("profile-submit-button").style.visibility = "visible";
    document.getElementById("Username").removeAttribute("readonly");
  document.getElementById("PhoneNo").removeAttribute("readonly");
  document.getElementById("profile-edit-button").style.visibility = "hidden";
  document.getElementById("profile-changePassword-button").style.visibility =
    "visible";

  arr.Username = document.getElementById("Username").value;
  arr.PhoneNo = document.getElementById("PhoneNo").value;
  arr.Password = document.getElementById("Password").value;
}

function submit_button() {
  const Username = document.getElementById("Username").value;
  const PhoneNo = document.getElementById("PhoneNo").value;
  const Password = document.getElementById("Password").value;
  //validate
  if (
    arr.Username == Username &&
    arr.PhoneNo == PhoneNo &&
    arr.Password == Password
  ) {
    M.toast({html: 'You have not modified details'})
    return false;
  }
  if (PhoneNo.length != 10) {
    M.toast({html:'Enter a valid Phone Number'})
    return false;
  }

  return true;
}

function changePassword_button() {
  document.getElementById("Password").removeAttribute("readonly");
}
