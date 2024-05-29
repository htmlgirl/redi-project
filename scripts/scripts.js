const appDataExample = {
	films: [
		{
			title: 'Titanic',
			year: 1997,
			cast: [
				"Leonardo DiCaprio",
				"Kate Winslet"
			],
			poster: 'https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcQXUpVhfnjzY01pU1p4ta9hEhQ3gGsCooCyJ3M890P9UwzPG_yJW2EzvdnYta43RX8u',
			link: '#',
			id: 1
		},
		{
			title: 'The Untamed',
			year: 2019,
			cast: [
				"Xiao Zhan",
				"Wang Yibo"
			],
			poster: 'https://upload.wikimedia.org/wikipedia/en/3/31/Theuntamed.jpg',
			link: '#',
			id: 2
		},
		{
			title: 'Fantastic Beasts: The Crimes of Grindelwald',
			year: 2018,
			cast: [
				"Eddie Redmayne",
				"Katherine Waterston",
				"Dan Fogler",
				"Alison Sudol",
				"Ezra Miller",
				"Zoë Kravitz",
				"Callum Turner",
				"Claudia Kim",
				"Jude Law",
				"Johnny Depp"
			],
			poster: 'https://upload.wikimedia.org/wikipedia/en/3/3c/Fantastic_Beasts_-_The_Crimes_of_Grindelwald_Poster.png',
			link: '#',
			id: 3
		},
		{
			title: 'Teen Wolf',
			year: 2011,
			cast: [
				"Dylan O’Brien",
				"Tyler Posey",
				"Tyler Hoechlin",
				"THolland Roden",
				"Shelley Hennig"
			],
			poster: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/6967c7f3-1f18-439f-b20e-1fa0334656c8/1920x',
			link: '#',
			id: 4
		},
		{
			title: 'The Hobbit: The Battle of the Five Armies',
			year: 2014,
			cast: [
				"Ian McKellen",
				"Martin Freeman",
				"Richard Armitage",
				"Evangeline Lilly",
				"Lee Pace",
				"Luke Evans",
				"Benedict Cumberbatch",
				"Ken Stott",
				"James Nesbitt",
				"Cate Blanchett",
				"Ian Holm",
				"Christopher Lee",
				"Hugo Weaving",
				"Orlando Bloom"
			],
			poster: 'https://upload.wikimedia.org/wikipedia/en/e/e7/The_Hobbit_-_The_Battle_of_the_Five_Armies.png',
			link: '#',
			id: 5
		}
	]
};

const appDataDefolt = {
	films: []
};

class NewFilm {
	appData;
	filmDelId;
	delPopupElement;

	constructor() {
		this.appData = this.getAppData();
		console.log(this.appData);
		this.addFormListener();
		this.renderFilmList();
		this.delPopupElement = this.getDelPopupElement();
		this.sortSelectBlock = this.getSortSelectBlock();
		this.addSortSelectBlockClickHandlers();
		this.addDelPopupClickHandlers();
		this.addDelButtonClickEventListener();
	}


	addFormListener() {
		const formElement = document.getElementById('film_form');
		formElement.addEventListener('submit', (e) => {
			e.preventDefault();
			const formData = this.getFormData(formElement);
			formData.id = this.getNewRecordId();
			this.appData.films.unshift(formData);
			this.safeAppData();
			this.renderFilmList();
		});
	}

	getFormData(formElement) {
		const title = formElement.querySelector("[name=title]");
		const year = formElement.querySelector("[name=year]");
		const cast = formElement.querySelector("[name=cast]");
		const poster = formElement.querySelector("[name=poster]");

		const data = {
			title: title.value,
			year: year.value,
			cast: cast.value.split(',').map((person) => person.trim()),
			poster: poster.value
		};
		return data;
	}

	getNewRecordId() {
		const idArray = this.appData.films.map((film) => {
			return film.id;
		});
		const maxId = Math.max(...idArray);
		return maxId + 1;
	}

	renderFilmList() {
		let htmlString = '';
		htmlString = htmlString + '<ul class="films_container">';

		for (let film of this.appData.films) {
			let castHtml = '';

			for (let [index, castName] of film.cast.entries()) {
				if (index > 0) {
					castHtml = castHtml + ', ';
				}

				castHtml = castHtml + castName;
			}

			htmlString = htmlString + `
				<li class="film" id="${film.id}">
					<div class="film_img">
						<img src="${film.poster}" alt="poster-img">
					</div>
					<div class="film_info">
						<div>${film.title}</div>
						<div>Release dates: ${film.year}</div>
						<div>Starring: ${castHtml}</div>
					</div>
					<div class="film_del">✕</div>
				</li>`;
		}

		htmlString = htmlString + '</ul>';

		let wrapMovies = document.getElementById('movies');
		wrapMovies.innerHTML = htmlString;

		console.log(wrapMovies);
	}

	getDelPopupElement() {
		return document.querySelector('.modal');
	}
	showDelPopup() {
		this.delPopupElement.style.display = 'flex';
	}

	hideDelPopup() {
		this.delPopupElement.style.display = '';
	}
	getSortSelectBlock() {
		return document.querySelector('.movie_sort_options');
	}
	showSortSelectBlock() {
		this.sortSelectBlock.style.display = 'block';
	}

	hideSortSelectBlock() {
		this.sortSelectBlock.style.display = '';
	}
	addSortSelectBlockClickHandlers() {
		const sortSelectBlockContainer = document.querySelector(".movie_sort_select");
		const sortSelectBlockArrow = document.querySelector(".movie_sort__select_arrow svg");
		sortSelectBlockContainer.addEventListener("click", (event) => {
			const clickedSortChoiceButton = event.target;
			if(this.sortSelectBlock.style.display === 'block') {
				console.log(event.target, 111);
				console.log(clickedSortChoiceButton.closest(".movie_sort_option"),1);
				sortSelectBlockArrow.style.transform = '';
				this.hideSortSelectBlock();
			} else {
				console.log(event.target, 222);
				console.log(clickedSortChoiceButton.closest(".movie_sort_option"),2);
				sortSelectBlockArrow.style.transform = 'rotate(-90deg)';
				this.showSortSelectBlock();
			}
		});
	}

	addDelPopupClickHandlers() {
		const delPopupCrossBtn = document.querySelector('.del_popup_cross_btn');
		const delPopupAbortBtn = document.querySelector('.del_popup_abort_btn');
		const delPopupConfirmBtn = document.querySelector('.del_popup_confirm_btn');
		delPopupCrossBtn.addEventListener("click", () => {
			this.hideDelPopup();
			this.filmDelId = null;
		});
		delPopupAbortBtn.addEventListener("click", () => {
			this.hideDelPopup();
			this.filmDelId = null;
		});
		delPopupConfirmBtn.addEventListener("click", () => {
			this.delFilmRecord();
			this.hideDelPopup();
			this.filmDelId = null;
		});
		this.delPopupElement.addEventListener("click", (event) => {
			if (event.target.closest(".del_popup") === null) {
				this.hideDelPopup();
				this.filmDelId = null;
			}
		});
	}

	addDelButtonClickEventListener() {
		let filmsContainer = document.querySelector('.films_container');
		filmsContainer.addEventListener("click", (event ) => {
			const clickedDelButton = event.target;
			const filmLi = clickedDelButton.closest(".film");
			this.filmDelId = +filmLi.id;
			this.showDelPopup();
		});
	}
	delFilmRecord() {
		this.appData.films = this.appData.films.filter((filmItem) => {
			return filmItem.id !== this.filmDelId;
		});
		this.safeAppData();
		this.renderFilmList();
		this.addDelButtonClickEventListener();
	}

	getAppData() {
		const localAppData = JSON.parse(localStorage.getItem('keyData'));

		if (localAppData === null) {
			// return appDataDefolt;
			return appDataExample;
		} else {
			return localAppData;
		}
	}

	safeAppData() {
		localStorage.setItem('keyData', JSON.stringify(this.appData));
	}

}

window.onload = function() {
	new NewFilm();
};




