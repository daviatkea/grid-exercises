const sections = document.querySelectorAll("section");
const classReg = /(\.[a-z])/gi;

sections.forEach((section, i) => {
  const styleTag = section.querySelector(".editor > style");
  const _tA = section.querySelector(".editor > textarea");
  const storageKey = `exercise-${i + 1}`;
  const boxKey = `box-${i + 1}`;
  let boxes = 0;

  const parent = section.querySelector(".container");
  const pluses = section.querySelectorAll(".plus");
  const minuses = section.querySelectorAll(".minus");

  pluses.forEach((plus) => {
    // plus.addEventListener("click", addBox);
    plus.addEventListener("click", (e) => {
      addBox();

      if (!boxes >= 0) {
        boxes++;
      }
      boxCount();
    });
  });
  minuses.forEach((minus) => {
    // minus.addEventListener("click", removeBox);
    minus.addEventListener("click", (e) => {
      removeBox();

      if (!boxes <= 0) {
        boxes--;
      }
      boxCount();
    });
  });

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
    localStorage.setItem(boxKey, boxes);
  }

  addClasses();

  const init = () => {
    // const parentClass =
    //   "exercise-" + section.querySelector("article>div").className;
    const parentClass = `exercise-${i + 1}`;
    section.classList.add(parentClass);
    function prefix(str) {
      return str.replaceAll(classReg, (match) => `.${parentClass} ${match}`);
    }

    if (localStorage.getItem(storageKey)) {
      _tA.value = localStorage.getItem(storageKey);
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
      localStorage.setItem(storageKey, _tA.value);
    });
  };

  init();
});
