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




// 活動記録日の取得

function getActivityDates(){


    let dates = [];



    for(
        let i = 0;
        i < localStorage.length;
        i++
    ){


        let key =
        localStorage.key(i);



        if(
            key &&
            key.startsWith("cleaning-")
        ){


            dates.push(
                key.replace(
                    "cleaning-",
                    ""
                )
            );


        }


    }


    return dates;


}






function renderCalendar(){


    if(!calendarDays){
        return;
    }



    calendarDays.innerHTML = "";



    let year =
    currentDate.getFullYear();


    let month =
    currentDate.getMonth();




    calendarTitle.textContent =
    `${year}年${month+1}月`;



    let firstDay =
    new Date(
        year,
        month,
        1
    ).getDay();



    let lastDate =
    new Date(
        year,
        month+1,
        0
    ).getDate();




    let activityDates =
    getActivityDates();






    for(
        let i=0;
        i<firstDay;
        i++
    ){

        let empty =
        document.createElement("div");

        empty.className =
        "calendar-day empty-day";

        calendarDays.appendChild(empty);

    }






    for(
        let day=1;
        day<=lastDate;
        day++
    ){


        let cell =
        document.createElement("div");


        cell.className =
        "calendar-day";



        cell.textContent =
        day;



        let date =
        `${year}-${String(month+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;





        // 今日

        let today =
        new Date();



        let todayText =
        `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,"0")}-${String(today.getDate()).padStart(2,"0")}`;





        if(
            date === todayText
        ){

            cell.classList.add(
                "today"
            );

        }






        // 記録がある日のみ

        if(
            activityDates.includes(date)
        ){

            cell.classList.add(
                "has-record"
            );

        }





        cell.onclick =
        ()=>{


            openDateSheet(
                year,
                month+1,
                day
            );


        };




        calendarDays.appendChild(cell);


    }


}





// 月移動

document
.getElementById("prev-month")
?.addEventListener(
"click",
()=>{


    currentDate.setMonth(
        currentDate.getMonth()-1
    );


    renderCalendar();


});




document
.getElementById("next-month")
?.addEventListener(
"click",
()=>{


    currentDate.setMonth(
        currentDate.getMonth()+1
    );


    renderCalendar();


});






renderCalendar();
