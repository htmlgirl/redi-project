import { richDate } from './rich-date.js';

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
			id: 1,
			creationDate: '2011-01-26T13:51:50'
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
			id: 2,
			creationDate: '2012-01-26T13:51:50'
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
			id: 3,
			creationDate: '2013-01-26T13:51:50'
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
			id: 4,
			creationDate: '2015-01-26T13:51:50'
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
			id: 5,
			creationDate: '2016-01-26T13:51:50'
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
	sortTypes = [
		{
			id: 'def',
			title: 'default'
		},
		{
			id: '09',
			title: 'years ascending'
		},
		{
			id: '90',
			title: 'years descending'
		},
		{
			id: 'az',
			title: 'name A-Z'
		},
		{
			id: 'za',
			title: 'name Z-A'
		}
	];
	currentSortTypeId = this.sortTypes[0].id;

	constructor() {
		this.appData = this.getAppData();
		this.updateFilmsOrder();
		console.log(this.appData);
		this.addFormListener();
		this.renderFilmList();
		this.sortOverlay = this.getOverlay();
		this.delPopupElement = this.getDelPopupElement();
		this.sortSelectBlock = this.getSortSelectBlock();
		this.sortSelectBlockBtn = this.getSortSelectBlockBtn();
		this.sortSelectBlockArrow = this.getSortSelectBlockArrow();
		this.sortBtnHeader = this.getSortBtnHeader();
		this.renderSortBtnHeader();
		this.addSortSelectBlockClickHandlers();
		this.addOverlayClickHandlers();
		this.addDelPopupClickHandlers();
		this.addDelButtonClickEventListener();
	}


	addFormListener() {
		const formElement = document.getElementById('film_form');
		formElement.addEventListener('submit', (e) => {
			e.preventDefault();
			const formData = this.getFormData(formElement);
			formData.id = this.getNewRecordId();
			formData.creationDate = richDate().format('YYYY-MM-DDTHH:mm:ss');
			this.appData.films.unshift(formData);
			this.safeAppData();
			this.renderFilmList();
			this.addDelButtonClickEventListener();
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
	getOverlay() {
		return document.querySelector(".overlay");;
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
	getSortSelectBlockBtn() {
		return document.querySelector(".sort_movies");
	}
	getSortSelectBlockArrow() {
		return document.querySelector(".movie_sort__select_arrow svg");
	}
	showSortSelectBlock() {
		this.sortSelectBlock.style.display = 'block';
		this.sortOverlay.style.display = 'block';
		this.sortSelectBlockArrow.style.transform = 'rotate(-90deg)';
	}

	hideSortSelectBlock() {
		this.sortSelectBlock.style.display = '';
		this.sortOverlay.style.display = '';
		this.sortSelectBlockArrow.style.transform = '';
	}
	addSortSelectBlockClickHandlers() {
		this.sortSelectBlockBtn.addEventListener("click", (event) => {
			this.showSortSelectBlock();
		});

		this.sortSelectBlock.addEventListener('click', (event) => {
			const eventTarget = event.target;
			const sortBtn = eventTarget.closest('.movie_sort_btn');
			if (sortBtn) {
				this.hideSortSelectBlock();
				this.currentSortTypeId = sortBtn.id;
				this.renderSortBtnHeader();
				this.updateFilmsOrder();
				this.renderFilmList();
				this.addDelButtonClickEventListener();
			}
		});
	}

	getSortBtnHeader() {
		return document.querySelector(".sort_btn_header");
	}
	renderSortBtnHeader() {
		this.sortBtnHeader.innerHTML = this.sortTypes.find((sortType) => {
			if (sortType.id === this.currentSortTypeId) {
				return true;
			} else {
				return false;
			}
		}).title;
	}

	updateFilmsOrder() {
		switch (this.currentSortTypeId) {
			case "09":
				this.appData.films.sort((filmA, filmB) => {
					return filmA.year - filmB.year;
				});
				break;
			case "90":
				this.appData.films.sort((filmA, filmB) => {
					return filmB.year - filmA.year;
				});
				break;
			case "az":
				this.appData.films.sort((filmA, filmB) => filmA.title.localeCompare(filmB.title));
				break;
			case "za":
				this.appData.films.sort((filmA, filmB) => filmB.title.localeCompare(filmA.title));
				break;
			default:
				this.appData.films.sort((filmA, filmB) => {
					const dateA = richDate(filmA.creationDate);
					const dateB = richDate(filmB.creationDate);
					return dateA.isAfter(dateB) ? -1 : 1;
				});
		}
	}

	addOverlayClickHandlers() {
		this.sortOverlay.addEventListener("click", (event) => {
			this.hideSortSelectBlock();
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




