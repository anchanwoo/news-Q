# ニュースQ (News-Q) - AI 기반 뉴스 분석 서비스

## 📰 프로젝트 소개
AI가 세계의 뉴스를 다각도로 분석하여 깊이 있는 통찰력을 제공하는 뉴스 플랫폼입니다.

## ✨ 주요 기능
- 🤖 AI 기반 뉴스 필터링 및 분석
- 🔍 **실시간 웹 검색** - 추가 컨텍스트 및 배경 정보 수집
- 📊 실시간 뉴스 업데이트
- 🎯 카테고리별 뉴스 분류
- 📱 반응형 웹 디자인
- 🔄 자동 뉴스 캐싱 시스템

## 🛠️ 기술 스택
- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI
- **AI**: Google AI (Genkit)
- **Web Search**: SerpAPI (유료) / DuckDuckGo (무료 백업)
- **Database**: Firebase Firestore
- **Deployment**: Vercel/Google App Hosting

## 🚀 빠른 시작

### 1. 환경 변수 설정
```bash
# .env.local 파일 생성
GOOGLE_AI_API_KEY=your-google-ai-api-key

# 웹 검색 API (선택사항 - 더 정확한 검색 결과)
SERPAPI_API_KEY=your-serpapi-key

# Firebase 설정 (로컬 개발용)
GOOGLE_APPLICATION_CREDENTIALS=path/to/service-account.json
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 개발 서버 실행
```bash
npm run dev
```

### 4. 뉴스 업데이트 (수동)
```bash
# 브라우저에서 접속
http://localhost:9002/api/update-news
```

## 🔍 **웹 검색 기능**

### **SerpAPI (추천)**
- 더 정확하고 풍부한 검색 결과
- [SerpAPI](https://serpapi.com/)에서 API 키 발급
- 유료 서비스 (월 100회 무료)

### **DuckDuckGo (무료 백업)**
- SerpAPI가 없을 때 자동으로 사용
- 무료이지만 제한적인 결과
- API 키 불필요

## 📋 배포 가이드

### Vercel 배포
1. Vercel 계정 생성
2. GitHub 저장소 연결
3. 환경 변수 설정:
   - `GOOGLE_AI_API_KEY`
   - `SERPAPI_API_KEY` (선택사항)
4. 자동 배포

### Google App Hosting 배포
1. Google Cloud Console에서 프로젝트 생성
2. App Hosting 활성화
3. 환경 변수 설정
4. `gcloud app deploy` 명령어로 배포

## 🔄 자동화 설정

### Cron Job 설정 (Vercel)
```bash
# vercel.json에 추가
{
  "crons": [
    {
      "path": "/api/update-news",
      "schedule": "0 8 * * *"
    }
  ]
}
```

## 📊 모니터링
- Firebase Console에서 데이터 확인
- Vercel Analytics로 성능 모니터링
- Google Cloud Logging으로 에러 추적

## 🤝 기여하기
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## �� 라이선스
MIT License
