/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ContactoQuery
// ====================================================

export interface ContactoQuery_site_siteMetadata_contact {
  api_url: string | null;
  description: string | null;
  mail: string | null;
  phone: string | null;
  address: string | null;
}

export interface ContactoQuery_site_siteMetadata {
  contact: ContactoQuery_site_siteMetadata_contact | null;
}

export interface ContactoQuery_site {
  siteMetadata: ContactoQuery_site_siteMetadata | null;
}

export interface ContactoQuery {
  site: ContactoQuery_site | null;
}
