import requests
from bs4 import BeautifulSoup
import time
import logging
from typing import List, Dict
from .db_manager import DatabaseManager
from .dimension_extract import DimensionExtractor
from .config import DOUBAN_CONFIG, HEADERS

logger = logging.getLogger(__name__)

class DoubanCrawler:
    """Crawler for Douban movies and books"""
    
    def __init__(self):
        self.db = DatabaseManager()
        self.extractor = DimensionExtractor()
        self.session = requests.Session()
        self.session.headers.update(HEADERS)
    
    def crawl_movies(self, limit: int = 250):
        """Crawl top movies from Douban"""
        logger.info(f"Crawling top {limit} Douban movies...")
        
        url = "https://movie.douban.com/top250"
        movies = []
        
        try:
            response = self.session.get(url, timeout=10)
            response.encoding = 'utf-8'
            soup = BeautifulSoup(response.text, 'html.parser')
            
            items = soup.find_all('div', class_='item')
            
            for item in items[:limit]:
                try:
                    movie = self._parse_movie_item(item)
                    if movie:
                        movies.append(movie)
                        # Rate limiting
                        time.sleep(0.5)
                except Exception as e:
                    logger.warning(f"Error parsing movie item: {e}")
                    continue
            
            # Save to database
            for movie in movies:
                try:
                    self.db.upsert_work(movie)
                    logger.debug(f"Saved movie: {movie['title']}")
                except Exception as e:
                    logger.warning(f"Error saving movie to database: {e}")
            
            logger.info(f"Successfully crawled {len(movies)} movies")
            return movies
            
        except Exception as e:
            logger.error(f"Error crawling Douban movies: {e}", exc_info=True)
            return []
    
    def crawl_books(self, limit: int = 250):
        """Crawl top books from Douban"""
        logger.info(f"Crawling top {limit} Douban books...")
        
        url = "https://book.douban.com/top250"
        books = []
        
        try:
            response = self.session.get(url, timeout=10)
            response.encoding = 'utf-8'
            soup = BeautifulSoup(response.text, 'html.parser')
            
            items = soup.find_all('div', class_='item')
            
            for item in items[:limit]:
                try:
                    book = self._parse_book_item(item)
                    if book:
                        books.append(book)
                        time.sleep(0.5)
                except Exception as e:
                    logger.warning(f"Error parsing book item: {e}")
                    continue
            
            for book in books:
                try:
                    self.db.upsert_work(book)
                    logger.debug(f"Saved book: {book['title']}")
                except Exception as e:
                    logger.warning(f"Error saving book to database: {e}")
            
            logger.info(f"Successfully crawled {len(books)} books")
            return books
            
        except Exception as e:
            logger.error(f"Error crawling Douban books: {e}", exc_info=True)
            return []
    
    def _parse_movie_item(self, item) -> Dict:
        """Parse a movie item from HTML"""
        try:
            title = item.find('span', class_='title').text
            score = float(item.find('span', class_='rating_num').text)
            url = item.find('a')['href']
            img = item.find('img')['src']
            
            # Extract source ID from URL
            source_id = url.split('/')[-2]
            
            # Basic dimension scoring (placeholder)
            dimensions = self._score_from_rating(score)
            
            return {
                'title': title,
                'category': 'movie',
                'source': 'douban',
                'source_id': source_id,
                'description': f"Douban Rating: {score}/10",
                'cover_url': img,
                'source_url': url,
                'emotion_resonance': dimensions['emotion'],
                'aesthetic_pleasure': dimensions['aesthetic'],
                'value_alignment': dimensions['value'],
                'narrative_completion': dimensions['narrative'],
                'technical_execution': dimensions['technical'],
            }
        except Exception as e:
            logger.debug(f"Error parsing movie item: {e}")
            return None
    
    def _parse_book_item(self, item) -> Dict:
        """Parse a book item from HTML"""
        try:
            title = item.find('span', class_='title').text
            score = float(item.find('span', class_='rating_num').text)
            url = item.find('a')['href']
            img = item.find('img')['src']
            
            source_id = url.split('/')[-2]
            dimensions = self._score_from_rating(score)
            
            return {
                'title': title,
                'category': 'book',
                'source': 'douban',
                'source_id': source_id,
                'description': f"Douban Rating: {score}/10",
                'cover_url': img,
                'source_url': url,
                'emotion_resonance': dimensions['emotion'],
                'aesthetic_pleasure': dimensions['aesthetic'],
                'value_alignment': dimensions['value'],
                'narrative_completion': dimensions['narrative'],
                'technical_execution': dimensions['technical'],
            }
        except Exception as e:
            logger.debug(f"Error parsing book item: {e}")
            return None
    
    def _score_from_rating(self, rating: float) -> Dict[str, float]:
        """Convert Douban rating to dimension scores (placeholder)"""
        # This is a basic placeholder - should be improved with NLP
        normalized = (rating / 10.0) * 10.0
        return {
            'emotion': min(10, normalized * 0.8 + 1),
            'aesthetic': min(10, normalized * 0.9 + 0.5),
            'value': min(10, normalized * 0.85 + 0.8),
            'narrative': min(10, normalized * 0.95),
            'technical': min(10, normalized * 0.9),
        }
