const sections = document.querySelectorAll("section");
const classReg = /(\.[a-z])/gi;

sections.forEach((section, i) => {
  const styleTag = section.querySelector(".editor > style");
  const _tA = section.querySelector(".editor > textarea");
  const storageKey = `exercise-${i + 1}`;

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

    _tA.addEventListener("input", (e) => {
      styleTag.innerHTML = prefix(e.target.value);
      localStorage.setItem(storageKey, _tA.value);
    });
  };

  init();
});
