const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const cats = await prisma.category.findMany();
  const catMap = {};
  cats.forEach((c) => (catMap[c.slug] = c.id));

  const newServices = [
    // NTSA
    { categoryId: catMap["ntsa"], slug: "dl-replacement", title: "DL Replacement", price: 1550, seoKeywords: "DL replacement Kenya, lost driving license, NTSA DL replacement online", formSchema: [{name:"full_name",label:"Full Name",type:"text",required:true},{name:"id_number",label:"ID Number",type:"text",required:true},{name:"phone_number",label:"Phone Number",type:"tel",required:true},{name:"dl_number",label:"Current DL Number",type:"text",required:true}] },
    { categoryId: catMap["ntsa"], slug: "provisional-dl", title: "Provisional Driving License", price: 1050, seoKeywords: "provisional driving license Kenya, learner permit NTSA", formSchema: [{name:"full_name",label:"Full Name",type:"text",required:true},{name:"id_number",label:"ID Number",type:"text",required:true},{name:"phone_number",label:"Phone Number",type:"tel",required:true},{name:"dl_class",label:"DL Class (BCE/ABCE)",type:"text",required:true}] },
    { categoryId: catMap["ntsa"], slug: "motor-vehicle-search", title: "Motor Vehicle Search", price: 550, seoKeywords: "motor vehicle search Kenya, NTSA vehicle search, car logbook search", formSchema: [{name:"full_name",label:"Full Name",type:"text",required:true},{name:"phone_number",label:"Phone Number",type:"tel",required:true},{name:"registration_number",label:"Vehicle Registration Number",type:"text",required:true}] },
    // DCI
    { categoryId: catMap["dci"], slug: "foreigner-certificate", title: "Foreigner Certificate of Good Conduct", price: 2050, seoKeywords: "foreigner good conduct Kenya, expat police clearance, DCI foreigner", formSchema: [{name:"full_name",label:"Full Name",type:"text",required:true},{name:"passport_number",label:"Passport Number",type:"text",required:true},{name:"phone_number",label:"Phone Number",type:"tel",required:true},{name:"nationality",label:"Nationality",type:"text",required:true}] },
    // BRS
    { categoryId: catMap["brs"], slug: "company-registration", title: "Company Registration", price: 3500, seoKeywords: "company registration Kenya, register company BRS, new company Kenya", formSchema: [{name:"full_name",label:"Director Full Name",type:"text",required:true},{name:"id_number",label:"ID Number",type:"text",required:true},{name:"phone_number",label:"Phone Number",type:"tel",required:true},{name:"proposed_name_1",label:"Proposed Company Name 1",type:"text",required:true},{name:"proposed_name_2",label:"Proposed Company Name 2",type:"text",required:true}] },
    { categoryId: catMap["brs"], slug: "cr12-search", title: "CR12 Search", price: 850, seoKeywords: "CR12 search Kenya, company CR12 online, BRS CR12 document", formSchema: [{name:"full_name",label:"Full Name",type:"text",required:true},{name:"phone_number",label:"Phone Number",type:"tel",required:true},{name:"company_name",label:"Company Name",type:"text",required:true},{name:"registration_number",label:"Registration Number",type:"text",required:true}] },
    // Tax
    { categoryId: catMap["tax-services"], slug: "kra-compliance", title: "KRA Tax Compliance Certificate", price: 1050, seoKeywords: "KRA compliance certificate Kenya, tax compliance online, KRA TCC", formSchema: [{name:"full_name",label:"Full Name",type:"text",required:true},{name:"kra_pin",label:"KRA PIN",type:"text",required:true},{name:"phone_number",label:"Phone Number",type:"tel",required:true}] },
    { categoryId: catMap["tax-services"], slug: "etims-registration", title: "eTIMS Registration", price: 750, seoKeywords: "eTIMS registration Kenya, KRA eTIMS, electronic tax invoice", formSchema: [{name:"full_name",label:"Full Name / Business Name",type:"text",required:true},{name:"kra_pin",label:"KRA PIN",type:"text",required:true},{name:"phone_number",label:"Phone Number",type:"tel",required:true},{name:"email",label:"Email Address",type:"email",required:true}] },
    // Education
    { categoryId: catMap["education"], slug: "kuccps-placement", title: "KUCCPS Placement Check", price: 350, seoKeywords: "KUCCPS placement Kenya, university placement check", formSchema: [{name:"full_name",label:"Full Name",type:"text",required:true},{name:"phone_number",label:"Phone Number",type:"tel",required:true},{name:"kcse_index",label:"KCSE Index Number",type:"text",required:true}] },
    // Civil Registration
    { categoryId: catMap["civil-registration"], slug: "death-certificate", title: "Death Certificate Application", price: 550, seoKeywords: "death certificate Kenya, apply death certificate online", formSchema: [{name:"full_name",label:"Applicant Full Name",type:"text",required:true},{name:"id_number",label:"Applicant ID Number",type:"text",required:true},{name:"phone_number",label:"Phone Number",type:"tel",required:true},{name:"deceased_name",label:"Deceased Full Name",type:"text",required:true}] },
    { categoryId: catMap["civil-registration"], slug: "marriage-certificate-reg", title: "Marriage Certificate Registration", price: 850, seoKeywords: "marriage certificate Kenya, get marriage certificate online", formSchema: [{name:"full_name",label:"Full Name",type:"text",required:true},{name:"id_number",label:"ID Number",type:"text",required:true},{name:"phone_number",label:"Phone Number",type:"tel",required:true},{name:"spouse_name",label:"Spouse Full Name",type:"text",required:true}] },
    // Immigration
    { categoryId: catMap["immigration"], slug: "visa-application", title: "Visa Application", price: 5500, seoKeywords: "Kenya visa application, apply visa Kenya online, immigration visa", formSchema: [{name:"full_name",label:"Full Name",type:"text",required:true},{name:"passport_number",label:"Passport Number",type:"text",required:true},{name:"phone_number",label:"Phone Number",type:"tel",required:true},{name:"nationality",label:"Nationality",type:"text",required:true},{name:"purpose_of_visit",label:"Purpose of Visit",type:"text",required:true}] },
    // Health
    { categoryId: catMap["health"], slug: "nhif-registration", title: "NHIF Registration", price: 350, seoKeywords: "NHIF registration Kenya, register NHIF online, national health insurance", formSchema: [{name:"full_name",label:"Full Name",type:"text",required:true},{name:"id_number",label:"ID Number",type:"text",required:true},{name:"phone_number",label:"Phone Number",type:"tel",required:true}] },
    // Social Security
    { categoryId: catMap["social-security"], slug: "nhif-card-replacement", title: "NHIF Card Replacement", price: 250, seoKeywords: "NHIF card replacement Kenya, lost NHIF card", formSchema: [{name:"full_name",label:"Full Name",type:"text",required:true},{name:"id_number",label:"ID Number",type:"text",required:true},{name:"phone_number",label:"Phone Number",type:"tel",required:true},{name:"nhif_number",label:"NHIF Member Number",type:"text",required:true}] },
    // Marriage
    { categoryId: catMap["marriage"], slug: "registrar-marriage", title: "Registrar Marriage Application", price: 1500, seoKeywords: "registrar marriage Kenya, civil marriage application online", formSchema: [{name:"groom_name",label:"Groom Full Name",type:"text",required:true},{name:"bride_name",label:"Bride Full Name",type:"text",required:true},{name:"phone_number",label:"Phone Number",type:"tel",required:true},{name:"id_number",label:"Groom ID Number",type:"text",required:true}] },
    // Account
    { categoryId: catMap["account-management"], slug: "ecitizen-account-recovery", title: "eCitizen Account Recovery", price: 350, seoKeywords: "eCitizen account recovery, forgot eCitizen password, eCitizen login help", formSchema: [{name:"full_name",label:"Full Name",type:"text",required:true},{name:"id_number",label:"ID Number",type:"text",required:true},{name:"phone_number",label:"Current Phone Number",type:"tel",required:true},{name:"email",label:"Email Address",type:"email",required:true}] },
  ];

  let added = 0;
  for (const svc of newServices) {
    const exists = await prisma.service.findUnique({ where: { slug: svc.slug } });
    if (!exists) {
      await prisma.service.create({ data: svc });
      added++;
      console.log("Added: " + svc.title);
    } else {
      console.log("Exists: " + svc.title);
    }
  }
  console.log("\nTotal added: " + added);
}

main().then(() => prisma.$disconnect());
