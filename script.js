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

            document
                .querySelector(".story")
                .scrollIntoView({
                    behavior:"smooth"
                });

            cd.textContent = "";

        }

    },1000);

});


// ANALYSE

let analysisStarted = false;

const analysisSection =
    document.querySelector(".analysis");

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

                    document
                    .getElementById(
                        "prankSection"
                    )
                    .scrollIntoView({
                        behavior:"smooth"
                    });

                },1000);

            },3000);

        }

    },180);

}
