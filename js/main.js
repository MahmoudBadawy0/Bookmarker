var bookmarkNameInput = document.getElementById("bookmarkName");
var websiteUrlInput = document.getElementById("websiteUrl");
var subBtn = document.getElementById("subBtn");
var tableContent = document.getElementById("tableContent");
var siteList = [];

if (localStorage.getItem("siteList") != null) {
  siteList = JSON.parse(localStorage.getItem("siteList"));
  display();
}

function addSite() {
  var siteObj = {
    bookmarkName: bookmarkNameInput.value,
    websiteUrl: websiteUrlInput.value,
  };

  if (
    bookmarkNameInput.classList.contains("is-valid") &&
    websiteUrlInput.classList.contains("is-valid")
  ) {
    siteList.push(siteObj);
    localStorage.setItem("siteList", JSON.stringify(siteList));
    display();
    clr();
  } else {
    Swal.fire({
      title: "Site Name or Url is not valid",
      text: `Site name must contain at least 3 characters and Site URL must be a valid one http/https...`,
      icon: "error",
    });
  }
}

function display() {
  var temp = "";
  for (let i = 0; i < siteList.length; i++) {
    temp += `<tr class="align-middle">
            <td>${i + 1}</td>
            <td>${siteList[i].bookmarkName}</td>
            <td><button   onclick="visit(${i})"    id="visitBtn" class="btn btn-visit" ><i class="fa-solid fa-eye pe-1"></i>Visit</button></td>
            <td><button  onclick="remove(${i})" id="deleteBtn" class="btn btn-delete "><i class="fa-solid fa-trash-can pe-1"></i>Delete</button></td>
            </tr>`;
  }
  tableContent.innerHTML = temp;
}

function remove(index) {
  siteList.splice(index, 1);
  localStorage.setItem("siteList", JSON.stringify(siteList));
  display();
}

function visit(index) {
  window.open(siteList[index].websiteUrl, "_blank");
}

function clr() {
  bookmarkNameInput.value = "";
  websiteUrlInput.value = "";
  bookmarkNameInput.classList.remove("is-valid");
  bookmarkNameInput.classList.remove("is-invalid");
  websiteUrlInput.classList.remove("is-valid");
  websiteUrlInput.classList.remove("is-invalid");
}

function validate(elm) {
  var regex = {
    bookmarkName: /^[A-Za-z]{3,18}$/,
    websiteUrl:
      /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/,
  };

  var match = regex[elm.id].test(elm.value);

  if (match) {
    elm.classList.remove("is-invalid");
    elm.classList.add("is-valid");
  } else {
    elm.classList.add("is-invalid");
    elm.classList.remove("is-valid");
  }
}
