/* =================================
   清掃班活動記録サイト
   script.js
================================= */


/*
    共通JavaScript

    ・起動画面制御
    ・PWA登録
    ・最新活動表示
*/





// ================================
// 起動画面
// ================================


window.addEventListener(
"load",
()=>{


    const splash =
    document.getElementById(
        "splash"
    );



    if(splash){


        setTimeout(
        ()=>{


            splash.style.display =
            "none";


        },
        2000
        );


    }


});








// ================================
// Service Worker登録
// ================================


if(
    "serviceWorker" in navigator
){


    window.addEventListener(
    "load",
    ()=>{


        navigator.serviceWorker
        .register(
            "/service-worker.js"
        )


        .then(
        ()=>{


            console.log(
                "Service Worker registered."
            );


        })



        .catch(
        error=>{


            console.log(
                "Service Worker registration failed:",
                error
            );


        });


    });


}









// ================================
// 最新の活動表示
// ================================


function loadLatestActivities(){



    const box =
    document.getElementById(
        "latest-activities"
    );



    if(!box){
        return;
    }



    box.innerHTML = "";



    let activities = [];





    for(
        let i = 0;
        i < localStorage.length;
        i++
    ){


        const key =
        localStorage.key(i);



        if(
            key &&
            key.startsWith(
                "latest-"
            )
        ){


            const data =
            JSON.parse(
                localStorage.getItem(key)
            );



            activities.push(
                data
            );


        }


    }






    // 新しい順

    activities.sort(
    (a,b)=>{


        return new Date(b.date)
        -
        new Date(a.date);


    });








    // 記録なし

    if(
        activities.length === 0
    ){


        box.innerHTML = `

        <p class="no-activity">
        まだ活動記録がありません
        </p>

        `;


        return;

    }








    // 最大3件表示

    activities
    .slice(0,3)
    .forEach(
    activity=>{


        const item =
        document.createElement(
            "div"
        );


        item.className =
        "latest-item";



        const date =
        new Date(
            activity.date
        );



        item.innerHTML = `

        <p>
        ${date.getMonth()+1}月${date.getDate()}日
        </p>


        <span>
        ${activity.text}
        </span>

        `;



        box.appendChild(
            item
        );



    });


}








// ================================
// カード表示アニメーション
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


    });


    loadLatestActivities();


});
