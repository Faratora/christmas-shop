fetch("./gifts.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }
    return response.json();
  })
  .then((cards) => {
    const body = document.body;
    // Перемешиваем массив
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    const categories = {
      "For Work": "gift-for-work.png",
      "For Health": "gift-for-health.png",
      "For Harmony": "gift-for-harmony.png",
    };

    const colors = {
      "For Work": "#4361FF",
      "For Health": "#06A44F",
      "For Harmony": "#FF43F7",
    };

    fillGiftList("All");

    function fillGiftList(filter = "All") {
      // Заполнение списка подарков
      let gifts_cards = "";
      let i = -1;
      for (let card of cards) {
        i += 1;
        gifts_cards += `
          <div class="best-gift-card" id="${i}">
            <img src="./img/${categories[card.category]}" alt="Gift ${card.category}">
            <div class="gift-text">
              <p class="font-action-small ${card.category.toLowerCase().replace(' ', '-')}" style="color: ${colors[card.category]};">${card.category}</p>
              <h3 class="card-text">${card.name}</h3>
            </div>
          </div>`;
        if (i == 3) break;
      }
      const cardsElement = document.getElementById("best-gifts-container");
      cardsElement.innerHTML = gifts_cards;
    }

    // Модальное окно
    const modalWindow = document.getElementById("modal");
    const closeBtn = document.getElementById("close-btn");
    const overlay = document.getElementById("overlay");
    let flag = true;

    // Закрытие модального окна (общая функция)
    function closeModal() {
      if (!flag) {
        flag = true;
        modalWindow.classList.remove("show");
        overlay.classList.remove("show");
        body.classList.remove("no-scroll");
      }
    }

    // Открытие модального окна (вызывается из обработчика клика)
    function openModal(card) {
      const curImg = document.getElementsByClassName("gifts-img-home");
      if (curImg.length) {
        curImg[curImg.length - 1].style.backgroundImage = `url("./img/${categories[card.category]}")`;
      }

      const categoryEl = document.getElementById("category");
      const nameEl = document.getElementById("name");
      const descriptionEl = document.getElementById("description");
      categoryEl.textContent = card.category;
      categoryEl.style.color = colors[card.category];
      nameEl.textContent = card.name;
      descriptionEl.textContent = card.description;

      const power1 = document.getElementById("power1");
      const power2 = document.getElementById("power2");
      const power3 = document.getElementById("power3");
      const power4 = document.getElementById("power4");
      power1.textContent = card.superpowers.live;
      power2.textContent = card.superpowers.create;
      power3.textContent = card.superpowers.love;
      power4.textContent = card.superpowers.dream;

      const snowflakes1 = document.getElementById("snowflakes1");
      const snowflakes2 = document.getElementById("snowflakes2");
      const snowflakes3 = document.getElementById("snowflakes3");
      const snowflakes4 = document.getElementById("snowflakes4");

      function fillSnowflakes(container, value) {
        let countFl = +value / 100;
        container.innerHTML = "";
        for (let i = 1; i <= 5; i++) {
          if (i <= countFl) {
            container.innerHTML += '<img src="./img/snow-icon.svg">';
          } else {
            container.innerHTML += '<img src="./img/snowflake-empty.svg">';
          }
        }
      }

      fillSnowflakes(snowflakes1, card.superpowers.live);
      fillSnowflakes(snowflakes2, card.superpowers.create);
      fillSnowflakes(snowflakes3, card.superpowers.love);
      fillSnowflakes(snowflakes4, card.superpowers.dream);

      overlay.classList.add("show");
      modalWindow.classList.add("show");
      body.classList.add("no-scroll");
    }

    // Делегирование кликов на контейнере с карточками
    document.getElementById("best-gifts-container").addEventListener("click", function (event) {
      const container = event.target.closest(".best-gift-card");
      if (container && flag) {
        flag = false;
        const id = container.id;
        const card = cards[id];
        openModal(card);
        event.stopPropagation();
      }
    });

    // Закрытие по кнопке
    closeBtn.addEventListener("click", function (event) {
      closeModal();
      event.stopPropagation();
    });

    // Закрытие по оверлею
    overlay.addEventListener("click", closeModal);

    // Закрытие по клику вне модального окна
    document.addEventListener("click", function (event) {
      if (!modalWindow.contains(event.target) && event.target !== closeBtn && !flag) {
        closeModal();
      }
    });
  })
  .catch((error) => console.error("Ошибка загрузки данных:", error));