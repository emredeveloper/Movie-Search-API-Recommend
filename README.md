# Movie Search API Recommend

Movie Search API Recommend is a simple movie search and recommendation project. It uses the OMDB API to search movies, display movie details, and suggest related titles through a recommendation flow.

## Features

- Search movies with the OMDB API
- View movie details
- Generate movie recommendations from a selected title
- Bootstrap-based responsive UI
- Simple structure for learning API integration and recommendation workflows

## Requirements

- Python 3.10+
- OMDB API key

## Setup

```bash
git clone https://github.com/emredeveloper/Movie-Search-API-Recommend.git
cd Movie-Search-API-Recommend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file in the project root:

```env
OMDB_API_KEY=your_omdb_key
```

## Run

```bash
python app.py
```

Open the local URL shown in the terminal.

## Notes

- Keep your OMDB key outside the source code.
- Add `.env` to `.gitignore` if it is not already ignored.
- This project can be extended with caching, user favorites, better ranking, and tests.

## Roadmap Ideas

- Add API response caching
- Add unit tests for recommendation helpers
- Add error states for missing movies and API limits
- Add Docker support

## License

MIT
