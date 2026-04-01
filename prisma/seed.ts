import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // --- 1. Identity & Immigration ---
  const immigration = await prisma.category.upsert({
    where: { slug: 'immigration' },
    update: {},
    create: {
      slug: 'immigration',
      name: 'Identity & Immigration',
      description: 'Official Passport applications, renewals, and foreign national services.',
    },
  });

  const civilRegistration = await prisma.category.upsert({
    where: { slug: 'civil-registration' },
    update: {},
    create: {
      slug: 'civil-registration',
      name: 'Civil Registration',
      description: 'Birth and Death registrations and certificate applications.',
    },
  });

  const dci = await prisma.category.upsert({
    where: { slug: 'dci' },
    update: {},
    create: {
      slug: 'dci',
      name: 'DCI (Good Conduct)',
      description: 'Apply for Police Clearance Certificates (Good Conduct) and other DCI services.',
    },
  });

  // --- 2. Transport & Motoring ---
  const ntsa = await prisma.category.upsert({
    where: { slug: 'ntsa' },
    update: {},
    create: {
      slug: 'ntsa',
      name: 'Transport & NTSA',
      description: 'Driving licenses, logbooks, vehicle inspection and transport compliance.',
    },
  });

  // --- 3. Business & Tax Services ---
  const taxServices = await prisma.category.upsert({
    where: { slug: 'tax-services' },
    update: {},
    create: {
      slug: 'tax-services',
      name: 'Tax & KRA Services',
      description: 'KRA PIN, eTIMS registration, and tax return filing assistance.',
    },
  });

  const brs = await prisma.category.upsert({
    where: { slug: 'brs' },
    update: {},
    create: {
      slug: 'brs',
      name: 'Business Registration',
      description: 'Register names, companies, and partnership services through eCitizen.',
    },
  });

  // --- 4. Education & Training ---
  const education = await prisma.category.upsert({
    where: { slug: 'education' },
    update: {},
    create: {
      slug: 'education',
      name: 'Education & Training',
      description: 'HELB/HEF loans, TSC registration, and KUCCPS placement coordination.',
    },
  });

  // --- 5. Social Security ---
  const socialSecurity = await prisma.category.upsert({
    where: { slug: 'social-security' },
    update: {},
    create: {
      slug: 'social-security',
      name: 'Social Security',
      description: 'NSSF registration, contributions, and account management.',
    },
  });

  // --- 6. Other Key Services ---
  const legalMarriage = await prisma.category.upsert({
    where: { slug: 'marriage' },
    update: {},
    create: {
      slug: 'marriage',
      name: 'Marriage Services',
      description: 'Notice of marriage, registrar certificates, and marriage licenses.',
    },
  });

  const accountMgmt = await prisma.category.upsert({
    where: { slug: 'account-management' },
    update: {},
    create: {
      slug: 'account-management',
      name: 'Account & Profile',
      description: 'Update eCitizen profiles, change phone numbers, and account recovery.',
    },
  });

  const health = await prisma.category.upsert({
    where: { slug: 'health' },
    update: {},
    create: {
      slug: 'health',
      name: 'Health Services',
      description: 'Digital health records and certificates.',
    },
  });

  // --- SERVICES SEEDING ---

  const services = [
    // Immigration
    {
      categoryId: immigration.id,
      slug: 'passport-application',
      title: 'New Passport Application',
      price: 1500,
      seoKeywords: 'passport application kenya, apply for passport online, kenyan passport status',
      formSchema: [
        { name: 'full_name', label: 'Full Official Name', type: 'text', required: true },
        { name: 'id_number', label: 'ID Number', type: 'text', required: true },
        { name: 'birth_cert_no', label: 'Birth Certificate Entry Number', type: 'text', required: true },
        { name: 'passport_type', label: 'Passport Type', type: 'select', options: ['32 Pages', '50 Pages', 'Diplomatic'], required: true },
        { name: 'parent_id', label: 'Parent/Guardian ID Number', type: 'text', required: true },
      ],
    },
    // NTSA
    {
      categoryId: ntsa.id,
      slug: 'smart-dl-renewal',
      title: 'Smart DL Renewal',
      price: 300,
      seoKeywords: 'smart dl renewal kenya, ntsa smart dl, renew driving license online',
      formSchema: [
        { name: 'full_name', label: 'Full Official Name', type: 'text', required: true },
        { name: 'id_number', label: 'National ID Number', type: 'text', required: true },
        { name: 'phone_number', label: 'M-Pesa Phone Number', type: 'text', required: true },
        { name: 'blood_group', label: 'Blood Group', type: 'select', options: ['A+', 'O+', 'B+', 'AB+', 'Unknown'], required: true },
        { name: 'passport_photo', label: 'Passport Size Photo', type: 'file', required: true },
      ],
    },
    {
      categoryId: ntsa.id,
      slug: 'logbook-transfer',
      title: 'NTSA Logbook Transfer',
      price: 500,
      seoKeywords: 'ntsa logbook transfer, car ownership transfer kenya, transfer logbook online',
      formSchema: [
          { name: 'registration_number', label: 'Vehicle Registration Number', type: 'text', required: true },
          { name: 'buyer_name', label: 'Buyer Full Name', type: 'text', required: true },
          { name: 'buyer_id', label: 'Buyer ID Number', type: 'text', required: true },
          { name: 'sale_agreement', label: 'Sale Agreement Scan', type: 'file', required: true },
      ],
    },
    // DCI
    {
      categoryId: dci.id,
      slug: 'police-clearance',
      title: 'Police Clearance Certificate (Good Conduct)',
      price: 250,
      seoKeywords: 'good conduct certificate online, dci clearance online kenya',
      formSchema: [
          { name: 'full_name', label: 'Full Official Name', type: 'text', required: true },
          { name: 'id_number', label: 'National ID Number', type: 'text', required: true },
          { name: 'preferred_center', label: 'Fingerprints Collection Center', type: 'text', required: true },
          { name: 'reason', label: 'Application Reason', type: 'select', options: ['Employment', 'Personal', 'Tender'], required: true },
      ],
    },
    // Civil Registration
    {
      categoryId: civilRegistration.id,
      slug: 'birth-registration',
      title: 'Birth Certificate Application',
      price: 200,
      seoKeywords: 'birth certificate online kenya, apply for birth certificate eCitizen',
      formSchema: [
          { name: 'child_name', label: 'Child Full Name', type: 'text', required: true },
          { name: 'hospital_notification', label: 'Hospital Notification Number', type: 'text', required: true },
          { name: 'mother_id', label: 'Mother ID Number', type: 'text', required: true },
          { name: 'father_id', label: 'Father ID Number', type: 'text', required: false },
      ],
    },
    // Tax
    {
      categoryId: taxServices.id,
      slug: 'kra-pin-registration',
      title: 'KRA PIN Registration',
      price: 150,
      seoKeywords: 'kra pin registration, apply for kra pin online, tax pin kenya',
      formSchema: [
          { name: 'full_name', label: 'Full Name', type: 'text', required: true },
          { name: 'id_number', label: 'ID Number', type: 'text', required: true },
          { name: 'dob', label: 'Date of Birth', type: 'text', required: true },
          { name: 'residential_address', label: 'Residential Address', type: 'text', required: true },
      ],
    },
    // BRS
    {
      categoryId: brs.id,
      slug: 'business-name-search',
      title: 'Business Name Search',
      price: 150,
      seoKeywords: 'business name search kenya, register company names eCitizen',
      formSchema: [
          { name: 'proposed_name_1', label: 'Proposed Name 1', type: 'text', required: true },
          { name: 'proposed_name_2', label: 'Proposed Name 2', type: 'text', required: true },
          { name: 'nature_of_business', label: 'Nature of Business', type: 'text', required: true },
          { name: 'phone_number', label: 'M-Pesa Phone Number', type: 'text', required: true },
      ],
    },
    // Education
    {
      categoryId: education.id,
      slug: 'helb-loan-application',
      title: 'HELB Loan Application',
      price: 200,
      seoKeywords: 'helb loan application, apply for helb online, student funding kenya',
      formSchema: [
          { name: 'registration_number', label: 'University/College Reg Number', type: 'text', required: true },
          { name: 'kcse_index', label: 'KCSE Index Number', type: 'text', required: true },
          { name: 'course_level', label: 'Course Level', type: 'select', options: ['Undergraduate', 'Diploma', 'TVET'], required: true },
      ],
    },
    // Social Security
    {
      categoryId: socialSecurity.id,
      slug: 'nssf-registration',
      title: 'NSSF Member Registration',
      price: 100,
      seoKeywords: 'nssf registration kenya, join nssf online',
      formSchema: [
          { name: 'full_name', label: 'Full Name', type: 'text', required: true },
          { name: 'id_number', label: 'ID Number', type: 'text', required: true },
          { name: 'phone_number', label: 'Phone Number', type: 'text', required: true },
      ],
    },
    // Marriage
    {
      categoryId: legalMarriage.id,
      slug: 'notice-of-marriage',
      title: 'Notice of Marriage',
      price: 600,
      seoKeywords: 'notice of marriage kenya, civil marriage registration eCitizen',
      formSchema: [
          { name: 'groom_name', label: 'Groom Full Name', type: 'text', required: true },
          { name: 'bride_name', label: 'Bride Full Name', type: 'text', required: true },
          { name: 'residence', label: 'Place of Residence', type: 'text', required: true },
          { name: 'proposed_date', label: 'Proposed Marriage Date', type: 'text', required: true },
      ],
    },
    // Account Management
    {
      categoryId: accountMgmt.id,
      slug: 'change-ecitizen-phone',
      title: 'Change eCitizen Phone Number',
      price: 100,
      seoKeywords: 'change ecitizen phone number, recovery ecitizen account',
      formSchema: [
          { name: 'id_number', label: 'ID Number', type: 'text', required: true },
          { name: 'old_phone', label: 'Current/Old Phone Number', type: 'text', required: true },
          { name: 'new_phone', label: 'New Phone Number', type: 'text', required: true },
      ],
    },
    // Health
    {
      categoryId: health.id,
      slug: 'covid-certificate-download',
      title: 'COVID-19 Certificate Download',
      price: 50,
      seoKeywords: 'download covid certificate kenya, health certificates online',
      formSchema: [
          { name: 'id_number', label: 'ID Number', type: 'text', required: true },
          { name: 'phone_number', label: 'Registered Phone Number', type: 'text', required: true },
      ],
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {
        categoryId: service.categoryId,
        title: service.title,
        price: service.price,
        seoKeywords: service.seoKeywords,
        formSchema: service.formSchema,
      },
      create: service,
    });
  }

  // --- 7. Seed Locations (Extended) ---
  const locations = [
    { name: "Nairobi CBD", county: "Nairobi" },
    { name: "Westlands", county: "Nairobi" },
    { name: "Kasarani", county: "Nairobi" },
    { name: "Embakasi", county: "Nairobi" },
    { name: "Kibra", county: "Nairobi" },
    { name: "Mombasa Island", county: "Mombasa" },
    { name: "Nyali", county: "Mombasa" },
    { name: "Kisumu City", county: "Kisumu" },
    { name: "Nakuru Town", county: "Nakuru" },
    { name: "Eldoret Town", county: "Uasin Gishu" },
    { name: "Thika Town", county: "Kiambu" },
    { name: "Malindi Town", county: "Kilifi" },
    { name: "Kakamega Town", county: "Kakamega" },
    { name: "Machakos Town", county: "Machakos" },
    { name: "Nyeri Town", county: "Nyeri" },
    { name: "Kisii Town", county: "Kisii" },
    { name: "Garissa Town", county: "Garissa" },
    { name: "Voi Town", county: "Taita-Taveta" },
  ];

  for (const loc of locations) {
    const slug = loc.name.toLowerCase().replace(/ /g, '-').replace(/[()]/g, '');
    await prisma.location.upsert({
      where: { slug: slug },
      update: {},
      create: {
        slug: slug,
        name: loc.name,
        county: loc.county
      }
    });
  }

  console.log('Database comprehensively seeded with official services!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
