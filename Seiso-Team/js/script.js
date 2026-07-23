/* =================================
   清掃班活動記録サイト
   script.js
================================= */



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


            splash.style.opacity =
            "0";



            setTimeout(
            ()=>{


                splash.style.display =
                "none";


            },
            800
            );


        },
        800
        );


    }


});







// ================================
// Service Worker
// ================================


if(
"serviceWorker" in navigator
){


window.addEventListener(
"load",
()=>{


navigator.serviceWorker
.register(
"./service-worker.js"
);


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
        let i=0;
        i<localStorage.length;
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


            activities.push(data);


        }


    }






    // 新しい順

    activities.sort(
    (a,b)=>{


        return new Date(b.date)
        -
        new Date(a.date);


    });






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








    activities
    .slice(0,3)
    .forEach(
    activity=>{


        const date =
        new Date(
            activity.date
        );



        const item =
        document.createElement(
            "div"
        );


        item.className =
        "latest-item";



        item.innerHTML = `

        <p>
        ${date.getMonth()+1}月${date.getDate()}日
        </p>


        <span>
        ${activity.text}
        </span>

        `;



        box.appendChild(item);


    });



}






// ================================
// 表示開始
// ================================


document.addEventListener(
"DOMContentLoaded",
()=>{


    loadLatestActivities();


});
