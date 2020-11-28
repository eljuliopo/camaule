/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ActividadesQuery
// ====================================================

export interface ActividadesQuery_mdx_frontmatter_banner_childImageSharp_fluid {
  srcSet: string;
  base64: string | null;
  aspectRatio: number;
  src: string;
  sizes: string;
}

export interface ActividadesQuery_mdx_frontmatter_banner_childImageSharp {
  fluid: ActividadesQuery_mdx_frontmatter_banner_childImageSharp_fluid | null;
  id: string;
}

export interface ActividadesQuery_mdx_frontmatter_banner {
  /**
   * Copy file to static directory and return public url to it
   */
  publicURL: string | null;
  childImageSharp: ActividadesQuery_mdx_frontmatter_banner_childImageSharp | null;
}

export interface ActividadesQuery_mdx_frontmatter {
  title: string;
  date: any | null;
  description: string | null;
  banner: ActividadesQuery_mdx_frontmatter_banner | null;
}

export interface ActividadesQuery_mdx {
  body: string;
  frontmatter: ActividadesQuery_mdx_frontmatter | null;
}

export interface ActividadesQuery {
  mdx: ActividadesQuery_mdx | null;
}

export interface ActividadesQueryVariables {
  slug: string;
}
