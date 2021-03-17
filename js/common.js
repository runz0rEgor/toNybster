// barbers hover

// const mastersElem = document.querySelector('.masters');

// const masters = Array.from(mastersElem.querySelectorAll('.master'));

// masters.forEach(elem => {
// 	const face = elem.querySelector('.face');

// 	face.addEventListener('mouseenter', e => {
// 		const popup = createBarberPopup(face);
// 		face.appendChild(popup);
// 	});

// 	face.addEventListener('mouseleave', e => {
// 		removeBarberPopup(face);
// 	});
// });

// function createBarberPopup(elem) {
// 	const container = document.createElement('div');
// 	container.className = 'barber-popup';

// 	const info = document.createElement('div');
// 	info.className = 'barber-popup-info';

// 	const img = document.createElement('img');
// 	img.src = 'img/' + elem.dataset.src;
// 	img.className = 'barber-popup-photo';
// 	info.appendChild(img);

// 	const name = document.createElement('span');
// 	name.innerHTML = elem.dataset.name;
// 	name.className = 'barber-popup-data';
// 	info.appendChild(name);

// 	const surname = document.createElement('span');
// 	surname.innerHTML = elem.dataset.surname;
// 	surname.className = 'barber-popup-data';
// 	info.appendChild(surname);

// 	container.appendChild(info);

// 	return container;
// }

// function removeBarberPopup(elem) {
// 	const popup = elem.querySelector('.barber-popup');

// 	if (!popup) {
// 		return;
// 	}

// 	elem.removeChild(popup);
// }

// barbers hover endzz

function closeModal() {
  modal.removeEventListener("click", onSityClick);
  document.body.removeChild(modalContainer);
}

function onSityClick(e) {
  if (
    e.target &&
    e.targer.id === "aksay" &&
    window.location.pathname === "aksay.html"
  ) {
    e.preventDefault();
    e.stopPropagation();
    closeModal();
  }

  if (e.target && e.targer.id === "rostov" && window.location.pathname === "") {
    e.preventDefault();
    e.stopPropagation();
    closeModal();
  }
}

function openModal() {
  if (
    autoModal &&
    (window.location.href.includes("?rostov") ||
      window.location.href.includes("?aksay"))
  ) {
    return;
  } else {
    const modalContainer = document.createElement("div");
    modalContainer.classList.add("modal-backdrop");
    const modal = document.createElement("div");
    modal.classList.add("modal-body");

    modal.insertAdjacentHTML(
      "afterbegin",
      `
			<div class="modal-list-container">
				<p>Выберите ваш город:</p>
				<ul class="modal-list">
					<li><a id="rostov" href="/?rostov"/>Ростов-на-Дону</li>
					<li><a id="aksay" href="/aksay.html?aksay"/>Аксай</li>
				</ul>
			</div>
		`
    );

    modal.addEventListener("click", onSityClick);

    modalContainer.appendChild(modal);

    document.body.appendChild(modalContainer);
  }
}

let autoModal = true;

openModal();

// prices slider

const pricesElem = document.querySelector(".prices");

const priceTabHeaders = Array.from(
  pricesElem.querySelectorAll(".price-tab-header")
);
const priceTabs = Array.from(pricesElem.querySelectorAll(".js-price-tab"));

const beardsHeader = pricesElem.querySelector(".js-price-beards");
const hairsHeader = pricesElem.querySelector(".js-price-hairs");
const upsailsHeader = pricesElem.querySelector(".js-price-upsails");

beardsHeader.addEventListener("click", () => switchTab("beards"));
hairsHeader.addEventListener("click", () => switchTab("hairs"));
if (upsailsHeader) {
  upsailsHeader.addEventListener("click", () => switchTab("upsails"));
}

const carousel = pricesElem.querySelector(".js-price-carousel");
let swapInProgress = false;

function switchTab(position) {
  if (swapInProgress) {
    return;
  }

  removePricePopups();

  swapInProgress = true;
  switch (position) {
    case "beards":
      removeOpenClass();
      beardsHeader.classList.add("open");
      moveCarousel(0, 50);
      break;

    case "hairs":
      removeOpenClass();
      hairsHeader.classList.add("open");
      moveCarousel(-1140, 50);
      break;

    case "upsails":
      removeOpenClass();
      upsailsHeader.classList.add("open");
      moveCarousel(-2280, 50);
      break;
  }
}

function moveCarousel(position, step) {
  const startPos = parseInt(carousel.style.left);

  if (startPos === position) {
    swapInProgress = false;
    return;
  }

  step = startPos > position ? step * -1 : step;

  function move() {
    const currentPos = parseInt(carousel.style.left);

    if (step > 0) {
      if (currentPos >= position) {
        moveCarousel(position, 2);
        return;
      }
    } else {
      if (currentPos <= position) {
        moveCarousel(position, 2);
        return;
      }
    }

    carousel.style.left = currentPos + step + "px";
    window.requestAnimationFrame(move);
  }

  move();
}

function removeOpenClass() {
  priceTabHeaders.forEach((elem) => {
    elem.classList.remove("open");
  });
}

// prices slider end

// prices info

priceTabs.forEach((tab) => {
  const infoButtons = Array.from(tab.querySelectorAll(".js-price-info"));

  infoButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      removePricePopups();

      const priceItem = button.parentElement;
      const rect = priceItem.getBoundingClientRect();

      const newElem = document.createElement("div");

      const infoButton = document.createElement("span");
      infoButton.classList.add("price-item-info");
      infoButton.innerHTML = "i";
      infoButton.addEventListener("click", (e) => {
        document.body.removeChild(newElem);
      });
      newElem.appendChild(infoButton);

      const itemName = document.createElement("div");
      itemName.classList.add("price-item-name");
      itemName.innerHTML = priceItem.querySelector(
        ".price-item-name"
      ).innerHTML;
      newElem.appendChild(itemName);

      const hr = document.createElement("hr");
      hr.classList.add("price-item-separator");
      newElem.appendChild(hr);

      const header = priceItem.dataset.header;
      if (priceItem.dataset.header) {
        const infoTitle = document.createElement("div");
        infoTitle.classList.add("price-info-open-title");
      }

      const info = document.createElement("div");
      info.innerHTML = priceItem.dataset.additionalInfo;
      info.classList.add("additional-info");
      newElem.appendChild(info);

      const amount = document.createElement("div");
      amount.classList.add("amount");
      amount.innerHTML = e.target.parentElement.querySelector(
        ".amount"
      ).innerHTML;
      newElem.appendChild(amount);

      newElem.classList.add("open-price-info");
      newElem.style.top = rect.top + document.documentElement.scrollTop + "px";
      newElem.style.left = rect.left + "px";
      document.body.appendChild(newElem);
      // <div class="price-item-name">Классическая стрижка</div>
      // <hr class="price-item-separator">
      // <div class="amount">300 руб</div>
      // <span class="price-item-info js-price-info">i</span>
    });
  });
});

function removePricePopups() {
  const popups = Array.from(document.querySelectorAll(".open-price-info"));

  popups.forEach((popup) => {
    document.body.removeChild(popup);
  });
}

// $(document).ready(function() {

//   $("#owl-demo").owlCarousel({

//   		items: 3,
//   		margin: 50,
//  			autoplay: true,
//       slideSpeed : 300,
//       paginationSpeed : 600,
//       singleItem: true,
//       autoWidth: true,
//       dots: false,
//       autoplayHoverPause: true,

//       // "singleItem:true" is a shortcut for:
//       // items : 1,
//       // itemsDesktop : false,
//       // itemsDesktopSmall : false,
//       // itemsTablet: false,
//       // itemsMobile : false

//   });

// });
