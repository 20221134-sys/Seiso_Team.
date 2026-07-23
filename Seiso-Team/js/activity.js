/* =================================
   清掃班活動記録サイト
   activity.js
================================= */


/*
    活動記録ページ機能

    ・日付表示
    ・入力自動保存
    ・画像保存
    ・LocalStorage管理
*/





// ================================
// 日付取得
// ================================


const params =
new URLSearchParams(
    window.location.search
);


const selectedDate =
params.get("date");





const activityDate =
document.getElementById(
    "activity-date"
);





if(activityDate){


    if(selectedDate){


        const date =
        new Date(selectedDate);


        activityDate.textContent =
        `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日`;


    }else{


        const today =
        new Date();


        activityDate.textContent =
        `${today.getFullYear()}年${today.getMonth()+1}月${today.getDate()}日`;


    }

}









// ================================
// 保存対象
// ================================


const inputs =
document.querySelectorAll(
    "[data-save]"
);





// 保存するページID

const saveKey =
`cleaning-${selectedDate || "today"}`;







// ================================
// 保存読み込み
// ================================


function loadData(){


    const saved =
    localStorage.getItem(
        saveKey
    );



    if(!saved){
        return;
    }



    const data =
    JSON.parse(saved);



    inputs.forEach(
        input=>{


            if(
                data[input.id]
            ){


                input.value =
                data[input.id];


            }


        }
    );


}








// ================================
// 自動保存
// ================================


function saveData(){


    const data = {};



    inputs.forEach(
        input=>{


            data[input.id] =
            input.value;


        }
    );



    localStorage.setItem(

        saveKey,

        JSON.stringify(data)

    );



    showSaveMessage();


}







// 入力ごとに保存

inputs.forEach(
input=>{


    input.addEventListener(
    "input",
    ()=>{


        saveData();


    });


});









// ================================
// 保存表示
// ================================


function showSaveMessage(){


    const message =
    document.getElementById(
        "save-message"
    );



    if(!message){
        return;
    }



    message.textContent =
    "自動保存しました ✓";



    setTimeout(
    ()=>{


        message.textContent =
        "";


    },
    1500
    );


}








// ================================
// 画像読み込み
// ================================



function previewImage(
    input,
    targetId
){


    const file =
    input.files[0];



    if(!file){
        return;
    }



    const reader =
    new FileReader();



    reader.onload =
    ()=>{


        const img =
        document.getElementById(
            targetId
        );


        img.src =
        reader.result;



        localStorage.setItem(

            `${saveKey}-${targetId}`,

            reader.result

        );


    };



    reader.readAsDataURL(file);


}






// 画像復元

function loadImages(){


    [
        "before-image",
        "after-image"

    ]
    .forEach(
    id=>{


        const saved =
        localStorage.getItem(
            `${saveKey}-${id}`
        );



        const img =
        document.getElementById(id);



        if(
            saved &&
            img
        ){

            img.src =
            saved;

        }


    });


}








// 初期処理

loadData();

loadImages();
