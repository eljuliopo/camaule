import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { Code } from 'react-feather'

import { Logo } from "./utils"
import Navlinks from "./navigation-list"
import { FooterLinksQuery, FooterLinksQuery_site_siteMetadata_footerLinks } from "./__generated__/FooterLinksQuery"


export default function() {
    const query = useStaticQuery<FooterLinksQuery>(graphql`
        query FooterLinksQuery {
            site {
                siteMetadata {
                    title
                    footerLinks {
                        name
                        url
                    }
                }
            }
        }
    `)

    const footerLinks = query.site.siteMetadata.footerLinks.map((item, _) => (
        <ListItem data={item} key={`footer-n-l-${_}`} />
    ))

    return (
        <footer className="footer bg-bgalt py-12">
            <div className="container mx-auto text-center">
                <div className="flex justify-center my-3 mb-6">
                    <Link to="/" title={query.site.siteMetadata.title}>
                        <Logo className="w-12"/>
                    </Link>
                </div>
                <div className="text-color-2 my-3 footer-links animated-link-parent">
                    <Navlinks className="flex items-center justify-center flex-wrap" withThemeSwitch={false}/>
                </div>

                <p className="text-color-default text-sm tracking-widest">
                    Derechos Reservados &copy; <b class="uppercase">{query.site.siteMetadata.title}{" "}
                    {new Date().getFullYear()}</b>
                </p>

                <p className="text-color-default text-xs tracking-lg overflow-ellipsis text-opacity-85">

                  <a href="https://www.gatsbyjs.com/starters/akzhy/gatsby-starter-elemental/" target="_blank" class="strong">
                    Sitio desarrollado en base a <i>Elemental</i>, un <i>starter</i> de <b>GatsbyJS</b>
                  </a>
                </p>
            </div>
        </footer>
    )
}

const ListItem: React.FC<{ data: FooterLinksQuery_site_siteMetadata_footerLinks }> = ({ data }) => {
    return (
        <li className="inline-block mx-3 animated-link-parent">
            <Link to={data.url} title={data.name}>
                <span>{data.name}</span>
            </Link>
        </li>
    )
}
