import config from '@payload-config'
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import type { Metadata } from 'next'
import type { Locale } from 'payload'
import React from 'react'

type Args = {
  params: Promise<{ segments?: string[]; locale?: Locale }>
  searchParams: Promise<Record<string, string | string[]>>
}

export const generateMetadata = ({ params, searchParams }: Args): Promise<Metadata> =>
  generatePageMetadata({ config, params, searchParams })

export default function AdminPage({ params, searchParams }: Args) {
  return RootPage({ config, params, searchParams })
}
