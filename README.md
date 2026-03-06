
# Dream Bucket 🪣

A personal image organizer that automatically sorts your photos into categories like cars, family, trips, adventures, and more. Just drag and drop an image and Dream Bucket figures out where it belongs using AI.

## Tech Stack
- **Frontend**: Vanilla HTML, CSS, JavaScript
- **Backend**: Supabase Edge Functions (Deno)
- **Storage**: Supabase Storage
- **AI**: Google Cloud Vision API

## Project Structure
```
dream-bucket/
├── src/
│   ├── assets/
│   ├── index.html
│   ├── script.js
│   └── style.css
├── supabase/
│   └── functions/
│       └── categorize-image/
│           └── index.ts
├── .env
├── .gitignore
└── LICENSE
```

## Setup
1. Clone the repo
2. Create a [Supabase](https://supabase.com) project and grab your project URL and service key
3. Enable the [Google Cloud Vision API](https://console.cloud.google.com) and grab your API key
4. Add your keys to `.env`:
```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_service_key
CLOUDVISION_API_KEY=your_google_vision_key
```
5. Deploy the edge function:
```
npx supabase functions deploy categorize-image
```

## Status
🚧 In progress 
