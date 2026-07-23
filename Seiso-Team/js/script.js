/* =================================
   清掃班活動記録サイト
   script.js
================================= */


/*
    サイト共通JavaScript

    役割
    ・起動画面制御
    ・PWA登録
    ・共通処理
*/





// ================================
// 起動画面
// ================================


window.addEventListener("load", () => {


    const splash = document.getElementById("splash");


    if (splash) {


        setTimeout(() => {


            splash.style.display = "none";


        }, 2000);


    }


});








// ================================
// Service Worker登録
// ================================


if ("serviceWorker" in navigator) {


    window.addEventListener("load", () => {


        navigator.serviceWorker
        .register("/service-worker.js")


        .then(() => {


            console.log(
                "Service Worker registered."
            );


        })


        .catch((error) => {


            console.log(
                "Service Worker registration failed:",
                error
            );


        });


    });


}








// ================================
// ページ表示アニメーション補助
// ================================


document.addEventListener(
"DOMContentLoaded",
()=>{


    const cards =
    document.querySelectorAll(
        ".card"
    );


    cards.forEach(
        (card,index)=>{


            card.style.animationDelay =
            `${index * 0.08}s`;


        }
    );


});
