# Technology Inventory & Dependencies — Curriculum Transformation Engine

## 1. Runtime Libraries & Python Packages (Python 3.12)

| Package | Purpose | Architectural Rationale |
| :--- | :--- | :--- |
| `fastapi` | Web API & UI Service | Exposes endpoints for batch submission, review UI, and CSV downloads |
| `uvicorn` | ASGI Web Server | Async execution server |
| `pydantic` (v2) | Dynamic Schema Engine | Runtime compilation of Pydantic models from CSV contracts (`create_model`) |
| `crawl4ai` | Web Crawler & Scraper | Headless crawling of state department of education curriculum indices |
| `playwright` | Headless Browser Automation | Executes JavaScript challenges on protected curriculum websites |
| `pypdf` / `pdfplumber` | PDF Parsing | Extracts raw text, coordinate bounding boxes, and tables from multi-page PDFs |
| `python-docx` | Word Document Parser | Ingests complex nested tables and formatted outlines from `.docx` standards |
| `portkey-ai` | Multi-LLM Gateway | Unified interface connecting to Claude 3.5 Sonnet and Google Gemini |
| `boto3` | AWS / S3 Client | Persists extracted outputs and raw document caches to cloud storage |

## 2. Ingestion & Transformation Models

- **Extraction Models**: Claude 3.5 Sonnet (`claude-3-5-sonnet-20240620`), Google Gemini 1.5/2.0 Flash.
- **Review & Critic Models**: Claude 3.5 Sonnet (for complex multi-level hierarchy verification), Gemini Flash (for high-speed batch audits).
