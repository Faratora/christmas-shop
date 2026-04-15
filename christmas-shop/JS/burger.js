(function() {
    const burgerBtn = document.querySelector('.burger-menu');
    const closeBtn = document.querySelector('.menu-close');
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

       burgerBtn.addEventListener('click', function() {
        if (menuContainer.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Закрытие при клике на крестик внутри меню
    if (closeBtn) {
        closeBtn.addEventListener('click', closeMenu);
    }

    

    // Закрыть меню при клике на любую ссылку
    const menuLinks = menuContainer.querySelectorAll('a, span');
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && !href.startsWith('#')) {
                return;
            }
            closeMenu();
        });
    });

    // Закрыть меню при resize на десктоп
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && menuContainer.classList.contains('active')) {
            closeMenu();
        }
    });
})();
