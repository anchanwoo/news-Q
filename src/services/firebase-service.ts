// src/services/firebase-service.ts
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { FilteredArticle } from '@/lib/types';
import { GenerateArticleAnalysisOutput } from '@/ai/flows/reformat-news-article';

// Define the structure of the fully analyzed and cached article
export interface AnalyzedArticle extends FilteredArticle {
  analysis: GenerateArticleAnalysisOutput;
}

// --- Firebase Admin Initialization ---
// This safely initializes the Firebase Admin SDK, reusing the existing app if it's already initialized.
function initializeFirebaseAdmin() {
  if (getApps().length > 0) {
    return;
  }
  
  // App Hosting provides the GOOGLE_APPLICATION_CREDENTIALS env var.
  // The SDK automatically picks it up, so no explicit config is needed.
  // For local dev, you'd set this env var to point to your service account key file.
   try {
    initializeApp();
  } catch (e) {
     console.log("Could not init firebase, probably because of missing credentials. This is fine for local dev if you're not testing cron jobs.");
  }
}

// --- Firestore Service ---
let db: Firestore;

function getDb(): Firestore {
  initializeFirebaseAdmin();
  if (!db) {
    db = getFirestore();
  }
  return db;
}

const ARTICLES_COLLECTION = 'analyzedArticles';
const CACHE_DOCUMENT_ID = 'latest';


/**
 * Caches the list of analyzed articles to a single document in Firestore.
 * This overwrites the previous day's news.
 * @param articles The array of fully analyzed articles to cache.
 */
export async function cacheArticles(articles: AnalyzedArticle[]): Promise<void> {
  const firestore = getDb();
  const cacheDocRef = firestore.collection(ARTICLES_COLLECTION).doc(CACHE_DOCUMENT_ID);

  console.log(`Caching ${articles.length} articles to Firestore...`);
  await cacheDocRef.set({
    articles,
    updatedAt: new Date().toISOString(),
  });
  console.log('Successfully cached articles.');
}

/**
 * Retrieves the cached list of articles from Firestore.
 * @returns An array of AnalyzedArticle, or an empty array if not found.
 */
export async function getCachedArticles(): Promise<AnalyzedArticle[]> {
  try {
    const firestore = getDb();
    const cacheDocRef = firestore.collection(ARTICLES_COLLECTION).doc(CACHE_DOCUMENT_ID);
    const docSnap = await cacheDocRef.get();

    if (!docSnap.exists) {
      console.log('No cached articles document found.');
      return [];
    }

    const data = docSnap.data();
    return data?.articles || [];
  } catch (error) {
    console.error("Error getting cached articles:", error);
    // In case of error (e.g., permissions), return empty to avoid crashing the app.
    return [];
  }
}

/**
 * Retrieves a single article by its slug from the cached document.
 * @param slug The URL slug of the article to find.
 * @returns The found AnalyzedArticle, or null if not found.
 */
export async function getArticleBySlug(slug: string): Promise<AnalyzedArticle | null> {
    const articles = await getCachedArticles();
    if (!articles || articles.length === 0) {
        return null;
    }
    const article = articles.find(a => a.slug === slug);
    return article || null;
}
