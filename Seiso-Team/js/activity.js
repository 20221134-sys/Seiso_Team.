/* =================================
   清掃班活動記録サイト
   activity.js
================================= */


/*
    活動記録ページ機能

    ・日付表示
    ・入力自動保存
    ・活動場所保存
    ・最新活動データ保存
    ・画像保存
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





let pageDate =
selectedDate;





if(activityDate){


    let date;


    if(selectedDate){


        date =
        new Date(selectedDate);


    }else{


        date =
        new Date();


        pageDate =
        `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`;


    }



    activityDate.textContent =
    `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日`;

}









// ================================
// 保存対象
// ================================


const inputs =
document.querySelectorAll(
    "[data-save]"
);





const saveKey =
`cleaning-${pageDate}`;








// ================================
// 保存データ読み込み
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
// 保存
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



    saveLatestActivity(
        data
    );


    showSaveMessage();


}









// ================================
// 最新活動保存
// ================================


function saveLatestActivity(data){


    const place =
    data["cleaning-place"];



    if(!place){
        return;
    }




    const activityData = {


        date:
        pageDate,


        place:
        place,


        text:
        `${place}を掃除しました！`


    };





    localStorage.setItem(

        `latest-${pageDate}`,

        JSON.stringify(activityData)

    );


}








// 入力時自動保存

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
// 画像処理
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
        document.getElementById(
            id
        );



        if(
            saved &&
            img
        ){

            img.src =
            saved;

        }


    });


}







// ================================
// 初期処理
// ================================


loadData();

loadImages();
