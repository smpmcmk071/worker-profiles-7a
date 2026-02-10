import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * Analyzes a person's numerology and suggests ideal professions
 * Based on Life Path, Soul Urge, and Archetype
 */
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { workerId } = await req.json();
    
    const worker = await base44.entities.WorkerProfile.get(workerId);
    
    const prompt = `You are an expert career counselor specializing in numerology and archetypes.

PERSON PROFILE:
- Name: ${worker.full_name}
- Birth Date: ${worker.birth_date}
- Life Path (Western): ${worker.life_path_western}
- Expression: ${worker.expression_western}
- Soul Urge: ${worker.soul_urge_western}
- Personality: ${worker.personality_western}
- Master Numbers: ${worker.master_numbers || 'None'}
- Archetype: ${worker.archetype_primary}
- Chinese Zodiac: ${worker.chinese_zodiac || 'Unknown'}
- Element: ${worker.element || 'Unknown'}

CURRENT PROFESSION: ${worker.profession_title || 'Not Set'}
CURRENT CATEGORY: ${worker.profession_category || 'Not Set'}

TASK: Analyze if their current profession aligns with their Life Path and Soul Urge. Then:
1. Rate the current profession fit (0-100)
2. Suggest 3 alternative professions that match their numerology
3. Explain their "Soul Contract" - why they might be called to this work
4. Provide an ideal specialization within their field

Life Path Professional Alignments:
- 1: Leaders, pioneers, judges, CEOs, entrepreneurs, innovators
- 2: Mediators, counselors, diplomats, nurses, therapists, HR specialists
- 3: Artists, writers, entertainers, designers, marketers, content creators
- 4: Engineers, builders, accountants, project managers, architects, analysts
- 5: Travelers, salespeople, journalists, consultants, investigators, researchers
- 6: Teachers, caregivers, social workers, family counselors, community organizers
- 7: Scientists, researchers, data analysts, mystics, investigators, legal researchers
- 8: Executives, financiers, real estate brokers, power strategists, business owners
- 9: Humanitarians, healers, philanthropists, spiritual leaders, social activists
- 11: Visionaries, spiritual teachers, innovators, motivational speakers, thought leaders
- 22: Master builders, nation builders, large-scale project organizers, systems architects
- 33: Master healers, spiritual teachers, universal helpers, counselors

Soul Urge Influence:
- Low Soul Urge (1-3): Needs personal expression and creativity in their role
- Mid Soul Urge (4-6): Needs structure, responsibility, and tangible results
- High Soul Urge (7-9): Needs deep meaning, spiritual purpose, and impact

Expression Number Influence:
- Determines HOW they naturally work and communicate
- Should match the communication style required by the profession

Return as JSON with this exact structure:
{
  "currentFitScore": 85,
  "currentFitReasoning": "Life Path 7 aligns perfectly with analytical legal work. The 'Seeker' archetype matches the investigative nature of being a Judge. However, the Soul Urge of 2 suggests a need for more collaborative and diplomatic work.",
  "suggestedProfessions": [
    {
      "title": "Mediator",
      "category": "legal",
      "reason": "Life Path 7 brings deep analysis, Soul Urge 2 brings diplomacy - perfect for conflict resolution."
    },
    {
      "title": "Legal Researcher",
      "category": "legal",
      "reason": "Seeker archetype thrives in uncovering precedents and hidden case law."
    },
    {
      "title": "Forensic Analyst",
      "category": "legal",
      "reason": "Combines analytical precision (LP 7) with investigative calling."
    }
  ],
  "soulContract": "You are here to uncover hidden truths and bring light to shadows. Your Life Path 7 gives you the gift of deep analysis and intuition, while your Element of Water allows you to flow through complex emotional situations. Your calling is to serve justice not through force, but through wisdom and discernment. You are meant to be a bridge between the seen and unseen, helping others understand what lies beneath the surface.",
  "idealSpecialization": "Alternative Dispute Resolution or Legal Ethics Research",
  "keyStrengths": [
    "Deep analytical thinking",
    "Intuitive pattern recognition", 
    "Ability to see hidden connections",
    "Patient and methodical approach"
  ],
  "growthAreas": [
    "May need to balance solitude with collaboration",
    "Should avoid becoming overly critical or isolated",
    "Remember to trust gut instinct alongside logic"
  ]
};

    const analysis = await base44.integrations.Core.InvokeLLM({
      prompt,
      response_json_schema: {
        type: 'object',
        properties: {
          currentFitScore: { type: 'number' },
          currentFitReasoning: { type: 'string' },
          suggestedProfessions: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                title: { type: 'string' },
                category: { type: 'string' },
                reason: { type: 'string' }
              }
            }
          },
          soulContract: { type: 'string' },
          idealSpecialization: { type: 'string' },
          keyStrengths: {
            type: 'array',
            items: { type: 'string' }
          },
          growthAreas: {
            type: 'array',
            items: { type: 'string' }
          }
        }
      }
    });

    return Response.json({ success: true, analysis });
    
  } catch (error) {
    return Response.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
});