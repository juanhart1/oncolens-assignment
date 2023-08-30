import Link from 'next/link'
import Layout from '../components/Layout'

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <h1 className='underline text-amber-800'>Hello Next.js 👋</h1>
    <p>
      <Link href="/about">About</Link>
    </p>
  </Layout>
)

export default IndexPage
