# Crawler Configuration

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
}

DOUBAN_CONFIG = {
    'MOVIE_TOP_URL': 'https://movie.douban.com/top250',
    'BOOK_TOP_URL': 'https://book.douban.com/top250',
    'REQUEST_TIMEOUT': 10,
    'RATE_LIMIT_DELAY': 0.5,  # seconds between requests
}

SCHEDULER_CONFIG = {
    'douban_hour': 2,
    'douban_minute': 0,
    'zhihu_hour': 3,
    'zhihu_minute': 0,
}

# Database
DATABASE_PATH = '~/.emotional-tagging/data.db'
