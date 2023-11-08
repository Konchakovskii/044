window.addEventListener('DOMContentLoaded', () => {
    //tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }


    function showTabContent(i) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }


    hideTabContent();
    showTabContent(0);


    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }

            });
        }
    });

    //timer

    const deadline = '2023-11-11'; //задаем дедлайн

    //получение оставшегося времени
    function getTimeRemaining(endtime) {  
        const t = Date.parse(endtime) - Date.parse(new Date()), //общее время
                days = Math.floor(t / (1000 * 60 * 60 * 24)),   //дни - общее на количество мс в сутках
                hours = Math.floor(t / (1000 * 60 * 60) % 24),  //часы - остаток после деления на дни
                minutes = Math.floor(t / (1000 * 60) % 60),     //минуты - остаток после деления на часы
                seconds = Math.floor((t / 1000) % 60);          //секунды - остаток после деления на минуты
        return {                    //возвращаем данные в виде объекта
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }


    //устанавливаем время
    function setClock(selector, endtime) {
        const timer = document.querySelector(selector), //выбираем таймер
            days = timer.querySelector('#days'),        //выбираем элемент с днями
            hours = timer.querySelector('#hours'),      //выбираем элемент с часами
            minutes = timer.querySelector('#minutes'),  //выбираем элемент с минутами
            seconds = timer.querySelector('#seconds'),  //выбираем элемент с секундами
            timeInterval = setInterval(updateClock, 1000);  //устанавливаем интервал - функция(обновление часов) и интервал(1000 мс)

        function updateClock() {    //обновление часов
            const t = getTimeRemaining(endtime);    //получаем оставшееся время (см. выше)
            days.innerHTML = t.days;                //вставляяем дни
            hours.innerHTML = t.hours;              //вставляяем часы
            minutes.innerHTML = t.minutes;          //вставляяем минуты
            seconds.innerHTML = t.seconds;          //вставляяем секунды

            if (t.total <= 0) {                     //проверяем осталось ли время
                clearInterval(timeInterval);        //если нет - отменяем функцию
            }
        }
    }
    setClock('.timer', deadline);                   //вызов функции

    // Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
            modal = document.querySelector('.modal'),
            modalCloseBtn = document.querySelector('[data-close]');
    
    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }

    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    //По таймеры и достижению конца страницы



    const modalTimerId = setTimeout(openModal, 5000);

    // const openModal = function() {
    //         modal.classList.add('show');
    //         modal.classList.removemove('hide');
    //         document.body.style.overflow = 'hidden';
    // };

    function showModalByScroll() {
        // if (document.documentElement.scrollTop > 5005) {
        //     openModal();
        // };
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
});