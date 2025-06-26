// Firebase 대신 사용할 목업 뉴스 데이터
export const mockNews = [
  {
    id: '1',
    title: 'Revolutionary AI Breakthrough Transforms Global Industries',
    description: 'Artificial intelligence technology is rapidly advancing, bringing innovative changes across various industrial sectors worldwide.',
    category: 'Technology',
    source: 'Tech News',
    link: '#',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    slug: 'ai-innovation-future',
    relevanceScore: 95,
    reason: 'The rapid advancement of AI technology and its impact across industries represents a crucial global issue.',
    analysis: {
      briefing: `The rapid advancement of AI technology is accelerating digital innovation worldwide.

Particularly from conversational AI like ChatGPT to autonomous driving, medical diagnostics, and financial analysis, the application scope of AI is expanding dramatically.

These changes go beyond mere technological progress, driving structural changes throughout society, and are expected to fundamentally transform human life over the next decade.`,
      editorsNote: `This AI technological advancement is showing particularly notable results in automation, data analysis, and personalized services.

However, new challenges such as job displacement, privacy protection, and AI ethics are also emerging, requiring a balanced approach between technological advancement and social preparation.

Especially for Korea, as a semiconductor and IT infrastructure powerhouse, this presents a great opportunity to play a central role in AI innovation.`,
      timeline: [
        { date: 'Nov 2022', event: 'ChatGPT launch begins generative AI popularization' },
        { date: 'Mar 2023', event: 'GPT-4 announcement opens multimodal AI era' },
        { date: 'Jul 2023', event: 'Competition accelerates with Google Bard, Microsoft Copilot' },
        { date: 'Jan 2024', event: 'Enterprise AI solutions enter full commercialization' },
        { date: 'Dec 2024', event: 'Real-time AI agents commercialized' }
      ],
      keyFigures: [
        {
          name: 'Sam Altman',
          profile: 'CEO of OpenAI, leading the generative AI revolution through ChatGPT. He aims for safe AI development and implementation that benefits humanity, currently having significant influence on global AI policy and development direction.'
        },
        {
          name: 'Sundar Pichai',
          profile: 'CEO of Google, driving AI-first strategy and leading Google\'s AI technology development. He oversees development of AI models like Bard and Gemini, focusing on democratization and improved accessibility of AI technology.'
        }
      ],
      povCrossfire: {
        analysis: `American media focuses on economic opportunities and innovation from AI technological advancement, while European media emphasizes AI regulation and ethical aspects.

Chinese media reports from the perspective of AI technological independence and national competitiveness enhancement, while Korean media concentrates on Korea\'s position and response strategies in global AI competition.

These differences in perspective reflect the differences in each country\'s AI policies and development strategies.`,
        comparedArticles: [
          { title: 'AI Revolution Drives Economic Growth', source: 'Wall Street Journal' },
          { title: 'EU Pushes for Stricter AI Regulations', source: 'Financial Times' },
          { title: 'China Accelerates Independent AI Technology Development', source: 'China Daily' }
        ]
      },
      publicSentiment: {
        platforms: [
          { name: 'Reddit r/technology', sentiment: 'Optimistic', percentage: 72, sample: 'Amazing how fast AI is evolving. Can\'t wait to see what\'s next!' },
          { name: 'Twitter/X', sentiment: 'Mixed', percentage: 58, sample: 'AI progress is exciting but also scary. We need better regulations.' },
          { name: 'Hacker News', sentiment: 'Analytical', percentage: 81, sample: 'The technical implementation is impressive, but scalability remains a challenge.' },
          { name: 'LinkedIn', sentiment: 'Professional', percentage: 85, sample: 'Companies need to start preparing their workforce for AI integration now.' }
        ],
        summary: 'Public opinion shows cautious optimism about AI advancement, with tech communities more enthusiastic than general public. Main concerns center around job security and ethical implications.'
      }
    }
  },
  {
    id: '2',
    title: 'Global Economic Trends and Impact on Korean Markets',
    description: 'Analyzing how recent global economic changes are affecting the Korean economy.',
    category: 'Business',
    source: 'Economic Times',
    link: '#',
    imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    slug: 'global-economy-korea',
    relevanceScore: 88,
    reason: 'Important economic news analyzing the direct impact of global economic changes on the Korean economy.',
    analysis: {
      briefing: `Global supply chain restructuring and inflationary pressures are having complex effects on the Korean economy.

The prolonged US-China trade conflict and rising energy prices due to the Russia-Ukraine war are acting as major variables, directly impacting Korea\'s export-dependent economic structure.

Particularly in Korea\'s key industries such as semiconductors, automobiles, and chemicals, diversification of raw material procurement and export routes has emerged as an urgent task.`,
      editorsNote: `Changes in the semiconductor, automotive, and chemical industries are particularly noteworthy.

Korea is pursuing strategies such as supply chain diversification, new market development, and expanded investment in advanced technology to respond to these global changes.

The government\'s K-New Deal policy and companies\' digital transformation efforts are analyzed as key factors that can turn these challenges into opportunities.`,
      financials: [
        { period: 'Q4 2024', revenue: '$1.2T', profit: '$150B', change: '+3.2%' },
        { period: 'Q3 2024', revenue: '$1.15T', profit: '$145B', change: '+2.8%' },
        { period: 'Q2 2024', revenue: '$1.1T', profit: '$140B', change: '+2.1%' }
      ],
      marketSnapshot: {
        keyCompetitors: ['Japan', 'Germany', 'China'],
        sectorOutlook: 'Despite global economic uncertainty, Korea\'s growth potential based on technological competitiveness and innovation capacity is highly evaluated.',
        analystsTake: 'The Korean economy is expected to be affected by global economic slowdown in the short term, but in the medium to long term, it is projected to secure new growth engines through investment in advanced technology and green transition.'
      },
      outlook: 'The Korean economy in 2025 is expected to show gradual growth along with global economic recovery, with investment expansion in AI, bio, and renewable energy sectors particularly expected to serve as new growth engines.',
      publicSentiment: {
        platforms: [
          { name: 'Naver Cafe Economics', sentiment: 'Concerned', percentage: 45, sample: '경제 불확실성이 계속되고 있어 걱정이 많습니다.' },
          { name: 'DC Inside Economy Gallery', sentiment: 'Pessimistic', percentage: 38, sample: '반도체 업계 전망이 어둡다. 투자 조심해야 할 때.' },
          { name: 'Blind (Korean)', sentiment: 'Cautious', percentage: 52, sample: 'IT업계도 영향 받을 것 같은데 준비가 필요함.' }
        ],
        summary: 'Korean online communities show heightened concern about economic uncertainty, particularly regarding semiconductor and tech sectors. Sentiment is more cautious compared to global optimism.'
      }
    }
  },
  {
    id: '3',
    title: 'Strengthening International Cooperation for Climate Change Response',
    description: 'The world is exploring new cooperation measures to respond to climate change.',
    category: 'Politics',
    source: 'Global News',
    link: '#',
    imageUrl: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    slug: 'climate-change-cooperation',
    relevanceScore: 82,
    reason: 'Climate change is a global issue where international cooperation is essential, making it an important political issue.',
    analysis: {
      briefing: `Since the Paris Climate Agreement, specific implementation measures for achieving each country\'s carbon neutrality goals are being discussed.

Particularly, building an international cooperation system to realize the fossil fuel transition roadmap agreed upon at COP28 has emerged as a key task.

Expanding climate funds and technology transfer measures to support developing countries\' green transition have also become important discussion topics.`,
      editorsNote: `Renewable energy investment expansion and carbon tax introduction are emerging as major issues.

To achieve the NDC (Nationally Determined Contributions) targets presented by each country, much stronger policies and investments than current levels are needed.

Particularly for Korea, a comprehensive approach including energy transition, industrial structure reform, and Green New Deal investment is needed to achieve the 2050 carbon neutrality goal.`,
      timeline: [
        { date: 'Dec 2015', event: 'Paris Climate Agreement signed' },
        { date: 'Nov 2021', event: 'COP26 Glasgow Climate Pact' },
        { date: 'Dec 2023', event: 'COP28 fossil fuel transition agreement' },
        { date: 'Jun 2024', event: 'Korea K-Taxonomy final plan announced' }
      ],
      keyFigures: [
        {
          name: 'António Guterres',
          profile: 'UN Secretary-General leading international cooperation for climate change response. He defines the climate crisis as humanity\'s greatest challenge and urges more active action from governments and businesses worldwide.'
        }
      ]
    }
  },
  {
    id: '4',
    title: 'Japan\'s New Digital Currency Initiative Sparks Regional Interest',
    description: 'Japan announces comprehensive digital yen pilot program, influencing Asian financial markets.',
    category: 'Business',
    source: 'Nikkei Asia',
    link: '#',
    imageUrl: 'https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    slug: 'japan-digital-currency',
    relevanceScore: 79,
    reason: 'Japan\'s digital currency initiative could reshape Asian financial landscape and influence global CBDC adoption.',
    analysis: {
      briefing: `Japan\'s central bank announces a major digital yen pilot program, marking a significant step in the country\'s digital transformation strategy.

The initiative aims to modernize Japan\'s financial infrastructure while maintaining the stability and security that characterizes the nation\'s banking system.

This move positions Japan as a leader in Asian digital currency development, potentially influencing neighboring countries\' financial policies.`,
      editorsNote: `The timing of this announcement is particularly strategic, as Japan seeks to maintain its financial competitiveness in an increasingly digital world.

With China\'s digital yuan already in circulation and South Korea exploring similar initiatives, Japan\'s entry into the CBDC space could accelerate regional adoption.

The pilot program\'s success could serve as a model for other developed nations considering digital currency implementation.`,
      publicSentiment: {
        platforms: [
          { name: '2channel Finance', sentiment: 'Skeptical', percentage: 43, sample: 'デジタル円は本当に必要？現金の方が安全だと思う' },
          { name: 'Yahoo Finance Japan', sentiment: 'Interested', percentage: 67, sample: 'キャッシュレス社会への重要な一歩。期待している' },
          { name: 'Mixi Finance Community', sentiment: 'Cautious', percentage: 55, sample: 'プライバシーの問題が心配。もっと詳細が知りたい' }
        ],
        summary: 'Japanese online communities show mixed reactions, with younger demographics more supportive while older users express concerns about privacy and the necessity of digital currency.'
      }
    }
  },
  {
    id: '5',
    title: 'European Space Agency Announces Mars Colony Blueprint',
    description: 'ESA reveals detailed plans for sustainable human settlement on Mars by 2040.',
    category: 'Technology',
    source: 'Space Today',
    link: '#',
    imageUrl: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    slug: 'mars-colony-blueprint',
    relevanceScore: 75,
    reason: 'Mars colonization represents humanity\'s next frontier and could revolutionize space exploration.',
    analysis: {
      briefing: `The European Space Agency unveils an ambitious roadmap for establishing a self-sustaining human colony on Mars within the next two decades.

The blueprint includes revolutionary life support systems, advanced habitat construction using Martian resources, and sustainable food production methods.

This initiative represents a collaborative effort between European nations and could mark a new era in human space exploration.`,
      editorsNote: `While the timeline appears ambitious, ESA\'s systematic approach and proven track record in space missions lend credibility to the proposal.

The project\'s emphasis on sustainability and resource utilization demonstrates lessons learned from Earth\'s environmental challenges.

Success could position Europe as the leader in interplanetary colonization, with significant implications for future space commerce and exploration.`,
      publicSentiment: {
        platforms: [
          { name: 'Reddit r/space', sentiment: 'Enthusiastic', percentage: 89, sample: 'This is exactly what humanity needs! Mars here we come!' },
          { name: 'ESA Forum', sentiment: 'Analytical', percentage: 76, sample: 'The technical challenges are immense, but the engineering approach looks solid.' },
          { name: 'Twitter Space Community', sentiment: 'Excited', percentage: 82, sample: 'Finally! A realistic timeline for Mars colonization. Can\'t wait to see this happen.' }
        ],
        summary: 'Space enthusiast communities worldwide show overwhelming excitement and support, with detailed technical discussions about feasibility and implementation challenges.'
      }
    }
  },
  {
    id: '6',
    title: 'Brazil\'s Amazon Reforestation Project Shows Remarkable Results',
    description: 'Innovative technology and community involvement lead to 40% reduction in deforestation.',
    category: 'Politics',
    source: 'Environmental Post',
    link: '#',
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    slug: 'amazon-reforestation-success',
    relevanceScore: 73,
    reason: 'Amazon reforestation success offers hope for global climate action and biodiversity preservation.',
    analysis: {
      briefing: `Brazil\'s comprehensive Amazon reforestation initiative achieves unprecedented success, with deforestation rates dropping by 40% in targeted regions.

The program combines satellite monitoring, drone surveillance, and community-based conservation efforts to protect and restore critical rainforest areas.

International funding and indigenous community partnerships have been crucial to the project\'s success, offering a model for global conservation efforts.`,
      editorsNote: `This achievement comes at a critical time when global climate commitments are under scrutiny and environmental protection faces political challenges.

The project\'s success demonstrates that effective environmental policy can achieve measurable results when properly funded and implemented.

The model could be replicated in other critical ecosystems worldwide, potentially accelerating global reforestation efforts.`,
      publicSentiment: {
        platforms: [
          { name: 'Reddit r/environment', sentiment: 'Hopeful', percentage: 91, sample: 'Finally some good environmental news! This gives me hope for the future.' },
          { name: 'Facebook Environmental Groups', sentiment: 'Supportive', percentage: 84, sample: 'This is what happens when we prioritize our planet. More countries need to follow Brazil\'s example.' },
          { name: 'Instagram Eco Influencers', sentiment: 'Inspiring', percentage: 88, sample: 'Proof that we can reverse environmental damage when we work together! 🌱' }
        ],
        summary: 'Environmental communities worldwide celebrate the news as a rare positive development in climate action, with many calling for similar initiatives in their own countries.'
      }
    }
  }
];

// Firebase 대신 사용할 함수들
export async function getMockArticles() {
  // 실제 서비스에서는 여기서 API 호출하거나 파일에서 읽어옴
  return mockNews;
}

export async function getMockArticleBySlug(slug: string) {
  return mockNews.find(article => article.slug === slug) || null;
} 