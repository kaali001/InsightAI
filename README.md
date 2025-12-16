# 🚀 InsightAI - Intelligent Feedback Analysis Platform

![InsightAI Banner](https://img.shields.io/badge/GenAI-Feedback--Analyzer-blueviolet?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3.11+-blue?style=for-the-badge&logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-009688?style=for-the-badge&logo=fastapi)
![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react)

> ✨ AI-powered platform for extracting actionable insights from user feedback ✨

![image](https://github.com/user-attachments/assets/11fcfa28-75bc-4285-bd8b-f22c6c98e924)

---

## 🎯 About

**InsightAI** automatically analyzes user feedback from app stores (Google Play & iOS App Store) to help product teams quickly identify critical issues, sentiment trends, and user pain points.

**Why InsightAI?**
- ⚡ **Fast**: Process thousands of reviews in minutes, not days
- 🎯 **Accurate**: AI-powered clustering with 95%+ relevance
- 🔒 **Secure**: Rate-limited API with input validation
- 📊 **Actionable**: Visual dashboards for quick decision-making

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🔍 **Smart Clustering** | Groups similar feedback using SentenceTransformers + KMeans with automatic fallback to KeyBERT |
| 🧠 **AI Summaries** | GPT-powered or TF-IDF-based summaries for each feedback cluster |
| 💬 **Sentiment Analysis** | Multilingual sentiment detection using TextBlob with language auto-detection |
| 📥 **Multi-Source Scraping** | Fetch reviews from Google Play Store & Apple App Store with date filtering |
| 📤 **CSV Upload** | Import feedback from any source via CSV file |
| 🔐 **Authentication** | Secure JWT-based auth with bcrypt password hashing |
| 🛡️ **Rate Limiting** | Prevents API abuse (5 req/min for analysis, 20 req/min for uploads) |
| 📝 **Auto-Rotating Logs** | Daily log rotation with 7-day auto-deletion |
| ✅ **Input Validation** | App ID validation for Google Play & App Store |

---

## 🛠️ Tech Stack

### Backend
- **Framework**: FastAPI (async Python web framework)
- **Database**: MongoDB (Motor async driver)
- **AI/ML**: 
  - OpenAI GPT-3.5 (primary)
  - SentenceTransformers (embeddings)
  - KeyBERT (keyword extraction)
  - TextBlob (sentiment analysis)
  - scikit-learn (clustering)
- **Auth**: JWT + Passlib (bcrypt)
- **Rate Limiting**: SlowAPI

### Frontend
- **Framework**: React 18 + TypeScript + Vite
- **UI**: TailwindCSS + shadcn/ui
- **State**: Zustand
- **Charts**: Recharts
- **Routing**: React Router

### DevOps
- **Deployment**: Render/Heroku ready (Procfile included)
- **Logging**: Daily rotating logs (auto-delete after 7 days)
- **Monitoring**: Health check endpoints

---

## 🚀 Getting Started

### Prerequisites
- Python 3.11+
- Node.js 18+
- MongoDB (local or cloud)
- OpenAI API Key (optional, fallback available)

### Backend Setup

```bash
# Clone repository
git clone https://github.com/kaali001/InsightAI.git
cd InsightAI/backend

# Create virtual environment
python -m venv .venv
.venv\Scripts\activate  # Windows
# source .venv/bin/activate  # Linux/Mac

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp sample.env .env
# Edit .env with your credentials

# Start server
python -m uvicorn app.main:app --reload --port 8000
```

**Backend runs at**: http://localhost:8000  
**API Docs**: http://localhost:8000/docs

### Frontend Setup

See [frontend/readme.md](frontend/readme.md) for detailed setup.

---

## 📋 API Endpoints

| Method | Endpoint | Description | Rate Limit |
|--------|----------|-------------|------------|
| GET | `/` | Root endpoint | 60/min |
| GET | `/health` | Health check | Unlimited |
| POST | `/api/auth/signup` | User registration | 10/min |
| POST | `/api/auth/login` | User login | 10/min |
| POST | `/api/feedback/upload-csv` | Upload CSV feedback | 20/min |
| GET | `/api/feedback/fetch-analyze` | Scrape & analyze reviews | 5/min |
| POST | `/api/projects/create` | Create new project | 60/min |
| GET | `/api/projects/all` | List user projects | 60/min |

---

## 🔒 Security Features

- ✅ JWT token-based authentication
- ✅ Bcrypt password hashing
- ✅ API rate limiting per endpoint
- ✅ Input validation for app IDs
- ✅ CORS protection
- ✅ Secure secret key management
- ✅ No hardcoded credentials

---

## 📊 Sample Use Case

**Scenario**: Analyze recent Instagram app reviews

1. **Input**: `google_play_app_id=com.instagram.android`, `mode=weekly`
2. **Processing**:
   - Scrape 200 recent reviews
   - Detect sentiment (positive/negative/neutral)
   - Cluster similar issues (e.g., "login failures", "UI bugs")
   - Generate AI summary for each cluster
3. **Output**:
   ```json
   {
     "total_feedbacks": 150,
     "sentiment": {"positive": 45, "negative": 35, "neutral": 20},
     "clusters": {
       "0": {"summary": "Login OTP issues", "count": 23},
       "1": {"summary": "Story upload failures", "count": 18}
     }
   }
   ```

---

## 📁 Project Structure

```
InsightAI/
├── backend/
│   ├── app/
│   │   ├── auth/          # Authentication routes
│   │   ├── core/          # Config, security, logging, rate limiting
│   │   ├── db/            # Database connection
│   │   ├── feedback/      # Feedback routes & services
│   │   ├── project/       # Project CRUD
│   │   ├── utils/         # NLP & scraping utilities
│   │   └── main.py        # FastAPI app entry
│   ├── logs/              # Auto-rotating logs (7-day retention)
│   ├── requirements.txt   # Production dependencies
│   ├── Procfile           # Deployment config
│   └── runtime.txt        # Python version
└── frontend/              # React + TypeScript app
```

---

## 🧪 Testing

```bash
cd backend
pip install -r requirements-dev.txt
pytest app/tests/ -v
```



---

## 🤝 Contributing

Contributions welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) first.

---

## 👨‍💻 Developer

**Satyendra**  
Mentored by: Achyut Mohan (Google)

---


## ⭐ Final Words

InsightAI transforms chaotic user feedback into **actionable product intelligence**.  
Stop drowning in reviews — start making data-driven decisions today! 🚀
