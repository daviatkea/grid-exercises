const sections = document.querySelectorAll("section");
const classReg = /(\.[a-z])/gi;

sections.forEach((section, i) => {
  const styleTag = section.querySelector(".editor > style");
  const _tA = section.querySelector(".editor > textarea");
  const exerciseKey = `${i + 1}`;
  const boxKey = `box-${i + 1}`;
  let boxes = 0;

  const parent = section.querySelector(".container");
  const plus = section.querySelector(".plus");
  const minus = section.querySelector(".minus");

  function prefix(str) {
    return str.replaceAll(
      classReg,
      (match) => `[data-exercise-key="${exerciseKey}"] ${match}`
    );
  }

  function addButtonListeners() {
    if (!plus) return;

    plus.addEventListener("click", (e) => {
      addBox();

      boxes++;

      minus.disabled = false;

      boxCount();
    });

    if (localStorage.getItem(boxKey)) {
      boxes = localStorage.getItem(boxKey);
      minus.disabled = boxes > 0 ? false : true;
    } else {
      minus.disabled = boxes > 0 ? false : true;
    }

    minus.addEventListener("click", (e) => {
      removeBox();

      minus.disabled = parent.children.length <= 1 ? true : false;

      // if (!boxes <= 0) {
      //   boxes--;
      // }

      if (boxes === 0) return;
      boxes--;

      boxCount();
    });
  }

  addButtonListeners();

  function addBox() {
    const count = parent.children.length;
    const box = document.createElement("div");
    box.className = `box box-${count + 1}`;
    box.setAttribute("contenteditable", true);
    parent.appendChild(box);
  }

  function addClasses() {
    [...parent.children].forEach((b, i) => {
      b.className = `box box-${i + 1}`;
    });
  }

  function removeBox() {
    if (parent.children.length - 1) {
      const last = parent.lastElementChild;
      parent.removeChild(last);
    }
  }

  function boxCount() {
    if (boxes < 0) return;
    localStorage.setItem(boxKey, boxes);
  }

  addClasses();

  const init = () => {
    // const parentClass =
    //   "exercise-" + section.querySelector("article>div").className;
    // const parentDataset = `${i + 1}`;
    section.dataset.exerciseKey = `${i + 1}`;

    if (localStorage.getItem(exerciseKey)) {
      _tA.value = localStorage.getItem(exerciseKey);
      styleTag.innerHTML = prefix(_tA.value);
    }

    if (localStorage.getItem(boxKey)) {
      boxes = localStorage.getItem(boxKey);
      for (let i = 0; i < boxes; i++) {
        addBox(i);
      }
    }

    _tA.addEventListener("input", (e) => {
      styleTag.innerHTML = prefix(e.target.value);
      localStorage.setItem(exerciseKey, _tA.value);
    });
  };

  init();
});
