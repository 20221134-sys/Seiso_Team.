/* =================================
   清掃班活動記録サイト
   service-worker.js
================================= */


const CACHE_NAME = 
"seiso-team-v1";



const FILES_TO_CACHE = [


    "./",

    "./index.html",

    "./manifest.json",


    "./css/style.css",

    "./css/calendar.css",

    "./css/activity.css",


    "./js/script.js",

    "./js/calendar.js",

    "./js/activity.js",


    "./pages/activity.html",


    "./images/logo.png"

];






// ================================
// インストール
// ================================


self.addEventListener(
"install",
(event)=>{


    event.waitUntil(

        caches.open(CACHE_NAME)

        .then(
            cache=>{

                return cache.addAll(
                    FILES_TO_CACHE
                );

            }
        )

    );


});








// ================================
// キャッシュ利用
// ================================


self.addEventListener(
"fetch",
(event)=>{


    event.respondWith(


        caches.match(
            event.request
        )

        .then(
            response=>{


                return response ||

                fetch(
                    event.request
                );


            }
        )


    );


});








// ================================
// 古いキャッシュ削除
// ================================


self.addEventListener(
"activate",
(event)=>{


    event.waitUntil(


        caches.keys()

        .then(
            keys=>{


                return Promise.all(


                    keys.map(
                        key=>{


                            if(
                                key !== CACHE_NAME
                            ){

                                return caches.delete(
                                    key
                                );

                            }


                        }
                    )


                );


            }

        )


    );


});
