# Emotional-Tagging Python Crawler

Automated data collection from Douban and Zhihu.

## Requirements

- Python 3.9+
- See requirements.txt

## Installation

```bash
cd crawler
pip install -r requirements.txt
```

## Usage

Run the crawler:

```bash
python main.py
```

## Structure

- `main.py` - Entry point and scheduler
- `douban.py` - Douban crawler
- `zhihu.py` - Zhihu crawler
- `dimension_extract.py` - Extract dimension scores from reviews
- `db_manager.py` - SQLite database operations
- `config.py` - Configuration

## Features

- Automatic scheduling (daily updates)
- Dimension score extraction using NLP
- Duplicate detection
- Rate limiting and polite crawling
- Error handling and logging
