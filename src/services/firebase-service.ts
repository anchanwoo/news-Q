// src/services/firebase-service.ts
import { initializeApp, getApps, applicationDefault } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { type FilteredArticle } from '@/lib/types';
import { type GenerateArticleAnalysisOutput } from '@/ai/flows/reformat-news-article';

// Define the structure of the fully analyzed and cached article
export interface AnalyzedArticle extends FilteredArticle {
  analysis: GenerateArticleAnalysisOutput;
}

// --- Firebase Admin Initialization ---
let db: Firestore;

/**
 * Initializes the Firebase Admin SDK and returns the Firestore instance.
 */
function getDb(): Firestore {
  if (db) {
    return db;
  }

  // In a managed Google Cloud environment like App Hosting, calling initializeApp()
  // without arguments allows the SDK to automatically discover the service account credentials.
  if (getApps().length === 0) {
    initializeApp();
  }
  
  db = getFirestore();
  return db;
}

const ARTICLES_COLlection = 'analyzedArticles';
const CACHE_DOCUMENT_ID = 'latest';


/**
 * Caches the list of analyzed articles to a single document in Firestore.
 * This overwrites the previous day's news.
 * @param articles The array of fully analyzed articles to cache.
 */
export async function cacheArticles(articles: AnalyzedArticle[]): Promise<void> {
  try {
    const firestore = getDb();
    const cacheDocRef = firestore.collection(ARTICLES_COLLECTION).doc(CACHE_DOCUMENT_ID);

    console.log(`Caching ${articles.length} articles to Firestore...`);
    await cacheDocRef.set({
      articles,
      updatedAt: new Date().toISOString(),
    });
    console.log('Successfully cached articles.');
  } catch (error) {
    // Re-throw the error to be handled by the calling function (e.g., the cron job).
    // This ensures that failures in caching are not silent.
    console.error(`[CRITICAL] Failed to cache articles to Firestore. Error: ${(error as Error).message}`);
    throw error;
  }
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
    console.error(`[CRITICAL] Could not get cached articles from Firestore. The most likely cause is a missing or misconfigured GOOGLE_APPLICATION_CREDENTIALS environment variable. Error: ${(error as Error).message}`);
    // Return empty to avoid crashing the app, but log a critical error.
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
