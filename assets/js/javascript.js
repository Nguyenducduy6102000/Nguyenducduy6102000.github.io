function addActive(e) {
    var activeBtns = document.querySelectorAll(".btn")
    for (i = 0; i < activeBtns.length; i++) {
        activeBtns.item(i).classList.remove('active');
    }
    e.classList.add('active');
}