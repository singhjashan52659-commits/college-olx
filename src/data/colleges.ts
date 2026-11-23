import { College } from '../types';

export const POPULAR_COLLEGES: College[] = [
  {
    id: 'iit-delhi',
    name: 'Indian Institute of Technology Delhi (IITD)',
    shortName: 'IIT Delhi',
    city: 'New Delhi',
    state: 'Delhi',
    domain: 'iitd.ac.in',
    alternateDomains: ['iitd.edu.in', 'cse.iitd.ac.in', 'ee.iitd.ac.in'],
    badge: 'Premier Institute',
  },
  {
    id: 'iit-bombay',
    name: 'Indian Institute of Technology Bombay (IITB)',
    shortName: 'IIT Bombay',
    city: 'Mumbai',
    state: 'Maharashtra',
    domain: 'iitb.ac.in',
    alternateDomains: ['iitb.edu.in', 'cse.iitb.ac.in'],
    badge: 'Premier Institute',
  },
  {
    id: 'bits-pilani',
    name: 'Birla Institute of Technology and Science (BITS Pilani)',
    shortName: 'BITS Pilani',
    city: 'Pilani',
    state: 'Rajasthan',
    domain: 'pilani.bits-pilani.ac.in',
    alternateDomains: ['bits-pilani.ac.in', 'goa.bits-pilani.ac.in', 'hyderabad.bits-pilani.ac.in'],
    badge: 'Top Tech Campus',
  },
  {
    id: 'delhi-university',
    name: 'Delhi University - North Campus (DU)',
    shortName: 'DU North Campus',
    city: 'New Delhi',
    state: 'Delhi',
    domain: 'du.ac.in',
    alternateDomains: ['kmc.du.ac.in', 'srcc.du.ac.in', 'ststephens.edu', 'mirandahouse.ac.in'],
    badge: 'Central University',
  },
  {
    id: 'vit-vellore',
    name: 'Vellore Institute of Technology (VIT Vellore)',
    shortName: 'VIT Vellore',
    city: 'Vellore',
    state: 'Tamil Nadu',
    domain: 'vit.ac.in',
    alternateDomains: ['vitstudent.ac.in', 'chennai.vit.ac.in'],
    badge: 'Top Private Tech',
  },
  {
    id: 'manipal-mit',
    name: 'Manipal Institute of Technology (MAHE)',
    shortName: 'MIT Manipal',
    city: 'Manipal',
    state: 'Karnataka',
    domain: 'manipal.edu',
    alternateDomains: ['learner.manipal.edu', 'manipal.edu.in'],
    badge: 'Global Campus',
  },
  {
    id: 'srm-ktr',
    name: 'SRM Institute of Science and Technology (KTR Campus)',
    shortName: 'SRM Kattankulathur',
    city: 'Chennai',
    state: 'Tamil Nadu',
    domain: 'srmist.edu.in',
    alternateDomains: ['srmuniv.ac.in'],
    badge: 'Large Campus',
  },
  {
    id: 'nit-trichy',
    name: 'National Institute of Technology Tiruchirappalli (NITT)',
    shortName: 'NIT Trichy',
    city: 'Tiruchirappalli',
    state: 'Tamil Nadu',
    domain: 'nitt.edu',
    alternateDomains: ['nitt.ac.in', 'nitt.edu.in'],
    badge: 'Top NIT',
  },
  {
    id: 'dtu-delhi',
    name: 'Delhi Technological University (DTU / DCE)',
    shortName: 'DTU Delhi',
    city: 'New Delhi',
    state: 'Delhi',
    domain: 'dtu.ac.in',
    alternateDomains: ['dtu.edu.in'],
    badge: 'Premier Tech',
  },
  {
    id: 'thapar-patiala',
    name: 'Thapar Institute of Engineering and Technology (TIET)',
    shortName: 'Thapar Patiala',
    city: 'Patiala',
    state: 'Punjab',
    domain: 'thapar.edu',
    alternateDomains: ['thapar.edu.in', 'tiet.ac.in'],
    badge: 'Top Tech Campus',
  },
  {
    id: 'bhu-varanasi',
    name: 'Banaras Hindu University (IIT-BHU)',
    shortName: 'IIT BHU Varanasi',
    city: 'Varanasi',
    state: 'Uttar Pradesh',
    domain: 'iitbhu.ac.in',
    alternateDomains: ['bhu.ac.in'],
    badge: 'Historic Campus',
  },
  {
    id: 'iiit-hyderabad',
    name: 'International Institute of Information Technology (IIITH)',
    shortName: 'IIIT Hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    domain: 'iiit.ac.in',
    alternateDomains: ['research.iiit.ac.in'],
    badge: 'Research Hub',
  }
];

export function getCollegeById(id: string): College | undefined {
  return POPULAR_COLLEGES.find((c) => c.id === id);
}

export function searchColleges(query: string): College[] {
  if (!query.trim()) return POPULAR_COLLEGES;
  const q = query.toLowerCase();
  return POPULAR_COLLEGES.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.shortName.toLowerCase().includes(q) ||
      c.city.toLowerCase().includes(q) ||
      c.state.toLowerCase().includes(q) ||
      c.domain.toLowerCase().includes(q)
  );
}

/**
 * Detects college from an educational email address
 * Supports: .edu.in, .ac.in, .edu, and subdomains
 */
export function detectCollegeFromEmail(email: string): {
  college: College | null;
  domain: string;
  isEduOrAc: boolean;
} {
  const trimmed = email.trim().toLowerCase();
  const parts = trimmed.split('@');
  if (parts.length !== 2) {
    return { college: null, domain: '', isEduOrAc: false };
  }

  const domain = parts[1];
  const isEduOrAc =
    domain.endsWith('.edu.in') ||
    domain.endsWith('.ac.in') ||
    domain.endsWith('.edu') ||
    domain.includes('.edu.') ||
    domain.includes('.ac.');

  // 1. Exact or alternate domain match from our list
  for (const c of POPULAR_COLLEGES) {
    if (c.domain === domain) {
      return { college: c, domain, isEduOrAc: true };
    }
    if (c.alternateDomains?.some((alt) => alt === domain || domain.endsWith('.' + alt))) {
      return { college: c, domain, isEduOrAc: true };
    }
    // Subdomain matching (e.g., student.iitd.ac.in -> iitd.ac.in)
    if (domain.endsWith('.' + c.domain)) {
      return { college: c, domain, isEduOrAc: true };
    }
  }

  // 2. Fallback: If it's a valid .edu / .edu.in / .ac.in address, generate a clean dynamic college
  if (isEduOrAc) {
    // Extract base institutional name from domain, e.g. "pec.edu.in" -> "PEC"
    const domainPrefix = domain.replace(/(\.edu\.in|\.ac\.in|\.edu|\.ac)$/, '');
    const cleanPrefix = domainPrefix.split('.').pop() || domainPrefix;
    const readableName = cleanPrefix.toUpperCase() + ' Campus';

    const dynamicCollege: College = {
      id: `dyn-${cleanPrefix.toLowerCase()}`,
      name: `${readableName} (${domain})`,
      shortName: cleanPrefix.toUpperCase(),
      city: 'Campus Network',
      state: 'Verified',
      domain: domain,
      badge: 'Verified Student Domain',
    };

    return { college: dynamicCollege, domain, isEduOrAc: true };
  }

  return { college: null, domain, isEduOrAc: false };
}
