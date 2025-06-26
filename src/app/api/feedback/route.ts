import { NextRequest, NextResponse } from 'next/server';
import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp, getApps } from 'firebase-admin/app';

// Firebase 초기화
if (getApps().length === 0) {
  initializeApp();
}

const db = getFirestore();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, message, email, timestamp, userAgent, url } = body;

    // 입력 검증
    if (!type || !message) {
      return NextResponse.json(
        { error: '필수 필드가 누락되었습니다.' },
        { status: 400 }
      );
    }

    // Firestore에 피드백 저장
    const feedbackRef = db.collection('feedback');
    await feedbackRef.add({
      type,
      message,
      email: email || null,
      timestamp: timestamp || new Date().toISOString(),
      userAgent,
      url,
      status: 'new',
      createdAt: new Date(),
    });

    // 성공 응답
    return NextResponse.json(
      { success: true, message: '피드백이 성공적으로 전송되었습니다.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('피드백 저장 중 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // 관리자용: 모든 피드백 조회 (실제로는 인증 필요)
    const feedbackRef = db.collection('feedback');
    const snapshot = await feedbackRef.orderBy('createdAt', 'desc').limit(50).get();
    
    const feedbacks = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ feedbacks });
  } catch (error) {
    console.error('피드백 조회 중 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 