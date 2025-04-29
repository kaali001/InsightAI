# 🚀 InsightAI Backend

Welcome to the **InsightAI Backend** – a powerful FastAPI-based server that handles feedback scraping, clustering, sentiment analysis, report generation, and more!

This backend powers InsightAI, our intelligent platform for analyzing and summarizing app user feedback.

---

## 🛠️ Tech Stack

- ⚡️ [FastAPI](https://fastapi.tiangolo.com/)
- 🧪 [Pytest](https://docs.pytest.org/en/stable/)
- 🌐 [Google Play & App Store Scrapers](https://pypi.org/)
- 📦 MongoDB (via `motor`)
- 🔐 Custom Authentication (Token-based)
- 🧠 Async processing (asyncio)

---

## 🧑‍💻 Getting Started

Follow these steps to run the InsightAI backend on your local machine.

---

## ✅ Prerequisites

Make sure you have installed:

- [Python 3.11+](https://www.python.org/downloads/)
- [pip](https://pip.pypa.io/en/stable/)
- [Git](https://git-scm.com/) (for cloning repo)

---

## ⚙️ Backend Setup

### 1. Clone the Repository

```bash
git clone https://github.com/kaali001/InsightAI.git
cd InsightAI/backend

```

 ### 2. Create & Activate Virtual Environment


```bash
python -m venv venv
venv\Scripts\activate

```

### 3. Install Dependencies

```bash
pip install -r requirements.txt

```

### 4. Environment Variables

Create a .env file in the backend/ directory and fill details as per `sample.env` .




### 5. Start the FastAPI Server

```bash
uvicorn app.main:app --reload
```

 1. 🚀 Your server is now running at: http://127.0.0.1:8000

 2. 📄 Auto-generated API Docs: http://127.0.0.1:8000/docs


### 🧪 Running Tests
We use pytest + pytest-asyncio for async test coverage.
Run Specific Test:
```bash

pytest app/tests/test_scraper.py -v -s
```
 -s enables print() output from tests so you can see scraped feedback in the terminal.

