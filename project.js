const files = {

    "index.html": `
<!DOCTYPE html>

<html>

<head>
    <title>My Project</title>
</head>

<body>

    <h1>Hello Kidbit!</h1>

    <p>This is my first project.</p>

    <button onclick="hello()">
        Click me
    </button>

</body>

</html>
`,

    "style.css": `
body {
    font-family: Arial;
    text-align: center;
    padding: 50px;
}

button {
    padding: 12px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}
`,

    "script.js": `
function hello() {

    alert("Hello from Kidbit!");

}
`

};


/* CURRENT FILE */

let currentFile = "index.html";


/* ELEMENTS */

const code = document.getElementById("code");
const tab = document.getElementById("tab");
const lineNumbers = document.getElementById("lineNumbers");

const preview = document.getElementById("preview");


/* LOAD FILE */

function loadFile(filename) {

    currentFile = filename;

    code.textContent = files[filename];

    tab.textContent = filename;

    updateLines();

    document.querySelectorAll(".file").forEach(file => {

        file.classList.remove("active");

        if (file.dataset.file === filename) {
            file.classList.add("active");
        }

    });

}


/* LINE NUMBERS */

function updateLines() {

    const lines =
        files[currentFile].split("\n").length;

    let output = "";

    for (let i = 1; i <= lines; i++) {

        output += i + "<br>";

    }

    lineNumbers.innerHTML = output;

}


/* FILE CLICKING */

document.querySelectorAll(".file").forEach(file => {

    file.addEventListener("click", () => {

        loadFile(file.dataset.file);

    });

});


/* RUN PROJECT */

document.getElementById("run").addEventListener(
    "click",
    () => {

        const html =
            files["index.html"];

        const css =
            `<style>${files["style.css"]}</style>`;

        const js =
            `<script>${files["script.js"]}<\/script>`;

        preview.srcdoc =
            html.replace(
                "</head>",
                css + "</head>"
            ).replace(
                "</body>",
                js + "</body>"
            );

    }
);


/* COPY */

document.getElementById("copy").addEventListener(
    "click",
    async () => {

        await navigator.clipboard.writeText(
            files[currentFile]
        );

        document.getElementById("copy").textContent =
            "✓ Copied";

        setTimeout(() => {

            document.getElementById("copy").textContent =
                "📋 Copy";

        }, 1500);

    }
);


/* START */

loadFile("index.html");