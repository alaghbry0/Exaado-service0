import { AcademyData, IndicatorsData, ForexData } from './types';

const API_DATA = {
  "academy": {
    "my_enrollments": {
      "courses": [
        {
          "id": "5",
          "title": "دورة احتراف سوق العملات الرقمية مجانا",
          "short_description": "هذه الدور شاملة للتأسيس في أسواق المال وسوق العملات الرقمية خصوصا - وأنصحك بمشاهدتها قبل الاشتراك في أي دورة مدفوعة هنا في اكسادو أو أي مكان آخر",
          "description": "",
          "outcomes": [
            "ستخرج منها محترف أساسيات العملات الرقمية  مجانا"
          ],
          "language": "english",
          "category_id": "1",
          "sub_category_id": "4",
          "section": "[17,18,19,21]",
          "requirements": [
            " لا تحتاج أي خبرة لمشاهدتها والاستفادة منها"
          ],
          "price": "Free",
          "discount_flag": null,
          "discounted_price": "0",
          "level": "beginner",
          "user_id": "4",
          "thumbnail": "https://exaado.plebits.com/uploads/thumbnails/course_thumbnails/course_thumbnail_default_5.jpg",
          "video_url": "https://youtube.com/playlist?list=PL-PTb_TfXbWJR6SkG_6EJv-AbNwc8dFiA",
          "expiry_days": "99999",
          "date_added": "1672956000",
          "last_modified": "1676671200",
          "course_type": "general",
          "is_top_course": "1",
          "is_highlight_course": "1",
          "is_admin": "1",
          "is_disabled": "0",
          "status": "active",
          "course_overview_provider": "youtube",
          "meta_keywords": "",
          "meta_description": "",
          "is_free_course": "1",
          "is_limit_working": "1",
          "multi_instructor": "0",
          "creator": "4",
          "cover_image": "https://exaado.plebits.com/uploads/thumbnails/course_thumbnails/course_cover_default_5.jpg",
          "rating": 5,
          "number_of_ratings": 5,
          "instructor_name": "Mohamed Mahdy",
          "total_enrollment": 465,
          "total_number_of_lessons": 44,
          "completion": 25,
          "total_number_of_completed_lessons": 11
        }
      ],
      "bundles": [
        {
          "id": "6",
          "title": "SMC PRO",
          "description": "هذا المستوي سيمكنك من مشاهدة جميع مستويات دورة الاموال الذكية من اكسادو مدي الحياة - لكن دون الجروب الخاص ودون اللايفات المباشرة اليومية ",
          "course_ids": "[\"13\",\"14\",\"15\",\"16\",\"17\"]",
          "free_sessions_count": "0",
          "price": "299",
          "discounted_price": "0",
          "image": "https://exaado.plebits.com/uploads/course_bundles/f87855a5b29ab04c0cdca4f19b14b0a6_image.jpg",
          "cover_image": "https://exaado.plebits.com/uploads/course_bundles/d3136c44394286a30dcb611f6b917bed_cover.jpg",
          "telegram_url": "",
          "status": "active",
          "sub_category_id": "4",
          "is_top": "1",
          "is_highlight": "0",
          "requirements": [
            "لابد من مشاهدة الكورس المجاني بقناة اليوتيوب لتأسيس الفوركس"
          ],
          "outcomes": [
            "متوقع تخرج من هذه الدورة محترف في التحليل بعلم الاموال الذكية "
          ],
          "is_disabled": "0",
          "date_added": "1703366659"
        }
      ]
    },
    "top_courses": [
       {
        "id": "4",
        "title": "ALL IN ONE COURSE | الدورة الشاملة",
        "short_description": "A comprehensive course covering all essential trading concepts from A to Z.",
        "description": "<p>The All-in-One course is the ultimate package for any aspiring trader. It covers Technical Analysis, On-Chain Analysis, Risk Management, and Trading Psychology in one place. Perfect for those who want a complete educational path.</p>",
        "outcomes": ["Build a complete trading plan", "Master multiple analysis techniques", "Develop a professional trading mindset"],
        "requirements": ["Must have completed the free YouTube course on crypto basics"],
        "price": "500",
        "level": "beginner",
        "thumbnail": "https://exaado.plebits.com/uploads/thumbnails/course_thumbnails/course_thumbnail_default_4.jpg",
        "status": "active",
        "is_free_course": null,
        "instructor_name": "Mohamed Mahdy",
        "total_number_of_lessons": 152
      },
      {
        "id": "1",
        "title": "Technical Analysis |  كورس احتراف التحليل الفني ",
        "short_description": "باشتراكك في هذه الدورة ستخرج منها ان شاء الله مؤهلا علي قراءة الشارت لأي عملة أو سهم فنيا بكل النظريات من وايكوف وداو والدعوم والمقومات وأغلب المؤشرات الفنية والأشكال الفنية",
        "description": "<p>This course provides a deep dive into technical analysis, covering everything from fundamental theories to advanced chart patterns. You will learn how to interpret market movements and make informed trading decisions.</p>",
        "outcomes": ["Understand Dow Theory and Wyckoff concepts", "Master support and resistance levels", "Utilize various technical indicators effectively", "Identify and trade chart patterns"],
        "requirements": ["A computer with internet access", "Basic understanding of financial markets"],
        "price": "399",
        "level": "beginner",
        "thumbnail": "https://exaado.plebits.com/uploads/thumbnails/course_thumbnails/course_thumbnail_default_1.jpg",
        "status": "active",
        "is_free_course": null,
        "instructor_name": "Mohamed Mahdy",
        "total_number_of_lessons": 121
      },
      {
        "id": "2",
        "title": "دورة احتراف الإدارة المالية | On Chain Analysis",
        "short_description": "باشتراكك في هذه الدورة ستكون مؤهل بشكل كامل للتعامل مع أقوي المؤشرات التي تقرأ حركة السوق ككل",
        "description": "<p>This course focuses on On-Chain Analysis, empowering you to understand market dynamics by analyzing blockchain data. You'll learn to use powerful indicators to read the overall market sentiment and predict future trends.</p><p>The course consists of over 45 lessons, each between 15-30 minutes long.</p>",
        "outcomes": ["Master the most powerful market indicators", "Analyze blockchain data for insights", "Understand market cycles and dominance", "Improve your financial management strategy"],
        "requirements": ["Good internet connection 💕", "Completion of the free beginner course is recommended"],
        "price": "399",
        "level": "intermediate",
        "thumbnail": "https://exaado.plebits.com/uploads/thumbnails/course_thumbnails/course_thumbnail_default_2.jpg",
        "status": "active",
        "is_free_course": null,
        "instructor_name": "Mohamed Mahdy",
        "total_number_of_lessons": 59
      },
      {
        "id": "3",
        "title": "دورة التحليل الزمني والرقمي | Gann Tools",
        "short_description": "باشتراكك في هذه الدورة ستكون مؤهل وبقوة علي احتراف استخراج الفواصل الزمنية التي تؤثر علي حركة السعر",
        "description": "<p>Unlock the secrets of market timing with Gann's tools. This course will equip you to professionally extract time intervals that affect price movements, giving you a unique edge in your analysis.</p>",
        "outcomes": ["Master Gann's tools for time analysis", "Predict market turning points", "Integrate time analysis with price analysis"],
        "requirements": ["Good internet connection ❤️", "Basic knowledge of technical analysis is helpful"],
        "price": "399",
        "level": "advanced",
        "thumbnail": "https://exaado.plebits.com/uploads/thumbnails/course_thumbnails/course_thumbnail_default_3.jpg",
        "status": "active",
        "is_free_course": null,
        "instructor_name": "Mohamed Mahdy",
        "total_number_of_lessons": 45
      }
    ],
    "top_bundles": [
      {
        "id": "7",
        "title": "SMC PLUS",
        "description": "جروب خاص علي التلجرام لنشر تحليلاتك وتقيميها والرد عليها مني شخصيا علي مدار الساعة - بث مباشر للتداول الحقيقي معك مباشرة بسوق العملات الرقمية والفوركس",
        "course_ids": "[\"13\",\"14\",\"15\",\"16\",\"17\"]",
        "price": "499",
        "image": "https://exaado.plebits.com/uploads/course_bundles/035c3ea3d7e40b7e5afc0eb792b404b4_image.jpg",
        "requirements": ["لابد من مشاهدة الكورس المجاني بقناة اليوتيوب لتأسيس الفوركس"],
        "outcomes": ["متوقع تخرج من هذه الدورة محترف في التحليل بعلم الاموال الذكية"]
      },
      {
        "id": "8",
        "title": "SMC PREMIUM",
        "description": "ستحصل علي 4 جلسات خاصة مع د محمد مهدي - جروب خاص علي التلجرام - بث مباشر للتداول الحقيقي معك مباشرة بسوق العملات الرقمية والفوركس",
        "course_ids": "[\"13\",\"14\",\"15\",\"16\",\"17\"]",
        "price": "799",
        "image": "https://exaado.plebits.com/uploads/course_bundles/769ded46a20a55fb9e21c7660dda03e6_image.jpg",
        "requirements": ["لابد من مشاهدة الكورس المجاني بقناة اليوتيوب لتأسيس الفوركس"],
        "outcomes": ["متوقع تخرج من هذه الدورة محترف في التحليل بعلم الاموال الذكية"]
      }
    ],
    "all_courses": [
      {
        "id": "1",
        "title": "Technical Analysis |  كورس احتراف التحليل الفني ",
        "short_description": "باشتراكك في هذه الدورة ستخرج منها ان شاء الله مؤهلا علي قراءة الشارت لأي عملة أو سهم فنيا بكل النظريات من وايكوف وداو والدعوم والمقومات وأغلب المؤشرات الفنية والأشكال الفنية",
        "description": "<p>This course provides a deep dive into technical analysis, covering everything from fundamental theories to advanced chart patterns. You will learn how to interpret market movements and make informed trading decisions.</p>",
        "outcomes": ["Understand Dow Theory and Wyckoff concepts", "Master support and resistance levels", "Utilize various technical indicators effectively", "Identify and trade chart patterns"],
        "requirements": ["A computer with internet access", "Basic understanding of financial markets"],
        "price": "399",
        "level": "beginner",
        "thumbnail": "https://exaado.plebits.com/uploads/thumbnails/course_thumbnails/course_thumbnail_default_1.jpg",
        "status": "active",
        "is_free_course": null,
        "instructor_name": "Mohamed Mahdy",
        "total_number_of_lessons": 121
      },
      {
        "id": "2",
        "title": "دورة احتراف الإدارة المالية | On Chain Analysis",
        "short_description": "باشتراكك في هذه الدورة ستكون مؤهل بشكل كامل للتعامل مع أقوي المؤشرات التي تقرأ حركة السوق ككل",
        "description": "<p>This course focuses on On-Chain Analysis, empowering you to understand market dynamics by analyzing blockchain data. You'll learn to use powerful indicators to read the overall market sentiment and predict future trends.</p><p>The course consists of over 45 lessons, each between 15-30 minutes long.</p>",
        "outcomes": ["Master the most powerful market indicators", "Analyze blockchain data for insights", "Understand market cycles and dominance", "Improve your financial management strategy"],
        "requirements": ["Good internet connection 💕", "Completion of the free beginner course is recommended"],
        "price": "399",
        "level": "intermediate",
        "thumbnail": "https://exaado.plebits.com/uploads/thumbnails/course_thumbnails/course_thumbnail_default_2.jpg",
        "status": "active",
        "is_free_course": null,
        "instructor_name": "Mohamed Mahdy",
        "total_number_of_lessons": 59
      },
      {
        "id": "4",
        "title": "ALL IN ONE COURSE | الدورة الشاملة",
        "short_description": "A comprehensive course covering all essential trading concepts from A to Z.",
        "description": "<p>The All-in-One course is the ultimate package for any aspiring trader. It covers Technical Analysis, On-Chain Analysis, Risk Management, and Trading Psychology in one place. Perfect for those who want a complete educational path.</p>",
        "outcomes": ["Build a complete trading plan", "Master multiple analysis techniques", "Develop a professional trading mindset"],
        "requirements": ["Must have completed the free YouTube course on crypto basics"],
        "price": "500",
        "level": "beginner",
        "thumbnail": "https://exaado.plebits.com/uploads/thumbnails/course_thumbnails/course_thumbnail_default_4.jpg",
        "status": "active",
        "is_free_course": null,
        "instructor_name": "Mohamed Mahdy",
        "total_number_of_lessons": 152
      },
      {
        "id": "5",
        "title": "دورة احتراف سوق العملات الرقمية مجانا",
        "short_description": "هذه الدور شاملة للتأسيس في أسواق المال وسوق العملات الرقمية خصوصا - وأنصحك بمشاهدتها قبل الاشتراك في أي دورة مدفوعة هنا في اكسادو أو أي مكان آخر",
        "description": "<p>A foundational course for anyone new to the crypto market. It is highly recommended to watch this before enrolling in any paid courses, here or elsewhere. It's completely free and packed with value.</p>",
        "outcomes": ["Understand the fundamentals of cryptocurrencies", "Learn how to navigate crypto markets", "Become a proficient beginner in digital currencies for free"],
        "requirements": ["No prior experience is needed to watch and benefit from this course"],
        "price": "Free",
        "level": "beginner",
        "thumbnail": "https://exaado.plebits.com/uploads/thumbnails/course_thumbnails/course_thumbnail_default_5.jpg",
        "status": "active",
        "is_free_course": "1",
        "instructor_name": "Mohamed Mahdy",
        "total_number_of_lessons": 44
      },
      {
        "id": "7",
        "title": "دورة احتراف سوق الفوركس مجانا ",
        "short_description": "A completely free course to get you started in the world of Forex trading. Everything you need to know.",
        "description": "<p>Stay tuned! This course will be uploaded within hours. It is a completely free course designed to teach you the fundamentals of the Forex market.</p>",
        "outcomes": ["Understand the basics of the Forex market", "Learn key terminology and concepts", "Build a foundation for advanced trading"],
        "requirements": ["The course is completely free - you only need the determination and decision to benefit from it"],
        "price": "Free",
        "level": "beginner",
        "thumbnail": "https://exaado.plebits.com/uploads/thumbnails/course_thumbnails/course_thumbnail_default_7.jpg",
        "status": "active",
        "is_free_course": "1",
        "instructor_name": "Mohamed Mahdy",
        "total_number_of_lessons": 49
      },
       {
        "id": "3",
        "title": "دورة التحليل الزمني والرقمي | Gann Tools",
        "short_description": "باشتراكك في هذه الدورة ستكون مؤهل وبقوة علي احتراف استخراج الفواصل الزمنية التي تؤثر علي حركة السعر",
        "description": "<p>Unlock the secrets of market timing with Gann's tools. This course will equip you to professionally extract time intervals that affect price movements, giving you a unique edge in your analysis.</p>",
        "outcomes": ["Master Gann's tools for time analysis", "Predict market turning points", "Integrate time analysis with price analysis"],
        "requirements": ["Good internet connection ❤️", "Basic knowledge of technical analysis is helpful"],
        "price": "399",
        "level": "advanced",
        "thumbnail": "https://exaado.plebits.com/uploads/thumbnails/course_thumbnails/course_thumbnail_default_3.jpg",
        "status": "active",
        "is_free_course": null,
        "instructor_name": "Mohamed Mahdy",
        "total_number_of_lessons": 45
      },
      {
        "id": "99",
        "title": "Advanced Algorithmic Trading",
        "short_description": "Dive deep into quantitative strategies and automated trading with Python.",
        "description": "<p>This upcoming course will guide you through the process of building, backtesting, and deploying your own trading algorithms using Python. For serious traders looking to systematize their approach.</p>",
        "outcomes": ["Code trading algorithms in Python", "Backtest strategies for robustness", "Understand API integrations with exchanges"],
        "requirements": ["Intermediate Python knowledge", "Strong understanding of trading concepts"],
        "price": "799",
        "level": "advanced",
        "thumbnail": "",
        "status": "coming_soon",
        "is_free_course": null,
        "instructor_name": "Dr. Mohammed",
        "total_number_of_lessons": 75
      }
    ],
    "highlight_courses": [],
    // FIX: Removed duplicate `top_bundles` property which was causing an error.
    "highlight_bundles": [],
    "categories": [],
    "all_bundles": []
  },
  "buy_indicators": {
    "my_subscription": {
      "id": "38",
      "buy_indicators_id": "2",
      "user_id": "146709",
      "trading_view_id": "..",
      "enroll_by": "TGMAPP_MINIAPP29782972897998279",
      "status": "lifetime",
      "expiration_date": "0",
      "date_added": "1758385167"
    },
    "subscriptions": [
      {
        "id": "1",
        "name": "Yearly Subscription",
        "price": "150",
        "discounted_price": "100",
        "duration_in_months": "12",
        "date_added": "1720535759"
      },
      {
        "id": "2",
        "name": "Lifetime Subscription",
        "price": "350",
        "discounted_price": "200",
        "duration_in_months": "0",
        "date_added": "1720535777"
      }
    ]
  },
  "utility_trading_panels": {
    "my_subscription": {
      "id": "929",
      "trading_panel_id": "2",
      "user_id": "146709",
      "forex_addresses": "[\"11237841\"]",
      "enroll_by": "TGMAPP_MINIAPP29782972897998279",
      "status": "lifetime",
      "expiration_date": "0",
      "date_added": "1758385213"
    },
    "subscriptions": [
      {
        "id": "1",
        "name": "Yearly Subscription",
        "price": "150",
        "discounted_price": "100",
        "duration_in_months": "12",
        "date_added": "1692483664"
      },
      {
        "id": "2",
        "name": "Lifetime Subscription",
        "price": "500",
        "discounted_price": "250",
        "duration_in_months": "0",
        "date_added": "1692483677"
      },
      {
        "id": "4",
        "name": "Demo",
        "price": "0",
        "discounted_price": null,
        "duration_in_months": "0",
        "date_added": "1701071567"
      }
    ]
  }
};

export const fetchAcademyData = (): Promise<AcademyData> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(API_DATA.academy as AcademyData);
        }, 1000); // Simulate 1 second network delay
    });
};

export const fetchIndicatorsData = (): Promise<IndicatorsData> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(API_DATA.buy_indicators as IndicatorsData);
        }, 1000); // Simulate 1 second network delay
    });
};

export const fetchForexData = (): Promise<ForexData> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(API_DATA.utility_trading_panels as ForexData);
        }, 1000); // Simulate 1 second network delay
    });
};
