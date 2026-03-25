const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

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

function localFallback(question) {
  const q = question.toLowerCase()
  if (q.includes('daad') || q.includes('germany'))
    return `**DAAD Scholarship** — Germany's most prestigious award:\n\n• **Amount:** €934/month + full tuition + travel\n• **Deadline:** March 31, 2025 (apply now!)\n• **Requirements:** CGPA ≥ 3.0, IELTS 6.5, 2 years work experience\n• **Key tip:** Contact a German professor BEFORE applying.\n\nNeed help? Our **Standard Package (৳5,000)** includes professional SOP writing by DAAD alumni.`

  if (q.includes('japan') || q.includes('mext'))
    return `**MEXT Scholarship** — Japanese Government's flagship award:\n\n• **Amount:** ¥143,000/month + full tuition + airfare\n• **Deadline:** May 26, 2025\n• **Levels:** Bachelor's, Master's, PhD\n• **Requirements:** Under 35, GPA ≥ 3.0, good health\n• **Key tip:** Apply through the Bangladesh Embassy — take the written exam seriously!\n\nNeed help with MEXT documents? Our **Standard Package (৳5,000)** covers everything.`

  if (q.includes('korea') || q.includes('gks') || q.includes('kgsp'))
    return `**GKS/KGSP Scholarship** — Korean Government Scholarship:\n\n• **Amount:** ₩900,000/month + full tuition + Korean language training\n• **Deadline:** April 30, 2025\n• **Levels:** Master's, PhD\n• **Requirements:** Under 40, GPA ≥ 2.64\n• **Key tip:** Apply through Bangladesh Embassy route for better chances.\n\nOur **Standard Package** includes GKS application support.`

  if (q.includes('uk') || q.includes('chevening') || q.includes('commonwealth'))
    return `**Chevening Scholarship** — UK government's flagship award:\n\n• **Amount:** Full tuition + £1,393/month + flights\n• **Deadline:** November 5, 2025\n• **Level:** Master's only\n• **Key:** Chevening selects for LEADERSHIP, not just academics\n• **Tip:** Apply to 3 UK universities simultaneously.\n\nOur **Premium Package (৳8,000)** includes Chevening essay coaching.`

  if (q.includes('usa') || q.includes('fulbright') || q.includes('america'))
    return `**Fulbright Scholarship** — Most prestigious US award:\n\n• **Amount:** Full tuition + monthly stipend + flights\n• **Deadline:** February 15, 2026\n• **Levels:** Master's, PhD\n• **Requirements:** IELTS 7.0+, strong leadership record\n• **Key tip:** Apply through USEFB Bangladesh — start 6 months early!\n\nNeed Fulbright SOP help? Our **Premium Package** includes coaching.`

  if (q.includes('australia') || q.includes('canada'))
    return `**Australia Awards & Vanier (Canada):**\n\n🇦🇺 **Australia Awards:**\n• Amount: AUD $26,000/year + tuition\n• Deadline: April 30, 2025\n• Levels: Bachelor's, Master's\n\n🇨🇦 **Vanier Canada:**\n• Amount: CAD $50,000/year × 3 years\n• Deadline: November 1, 2025\n• Level: PhD only\n• Very competitive — need top academic record\n\nNeed help applying? Check our **Services page** for packages.`

  if (q.includes('ielts') || q.includes('english'))
    return `**IELTS Requirements for Top Scholarships:**\n\n• DAAD Germany: **6.5** overall\n• Chevening UK: **6.5** (no band < 5.5)\n• Australia Awards: **6.5**\n• Fulbright USA: **7.0** recommended\n• GKS Korea: **5.5–6.0**\n• MEXT Japan: **6.0+**\n\n**3-Month Plan (5.5 → 6.5+):**\n• Month 1: Writing focus\n• Month 2: Speaking practice 3x/week\n• Month 3: Full mock tests every weekend`

  if (q.includes('document') || q.includes('sop') || q.includes('cv'))
    return `**Essential Documents for Scholarship Applications:**\n\n• ✅ Academic transcripts (certified)\n• ✅ Statement of Purpose (2 pages max)\n• ✅ CV/Resume (Europass for Europe)\n• ✅ 2–3 Recommendation Letters\n• ✅ IELTS/TOEFL certificate\n• ✅ Passport copy\n\n**SOP Tip:** Be specific about research goals, why THIS country, and your return plan for Bangladesh. Generic statements are the #1 rejection reason.`

  if (q.includes('phd') || q.includes('doctorate'))
    return `**Top Fully-Funded PhD Scholarships for Bangladeshi Students:**\n\n• 🇩🇪 **DAAD** — €1,200/month, deadline March 31\n• 🇯🇵 **MEXT** — ¥145,000/month, all fields\n• 🇺🇸 **Fulbright** — Full funding, very competitive\n• 🇰🇷 **GKS** — ₩1,000,000/month\n• 🇨🇦 **Vanier** — CAD $50,000/yr × 3 years\n• 🇨🇳 **CSC** — ¥3,500/month\n\n**Critical:** Contact a potential supervisor BEFORE applying. Without a professor's support, most PhD applications fail.`

  return `**ScholarPath AI Advisor — How Can I Help?**\n\nI can assist with:\n\n• 🔍 Finding the right scholarship for your profile\n• 📝 SOP and motivation letter writing tips\n• 📋 Document checklists for specific scholarships\n• 🌍 Country guides: Germany, UK, Japan, Korea, USA, Australia\n• 📊 IELTS requirements and preparation tips\n\nAsk me anything about studying abroad from Bangladesh!`
}

export async function askScholarshipAI(question, conversationHistory = []) {
  const token = localStorage.getItem('sp_token')

  // Call real backend API
  try {
    const response = await fetch(`${API_URL}/ai/ask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      },
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
    console.log('Backend AI unavailable, using fallback')
  }

  // Smart local fallback
  return localFallback(question)
}
