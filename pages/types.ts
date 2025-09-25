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
    description: string; // Full description, can contain HTML
    outcomes: string[];
    requirements: string[];
    price: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced' | string;
    is_free_course: string | null;
    total_number_of_lessons: number;
    instructor_name: string;
    thumbnail: string;
    status: 'active' | 'coming_soon' | string;
    comingSoon?: boolean;
    // For enrolled courses
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
  course_ids: string;
}

export interface AcademyData {
  my_enrollments: {
    courses: Course[];
    bundles: Bundle[];
  };
  top_courses: Course[];
  top_bundles: Bundle[];
  all_courses: Course[];
  all_bundles: Bundle[];
  // Other properties can be added here if needed in the future
  highlight_courses: Course[];
  highlight_bundles: Bundle[];
  categories: any[];
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
