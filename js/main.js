// assign HTML tags to JS variables.
const form = document.querySelector("#form-driver");
const tests = document.querySelector("#tests");
// inputs
const firstnameInput = document.querySelector("#firstname");
const lastnameInput = document.querySelector("#lastname");
const birthInput = document.querySelector("#birth");
const genderInput = document.querySelector("#gender");
// outputs
const fullnameDisplay = document.querySelector("#fullname-display");
const birthDisplay = document.querySelector("#birth-display");
const genderDisplay = document.querySelector("#gender-display");
const averageDisplay = document.querySelector("#average-display");
const infoDisplay = document.querySelector("#info-display");
// controls
const addTestBtn = document.querySelector('button[type="button"]');
const submit = document.querySelector('button[type="submit"]');

/**
 * @description this function is meant to validate our form.
 * @param {*} e evant dispatched by the form.
 */
function validate(e) {
  if (e) {
    e.preventDefault();
  } else {
    const person = JSON.parse(localStorage.getItem("person"));
    const { firstname, lastname, birth, gender, marks } = person;
    firstnameInput.value = firstname;
    lastnameInput.value = lastname;
    birthInput.value = birth;
    genderInput.value = gender;
    // remove ready mark input
    tests.innerHTML = "";
    // append local storage marks' input
    for (let i = 0; i < marks.length; i += 1) {
      addTest(marks[i]);
    }
  }
  const marksInputs = document.querySelectorAll("input[id^='test-']");
  // set the info from inputs into a JS object.
  const person = {
    firstname: firstnameInput.value,
    lastname: lastnameInput.value,
    birth: birthInput.value,
    gender: genderInput.value,
    marks: [...marksInputs]
      .map((e) => parseFloat(e.value))
      .filter((e) => e !== NaN),
  };

  // destruct object's properties to separate variables.
  const { firstname, lastname, birth, gender, marks } = person;

  fullnameDisplay.innerHTML = `${
    gender === "m" ? "M." : "Mm."
  } ${firstname} ${lastname}`;
  birthDisplay.innerHTML = `${birth}`;
  genderDisplay.innerHTML = `${gender === "m" ? "Male" : "Female"}`;
  if (marks.length > 0) {
    // calculate the average (moyen)
    const average = marks.reduce((t, e) => t + e, 0) / marks.length;
    // show average and fix float to 2 numbers
    averageDisplay.innerHTML = average.toFixed(2);
    infoDisplay.innerHTML = `${average >= 10 ? "Succeded" : "Failed"}`;

    // colorize the info
    average < 10
      ? (infoDisplay.style.color = "red")
      : (infoDisplay.style.color = "green");
  }
  // save person object in localStorage
  if (e) localStorage.setItem("person", JSON.stringify(person));
}

/**
 * Add test/mark input.
 */
function addTest(value) {
  const markCount = document.querySelectorAll("input[id^='test-']").length;
  // create 'label' tag
  const newLabel = document.createElement("label");
  const labelText = document.createTextNode(`Test ${markCount + 1}`);
  newLabel.appendChild(labelText);
  newLabel.for = `test-${markCount + 1}`;
  // create 'input' tag
  const newInput = document.createElement("input");
  newInput.id = `test-${markCount + 1}`;
  newInput.className = `form-control`;
  newInput.type = "number";
  if (value) newInput.value = value;
  // add inputs and their labels
  tests.appendChild(newLabel);
  tests.appendChild(newInput);
}

/**
 * @description this function disable and enable the submit button depending on the inputs values.
 */
function enableDisableSubmit() {
  if (firstnameInput.value && lastnameInput.value && birthInput.value) {
    submit.disabled = false;
  } else {
    submit.disabled = true;
  }
}

// Events
form.addEventListener("submit", validate, true);
addTestBtn.addEventListener("click", addTest);

firstnameInput.addEventListener("change", enableDisableSubmit);
lastnameInput.addEventListener("change", enableDisableSubmit);
birthInput.addEventListener("change", enableDisableSubmit);

validate();

enableDisableSubmit();
