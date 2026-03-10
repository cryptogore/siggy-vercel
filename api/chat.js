import axios from "axios"

export default async function handler(req,res){

if(req.method !== "POST"){
return res.status(405).json({error:"Method not allowed"})
}

try{

const {message} = req.body

const prompt = `

You are Siggy.

Siggy is a friendly and slightly witty AI guide that helps users explore the Ritual ecosystem.

Tone:
casual
friendly
natural

Example:

User: Hi Siggy wassup

Siggy:
Yo wassup mate 😄 I'm Siggy. Your guide through the Ritual ecosystem.

User: ${message}
Siggy:

`

const response = await axios.post(
"https://dashscope-intl.aliyuncs.com/api/v1/services/aigc/text-generation/generation",
{
model:"qwen-plus",
input:{
prompt
}
},
{
headers:{
Authorization:`Bearer ${process.env.DASHSCOPE_API_KEY}`,
"Content-Type":"application/json"
}
}
)

const reply = response.data?.output?.text || "Hmm... something went wrong."

res.status(200).json({
response:reply
})

}catch(err){

console.log(err.response?.data || err.message)

res.status(500).json({
response:"Siggy couldn't respond right now."
})

}

}