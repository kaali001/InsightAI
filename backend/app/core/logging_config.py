# app/core/logging_config.py
import os
import logging
import glob
from datetime import datetime, timedelta
from logging.handlers import TimedRotatingFileHandler

# Create logs directory (skip in production if not writable)
LOGS_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "logs")
try:
    os.makedirs(LOGS_DIR, exist_ok=True)
except (OSError, PermissionError) as e:
    # In production environments like Render, logs dir might not be writable
    LOGS_DIR = None
    print(f"Warning: Cannot create logs directory: {e}")

# Log format
LOG_FORMAT = "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
DATE_FORMAT = "%Y-%m-%d %H:%M:%S"


def cleanup_old_logs(days: int = 7):
    """Delete log files older than specified days"""
    cutoff_date = datetime.now() - timedelta(days=days)
    
    for log_file in glob.glob(os.path.join(LOGS_DIR, "*.log*")):
        try:
            file_modified = datetime.fromtimestamp(os.path.getmtime(log_file))
            if file_modified < cutoff_date:
                os.remove(log_file)
                logging.info(f"Deleted old log file: {log_file}")
        except Exception as e:
            logging.warning(f"Failed to delete log file {log_file}: {e}")


def setup_logging(log_level: str = "INFO"):
    """Configure application logging with auto-rotating daily files"""
    
    # Clean up old logs on startup (only if logs dir is available)
    if LOGS_DIR:
        cleanup_old_logs(days=7)
    
    # Get root logger
    root_logger = logging.getLogger()
    root_logger.setLevel(getattr(logging, log_level.upper(), logging.INFO))
    
    # Clear existing handlers
    root_logger.handlers.clear()
    
    # Console handler (always available)
    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.INFO)
    console_handler.setFormatter(logging.Formatter(LOG_FORMAT, DATE_FORMAT))
    root_logger.addHandler(console_handler)
    
    # File handlers (only if logs directory is writable)
    if LOGS_DIR:
        try:
            # File handler with daily rotation (keeps 7 days)
            log_filename = os.path.join(LOGS_DIR, "insightai.log")
            file_handler = TimedRotatingFileHandler(
                filename=log_filename,
                when="midnight",
                interval=1,
                backupCount=7,  # Keep 7 days of logs
                encoding="utf-8"
            )
            file_handler.suffix = "%Y-%m-%d.log"  # Date format for rotated files
            file_handler.setLevel(logging.DEBUG)
            file_handler.setFormatter(logging.Formatter(LOG_FORMAT, DATE_FORMAT))
            root_logger.addHandler(file_handler)
            
            # Error-only file handler
            error_filename = os.path.join(LOGS_DIR, "errors.log")
            error_handler = TimedRotatingFileHandler(
                filename=error_filename,
                when="midnight",
                interval=1,
                backupCount=7,
                encoding="utf-8"
            )
            error_handler.suffix = "%Y-%m-%d.log"
            error_handler.setLevel(logging.ERROR)
            error_handler.setFormatter(logging.Formatter(LOG_FORMAT, DATE_FORMAT))
            root_logger.addHandler(error_handler)
        except Exception as e:
            print(f"Warning: Could not setup file logging: {e}")
    
    # Reduce noise from third-party libraries
    logging.getLogger("httpx").setLevel(logging.WARNING)
    logging.getLogger("httpcore").setLevel(logging.WARNING)
    logging.getLogger("openai").setLevel(logging.WARNING)
    logging.getLogger("sentence_transformers").setLevel(logging.WARNING)
    
    logging.info("Logging configured successfully")
    return root_logger


def get_logger(name: str) -> logging.Logger:
    """Get a named logger"""
    return logging.getLogger(name)
