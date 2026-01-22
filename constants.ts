
import { Course, InvestmentTrack } from './types';

export const POPULAR_COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Commercial Real Estate',
    category: 'Commercial',
    level: 'Advanced',
    duration: '4.5 hours',
    lessonCount: 12,
    description: 'Master high-yield investment strategies for large-scale office and retail spaces.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRgnCa1CwDOyDr-p4MqjqjQwdTFXEsinYHAy7m3O3S7qu78SJ8RdZuqFh-l4NFG00cW4d2K5YSCYpmeojFaOlLdBEqYnI32UmzLP18upaSMQHTpVyoGJWvWibrz9_VRM1Zr9blhuKvPPX_s1WA5Vt3ViLOUNhUZ028nBItJsO7KvOnsE73jfP1QJQ1u-XnzwsokYYDPgHEjdNdLe_zI_xkVabN4in8s2tw4ttTS0DA_ewNs304m8YugTLRhDCEfwsT6tTIdIQyuIc',
    tag: 'Growth Phase'
  },
  {
    id: 'c2',
    title: 'Fix and Flip Mastery',
    category: 'Residential',
    level: 'Intermediate',
    duration: '6 hours',
    lessonCount: 18,
    description: 'Master the art of rapid property renovation and resale for profit.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBl_FTXGPJ1G0O7TuDOsLmmWGC6dy_H75jOuwZGLi3_00RxRxguMGzhz6GY7g1EkQo18G3NANxD9hjvD2UTWg5KPjXKSyYN4PhwL2fS_B7nUpb0vrf31gHmuODub5ee0EW153f97z8rn7B4cBHGVVrzVxn8moaO9LpjyZF5sXInWQ1aEwn-jBglbX4T3eEhnLtk5lK8bJeOVL4q9hJZ_Grp9rEXWjnTJBs1aw_no_-56sj7vCpK0fwXHEV3sH0PFwchjhFtdCwNhFg',
    tag: 'Renovation',
    progress: 45
  },
  {
    id: 'c3',
    title: 'Buy-to-Let Basics',
    category: 'Residential',
    level: 'Beginner',
    duration: '3 hours',
    lessonCount: 8,
    description: 'The fundamental roadmap to passive income through residential rentals.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8QWDSGSzlP-Nz4TwOCFXyLIUbfzuAkcvmlEnkIadhcDitsj1VBRz82vDPBBsyJfyzJSNu19AXD2rlFEy_5VkJ0BmBLQbL9wpbHPkk1fD0U2slbtvH4XiX1tuM71-Fd_1CGU3Ef-uAjYnk78a-oer_Otym2mmmh32Mf4epex4jCwBeJ28JXUCGxM3bViTmTENnqPhB8cLUzXCGO8z7dM2AoA2X16IJRiRANstn0W5PajnRHeT-Z6U8iMzaHp2gr9r6f2BlEuTiuc0',
    tag: 'Foundations',
    rating: 4.9,
    reviewCount: 421
  }
];

export const TRACKS: InvestmentTrack[] = [
  {
    id: 't1',
    title: 'The BRRRR Method',
    category: 'Strategy',
    duration: '4 Hours',
    modulesCount: 12,
    description: 'Buy, Rehab, Rent, Refinance, Repeat. The ultimate scale strategy.',
    progress: 45,
    icon: 'rebase_edit',
    steps: [
      { id: 's1', title: 'Buy: Finding the Deal', description: 'Master the art of locating off-market properties and analyzing ROI potential.', status: 'completed' },
      { id: 's2', title: 'Rehab: Adding Value', description: 'Learn how to increase property value through strategic renovations.', status: 'in-progress', timeRemaining: '45 mins remaining', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBolg2g2UfX64vbKOtRPfJJTTTX-B9duV86b-qp7g7kDUuJ_dh-4n4Z40mVDMQxIkzwgF2a-yEeLd8eThyko-3i4tV2r9lytc89aJoZ_ls3nPkfRKbKsriUXRRoUyqUdh-TjcEkUs9p6OcneHldVV1hhaVFQGOfzIvwGmZxbWYcIBm5kUB8Fv_V-sODbB3x5eoAH9EDdKKmBhiho8rOj0UYViuqRlRrYaOtWs7vy7pFrHzw1FTcFJknYDChMBUkmLFeP_E8V2tPnAQ' },
      { id: 's3', title: 'Rent: Finding Tenants', description: 'Systematize your property management and screening processes.', status: 'locked' },
      { id: 's4', title: 'Refinance: Pulling Equity', description: 'Work with lenders to appraise your renovated asset.', status: 'locked' },
      { id: 's5', title: 'Repeat: Scaling Portfolio', description: 'Using recovered capital to purchase your next investment.', status: 'locked' }
    ]
  },
  {
    id: 't2',
    title: 'Flipping for Beginners',
    category: 'Development',
    duration: '3 Hours',
    modulesCount: 8,
    description: 'Master the art of rapid property renovation and resale for profit.',
    progress: 12,
    icon: 'house_siding',
    steps: []
  },
  {
    id: 't3',
    title: 'Commercial Conversions',
    category: 'Advanced',
    duration: '6 Hours',
    modulesCount: 15,
    description: 'Transforming tired office spaces into high-yield residential apartments.',
    progress: 0,
    icon: 'apartment',
    steps: []
  }
];
