/* =================================
   清掃班活動記録サイト
   calendar.js
================================= */


/*
    カレンダー機能

    ・月表示
    ・日付生成
    ・今日表示
    ・活動記録日の表示
    ・活動ページへの日付受け渡し
*/



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
// 保存されている活動日を取得
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


            const date =
            key.replace(
                "cleaning-",
                ""
            );



            if(
                date !== "today"
            ){

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
    `${year}年${month + 1}月`;





    const firstDay =
    new Date(
        year,
        month,
        1
    ).getDay();





    const lastDate =
    new Date(
        year,
        month + 1,
        0
    ).getDate();





    const activityDates =
    getActivityDates();






    // 月初の空白

    for(
        let i = 0;
        i < firstDay;
        i++
    ){


        const empty =
        document.createElement(
            "div"
        );


        empty.className =
        "calendar-day empty-day";


        calendarDays.appendChild(
            empty
        );


    }







    // 日付作成

    for(
        let day = 1;
        day <= lastDate;
        day++
    ){


        const dateButton =
        document.createElement(
            "div"
        );


        dateButton.className =
        "calendar-day";



        dateButton.textContent =
        day;





        const fullDate =
        `${year}-${String(month + 1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;






        // 今日

        const today =
        new Date();



        const todayString =
        `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,"0")}-${String(today.getDate()).padStart(2,"0")}`;





        if(
            fullDate === todayString
        ){

            dateButton.classList.add(
                "today"
            );

        }







        // 記録ありの日

        if(
            activityDates.includes(
                fullDate
            )
        ){

            dateButton.classList.add(
                "has-record"
            );

        }







        // タップ

        dateButton.addEventListener(
        "click",
        ()=>{


            openDateSheet(
                year,
                month + 1,
                day
            );


        });





        calendarDays.appendChild(
            dateButton
        );


    }


}









// ================================
// 月送り
// ================================


document
.getElementById(
    "prev-month"
)
?.addEventListener(
"click",
()=>{


    currentDate.setMonth(
        currentDate.getMonth() - 1
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
        currentDate.getMonth() + 1
    );


    renderCalendar();


});









// ================================
// 日付シート
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


    const selected =
    document.getElementById(
        "selected-date"
    );


    const button =
    document.getElementById(
        "write-button"
    );




    selected.textContent =
    `${month}月${day}日`;




    button.href =
    `pages/activity.html?date=${year}-${String(month).padStart(2,"0")}-${String(day).padStart(2,"0")}`;





    sheet.style.display =
    "flex";


}






// シートを閉じる

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
