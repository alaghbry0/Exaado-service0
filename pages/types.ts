export interface Service {
  id: string;
  name: string;
  description: string;
  price?: string;
  comingSoon?: boolean;
}

export interface Signal extends Service {
  provider: string;
  accuracy: string;
}

export interface Indicator extends Service {
  platform: 'MT4' | 'MT5';
}

export interface Course {
    id: string;
    title: string;
    short_description: string;
    description: string;
    outcomes: string[];
    language: string;
    category_id: string;
    sub_category_id: string;
    section: string; // JSON string array
    requirements: string[];
    price: string;
    discount_flag: string | null;
    discounted_price: string;
    level: 'beginner' | 'intermediate' | 'advanced' | string;
    user_id: string;
    thumbnail: string;
    video_url: string;
    expiry_days: string;
    date_added: string;
    last_modified: string;
    course_type: string;
    is_top_course: string;
    is_highlight_course: string;
    is_admin: string;
    is_disabled: string;
    status: 'active' | 'coming_soon' | string;
    course_overview_provider: string;
    meta_keywords: string;
    meta_description: string;
    is_free_course: string | null;
    is_limit_working: string;
    multi_instructor: string;
    creator: string;
    cover_image: string;
    rating: number;
    number_of_ratings: number;
    instructor_name: string;
    total_enrollment: number;
    total_number_of_lessons: number;
    completion?: number;
    total_number_of_completed_lessons?: number;
}

export interface Bundle {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  requirements: string[];
  outcomes: string[];
  course_ids: string; // JSON string array
  free_sessions_count: string;
  discounted_price: string;
  cover_image: string;
  telegram_url: string;
  status: 'active' | string;
  sub_category_id: string;
  is_top: string;
  is_highlight: string;
  is_disabled: string;
  date_added: string;
}

export interface Category {
  id: string;
  code: string;
  name: string;
  parent: string;
  type: string | null;
  slug: string;
  date_added: string;
  last_modified: string;
  font_awesome_class: string;
  thumbnail: string;
  number_of_courses: number;
}


export interface AcademyData {
  courses: Course[];
  bundles: Bundle[];
  my_enrollments: {
    course_ids: string[];
    bundle_ids: string[];
  };
  top_course_ids: string[];
  highlight_course_ids: string[];
  top_bundle_ids: string[];
  highlight_bundle_ids: string[];
  categories: Category[];
}

export interface MyIndicatorSubscription {
  id: string;
  buy_indicators_id: string;
  user_id: string;
  trading_view_id: string;
  enroll_by: string;
  status: 'lifetime' | string;
  expiration_date: string;
  date_added: string;
}

export interface IndicatorSubscriptionPlan {
  id: string;
  name: string;
  price: string;
  discounted_price: string;
  duration_in_months: string;
  date_added: string;
}

export interface IndicatorsData {
  my_subscription: MyIndicatorSubscription | null;
  subscriptions: IndicatorSubscriptionPlan[];
}

export interface MyForexSubscription {
  id: string;
  trading_panel_id: string;
  user_id: string;
  forex_addresses: string;
  enroll_by: string;
  status: 'lifetime' | string;
  expiration_date: string;
  date_added: string;
}

export interface ForexSubscriptionPlan {
  id: string;
  name: string;
  price: string;
  discounted_price: string | null;
  duration_in_months: string;
  date_added: string;
}

export interface ForexData {
  my_subscription: MyForexSubscription | null;
  subscriptions: ForexSubscriptionPlan[];
}