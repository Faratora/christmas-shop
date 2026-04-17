fetch("./gifts.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }
    return response.json();
  })
  .then((cards) => {
    const body = document.body;

    // Перемешиваем массив (Fisher-Yates)
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

    const tabs = document.getElementsByClassName("gift-filter-item");
    for (let tab of tabs) {
      tab.style.background = "";
    }
    tabs[0].style.background = "rgba(255, 255, 255, 0.2)";

    fillGiftList("All");

    function fillGiftList(filter = "All") {
      let gifts_cards = "";
      let i = -1;
      for (let card of cards) {
        i += 1;
        if (filter == "All" || filter == card.category) {
          gifts_cards += `
            <div class="gift-card" id="${i}">
              <img src="./img/${categories[card.category]}" alt="Gift ${card.category}">
              <div class="gift-text">
                <p class="font-action-small ${card.category.toLowerCase().replace(' ', '-')}" style="color: ${colors[card.category]};">${card.category}</p>
                <h3 class="card-text">${card.name}</h3>
              </div>
            </div>`;
        }
      }
      const cardsElement = document.getElementById("gifts-cards");
      cardsElement.innerHTML = gifts_cards;
    }

    // Модальное окно
    const modalWindow = document.getElementById("modal");
    const closeBtn = document.getElementById("close-btn");
    const overlay = document.getElementById("overlay");
    let flag = true;
    
    function openModal(card) {
      const curImg = document.querySelector(".gifts-img-gift");
      if (curImg) {
        curImg.style.backgroundImage = `url("./img/${categories[card.category]}")`;
      }

      const category = document.getElementById("category");
      const name = document.getElementById("name");
      const description = document.getElementById("description");
      category.textContent = card.category;
      category.style.color = colors[card.category];
      name.textContent = card.name;
      description.textContent = card.description;

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
        let numValue = parseInt(value.replace('+', ''));
        let countFl = numValue / 100;
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

    document.getElementById("gifts-cards").addEventListener("click", function (event) {
      const container = event.target.closest(".gift-card");
      if (container && flag) {
        flag = false;
        const card = cards[container.id];
        openModal(card);
        event.stopPropagation();
      }
    });

    closeBtn.addEventListener("click", function () {
      flag = true;
      modalWindow.classList.remove("show");
      overlay.classList.remove("show");
      body.classList.remove("no-scroll");
    });

    document.addEventListener("click", function (event) {
      if (!modalWindow.contains(event.target) && event.target !== closeBtn && !flag) {
        flag = true;
        modalWindow.classList.remove("show");
        overlay.classList.remove("show");
        body.classList.remove("no-scroll");
      }
    });

    // Фильтр подарков
    for (let tab of tabs) {
      tab.addEventListener("click", function () {
        for (let t of tabs) {
          t.style.background = "";
        }
        this.style.background = "rgba(255, 255, 255, 0.2)";
        fillGiftList(this.dataset.type);
      });
    }
  })
  .catch((error) => {
    console.error("Error loading JSON:", error);
  });
