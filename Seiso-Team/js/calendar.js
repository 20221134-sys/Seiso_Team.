/* =================================
   清掃班活動記録サイト
   calendar.js
================================= */


let currentDate = new Date();




const calendarTitle =
document.getElementById(
    "calendar-title"
);


const calendarDays =
document.getElementById(
    "calendar-days"
);





// ================================
// 記録済みの日付取得
// ================================


function getActivityDates(){


    let dates = [];



    for(
        let i = 0;
        i < localStorage.length;
        i++
    ){


        const key =
        localStorage.key(i);



        if(
            key &&
            key.startsWith("cleaning-")
        ){


            const data =
            JSON.parse(
                localStorage.getItem(key)
            );



            // ①本日の活動が入力されている日だけ表示
            if(
                data &&
                data.activity &&
                data.activity.trim()
            ){


                const date =
                key.replace(
                    "cleaning-",
                    ""
                );


                dates.push(date);


            }


        }


    }



    return dates;


}








// ================================
// カレンダー表示
// ================================


function renderCalendar(){


    if(!calendarDays){
        return;
    }



    calendarDays.innerHTML = "";



    const year =
    currentDate.getFullYear();



    const month =
    currentDate.getMonth();




    calendarTitle.textContent =
    `${year}年${month+1}月`;





    const firstDay =
    new Date(
        year,
        month,
        1
    ).getDay();




    const lastDate =
    new Date(
        year,
        month+1,
        0
    ).getDate();




    const activityDates =
    getActivityDates();






    // 月初の空白

    for(
        let i=0;
        i<firstDay;
        i++
    ){


        const empty =
        document.createElement("div");


        empty.className =
        "calendar-day empty-day";


        calendarDays.appendChild(empty);


    }






    // 日付生成

    for(
        let day=1;
        day<=lastDate;
        day++
    ){


        const cell =
        document.createElement("div");


        cell.className =
        "calendar-day";



        cell.textContent =
        day;





        const date =
        `${year}-${String(month+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;







        // 今日

        const today =
        new Date();



        const todayText =
        `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,"0")}-${String(today.getDate()).padStart(2,"0")}`;





        if(
            date === todayText
        ){

            cell.classList.add(
                "today"
            );

        }







        // 記録ありの日だけピンク

        if(
            activityDates.includes(date)
        ){

            cell.classList.add(
                "has-record"
            );

        }








        // 日付クリック

        cell.addEventListener(
        "click",
        ()=>{


            openDateSheet(
                year,
                month+1,
                day
            );


        });





        calendarDays.appendChild(cell);


    }


}








// ================================
// 月移動
// ================================


document
.getElementById(
    "prev-month"
)
?.addEventListener(
"click",
()=>{


    currentDate.setMonth(
        currentDate.getMonth()-1
    );


    renderCalendar();


});






document
.getElementById(
    "next-month"
)
?.addEventListener(
"click",
()=>{


    currentDate.setMonth(
        currentDate.getMonth()+1
    );


    renderCalendar();


});









// ================================
// 日付シート表示
// ================================


function openDateSheet(
    year,
    month,
    day
){


    const sheet =
    document.getElementById(
        "date-sheet"
    );


    const selectedDate =
    document.getElementById(
        "selected-date"
    );


    const writeButton =
    document.getElementById(
        "write-button"
    );



    if(
        !sheet ||
        !selectedDate ||
        !writeButton
    ){

        return;

    }






    selectedDate.textContent =
    `${month}月${day}日`;





    writeButton.href =
    `pages/activity.html?date=${year}-${String(month).padStart(2,"0")}-${String(day).padStart(2,"0")}`;





    sheet.style.display =
    "flex";


}








// ================================
// シートを閉じる
// ================================


document
.getElementById(
    "date-sheet"
)
?.addEventListener(
"click",
(e)=>{


    if(
        e.target.id ===
        "date-sheet"
    ){


        e.currentTarget.style.display =
        "none";


    }


});







// 初回表示

renderCalendar();
