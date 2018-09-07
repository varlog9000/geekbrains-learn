var current = works[0];
runWorks();

function runWorks() {
    document.getElementById('text').innerText = current.text;
    document.getElementById('answer').innerHTML = '';
    for (var key in current.answer) {
        document.getElementById('answer').innerHTML += "<div class='style-class' onclick='current = works["+ current.jump[key] +"]; runWorks()'>" + current.answer[key] + "</div>";
    }

}