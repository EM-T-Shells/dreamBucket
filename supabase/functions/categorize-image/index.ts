import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const CLOUDVISION_API_KEY = Deno.env.get("CLOUDVISION_API_KEY")
const SUPABASE_KEY = Deno.env.get("SUPABASE_KEY")
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")

serve(async (req) => {
  const formData = await req.formData()
  const file = formData.get("image") as File
  const arrayBuffer = await file.arrayBuffer()
  const base64Image = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)))
  
  const visionResponse = await fetch(`https://vision.googleapis.com/v1/images:annotate?key=${CLOUDVISION_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requests: [{
          image: {content: base64Image},
          features: [{ type: "LABEL_DETECTION", maxResults: 7}]
        }]
      })
    })

  const visionData = await visionResponse.json()
  const labels = visionData.responses[0].labelAnnotations.map((l: any)=> l.description.toLowerCase())
  const category = getCategory(labels)
  const fileName = `${category}/${crypto.randomUUID()}.${file.name.split('.').pop()}`
  
  const uploadResponse = await fetch(`${SUPABASE_URL}/storage/v1/object/dreambucket/${fileName}`, 
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${SUPABASE_KEY}`,
        "Content-Type": file.type,
      },
      body: arrayBuffer,
    })
    
    return new Response(JSON.stringify({ category, fileName }), {
      headers: {"Content-Type": "application/json"},
      status: 200,
    })
})