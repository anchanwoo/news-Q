import type { Article } from './types';

export const mockArticles: Article[] = [
  {
    title: 'US Tech Giant Announces Major AI Breakthrough',
    description:
      'A leading US-based technology company has unveiled a new AI model that promises to revolutionize natural language processing and creative content generation.',
    link: 'https://example.com/news/us-tech-ai-breakthrough',
    slug: 'us-tech-ai-breakthrough',
    source: 'USA',
    fullContent: `
      Silicon Valley was buzzing today as innovation leader OmniCorp announced what it calls "the next leap in artificial intelligence." The new model, codenamed "Prometheus," is said to be capable of understanding context and nuance with near-human accuracy.
      During a live demonstration, Prometheus drafted a short screenplay, composed a classical music piece, and debated philosophy, showcasing its versatile capabilities.
      CEO Alex Chen stated, "This isn't just an improvement; it's a paradigm shift. We're open-sourcing key components to accelerate global innovation." The move has been lauded by the tech community as a significant step towards democratizing AI.
    `,
  },
  {
    title: 'South Korean Chip Manufacturer to Build New Mega-Factory',
    description:
      'In a bid to dominate the global semiconductor market, a South Korean electronics titan has announced plans for a new state-of-the-art manufacturing facility.',
    link: 'https://example.com/news/sk-chip-mega-factory',
    slug: 'sk-chip-mega-factory',
    source: 'Korea',
    fullContent: `
      Seoul, South Korea – In a landmark announcement, K-Electronics confirmed today it will invest $50 billion in a new semiconductor "mega-factory" south of Seoul. The facility aims to produce next-generation 2-nanometer chips, crucial for AI, data centers, and autonomous vehicles.
      The project is expected to create over 10,000 high-skilled jobs and solidify South Korea's position as the world leader in memory and logic chip production. Government officials have pledged full support, streamlining regulations to expedite construction, which is slated to begin in early 2025.
    `,
  },
  {
    title: 'China Launches Ambitious Space Program for Asteroid Mining',
    description:
      'The China National Space Administration (CNSA) has officially launched a new program aimed at exploring and eventually mining resource-rich asteroids.',
    link: 'https://example.com/news/china-asteroid-mining-program',
    slug: 'china-asteroid-mining-program',
    source: 'China',
    fullContent: `
      Beijing, China – The CNSA has set its sights on the stars with its new "Star Harvester" initiative. The program will deploy a fleet of robotic probes to identify and analyze near-Earth asteroids for valuable minerals like platinum, cobalt, and nickel.
      A long-term mission goal includes establishing a robotic outpost on a large metallic asteroid by 2040. "The resources in space are limitless," said program director Dr. Li Wei. "This is a strategic investment in our nation's future."
    `,
  },
  {
    title: 'Japan Unveils World\'s First High-Speed Hydrogen-Powered Train',
    description:
      'A Japanese railway company has successfully tested a new prototype of its Shinkansen (bullet train) that runs entirely on clean hydrogen fuel.',
    link: 'https://example.com/news/japan-hydrogen-train',
    slug: 'japan-hydrogen-train',
    source: 'Japan',
    fullContent: `
      Tokyo, Japan – Japan continues to pioneer green technology with the unveiling of the "H2-Liner," a revolutionary bullet train that emits only water. Developed by JR East, the train uses advanced hydrogen fuel cells to generate electricity, reaching speeds of up to 320 km/h.
      This innovation is part of Japan's broader strategy to achieve carbon neutrality by 2050. The H2-Liner is expected to enter commercial service on select routes by 2028 after rigorous safety and performance testing.
    `,
  },
  {
    title: 'Saudi Arabia Announces NEOM\'s First Phase Completion',
    description:
      'Saudi officials announced the completion of the first residential and commercial sectors of NEOM, the futuristic megacity being built on the Red Sea coast.',
    link: 'https://example.com/news/saudi-neom-phase-one',
    slug: 'saudi-neom-phase-one',
    source: 'Saudi Arabia',
    fullContent: `
      Riyadh, Saudi Arabia – The ambitious vision for NEOM is taking shape. Authorities have announced that "The Line," a linear city within NEOM, has completed its initial phase. The first residents, primarily researchers and tech pioneers, are expected to move in by the end of the year.
      Powered entirely by renewable energy and featuring advanced AI-driven public services, NEOM is the centerpiece of Saudi Arabia's Vision 2030 plan to diversify its economy away from oil. The project continues to attract significant international investment and talent.
    `,
  },
  {
    title: 'US Federal Reserve Signals Shift in Economic Policy',
    description:
      'In its latest meeting, the US Federal Reserve hinted at a potential change in its monetary policy, citing evolving inflation data and a stabilizing job market.',
    link: 'https://example.com/news/us-fed-policy-shift',
    slug: 'us-fed-policy-shift',
    source: 'USA',
    fullContent: `
      Washington D.C. – Economists are closely analyzing statements from the Federal Reserve, which suggested a more dovish stance in the coming months. The central bank acknowledged that inflation has shown signs of cooling faster than anticipated.
      While no immediate changes were made to interest rates, the shift in tone has led to a rally in stock markets. Analysts predict a possible rate cut in the next quarter if economic trends continue on their current trajectory.
    `,
  },
];
