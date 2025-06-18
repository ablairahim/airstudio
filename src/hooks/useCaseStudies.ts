'use client';

import { useState, useEffect } from 'react';
import { CaseStudy, getAllCaseStudies, getCaseStudyBySlug } from '../lib/sanity';

export function useCaseStudies() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        setLoading(true);
        const data = await getAllCaseStudies();
        setCaseStudies(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch case studies');
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudies();
  }, []);

  return { caseStudies, loading, error };
}

export function useCaseStudy(slug: string | null) {
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setCaseStudy(null);
      setLoading(false);
      return;
    }

    const fetchCaseStudy = async () => {
      try {
        setLoading(true);
        const data = await getCaseStudyBySlug(slug);
        setCaseStudy(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch case study');
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudy();
  }, [slug]);

  return { caseStudy, loading, error };
} 