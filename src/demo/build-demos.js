function buildDemo(element) {
    let classname = '';
    if(window.location.search.indexOf('debug') >= 0) {
        classname = 'debug';
    }
    const demoName = element.id;
    console.log(`Building demo: ${demoName}`);
    element.innerHTML = `<h2>&lt;${demoName}/&gt;</h2><div><${demoName} class="${classname}"/></div>`
}

const demoEl = document.getElementById("demos");
Array.prototype.forEach.call(demoEl.children, buildDemo);
