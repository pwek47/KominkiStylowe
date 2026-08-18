document.querySelectorAll(".card").forEach(card => {

    card.addEventListener("mouseenter", () => {
        card.style.boxShadow = "0 0 30px rgba(200,155,60,.4)";
    });

    card.addEventListener("mouseleave", () => {
        card.style.boxShadow = "none";
    });

});
