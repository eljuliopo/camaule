import React from "react"
import { MDXProvider } from "@mdx-js/react"
import { graphql, PageProps } from "gatsby"
import Layout from "../components/layout"
import Img from "gatsby-image"
import { Calendar } from "react-feather"
import { MDXRenderer } from "gatsby-plugin-mdx"

import { Row, Col } from "../components/shortcodes/index"

import Comments from "../components/comments"
import { BlogQuery } from "./__generated__/BlogQuery"

export default function integrantes({ location, data }: PageProps<BlogQuery, {}>) {
    return (
        <Layout
            seo={{
                title: data.mdx.frontmatter.title,
                description: data.mdx.frontmatter.description,
                image: data.mdx.frontmatter.banner.publicURL
            }}
            location={location}
        >
            <div className="md:px-4 mt-12 py-6 md:w-9/12 mx-auto">
                <div className="mx-auto relative">

                    <div className="flex-1 text-center p-1 relative lg:text-center text-white lg:text-color-default">
                    <Img
                  className="object-none object-center"
                  fixed={
                      data.mdx.frontmatter.banner.childImageSharp.fixed
                  }
              />
                      <div className="p-2">
                            <h1 className="text-5xl font-bold text-secondary">
                                {data.mdx.frontmatter.title}
                            </h1>

                            <h2 className="text-primary">
                                {data.mdx.frontmatter.description}
                            </h2>
                        </div>
                    </div>
                </div>
                <div className="lg:w-3/4 md:w-11/12 sm:w-full p-3 mx-auto mt-12 post-content">
                    <MDXProvider components={{ Row, Col }}>
                        <MDXRenderer>{data.mdx.body}</MDXRenderer>
                    </MDXProvider>
                </div>
                <div className="comments mt-8">
                    <Comments title={data.mdx.frontmatter.title} location={location} />
                </div>
            </div>
        </Layout>
    )
}

export const query = graphql`
    query IntegrantesQuery($slug: String!) {
        mdx(fields: { slug: { eq: $slug } }) {
            body
            frontmatter {
                title
                date(formatString: "DD MMMM YYYY")
                description
                banner {
                    publicURL
                    childImageSharp {
                      fixed(width: 200, height: 200) {

                                                        ...GatsbyImageSharpFixed
                                                      }
                        id
                    }
                }
            }
        }
    }
`
