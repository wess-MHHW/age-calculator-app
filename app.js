const form = document.getElementById("form");

const inputs = form.querySelectorAll("input");

const spans = document.querySelector(".age").querySelectorAll("span");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // check date
  let data = [inputs[0].value, inputs[1].value, inputs[2].value];
  let valid =
    checkDay(...data) === "" &&
    checkMonth(data[1]) === "" &&
    checkYear(data[2]) === "";
  inputs.forEach((input, index) => {
    if (index === 0) {
      let message = checkDay(...data);
      input.parentElement.querySelector("p").textContent = message;
      if (message !== "") {
        input.parentElement.classList.add("wrong");
      } else {
        input.parentElement.classList.remove("wrong");
      }
    } else if (index === 1) {
      let message = checkMonth(data[index]);
      input.parentElement.querySelector("p").textContent = message;
      if (message !== "") {
        input.parentElement.classList.add("wrong");
      } else {
        input.parentElement.classList.remove("wrong");
      }
    } else {
      let message = checkYear(data[index]);
      input.parentElement.querySelector("p").textContent = message;
      if (message !== "") {
        input.parentElement.classList.add("wrong");
      } else {
        input.parentElement.classList.remove("wrong");
      }
    }
  });

  // print age
  if (valid) {
    spans.forEach((span, index) => {
      let result = calculateAge(...data);
      let i = 0;
      let interval = setInterval(() => {
        i = Math.min(i + 1, result[index]);
        span.innerText = i;
        if (i === result[index]) {
          clearInterval(interval);
        }
      }, 25);
    });
  } else {
    spans.forEach((span, index) => {
      span.innerText = "--";
    });
  }
});

function checkDay(day, month, year) {
  let m = {
    1: 31,
    2: (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31,
  };
  if (day.trim() === "" || !day) {
    return "This field is required";
  } else if (day < 1 || day > m[month]) {
    return "Must be a valid day";
  } else {
    return "";
  }
}

function checkMonth(month) {
  if (month.trim() === "" || !month) {
    return "This field is required";
  } else if (month < 1 || month > 12) {
    return "Must be a valid month";
  } else {
    return "";
  }
}

function checkYear(year) {
  let now = new Date().getFullYear();
  if (year.trim() === "" || !year) {
    return "This field is required";
  } else if (year > now) {
    return "Must be in the past";
  } else {
    return "";
  }
}

function calculateAge(day, month, year) {
  const today = new Date();
  const birthdate = new Date(year, month - 1, day);
  const ageInDays = Math.floor((today - birthdate) / (1000 * 60 * 60 * 24));
  const years = Math.floor(ageInDays / 365);
  const leapDays =
    Math.floor(years / 4) - Math.floor(years / 100) + Math.floor(years / 400);
  const adjustedAgeInDays = ageInDays - leapDays;
  const months = Math.floor((adjustedAgeInDays % 365) / 30);
  const days = adjustedAgeInDays % 30;
  return [years, months, days];
}
