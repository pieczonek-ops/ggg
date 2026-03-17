import React, { useState, useEffect } from 'react';
import { auth, db, googleProvider, OperationType, handleFirestoreError } from './firebase';
import { onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { Article, Category } from './types';
import { Navbar } from './components/Navbar';
import { ArticleCard } from './components/ArticleCard';
import { ArticleDetail } from './components/ArticleDetail';
import { Editor } from './components/Editor';
import { Footer } from './components/Footer';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2, Plus } from 'lucide-react';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState<{ type: 'home' | 'category' | 'detail' | 'admin', payload?: any }>({ type: 'home' });
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });

    const q = query(collection(db, 'articles'), orderBy('createdAt', 'desc'));
    const unsubscribeArticles = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Article));
      setArticles(docs);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'articles');
    });

    return () => {
      unsubscribeAuth();
      unsubscribeArticles();
    };
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const handleLogout = () => signOut(auth);

  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(a => a.category === selectedCategory);

  const navigateTo = (type: 'home' | 'category' | 'detail' | 'admin', payload?: any) => {
    setCurrentView({ type, payload });
    if (type === 'category') setSelectedCategory(payload);
    window.scrollTo(0, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 font-sans selection:bg-emerald-500/30">
      <Navbar 
        user={user} 
        onLogin={handleLogin} 
        onLogout={handleLogout} 
        onNavigate={navigateTo}
        currentCategory={selectedCategory}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          {currentView.type === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-16"
            >
              <section>
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                  <div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
                      CINEGAME <span className="text-emerald-500">HUB</span>
                    </h1>
                    <p className="text-zinc-400 text-lg max-w-2xl">
                      Najnowsze wieści, recenzje i analizy ze świata gier, kina oraz seriali. 
                      Wszystko w jednym, nowoczesnym miejscu.
                    </p>
                  </div>
                  {user && (
                    <button 
                      onClick={() => navigateTo('admin')}
                      className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-full transition-all font-medium"
                    >
                      <Plus className="w-5 h-5" />
                      Dodaj Artykuł
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {articles.length > 0 ? (
                    articles.map((article, idx) => (
                      <ArticleCard 
                        key={article.id} 
                        article={article} 
                        featured={idx === 0}
                        onClick={() => navigateTo('detail', article)}
                      />
                    ))
                  ) : (
                    <div className="col-span-full py-20 text-center text-zinc-500 border border-zinc-800 rounded-3xl border-dashed">
                      Brak artykułów. Bądź pierwszym, który coś napisze!
                    </div>
                  )}
                </div>
              </section>
            </motion.div>
          )}

          {currentView.type === 'category' && (
            <motion.div
              key="category"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              <header className="border-b border-zinc-800 pb-8">
                <h2 className="text-4xl font-bold capitalize tracking-tight">
                  {selectedCategory === 'games' ? 'Gry' : selectedCategory === 'movies' ? 'Filmy' : 'Seriale'}
                </h2>
                <p className="text-zinc-400 mt-2">Przeglądaj najnowsze treści z tej kategorii.</p>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map(article => (
                  <ArticleCard 
                    key={article.id} 
                    article={article} 
                    onClick={() => navigateTo('detail', article)}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {currentView.type === 'detail' && (
            <ArticleDetail 
              article={currentView.payload} 
              onBack={() => navigateTo('home')} 
            />
          )}

          {currentView.type === 'admin' && user && (
            <Editor 
              user={user} 
              onClose={() => navigateTo('home')} 
            />
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
