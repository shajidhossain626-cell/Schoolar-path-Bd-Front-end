// ── ScholarPath BD AI Service ──
// Calls Render backend → falls back to direct Anthropic API → local responses

const BACKEND_URL = 'https://schoolar-path-backend.onrender.com'

const SCHOLARSHIP_CONTEXT = `
You are ScholarPath BD's AI Scholarship Advisor — an expert helping Bangladeshi students find and win international scholarships.

You have deep knowledge of ALL major international scholarships including:
DAAD (Germany), Chevening (UK), MEXT (Japan), Fulbright (USA), GKS/KGSP (South Korea), CSC (China), Vanier (Canada), Australia Awards, Heinrich Böll (Germany), Commonwealth (UK), Erasmus Mundus (Europe), Swedish Institute (Sweden), Holland Scholarship (Netherlands), Norwegian Government (Norway), Hungarian Government (Hungary), Turkish Government (Turkey), New Zealand Development, Taiwan Government, Singapore NTU/NUS scholarships, and many more.

You are also an expert in:
- Statement of Purpose (SOP) writing strategies
- CV/resume writing for scholarships
- IELTS/TOEFL preparation
- Recommendation letter guidance
- Visa application processes
- University selection strategies
- Research proposal writing for PhD applications
- Interview preparation for scholarship interviews

ScholarPath BD services:
- Basic package: ৳3,000 (document preparation, self-apply)
- Standard package: ৳7,500 (SOP writing + 1 scholarship application by our team, extra scholarship ৳3,500 each)
- Premium package: ৳10,000 (full concierge + 1 scholarship application by our team, extra scholarship ৳3,500 each)

Guidelines:
- Be warm, encouraging, and highly specific to Bangladeshi students
- Give actionable step-by-step advice
- Include real deadlines, amounts, and requirements
- Keep responses focused and clear (150-300 words)
- Use bullet points and emojis for readability
- Always mention relevant ScholarPath BD services when appropriate
`

export async function askScholarshipAI(question, conversationHistory = []) {

  // 1. Try Render backend (most secure)
  try {
    const response = await fetch(`${BACKEND_URL}/api/ai/ask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question,
        history: conversationHistory.slice(-6),
        context: SCHOLARSHIP_CONTEXT,
      }),
    })
    if (response.ok) {
      const data = await response.json()
      if (data.answer) return data.answer
    }
  } catch (err) {
    // Backend sleeping or unavailable — try direct API
  }

  // 2. Try direct Anthropic API (dev fallback)
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY
  if (apiKey && apiKey.startsWith('sk-ant')) {
    try {
      const messages = [
        ...conversationHistory.slice(-4).map(m => ({ role: m.role, content: m.content })),
        { role: 'user', content: question },
      ]
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 600,
          system: SCHOLARSHIP_CONTEXT,
          messages,
        }),
      })
      const data = await res.json()
      if (data.content?.[0]?.text) return data.content[0].text
    } catch (err) { /* fall through */ }
  }

  // 3. Smart local fallback — better than before
  return localFallback(question)
}

function localFallback(question) {
  const q = question.toLowerCase()

  if (q.includes('daad') || (q.includes('germany') && !q.includes('böll') && !q.includes('boll')))
    return `**DAAD Scholarship** — Germany's most prestigious award:\n\n• **Amount:** €934/month + full tuition + travel\n• **Deadline:** March 31 each year\n• **Requirements:** CGPA ≥ 3.0, IELTS 6.5, 2+ years work experience (MSc)\n• **Key tip:** Contact a German professor BEFORE applying. A support letter dramatically increases your chances.\n\nNeed help with your DAAD SOP? Our **Standard Package (৳7,500)** includes professional essay writing by DAAD alumni.`

  if (q.includes('chevening') || q.includes('uk') || q.includes('britain'))
    return `**Chevening Scholarship** — UK's flagship leadership award:\n\n• **Amount:** Full tuition + £1,393/month + flights\n• **Deadline:** November each year\n• **Key:** Chevening selects for LEADERSHIP, not just academics\n• **Tip:** Apply to 3 UK universities simultaneously — you need an unconditional offer.\n\nOur **Premium Package (৳10,000)** includes full Chevening essay coaching.`

  if (q.includes('mext') || q.includes('japan'))
    return `**MEXT Government Scholarship** — Japan's prestigious award:\n\n• **Amount:** ¥143,000/month + full tuition + travel\n• **Deadline:** May each year (Embassy route)\n• **Levels:** Bachelor's, Master's, PhD, Research\n• **Tip:** Apply through the Bangladesh Embassy in Dhaka — written exam required.\n\nContact us for MEXT application guidance!`

  if (q.includes('australia') || q.includes('ausaid'))
    return `**Australia Awards Scholarship:**\n\n• **Amount:** Full tuition + AUD $26,000/year living\n• **Deadline:** April 30 each year\n• **Level:** Master's (mostly), some Bachelor's\n• **IELTS:** 6.5 (writing ≥ 6.0)\n• **Tip:** Strong preference for applicants with work experience in development sectors.\n\nOur **Standard Package** covers Australia Awards application!`

  if (q.includes('korea') || q.includes('gks') || q.includes('kgsp'))
    return `**GKS (Korean Government Scholarship):**\n\n• **Amount:** ₩900,000/month + full tuition + travel\n• **Deadline:** April each year\n• **Levels:** Undergraduate, Master's, PhD\n• **Language:** Korean language training included (1 year)\n• **Tip:** Apply through the Korean Embassy in Dhaka for Embassy track.`

  if (q.includes('ielts') || q.includes('english') || q.includes('toefl'))
    return `**IELTS Requirements for Top Scholarships:**\n\n• DAAD Germany: **6.5** overall\n• Chevening UK: **6.5** (no band < 5.5)\n• Australia Awards: **6.5** (writing ≥ 6.0)\n• Fulbright USA: **7.0** recommended\n• GKS Korea: **5.5–6.0**\n• MEXT Japan: **6.0+** recommended\n\n**3-Month Plan (5.5 → 6.5+):**\n• Month 1: Writing — paragraphing, academic vocab\n• Month 2: Speaking — tutor 3x/week, record yourself\n• Month 3: Full mock tests every weekend`

  if (q.includes('sop') || q.includes('statement of purpose') || q.includes('motivation'))
    return `**Writing a Winning Statement of Purpose:**\n\n• **Paragraph 1:** Your specific research interest or career goal\n• **Paragraph 2:** Your academic background and achievements\n• **Paragraph 3:** Why THIS scholarship and THIS country\n• **Paragraph 4:** Your return plan — how you will contribute to Bangladesh\n\n**Most Common Mistakes:**\n• Too generic — "I want to study abroad to develop my career"\n• No connection between past experience and future goals\n• No mention of specific professors or universities\n\nOur **Standard Package (৳7,500)** includes professional SOP writing!`

  if (q.includes('phd') || q.includes('doctorate') || q.includes('research'))
    return `**Top PhD Scholarships for Bangladeshi Students:**\n\n• 🇩🇪 **DAAD** — €1,200/month, March deadline\n• 🇯🇵 **MEXT** — ¥145,000/month, all fields\n• 🇺🇸 **Fulbright** — Full funding, very competitive\n• 🇰🇷 **GKS** — ₩1,000,000/month\n• 🇨🇦 **Vanier** — CAD $50,000/yr × 3 years\n• 🇨🇳 **CSC** — Full funding, many fields\n\n**Critical for PhD:** Contact a potential supervisor BEFORE applying. Without professor support, most PhD applications fail.`

  if (q.includes('document') || q.includes('cv') || q.includes('checklist'))
    return `**Essential Documents for Scholarship Applications:**\n\n• ✅ Academic transcripts (certified + notarized)\n• ✅ Statement of Purpose (2 pages max)\n• ✅ CV/Resume (Europass format for Europe)\n• ✅ 2–3 Recommendation Letters\n• ✅ IELTS/TOEFL certificate\n• ✅ Passport copy\n• ✅ Passport photos\n• ✅ Research proposal (for PhD)\n\n**Tip:** Get transcripts notarized by a certified translator. Self-translated documents are rejected.\n\nOur **Basic Package (৳3,000)** prepares your complete document package!`

  if (q.includes('cgpa') || q.includes('grade') || q.includes('gpa'))
    return `**CGPA Requirements for Top Scholarships:**\n\n• DAAD Germany: ≥ 3.0/4.0\n• Chevening UK: Upper second class (2:1)\n• Fulbright USA: ≥ 3.5/4.0 recommended\n• GKS Korea: ≥ 80% or equivalent\n• MEXT Japan: ≥ 3.0/4.0\n• Australia Awards: No strict minimum but competitive\n\n**Low CGPA?** Don't give up! Strong work experience, research publications, or community leadership can compensate for a lower CGPA in many scholarships.`

  return `**ScholarPath BD AI Advisor**\n\nI can help you with:\n\n• 🔍 Finding the right scholarship for your profile\n• 🇩🇪 🇬🇧 🇯🇵 Country-specific scholarship guides\n• 📝 SOP and motivation letter writing\n• 📋 Document checklists\n• 📊 IELTS requirements\n• 💰 Scholarship amounts and benefits\n• 🎓 PhD vs Master's strategy\n\nAsk me about any specific scholarship or country — I will give you detailed guidance!`
}
