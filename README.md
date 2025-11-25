
# WhatsApp-Style Chat App — Tagging + Dynamic Autocomplete  
A modern chat application built with **Next.js**, featuring WhatsApp-style tagging, dynamic autocomplete suggestions from a backend API, highlighted inline tags, full-tag deletion on backspace, and message handling via Redux.

## Screenshot of the App
<img width="3195" height="1641" alt="image" src="https://github.com/user-attachments/assets/7472f4b3-3a22-42c6-9809-2d81f6c299d1" />


## Demo 
https://github.com/user-attachments/assets/cb90f199-012d-4ec6-8c51-0aa795ba60a7

## Getting Started

First, run the development server:

```bash
npm install 
# or
npm i 
# and
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🏗 Tech Stack

| Layer        | Technology |
|--------------|------------|
| Frontend     | React, Next.js 14+ App Router |
| Styling      | Tailwind CSS |
| State Mgmt   | Redux Toolkit |
| Backend API  | Next.js Route Handlers |
| Language     | TypeScript |

---
## Steps:
1. User types inside textarea  
2. Detect trigger character (@/#)  
3. Extract query for autocomplete  
4. Fetch suggestions from backend  
5. Show dropdown  
6. Insert tag on selection  
7. Highlight tags in overlay  
8. Delete entire tag on backspace  
9. Submit message and store in Redux

## 🚀 Features

### 🔹 **1. WhatsApp-Style Tagging**
- Supports `@` (users) and `#` (topics)
- Autocomplete appears instantly when typing (`@ma`, `#su`, etc.)
- Tag is inserted into the input when selected
- Tags are visually highlighted (colored chips) in the message display

### 🔹 **2. Dynamic Autocomplete (Backend Powered)**
- Backend API (`/api/tags?q=value`) returns filtered suggestions
- Suggestions update in real-time as user types
- Mock database is easily expandable

### 🔹 **3. Full Tag Deletion**
- Pressing Backspace removes the **entire tag**, not one character
- Exact WhatsApp behavior

### 🔹 **4. Overlay-Based Text Highlighting**
- Textarea uses transparent text
- Highlighted HTML overlay displays the tags visually
- Caret remains accurate, does not shift or drift

### 🔹 **5. Redux-Based Chat Storage**
- All chats stored centrally using Redux Toolkit
- Clean state management

### 🔹 **6. API Endpoint**
 - `/api/tags`
 - [ "Mallikarjun", "Manager", "Marketing" ]

---



