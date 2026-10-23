export const CLINIC = {
  name: 'PHYSIOSTHIRA',
  tagline: 'Empowering and Inspiring Lives',
  subtitle: 'Expert Physiotherapy & Rehabilitation',
  phone: '+919187310374',
  phoneDisplay: '+91 91873 10374',
  whatsapp: '919187310374',
  whatsappMsg: 'Hello, I would like to enquire about physiotherapy services at Physio Sthira.',
  whatsappHomecareMsg: 'Hello, I am interested in your home physiotherapy service. Please share details.',
  email: 'physiosthira@gmail.com',
  address: '13th Cross Rd, Opp to Durga Parameshwari Arch, 4th Block, HMT Layout, Vidyaranyapura',
  city: 'Bengaluru, Karnataka 560097',
  instagram: 'https://www.instagram.com/physio_sthira?stkn=MXhyaWQ2cjFxcDU0cg==',
  facebook: 'https://www.facebook.com/share/199kHvGBX1/',
};

export const waLink = (msg) => {
  return `https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent(msg || CLINIC.whatsappMsg)}`;
};

export const phoneLink = () => {
  return `tel:${CLINIC.phone.replace(/[^+\d]/g, '')}`;
};

export const SERVICES = [
  {
    icon: 'M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z M19 10v1a7 7 0 0 1-14 0v-1 M12 18v4',
    title: 'Pain Management',
    desc: 'Relief for acute and chronic pain using manual therapy, electrotherapy, exercise and movement correction.',
    forWhom: 'Back pain, neck pain, joint pain, chronic conditions',
    detail: 'Combines hands-on manual therapy, therapeutic exercise, joint mobilisation, soft-tissue release and posture correction to identify and treat the source of pain — not just the symptoms.'
  },
  {
    icon: 'M13 2 3 14h9l-1 8 10-12h-9l1-8z',
    title: 'Sports Physiotherapy',
    desc: 'Helping athletes recover faster, prevent injuries and return to peak performance.',
    forWhom: 'Athletes, active individuals, sports injury recovery',
    detail: 'Sport-specific rehabilitation, return-to-play planning and injury-prevention programs tailored to your sport and level of activity. Includes biomechanical assessment.'
  },
  {
    icon: 'M12 2v20 M2 12h20',
    title: 'Orthopaedic Rehabilitation',
    desc: 'Treatment for joint, muscle and spine conditions that limit everyday movement.',
    forWhom: 'Shoulder, knee, hip, spine and joint conditions',
    detail: '<strong>May include:</strong> neck & back pain, frozen shoulder, arthritis, tennis elbow, heel pain, ligament injuries, muscle strains and joint pain. Personalised to each case.'
  },
  {
    icon: 'M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7z',
    title: 'Post-Surgical Rehabilitation',
    desc: 'Structured recovery to regain full function after surgery.',
    forWhom: 'Post-operative patients recovering from joint or spine surgery',
    detail: '<strong>Commonly after:</strong> knee & hip replacement, ACL reconstruction, fracture fixation, shoulder surgery and spine surgery. Protocols guided by surgical team and individual progress.'
  },
  {
    icon: 'M9 18V5l12-2v13 M6 15a3 3 0 1 0 0 6 3 3 0 0 0 0-6z M18 13a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
    title: 'Neurological Rehabilitation',
    desc: 'Improving mobility, function and independence through structured rehabilitation.',
    forWhom: "Stroke, Parkinson's, balance disorders, neurological conditions",
    detail: "<strong>May help with:</strong> stroke recovery, Parkinson's disease, facial palsy, multiple sclerosis and balance/coordination disorders. Aims to maximise functional recovery and independence."
  },
  {
    icon: 'M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z M16 8 2 22 M17.5 15H9',
    title: 'Exercise & Manual Therapy',
    desc: 'Customised therapeutic exercise combined with hands-on techniques to restore movement.',
    forWhom: 'Anyone needing structured rehabilitation or movement restoration',
    detail: 'Therapeutic exercise rebuilds flexibility, strength and endurance. Manual therapy relieves pain and improves joint mobility. Programs adapted to your condition and fitness level.'
  },
  {
    icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75',
    title: 'Geriatric Physiotherapy',
    desc: 'Helping older adults maintain mobility, balance, strength and independence.',
    forWhom: 'Older adults, fall prevention, age-related mobility concerns',
    detail: 'Fall-prevention programs, strength and balance training, walking re-education and mobility support to maintain independence and quality of life.'
  },
  {
    icon: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z M12 6v6l4 2',
    title: "Women's Health",
    desc: 'Specialised physiotherapy care across different life stages.',
    forWhom: 'Women at various life stages requiring specialist care',
    detail: "Focused programs supporting strength, mobility and recovery. Tailored to individual needs and life stage — specific details discussed during initial assessment."
  }
];

export const CONDITIONS = [
  { label: 'Back Pain', service: 'Pain Management', desc: 'Back pain is one of the most common conditions we treat. We can help assess the cause and develop a plan to reduce pain and restore movement.' },
  { label: 'Neck Pain', service: 'Pain Management', desc: 'Neck pain and stiffness can affect daily life significantly. Whether from posture, injury or a spinal condition, we can assess and manage your symptoms.' },
  { label: 'Knee Pain', service: 'Orthopaedic Rehabilitation', desc: 'Knee pain can have many causes. We assess your knee function and develop a personalised treatment and rehabilitation plan.' },
  { label: 'Shoulder Pain', service: 'Orthopaedic Rehabilitation', desc: 'Shoulder conditions including rotator cuff injuries, frozen shoulder and impingement can be effectively managed with physiotherapy.' },
  { label: 'Sports Injury', service: 'Sports Physiotherapy', desc: 'Sports injuries require specialist assessment and rehabilitation. We work with active individuals to recover safely and return to sport at the right pace.' },
  { label: 'Sciatica', service: 'Pain Management', desc: 'Sciatic nerve pain can be assessed and managed with physiotherapy. We identify contributing factors and provide appropriate treatment.' },
  { label: 'Joint Pain', service: 'Orthopaedic Rehabilitation', desc: 'Joint pain affecting any area of the body can limit activity and quality of life. We provide thorough assessment and personalised treatment.' },
  { label: 'Post-Surgery Recovery', service: 'Post-Surgical Rehabilitation', desc: 'Structured physiotherapy after surgery helps you recover faster, regain strength and return to full function.' },
  { label: 'Stroke Recovery', service: 'Neurological Rehabilitation', desc: 'Physiotherapy plays a key role in recovery after stroke — helping improve movement, strength, balance and independence.' },
  { label: 'Frozen Shoulder', service: 'Orthopaedic Rehabilitation', desc: 'Frozen shoulder causes significant stiffness and pain. Physiotherapy is central to treatment — gradually restoring range of movement.' },
  { label: 'Arthritis', service: 'Pain Management', desc: 'Physiotherapy can significantly reduce arthritis-related pain, improve joint function and help you stay active.' },
  { label: 'Disc Problems', service: 'Pain Management', desc: 'Disc-related conditions including prolapse and degeneration can cause significant pain. We assess and manage these with evidence-based approaches.' },
  { label: 'Mobility Problems', service: 'Geriatric Physiotherapy', desc: 'Reduced mobility can affect independence and quality of life. We develop programmes to improve movement and function.' },
  { label: 'Sports Performance', service: 'Sports Physiotherapy', desc: 'Beyond injury, we help active individuals address movement weaknesses and reduce future injury risk.' },
  { label: 'Balance Issues', service: 'Neurological Rehabilitation', desc: 'Balance problems increase fall risk and affect confidence. We develop targeted programs to improve stability and reduce fall risk.' }
];

export const FAQS = [
  { q: "Do I need a doctor's referral?", a: "No — you can book directly with us. Physiotherapists are primary healthcare practitioners and no referral is required." },
  { q: "What should I bring to my first appointment?", a: "Please bring any relevant medical reports, scan or X-ray results, and a list of medications if applicable. Wear comfortable clothing that allows access to the area being treated." },
  { q: "How long is a typical session?", a: "Initial consultations are typically longer to allow for a thorough assessment. Follow-up sessions may be shorter. We'll discuss the expected duration when you book." },
  { q: "How many sessions will I need?", a: "This depends on your condition, its severity, your goals and how you respond to treatment. We'll discuss a realistic plan during your first consultation." },
  { q: "What should I wear?", a: "Comfortable, loose-fitting clothing that allows easy movement and access to the area being treated." },
  { q: "Is physiotherapy painful?", a: "Some treatments may cause mild, temporary discomfort. Your physiotherapist will always keep treatment appropriate, safe and within your comfort level. Please communicate openly." },
  { q: "Do you offer home visits?", a: "Yes — our home physiotherapy service brings the same standard of professional care to your home. Suitable for patients with limited mobility, post-surgery recovery and elderly patients." },
  { q: "Can I contact the clinic through WhatsApp?", a: "Yes — WhatsApp is a convenient way to reach us with questions or to request an appointment." },
  { q: "Do you provide home exercise programs?", a: "Yes. Every patient receives a personalised home exercise program to support recovery between sessions." },
  { q: "How much does treatment cost?", a: "Please contact the clinic directly for current consultation and treatment fees. We're happy to discuss pricing when you get in touch." }
];

export const REVIEWS = [
  { name: "Bharath Bharath", rating: 5, review: "I visited this clinic for my neck pain. They treated soo well i love their hospitality and care for patients and their explanation is too good they make me feel so comfortable during my sessions now I'm so good because of their treatment i definitely recommend this clinic I'm thankful to Dr.Dileep", dp: null },
  { name: "Ramadevi R", rating: 5, review: "The treatment was effective , physiotherapist are attentive throughout my sessions went very well. Found very good relief from the begging for my neck pain. Highly recommend. Thanks to Physiosthira", dp: null },
  { name: "Kishor Gowda", rating: 5, review: "I had a great experience at Physiosthira Physiotherapy Clinic. Dr. Dileep is very professional, knowledgeable, and attentive throughout the treatment. He explains the problem clearly and provides personalized treatment with great care. Highly recommended for anyone looking for effective physiotherapy and rehabilitation.", dp: null },
  { name: "Prajwal Aiyappa", rating: 5, review: "I had a very good experience at this physiotherapy clinic. The physiotherapist is highly professional, knowledgeable, and takes the time to understand the problem properly before starting the treatment. The treatment was explained clearly, and I felt comfortable throughout the sessions.", dp: "dp/prajwal.png" },
  { name: "indu singh", rating: 5, review: "Best physiotherapy clinic with exceptional rehabilitation services! The approach here is highly personalized and evidence-based. They don't give you one-size-fits-all workout; instead, they design targeted exercises that fit your recovery goals. Doctors are highly skilled and very compassionate.", dp: "dp/indu.png" },
  { name: "Srinivasa Vempati", rating: 5, review: "Very talented physiotherapist. I found it very beneficial visiting the center. The therapists are very caring, humble and are very sensible too. They have very good experience and I am so happy visiting this center for my treatment.", dp: "dp/srinivasa.png" },
  { name: "Pooja ganiger", rating: 5, review: "I visited Dr. Shashi for lower back pain and was very impressed with his approach. He took the time to understand my condition, explained everything clearly, and provided exercises tailored to my needs. His guidance and attention to detail helped reduce my pain significantly.", dp: "dp/pooja.png" },
  { name: "manoj ps", rating: 5, review: "I consulted Dr. Shashi for knee pain and had a great experience. He carefully identified the root cause, provided personalised exercises, and guided me throughout the recovery process. His expertise helped reduce my pain and improve my mobility significantly.", dp: "dp/manoj.png" },
  { name: "Merwin Pinto", rating: 5, review: "Really professional and Great Physiotherapists. The physiotherapy sessions are really great, well planned and personalized to individual recovery needs.", dp: "dp/merwin.png" },
  { name: "Deekshitha Gowda", rating: 5, review: "Had a great experience at physiosthira physiotherapy clinic. The therapists are very encouraging. Staff is friendly. Clinic is clean and well maintained. Very satisfied with the care. Highly recommended!", dp: "dp/deekshitha.png" },
  { name: "Bibek Shah", rating: 5, review: "This is one of the best Rehabilitation centre in Bangalore. I was suffering from sciatica from very long time and Dr.Sashi helped me treating my problem so well that now I feel completely cured.", dp: null },
  { name: "prajwala naik", rating: 5, review: "I had a very good experience with Dr. Shashi. I consulted him for persistent back pain. He took the time to understand my symptoms and routine, assessed the problem carefully, and explained the cause in simple terms. He guided me through specific exercises and corrected my posture and technique during the sessions.", dp: null }
];
