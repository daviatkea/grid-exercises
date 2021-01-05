class Exercise extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: "open",
    }); //apparently slots only work with the shadow dom?
  }
  connectedCallback() {
    if (!document.querySelector("#script-prism")) {
      const ele = document.createElement("script");
      ele.setAttribute("src", "js/prism.js");
      ele.setAttribute("id", "script-prism");
      document.body.append(ele);
    }
    if (!document.querySelector("#script-prism-live")) {
      const ele = document.createElement("script");
      ele.setAttribute("src", "js/prism-live.js?load=css");
      ele.setAttribute("id", "script-prism-live");
      document.body.append(ele);
    }

    this.html = `
    <style>
        @import "../css/reset.css";
        @import "../css/prism.css";
        @import "../css/custom.css";
    </style>


    <section>
    <h2>Øvelse 1</h2>

    <figure>
      <img src="img/grid-exercise-1.webp" alt="" />
      <figcaption>
        <p>Lav 3 kolonner, som er lige brede.</p>
        <ul class="hints">
          <li><code>grid-template-columns</code> (property)</li>
          <li><code>fr</code> (enhed)</li>
        </ul>
      </figcaption>
    </figure>

    <article class="output">
      <div class="ex1">
        <div class="box box-1" contenteditable></div>
        <div class="box box-2" contenteditable></div>
        <div class="box box-3" contenteditable></div>
        <div class="box box-4" contenteditable></div>
        <div class="box box-5" contenteditable></div>
        <div class="box box-6" contenteditable></div>
        <div class="box box-7" contenteditable></div>
        <div class="box box-8" contenteditable></div>
        <div class="box box-9" contenteditable></div>
      </div>
    </article>

    <div class="editor">
      <textarea class="prism-live language-css">
.ex1 {

}</textarea
      >
      <style class="style"></style>
    </div>
  </section>`;
    this.render();
    /*
    this.shadowRoot.querySelector("form").addEventListener("submit", (e) => {
      e.preventDefault();
      if (this.shadowRoot.querySelector("input[name=pass]").value === "dxc") {
        document.querySelector("#totally-delete-me").remove();
        localStorage.setItem("iform-totally-logged-in", true);
      }
    });*/
  }
  render() {
    this.shadowRoot.innerHTML = this.html;
  }
}
customElements.define("exercise-editor", Exercise);
