(function () {
    const burgerBtn = document.querySelector('.burger-menu');
    const menuContainer = document.querySelector('.menu-container');

    if (!burgerBtn || !menuContainer) return;

    function openMenu() {
        burgerBtn.classList.add('active');
        menuContainer.classList.add('active');
        document.body.classList.add('menu-open');
        burgerBtn.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
        burgerBtn.classList.remove('active');
        menuContainer.classList.remove('active');
        document.body.classList.remove('menu-open');
        burgerBtn.setAttribute('aria-expanded', 'false');
    }

    burgerBtn.addEventListener('click', function () {
        if (menuContainer.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Закрыть меню при клике на любую ссылку или неактивный элемент (делегирование)
    menuContainer.addEventListener('click', function (e) {
        const target = e.target;
        if (
            target.tagName === 'A' ||
            target.classList.contains('header-menu-active') ||
            target.closest('.header-menu li')
        ) {
            closeMenu();
        }
    });

    // Закрыть меню при resize на десктоп
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768 && menuContainer.classList.contains('active')) {
            closeMenu();
        }
    });
})();
