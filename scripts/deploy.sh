#!/bin/bash

# News-Q 배포 스크립트
echo "🚀 News-Q 배포를 시작합니다..."

# 1. 환경 변수 확인
if [ ! -f ".env.local" ]; then
    echo "❌ .env.local 파일이 없습니다. 환경 변수를 설정해주세요."
    exit 1
fi

# 2. 의존성 설치
echo "📦 의존성을 설치합니다..."
npm install

# 3. 타입 체크
echo "🔍 TypeScript 타입을 확인합니다..."
npm run typecheck

# 4. 린트 검사
echo "🔍 코드 품질을 확인합니다..."
npm run lint

# 5. 빌드
echo "🏗️ 프로덕션 빌드를 시작합니다..."
npm run build

# 6. Vercel 배포
echo "🚀 Vercel에 배포합니다..."
vercel --prod

echo "✅ 배포가 완료되었습니다!"
echo "🌐 사이트 URL: https://news-q.vercel.app" 