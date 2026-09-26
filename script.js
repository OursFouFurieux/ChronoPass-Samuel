// SCROLL SNAP - GESTION DU SWIPE

let currentSection = 0;
let isTransitioning = false;
const sections = document.querySelectorAll("section");

// Empêcher le scroll normal
if (document.body) {
    document.body.style.overflow = "hidden";
}

// Variables pour détecter le swipe
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener("touchstart", (e) => {
    touchStartY = e.changedTouches[0].clientY;
}, { passive: true });

document.addEventListener("touchend", (e) => {
    touchEndY = e.changedTouches[0].clientY;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    if (isTransitioning || sections.length === 0) return;

    const diff = touchStartY - touchEndY;
    const threshold = 50;

    // Swipe vers le haut = aller à la section suivante
    if (diff > threshold && currentSection < sections.length - 1) {
        currentSection++;
        navigateToSection();
    }

    // Swipe vers le bas = aller à la section précédente
    if (diff < -threshold && currentSection > 0) {
        currentSection--;
        navigateToSection();
    }
}

function navigateToSection() {
    isTransitioning = true;

    const targetSection = sections[currentSection];

    if (targetSection) {
        targetSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    setTimeout(() => {
        isTransitioning = false;
    }, 1000);
}

// REVEAL

document.querySelectorAll(".reveal")
.forEach(el => {

    new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if(entry.isIntersecting){
                entry.target.classList.add("visible");
            }

        });

    }, {
        threshold:0.2
    }).observe(el);

});


// BOUTON

const btn = document.getElementById("startBtn");
const cd = document.getElementById("countdown");

if (btn) {
    btn.addEventListener("click", () => {

        btn.style.display = "none";

        document.body.classList.add("launching");

        const music = document.getElementById("epicMusic");

        if(music){
            music.play().catch(() => {});
        }

        let value = 5;

        cd.textContent = value;

        const timer = setInterval(() => {

            value--;

            if(value > 0){

                cd.textContent = value;

            }else if(value === 0){

                cd.textContent = "🚀";

            }else{

                clearInterval(timer);

                document.body.classList.remove(
                    "launching"
                );

                if (currentSection < sections.length - 1) {
                    currentSection++;
                    navigateToSection();
                }

                cd.textContent = "";

            }

        },1000);

    });
}


// ANALYSE

let analysisStarted = false;

const analysisSection =
    document.querySelector(".analysis");

if (analysisSection) {
    const progressObserver =
    new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if(
                entry.isIntersecting &&
                !analysisStarted
            ){

                analysisStarted = true;

                startAnalysis();

            }

        });

    },{
        threshold:0.5
    });

    progressObserver.observe(
        analysisSection
    );
}

function startAnalysis(){

    let p = 0;

    const fill =
        document.getElementById("fill");

    const percent =
        document.getElementById("percent");

    const timer = setInterval(() => {

        p +=
        Math.floor(
            Math.random()*8
        ) + 4;

        if(p > 99){
            p = 99;
        }

        fill.style.width =
            p + "%";

        percent.textContent =
            p + "%";

        if(p === 99){

            clearInterval(timer);

            percent.textContent =
                "Analyse du souvenir ultime...";

            setTimeout(() => {

                fill.style.width = "100%";

                percent.textContent =
                    "100%";

                confetti({
                    particleCount:120,
                    spread:140,
                    origin:{
                        y:.6
                    }
                });

                setTimeout(() => {

                    const prankIndex = Array.from(sections).findIndex(
                        s => s.id === "prankSection"
                    );

                    if (prankIndex !== -1) {
                        currentSection = prankIndex;
                        navigateToSection();
                    }

                },1000);

            },3000);

        }

    },180);

}
