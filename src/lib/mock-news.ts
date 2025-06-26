// Firebase 대신 사용할 목업 뉴스 데이터
export const mockNews = [
  {
    id: '1',
    title: 'AI 기술의 혁신적 발전이 가져올 미래 변화',
    description: '인공지능 기술이 빠르게 발전하면서 다양한 산업 분야에서 혁신적인 변화가 일어나고 있습니다.',
    category: 'Technology',
    source: 'Tech News',
    link: '#',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    slug: 'ai-innovation-future',
    relevanceScore: 95,
    reason: 'AI 기술의 급속한 발전과 산업 전반에 미치는 영향이 매우 중요한 글로벌 이슈입니다.',
    analysis: {
      briefing: `AI 기술의 급속한 발전으로 인해 전 세계적으로 디지털 혁신이 가속화되고 있습니다.

특히 ChatGPT와 같은 대화형 AI부터 자율주행, 의료 진단, 금융 분석에 이르기까지 AI의 응용 범위가 급격히 확장되고 있습니다.

이러한 변화는 단순히 기술적 진보를 넘어서 사회 전반의 구조적 변화를 이끌어내고 있으며, 향후 10년간 인류의 삶을 근본적으로 바꿀 것으로 전망됩니다.`,
      editorsNote: `이번 AI 기술 발전은 특히 자동화, 데이터 분석, 그리고 개인화 서비스 분야에서 두드러진 성과를 보이고 있습니다.

하지만 동시에 일자리 대체, 개인정보 보호, AI 윤리 등의 새로운 과제들도 함께 대두되고 있어 기술 발전과 사회적 준비가 균형있게 이루어져야 할 시점입니다.

특히 한국은 반도체와 IT 인프라 강국으로서 AI 혁신의 중심 역할을 할 수 있는 좋은 기회를 맞고 있습니다.`,
      timeline: [
        { date: '2022-11', event: 'ChatGPT 출시로 생성형 AI 대중화 시작' },
        { date: '2023-03', event: 'GPT-4 발표, 멀티모달 AI 시대 개막' },
        { date: '2023-07', event: '구글 Bard, 마이크로소프트 Copilot 등 경쟁 가속화' },
        { date: '2024-01', event: '기업용 AI 솔루션 본격 상용화' },
        { date: '2024-12', event: '실시간 AI 에이전트 상용화' }
      ],
      keyFigures: [
        {
          name: '샘 알트만 (Sam Altman)',
          profile: 'OpenAI의 CEO로서 ChatGPT를 통해 생성형 AI 혁명을 이끌고 있는 인물입니다. 그는 AI 기술의 안전한 개발과 인류에게 도움이 되는 AI 구현을 목표로 하고 있으며, 현재 전 세계 AI 정책과 발전 방향에 큰 영향을 미치고 있습니다.'
        },
        {
          name: '순다르 피차이 (Sundar Pichai)',
          profile: '구글의 CEO로서 AI 퍼스트 전략을 추진하며 구글의 AI 기술 발전을 이끌고 있습니다. Bard, Gemini 등의 AI 모델 개발을 총괄하며, AI 기술의 민주화와 접근성 향상에 중점을 두고 있습니다.'
        }
      ],
      povCrossfire: {
        analysis: `미국 언론은 AI 기술 발전의 경제적 기회와 혁신에 초점을 맞추고 있는 반면, 유럽 언론은 AI 규제와 윤리적 측면을 더 강조하고 있습니다.

중국 언론은 AI 기술 자립과 국가 경쟁력 강화 측면에서 보도하고 있으며, 한국 언론은 글로벌 AI 경쟁에서의 한국의 위치와 대응 전략에 집중하고 있습니다.

이러한 관점의 차이는 각국의 AI 정책과 발전 전략의 차이를 반영하고 있습니다.`,
        comparedArticles: [
          { title: 'AI Revolution Drives Economic Growth', source: 'Wall Street Journal' },
          { title: 'EU Pushes for Stricter AI Regulations', source: 'Financial Times' },
          { title: '中 AI 자립 기술 개발 가속화', source: 'China Daily' }
        ]
      }
    }
  },
  {
    id: '2',
    title: '글로벌 경제 동향과 한국 시장에 미치는 영향',
    description: '최근 글로벌 경제 변화가 한국 경제에 미치는 영향을 분석해봅니다.',
    category: 'Business',
    source: 'Economic Times',
    link: '#',
    imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    slug: 'global-economy-korea',
    relevanceScore: 88,
    reason: '글로벌 경제 변화가 한국 경제에 미치는 직접적인 영향을 분석한 중요한 경제 뉴스입니다.',
    analysis: {
      briefing: `글로벌 공급망 재편과 인플레이션 압력이 한국 경제에 복합적인 영향을 미치고 있습니다.

미중 무역 갈등의 장기화와 러시아-우크라이나 전쟁으로 인한 에너지 가격 상승이 주요 변수로 작용하고 있으며, 이는 한국의 수출 의존적 경제 구조에 직접적인 영향을 미치고 있습니다.

특히 반도체, 자동차, 화학 등 한국의 주력 산업에서 원자재 조달과 수출 경로 다변화가 시급한 과제로 대두되고 있습니다.`,
      editorsNote: `특히 반도체, 자동차, 화학 산업에서의 변화가 주목할 만합니다.

한국은 이러한 글로벌 변화에 대응하기 위해 공급망 다변화, 신시장 개척, 그리고 첨단 기술 투자 확대 등의 전략을 추진하고 있습니다.

정부의 K-뉴딜 정책과 기업들의 디지털 전환 노력이 이러한 도전을 기회로 전환할 수 있는 핵심 요소가 될 것으로 분석됩니다.`,
      financials: [
        { period: 'Q4 2024', revenue: '$1.2T', profit: '$150B', change: '+3.2%' },
        { period: 'Q3 2024', revenue: '$1.15T', profit: '$145B', change: '+2.8%' },
        { period: 'Q2 2024', revenue: '$1.1T', profit: '$140B', change: '+2.1%' }
      ],
      marketSnapshot: {
        keyCompetitors: ['일본', '독일', '중국'],
        sectorOutlook: '글로벌 경제 불확실성 속에서도 한국의 기술 경쟁력과 혁신 역량을 바탕으로 한 성장 가능성이 높게 평가되고 있습니다.',
        analystsTake: '한국 경제는 단기적으로는 글로벌 경기 둔화의 영향을 받겠지만, 중장기적으로는 첨단 기술과 녹색 전환 투자를 통해 새로운 성장 동력을 확보할 것으로 전망됩니다.'
      },
      outlook: '2025년 한국 경제는 글로벌 경기 회복과 함께 점진적인 성장세를 보일 것으로 예상되며, 특히 AI, 바이오, 신재생 에너지 분야에서의 투자 확대가 새로운 성장 엔진 역할을 할 것으로 전망됩니다.'
    }
  },
  {
    id: '3',
    title: '기후 변화 대응을 위한 국제 협력 강화',
    description: '전 세계가 기후 변화에 대응하기 위한 새로운 협력 방안을 모색하고 있습니다.',
    category: 'Politics',
    source: 'Global News',
    link: '#',
    imageUrl: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    slug: 'climate-change-cooperation',
    relevanceScore: 82,
    reason: '기후 변화는 전 지구적 문제로 국제 협력이 필수적인 중요한 정치적 이슈입니다.',
    analysis: {
      briefing: `파리 기후협정 이후 각국의 탄소 중립 목표 달성을 위한 구체적인 실행 방안이 논의되고 있습니다.

특히 COP28에서 합의된 화석연료 전환 로드맵을 실현하기 위한 국제적 협력 체계 구축이 핵심 과제로 부상하고 있습니다.

개발도상국의 녹색 전환을 지원하기 위한 기후 기금 확대와 기술 이전 방안도 중요한 논의 주제가 되고 있습니다.`,
      editorsNote: `재생에너지 투자 확대와 탄소세 도입 등이 주요 이슈로 부상하고 있습니다.

각국이 제시한 NDC(국가별 기여방안) 목표 달성을 위해서는 현재보다 훨씬 강화된 정책과 투자가 필요한 상황입니다.

특히 한국은 2050 탄소중립 목표 달성을 위해 에너지 전환, 산업 구조 개편, 그린 뉴딜 투자 등 종합적인 접근이 필요한 시점입니다.`,
      timeline: [
        { date: '2015-12', event: '파리 기후협정 체결' },
        { date: '2021-11', event: 'COP26 글래스고 기후 합의' },
        { date: '2023-12', event: 'COP28 화석연료 전환 합의' },
        { date: '2024-06', event: '한국 K-택소노미 최종안 발표' }
      ],
      keyFigures: [
        {
          name: '안토니우 구테흐스 (António Guterres)',
          profile: '유엔 사무총장으로서 기후 변화 대응을 위한 국제 협력을 주도하고 있습니다. 그는 기후 위기를 인류 최대의 도전으로 규정하고, 각국 정부와 기업의 더욱 적극적인 행동을 촉구하고 있습니다.'
        }
      ]
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