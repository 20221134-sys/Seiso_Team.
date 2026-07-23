/* =================================
   清掃班活動記録サイト
   activity.js
================================= */


// URLの日付取得

const params =
new URLSearchParams(
    window.location.search
);


const selectedDate =
params.get("date");



let pageDate =
selectedDate;



const dateTitle =
document.getElementById(
    "activity-date"
);





// 日付表示

if(dateTitle){


    let date =
    selectedDate
    ?
    new Date(selectedDate)
    :
    new Date();



    if(!pageDate){


        pageDate =
        `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`;

    }



    dateTitle.textContent =
    `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日`;

}





// 保存キー

const saveKey =
`cleaning-${pageDate}`;





// 入力欄取得

const inputs =
document.querySelectorAll(
    "[data-save]"
);








// 保存データ読み込み

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








// 保存処理

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









// 最新活動へ保存

function saveLatestActivity(data){



    // ①本日の活動の内容

    const place =
    data["activity"];





    if(!place){
        return;
    }






    const latest = {


        date:
        pageDate,


        text:
        `${place}を掃除しました！`


    };





    localStorage.setItem(

        `latest-${pageDate}`,

        JSON.stringify(latest)

    );


}







// 入力すると自動保存

inputs.forEach(
input=>{


    input.addEventListener(
        "input",
        ()=>{


            saveData();


        }
    );


});








// 写真保存

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



        if(img){

            img.src =
            reader.result;

        }



        localStorage.setItem(

            `${saveKey}-${targetId}`,

            reader.result

        );


    };



    reader.readAsDataURL(file);


}







// 写真読み込み

function loadImages(){


    [
        "before-image",
        "after-image"

    ]
    .forEach(
    id=>{


        const img =
        document.getElementById(
            id
        );


        const saved =
        localStorage.getItem(
            `${saveKey}-${id}`
        );



        if(
            img &&
            saved
        ){

            img.src =
            saved;

        }


    });


}







// 初期処理

loadData();

loadImages();
