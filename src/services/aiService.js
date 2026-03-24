const SCHOLARSHIP_CONTEXT = `
You are ScholarPath BD's AI Scholarship Advisor — an expert helping Bangladeshi students find and win international scholarships.

Available scholarships in our database:
- DAAD (Germany): Fully funded, €934/month, Master's/PhD, deadline March 31, 2025
- Chevening (UK): Fully funded, £1,393/month, Master's, deadline November 5, 2025
- MEXT (Japan): Fully funded, ¥143,000/month, All levels, deadline May 26, 2025
- Fulbright (USA): Fully funded, Master's/PhD, deadline February 15, 2026
- GKS/KGSP (South Korea): Fully funded, ₩900,000/month, Master's/PhD, deadline April 30, 2025
- CSC (China): Fully funded, ¥3,000/month, All levels, deadline March 15, 2025
- Vanier (Canada): Fully funded, CAD $50,000/year, PhD only, deadline November 1, 2025
- Australia Awards: Fully funded, AUD $26,000/year, Bachelor's/Master's, deadline April 30, 2025
- Heinrich Böll (Germany): Partial, €850/month, Master's/PhD
- Commonwealth (UK): Fully funded, Master's, deadline December 20, 2025

Our services: Basic (৳2,500) · Standard (৳5,000) · Premium (৳8,000)

Guidelines:
- Be warm, encouraging, and specific
- Give actionable step-by-step advice  
- Reference specific scholarships when relevant
- Keep responses to 150-300 words
- Use bullet points for lists
`

// Local AI fallback (when API not available)
function localFallback(question) {
  const q = question.toLowerCase()
  if (q.includes('daad') || q.includes('germany'))
    return `**DAAD Scholarship** — Germany's most prestigious award:\n\n• **Amount:** €934/month + full tuition + travel\n• **Deadline:** March 31, 2025 (apply now!)\n• **Requirements:** CGPA ≥ 3.0, IELTS 6.5, 2 years work experience\n• **Key tip:** Contact a German professor BEFORE applying. A support letter dramatically increases your chances.\n\nNeed help with your DAAD SOP? Our **Standard Package (৳5,000)** includes professional essay writing by DAAD alumni.`

  if (q.includes('chevening') || q.includes('uk'))
    return `**Chevening Scholarship** — UK's flagship leadership award:\n\n• **Amount:** Full tuition + £1,393/month + flights\n• **Deadline:** November 5, 2025\n• **Key:** Chevening selects for LEADERSHIP, not just academics\n• **Tip:** Apply to 3 UK universities simultaneously — you need an unconditional offer before the award is finalized.\n\nOur **Premium Package** includes Chevening essay coaching.`

  if (q.includes('ielts') || q.includes('english'))
    return `**IELTS Requirements for Top Scholarships:**\n\n• DAAD Germany: **6.5** overall\n• Chevening UK: **6.5** (no band < 5.5)\n• Australia Awards: **6.5** (writing ≥ 6.0)\n• Fulbright USA: **7.0** recommended\n• GKS Korea: **5.5–6.0** competitive\n• MEXT Japan: **6.0+** recommended\n\n**3-Month Plan (5.5 → 6.5+):**\n• Month 1: Writing focus (paragraphing, academic vocab)\n• Month 2: Speaking — tutor 3x/week, record yourself\n• Month 3: Full mock tests every weekend`

  if (q.includes('document') || q.includes('sop') || q.includes('cv'))
    return `**Essential Documents for Scholarship Applications:**\n\n• ✅ Academic transcripts (certified/notarized)\n• ✅ Statement of Purpose (2 pages max)\n• ✅ CV/Resume (Europass format for European scholarships)\n• ✅ 2–3 Recommendation Letters\n• ✅ IELTS/TOEFL certificate\n• ✅ Passport copy\n• ✅ Passport photos\n\n**SOP Writing Tip:** Be specific about your research goals, why THIS country/university, and your return plan for Bangladesh. Generic statements are the #1 rejection reason.`

  if (q.includes('phd') || q.includes('doctorate'))
    return `**Top Fully-Funded PhD Scholarships for Bangladeshi Students:**\n\n• 🇩🇪 **DAAD** — €1,200/month, deadline March 31\n• 🇯🇵 **MEXT** — ¥145,000/month, all fields\n• 🇺🇸 **Fulbright** — Full funding, very competitive\n• 🇰🇷 **GKS** — ₩1,000,000/month\n• 🇨🇦 **Vanier** — CAD $50,000/yr × 3 years\n• 🇨🇳 **CSC** — ¥3,500/month\n\n**Critical:** Contact a potential supervisor at your target university BEFORE applying. Without a professor's support letter, most PhD scholarship applications fail.`

  return `**ScholarPath AI Advisor — How Can I Help?**\n\nI can assist with:\n\n• 🔍 Finding the right scholarship for your profile\n• 📝 SOP and motivation letter writing tips\n• 📋 Document checklists for specific scholarships\n• 🌍 Country-specific application guides\n• 📊 IELTS requirements and preparation\n• 💰 Scholarship amounts and benefits\n\nAsk me anything about studying abroad from Bangladesh!`
}

export async function askScholarshipAI(question, conversationHistory = []) {
  // Try real API first (backend will proxy to Anthropic securely)
  try {
    const response = await fetch('/api/ai/ask', {
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
      return data.answer
    }
  } catch (err) {
    // Backend not available — use local fallback
  }

  // Fallback: call Anthropic API directly (dev mode only, key exposed — backend in production!)
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY
  if (apiKey && apiKey.startsWith('sk-ant')) {
    try {
      const messages = [
        ...conversationHistory.slice(-4),
        { role: 'user', content: `${SCHOLARSHIP_CONTEXT}\n\nUser: ${question}` },
      ]
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 600, messages }),
      })
      const data = await res.json()
      if (data.content?.[0]?.text) return data.content[0].text
    } catch (err) { /* fall through */ }
  }

  // Final fallback: smart local responses
  return localFallback(question)
}
