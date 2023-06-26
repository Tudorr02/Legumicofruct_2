let tema = localStorage.getItem("tema");
if (tema === "dark1") {
    document.body.classList.add("dark1");
} else if (tema === "extra") {
    document.body.classList.add("extra");
}

window.addEventListener("DOMContentLoaded", function() {
    const radioButtons = document.getElementsByName("nume");

    if (document.body.classList.contains("dark1")) {
        radioButtons[1].checked = true;
    } else if (tema === "extra") {
        radioButtons[2].checked = true;
    } else {
        radioButtons[0].checked = true;
    }

    radioButtons[0].onclick = function() {
        document.body.classList.remove("dark1", "extra","dark");
        document.body.classList.add("light1");
        localStorage.setItem("tema", "light1");
    }

    radioButtons[1].onclick = function() {
        document.body.classList.remove("extra","light1","dark");
        document.body.classList.add("dark1");
        localStorage.setItem("tema", "dark1");
    }

    radioButtons[2].onclick = function() {
        document.body.classList.remove("dark1","dark","light1");
        document.body.classList.add("extra");
        localStorage.setItem("tema", "extra");
    }
    radioButtons[3].onclick = function() {
        document.body.classList.remove("dark1","extra","light1");
        
        localStorage.setItem("tema", "");
    }
});