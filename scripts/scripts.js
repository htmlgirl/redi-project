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
			id: 5
		}
	]
};

class NewFilm {
	appData;

	constructor() {
		this.appData = appDataExample;
		this.renderFilmList();
		this.sortSelectBlock = this.getSortSelectBlock();
		this.addSortSelectBlockClickHandlers();
		this.getFormData();
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
	}

	getFormData() {
		const formElement = document.getElementById('film_form'); // get the form element
		formElement.addEventListener('submit', (e) => {
		e.preventDefault();
		const formData = new FormData(formElement); // create a FormData object, pass the form element to it
		// now we can retrieve the data
		const title = formData.get("title");
		const year = formData.get("year");
		const cast = formData.get("cast");
		const poster = formData.get("poster");
		const link = formData.get("link");

		const data = {
			title: title,
			year: year,
			cast: cast,
			poster: poster,
			link: link
		};
		console.log(data);
		return data;
	});

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

}

window.onload = function() {
	new NewFilm();
};




