# 🗣️ VoiceNotes AI  
An intelligent **voice-powered note-taking application** built with **Next.js**, **Firebase**, and **Google Genkit AI**, enabling users to record, transcribe, tag, and summarize notes seamlessly using AI.

---

## 🚀 Overview  
**VoiceNotes AI** combines the power of **speech recognition** and **large language models** to simplify digital note-taking.  
Users can **record voice notes**, **automatically generate tags**, and **summarize their content** using **Genkit AI (Gemini 2.5 Flash)**.  
The app is optimized for performance with **Firebase App Hosting** and styled using **TailwindCSS + shadcn/ui**.

### 🔹 Use case examples
- Students taking quick class notes  
- Professionals recording meeting summaries  
- Writers or researchers organizing voice memos  
- Hands-free journaling and productivity logging  

---

## 🧩 Architecture  

| Component | Description |
|------------|-------------|
| **Frontend (Next.js 15)** | User interface for recording, writing, and managing notes |
| **Speech Recognition** | Converts voice input to text in real-time using the Web Speech API |
| **Genkit AI (Gemini 2.5 Flash)** | Provides AI-driven features like auto-tagging and summarization |
| **Firebase App Hosting** | Scalable, managed backend and deployment |
| **UI Framework** | TailwindCSS + shadcn/ui for a clean, modern interface |

🌀 The system integrates **AI flows** through Genkit to process notes:  
- `generate-tags` → Suggests relevant tags  
- `summarize-notes` → Produces concise summaries  

---

## 🧮 Evaluation Metrics  

While VoiceNotes is primarily qualitative, the following metrics can assess its performance:

- 🧾 **Speech Accuracy** – correctness of speech-to-text conversion  
- 🧠 **Tag Relevance** – how accurate AI-generated tags are  
- 📘 **Summary Quality** – clarity and coverage of generated summaries  
- ⚙️ **Latency** – average AI response time during processing  

---

## ⚙️ Tech Stack  

- **Framework:** Next.js 15  
- **Backend:** Firebase App Hosting  
- **AI Engine:** Google Genkit AI (`@genkit-ai/google-genai`)  
- **Model:** Gemini 2.5 Flash  
- **UI:** TailwindCSS, shadcn/ui, Radix UI  
- **Speech Recognition:** Web Speech API  
- **Programming Language:** TypeScript  
- **Dependencies:** React 18, zod, lucide-react, react-hook-form, recharts  

---

## 🧠 How It Works  

1. 🎙️ **Record Note** → User records audio, transcribed to text in real-time  
2. 🏷️ **Generate Tags** → AI analyzes the content and suggests contextual tags  
3. ✍️ **Summarize Note** → AI summarizes lengthy notes into concise overviews  
4. 💾 **Store & Manage** → Notes saved in Firebase with title, tags, and timestamps  
5. 🔍 **View & Search** → Users can filter, search, or edit notes anytime  

---

## 📊 Results  

✅ AI successfully tags notes based on content  
⚡ Real-time transcription delivers instant text feedback  
🧩 Summaries provide readable, context-aware overviews  
📈 Smooth user experience with minimal lag under load  

---

## ⚠️ Limitations  

- Speech recognition accuracy may vary by accent or background noise  
- Requires stable internet for AI and Firebase sync  
- AI summaries depend on note clarity and length  

---

## 🔮 Future Work  

- Add offline transcription caching  
- Implement semantic search using embeddings  
- Introduce “Smart Folders” with auto-categorization  
- Integrate multi-language transcription and translation  
- Add dark/light mode personalization  

---

## 📚 Citations  

- Goodfellow, I. et al. (2014). *Generative Adversarial Nets*, NeurIPS.  
- Google Genkit (2024). *Build AI flows with Genkit AI*.  
- Web Speech API, MDN Documentation (2024).  

---

## 🧑‍💻 Author  

**S.Bharath Varma**  
📧 [svarma@gitam.in](mailto:svarma@gitam.in)  
🏆 *B.Tech CSE (data science)| GITAM university*

---
