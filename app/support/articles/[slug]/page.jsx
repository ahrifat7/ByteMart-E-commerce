'use client'
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { helpArticles } from '@/lib/help-data';
import { ChevronLeft, Calendar, User, Tag } from 'lucide-react';
import Link from 'next/link';

const ArticlePage = () => {
  const { slug } = useParams();
  const router = useRouter();
  const article = helpArticles[slug];

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <button onClick={() => router.push('/support')} className="text-primary hover:underline">
            Back to Help Center
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-32 pb-20 px-6 md:px-16 lg:px-32 max-w-4xl mx-auto"
      >
        <Link 
          href="/support" 
          className="inline-flex items-center text-foreground/60 hover:text-primary transition-colors mb-8 group"
        >
          <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Help Center
        </Link>

        <article className="prose prose-lg dark:prose-invert max-w-none">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-foreground/50 mb-10 pb-10 border-b border-border">
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Updated 2 days ago
              </span>
              <span className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                ByteMart Support Team
              </span>
              <span className="flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                <Tag className="w-4 h-4 mr-2" />
                {article.category.replace('-', ' ')}
              </span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="article-content"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-20 p-8 glass-card rounded-3xl text-center border border-primary/20 bg-primary/5"
        >
          <h3 className="text-xl font-bold mb-2">Was this article helpful?</h3>
          <div className="flex justify-center gap-4 mt-4">
            <button className="px-6 py-2 rounded-xl border border-border hover:bg-green-500/10 hover:border-green-500/50 transition-all">
              Yes, thanks!
            </button>
            <button className="px-6 py-2 rounded-xl border border-border hover:bg-red-500/10 hover:border-red-500/50 transition-all">
              Not really
            </button>
          </div>
        </motion.div>
      </motion.main>
      <Footer />

      <style jsx global>{`
        .article-content h2 {
          font-size: 1.875rem;
          font-weight: 700;
          margin-top: 2.5rem;
          margin-bottom: 1.25rem;
          color: var(--foreground);
        }
        .article-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: var(--foreground);
        }
        .article-content p {
          margin-bottom: 1.25rem;
          line-height: 1.75;
          color: rgba(var(--foreground-rgb), 0.8);
        }
        .article-content ul, .article-content ol {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }
        .article-content li {
          margin-bottom: 0.5rem;
        }
        .article-content .note, .article-content .tip {
          padding: 1.5rem;
          border-radius: 1rem;
          margin: 2rem 0;
          border-left: 4px solid var(--primary);
          background: rgba(var(--primary-rgb), 0.05);
        }
        .article-content a {
          color: var(--primary);
          text-decoration: underline;
          font-weight: 500;
        }
      `}</style>
    </>
  );
};

export default ArticlePage;
