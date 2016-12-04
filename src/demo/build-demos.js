function buildDemo(element) {
    const demoName = element.id;
    console.log(`Building demo: ${demoName}`);
    element.innerHTML = `<h2>&lt;${demoName}/&gt;</h2><div><${demoName}/></div>`
}

const demos = document.getElementById("demos");
Array.prototype.forEach.call(demos.children, buildDemo);
