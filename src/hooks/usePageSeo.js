import { useEffect } from 'react'
import { applyPageSeo } from '../utils/seo.js'

export function usePageSeo({
  title,
  description,
  path = '/',
  ogImage,
  ogType = 'website',
  noindex = false,
  jsonLd = null,
}) {
  useEffect(() => {
    applyPageSeo({ title, description, path, ogImage, ogType, noindex, jsonLd })
  }, [title, description, path, ogImage, ogType, noindex, jsonLd])
}
