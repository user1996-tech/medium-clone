import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Header from '../components/Header'
import Banner from '../components/Banner'
import { sanityClient, urlFor } from '../sanity'
import { Post } from '../typings'

interface Props {
  posts: [Post]
}

const Home = ({ posts }: Props) => {
  return (
    <div className="mx-auto max-w-7xl">
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <body>
        <Header />
        <Banner />

        {/* Posts */}
        <div className="grid grid-cols-1 gap-3 p-2 sm:grid-cols-2 md:gap-6 md:p-6 lg:grid-cols-3">
          {posts.map((post) => {
            return (
              <Link key={post._id} href={`/post/${post.slug.current}`}>
                <div className="group cursor-pointer overflow-hidden rounded-lg border">
                  <img
                    src={urlFor(post.mainImage).url()!}
                    alt=""
                    className="object-cove h-60 w-full transition-transform duration-200 ease-in-out group-hover:scale-105"
                  />
                  <div className="flex justify-between bg-white p-5">
                    <div>
                      <p className="text-lg font-bold">{post.title}</p>
                      <p>
                        {post.description} by {post.author.name}
                      </p>
                    </div>

                    <img
                      src={urlFor(post.author.image).url()!}
                      alt=""
                      className="h-12 w-12 rounded-full"
                    />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </body>
    </div>
  )
}

export default Home

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
  _id,
  title, 
  slug, 
  author -> {
  name, image
  },
description,
mainImage,
}`

  const posts = await sanityClient.fetch(query)

  return {
    props: {
      posts,
    },
  }
}
