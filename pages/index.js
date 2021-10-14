fetch("https://ipo-cp.ru/api/v1/bootcamps/605c5f71bc557b46b4f42a56/courses")
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
    }
  })
  .then((data) => {
    const arr = getData(data);
    arr.forEach((item) => {
      generateProgram(item);
      buttonClick();
    });
  })
  .catch((err) => console.log(err));

function getData(data) {
  const elements = data.data.slice(0, 20);
  let arrayData = [];
  elements.forEach((item, index) => {
    if (item.specializedSubjects.length == 10) {
      if (index % 2 == 0) {
        arrayData.push(item);
      }
    }
  });
  return arrayData;
}

function generateProgram(data) {
  const template = document.querySelector(".template").cloneNode(true).content;
  template.querySelector(".program__name").textContent = data.title;
  data.specializedSubjects.forEach((item, index) => {
    const li = document.createElement("li");
    li.classList.add("module__item");
    const div = document.createElement("div");
    div.classList.add("module__point");
    const span = document.createElement("span");
    span.textContent = item;
    li.prepend(div);
    li.append(span);

    if (index <= 4) {
      Array.from(template.querySelectorAll(".module__list"))[0].append(li);
    } else {
      Array.from(template.querySelectorAll(".module__list"))[1].append(li);
    }
  });
  document.querySelector(".page").append(template);
}

function buttonClick() {
  const buttons = document.querySelectorAll(".module__button");
  buttons.forEach((item) => {
    item.addEventListener("click", buttonHandler);
  });
}

function buttonHandler(event) {
  const list = event.target.parentElement.lastElementChild;
  const background = event.target.nextElementSibling;
  const button = event.target;
  if (list.classList.contains("module__list_active")) {
    list.style.display = "none";
    list.classList.remove("module__list_active");
    background.style.color = "#000";
    background.style.backgroundColor = "#f7f7f7";
    button.style.backgroundImage = "url(./images/plus.svg)";
  } else {
    list.style.display = "block";
    list.classList.add("module__list_active");
    background.style.color = "#fff";
    background.style.backgroundColor = "#ff3535";
    button.style.backgroundImage = "url(./images/minus.svg)";
  }
}

