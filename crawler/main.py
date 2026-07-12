import logging
import schedule
import time
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime
import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from crawler.douban import DoubanCrawler
from crawler.zhihu import ZhihuCrawler
from crawler.config import SCHEDULER_CONFIG

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def run_douban_crawler():
    """Run Douban crawler"""
    try:
        logger.info("Starting Douban crawler...")
        crawler = DoubanCrawler()
        crawler.crawl_movies()
        crawler.crawl_books()
        logger.info("Douban crawler completed successfully")
    except Exception as e:
        logger.error(f"Douban crawler error: {e}", exc_info=True)

def run_zhihu_crawler():
    """Run Zhihu crawler"""
    try:
        logger.info("Starting Zhihu crawler...")
        crawler = ZhihuCrawler()
        crawler.crawl_reviews()
        logger.info("Zhihu crawler completed successfully")
    except Exception as e:
        logger.error(f"Zhihu crawler error: {e}", exc_info=True)

def main():
    """Main entry point with scheduler"""
    logger.info("Initializing Emotional-Tagging crawler...")
    
    scheduler = BackgroundScheduler()
    
    # Schedule Douban crawler (daily at 2 AM)
    scheduler.add_job(
        run_douban_crawler,
        trigger="cron",
        hour=2,
        minute=0,
        id="douban_crawler",
        name="Douban Crawler"
    )
    
    # Schedule Zhihu crawler (daily at 3 AM)
    scheduler.add_job(
        run_zhihu_crawler,
        trigger="cron",
        hour=3,
        minute=0,
        id="zhihu_crawler",
        name="Zhihu Crawler"
    )
    
    scheduler.start()
    logger.info("Scheduler started. Crawlers will run according to schedule.")
    logger.info("Press Ctrl+C to exit")
    
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        logger.info("Shutting down scheduler...")
        scheduler.shutdown()
        logger.info("Crawler stopped.")

if __name__ == "__main__":
    main()
