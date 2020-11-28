import React, { useEffect, useRef, useState } from "react"
import { graphql, PageProps } from "gatsby"

import { ArrowRight } from "react-feather"
import ScrollIntoView from "react-scroll-into-view"

import Layout from "../components/layout"
import { Button } from "../components/ui"

import ItemPortfolio from "../components/item-portfolio"
import ItemBlog from "../components/item-blog"
import { Form, Description as ContactDescription } from "../components/contact"
import { IndexPageQuery } from "./__generated__/IndexPageQuery"

export default ({ data, location }: PageProps<IndexPageQuery>) => {
    const siteData = data.site.siteMetadata

    const portfolioList = data.portfolio.edges.map((item, _) => (
        <ItemPortfolio
            data={item.node}
            key={`p-item-index-${item.node.id}`}
            even={(_ + 1) % 2 === 0}
        />
    ))

    const blogList = data.blog.edges.map(item => (
        <ItemBlog data={item.node} key={`b-item-index-${item.node.id}`} />
    ))

    return (
        <Layout
            front={true}
            seo={{
                title: "Inicio",
                description: siteData.description,
                logo: siteData.logoImage,
            }}
            navPlaceholder={false}
            location={location}
        >
            <Wall data={siteData} />
            {siteData.about !== "" && <About data={siteData.about} />}
            <div className="px-4 lg:px-0" id="portfolio">
                {portfolioList}
            </div>
            <Blog>{blogList}</Blog>
            <Contact data={siteData.contact} />
        </Layout>
    )
}

const Wall = ({ data }) => {
    const wall = useRef(null)

    const twoColumnWall = data.twoColumnWall

    const [state, changeState] = useState({
        loaded: false,
        supportsBlend: false,
    })

    useEffect(() => {
        if (window.CSS && !state.loaded) {
            if (CSS.supports("mix-blend-mode", "screen")) {
                wall.current.classList.add("supports-blend")
                changeState({
                    loaded: true,
                    supportsBlend: true,
                })
            }
        }
    }, [state.loaded])

    let spanAttrs: Partial<{ style: unknown }> = {}

    if (!twoColumnWall && data.titleImage) {
        spanAttrs.style = {
            backgroundImage: `url('${data.titleImage}')`,
        }

    }

    const innerComponents = (
        <React.Fragment>

              <img
                    className="lg:object-center md:object-top inset-x-0 bottom-0 md:object-scale-down inline-grid"
                    src={data.logoImage}
                    alt=""
                />

            <p className="text-base lg:text-lg mt-10">{data.description}</p>
            <ScrollIntoView selector="#portfolio">
                <Button
                    title="Mira nuestro trabajo"
                    type="button"
                    iconRight={<ArrowRight />}
                />
            </ScrollIntoView>
        </React.Fragment>
    )

    if (twoColumnWall) {
        return (
            <div
                className="wall h-screen flex relative justify-center items-center overflow-hidden"
                ref={wall}
            >
                <div className="flex-1 lg:block absolute lg:relative w-full h-full top-0 left-0">
                    <div
                        className="absolute left-0 top-0 w-full h-full lg:hidden"
                        style={{
                            background: "rgba(0,0,0,.75)",
                        }}
                    ></div>
                    <img
                        src={data.titleImage}
                        alt=""
                        className="h-full w-auto max-w-none lg:h-auto lg:w-full"
                    />
                </div>
                <div className="flex-1 text-center p-10 relative lg:text-center text-white lg:text-color-default">
                    {innerComponents}
                </div>
            </div>
        )
    }

    return (
        <div
            className="wall h-screen flex flex-col justify-center items-center text-center"
            ref={wall}
        >
            {innerComponents}
        </div>
    )
}

const About = ({ data }) => {
    return (
        <div className="boxed">
            <div className="px-4 py-20 text-center lg:py-40 lg:px-0">
                <h2 className="text-color-1 font-black text-5xl lg:text-6xl">
                    Construir redes hoy
                </h2>
                <p className="mt-5 text-lg">{data}</p>
            </div>
        </div>
    )
}

const Blog = ({ children }) => {
    return (
        <div className="container mx-auto px-0">
            <div className="pt-20 pb-10 text-center lg:pt-40 lg:pb-20">
                <h2 className="text-color-1 font-black text-5xl lg:text-6xl">
                    Blog
                </h2>
            </div>
            <div className="flex flex-wrap">{children}</div>
        </div>
    )
}

const Contact = ({ data }) => {
    const hasContactForm = data.api_url
    return (
        <div className="container mx-auto">
            <div className="pt-20 pb-10 lg:pt-40 lg:pb-20 text-center">
                <h2 className="text-color-1 font-black text-5xl lg:text-6xl">
                    Contáctanos
                </h2>
            </div>
            <div className="flex flex-wrap pb-40">
                {hasContactForm && (
                    <div className="w-full lg:w-1/2 px-4 lg:pl-2 lg:pr-6">
                        <Form api={data.api_url} />
                    </div>
                )}
                <div
                    className={`w-full ${
                        hasContactForm ? "lg:w-1/2" : "lg:w-2/3 mx-auto"
                    } px-6 pt-8`}
                >
                    <ContactDescription data={data} />
                </div>
            </div>
        </div>
    )
}

export const query = graphql`
    query IndexPageQuery {
        site: site {
            siteMetadata {
                title
                description
                capitalizeTitleOnHome
                titleImage
                logoImage
                ogImage
                twoColumnWall
                introTag
                description
                about
                contact {
                    api_url
                    description
                    mail
                    phone
                    address
                }
                social {
                    name
                    url
                    icon
                }
            }
        }
        portfolio: allMdx(
            filter: { fields: { sourceName: { eq: "portfolio" } } }
            limit: 6
        ) {
            edges {
                node {
                    id
                    frontmatter {
                        title
                        description
                        image {
                            childImageSharp {
                                fluid(maxWidth: 1000) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                    fields {
                        slug
                    }
                }
            }
        }
        blog: allMdx(
            filter: { fields: { sourceName: { eq: "blog" } } }
            limit: 6
        ) {
            edges {
                node {
                    id
                    frontmatter {
                        title
                        description
                        date(formatString: "DD MMMM YYYY")
                        image {
                            childImageSharp {
                                fluid(maxWidth: 1000) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                    fields {
                        slug
                    }
                }
            }
        }
    }
`
