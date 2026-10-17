export interface SiteSettings {
  years_experience: string;
  phone: string;
  email: string;
  tagline: string;
  insurance_line: string;
  work_style: string;
  shipyard_1: string;
  shipyard_2: string;
  footer_note: string;
  [key: string]: string;
}

export interface ServiceItem {
  id: number;
  slug: string;
  name: string;
  short_description: string;
  long_description: string;
  image_url: string;
  sort_order: number;
  visible: number;
}

export interface GalleryItem {
  id: number;
  title: string;
  caption: string;
  image_url: string;
  category: string;
  sort_order: number;
  visible: number;
}

export interface TestimonialItem {
  id: number;
  quote: string;
  author: string;
  company: string;
  visible: number;
}

export interface PageSection {
  id: number;
  page_id: number;
  sort_order: number;
  type: string;
  data: any;
  visible: number;
}

export interface PageContent {
  page: {
    id: number;
    slug: string;
    title: string;
    meta_title: string;
    meta_description: string;
  };
  sections: PageSection[];
}

export interface QuoteRequest {
  id?: number;
  name: string;
  email: string;
  phone: string;
  company?: string;
  shipyard_location?: string;
  service_needed?: string;
  message: string;
  file_name?: string;
  file_data?: string;
  created_at?: string;
  status?: string;
}
