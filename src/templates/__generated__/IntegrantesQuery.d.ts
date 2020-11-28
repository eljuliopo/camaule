/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: IntegrantesQuery
// ====================================================

export interface IntegrantesQuery_mdx_frontmatter_banner_childImageSharp_fixed {
  base64: string | null;
  width: number;
  height: number;
  src: string;
  srcSet: string;
}

export interface IntegrantesQuery_mdx_frontmatter_banner_childImageSharp {
  fixed: IntegrantesQuery_mdx_frontmatter_banner_childImageSharp_fixed | null;
  id: string;
}

export interface IntegrantesQuery_mdx_frontmatter_banner {
  /**
   * Copy file to static directory and return public url to it
   */
  publicURL: string | null;
  childImageSharp: IntegrantesQuery_mdx_frontmatter_banner_childImageSharp | null;
}

export interface IntegrantesQuery_mdx_frontmatter {
  title: string;
  date: any | null;
  description: string | null;
  banner: IntegrantesQuery_mdx_frontmatter_banner | null;
}

export interface IntegrantesQuery_mdx {
  body: string;
  frontmatter: IntegrantesQuery_mdx_frontmatter | null;
}

export interface IntegrantesQuery {
  mdx: IntegrantesQuery_mdx | null;
}

export interface IntegrantesQueryVariables {
  slug: string;
}
