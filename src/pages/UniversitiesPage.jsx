import { useState, useRef } from 'react'

const COUNTRIES = [
  {
    id: 'germany', name: 'Germany', flag: '🇩🇪', color: '#000000', accent: '#DD0000',
    light: '#fff8f8', desc: 'Free or low-cost tuition, world-class research universities',
    universities: [
      { name: 'Technical University of Munich', city: 'Munich', qs: 37, fields: ['Engineering', 'Computer Science', 'Natural Sciences'], link: 'https://www.tum.de', scholarship: 'DAAD, DeutschlandStipendium' },
      { name: 'Ludwig Maximilian University', city: 'Munich', qs: 59, fields: ['Medicine', 'Law', 'Humanities'], link: 'https://www.lmu.de', scholarship: 'DAAD' },
      { name: 'Heidelberg University', city: 'Heidelberg', qs: 87, fields: ['Medicine', 'Life Sciences', 'Social Sciences'], link: 'https://www.uni-heidelberg.de', scholarship: 'DAAD, Heidelberg Excellence' },
      { name: 'Humboldt University Berlin', city: 'Berlin', qs: 120, fields: ['Arts', 'Social Sciences', 'Natural Sciences'], link: 'https://www.hu-berlin.de', scholarship: 'DAAD' },
      { name: 'Free University Berlin', city: 'Berlin', qs: 98, fields: ['Political Science', 'Law', 'Biology'], link: 'https://www.fu-berlin.de', scholarship: 'DAAD, Erasmus' },
      { name: 'RWTH Aachen University', city: 'Aachen', qs: 106, fields: ['Engineering', 'Architecture', 'Business'], link: 'https://www.rwth-aachen.de', scholarship: 'DAAD EPOS' },
      { name: 'University of Hamburg', city: 'Hamburg', qs: 175, fields: ['Law', 'Business', 'Natural Sciences'], link: 'https://www.uni-hamburg.de', scholarship: 'DAAD' },
      { name: 'University of Bonn', city: 'Bonn', qs: 201, fields: ['Mathematics', 'Agriculture', 'Theology'], link: 'https://www.uni-bonn.de', scholarship: 'BIGS Development Economics' },
      { name: 'Karlsruhe Institute of Technology', city: 'Karlsruhe', qs: 119, fields: ['Engineering', 'Computer Science', 'Physics'], link: 'https://www.kit.edu', scholarship: 'DAAD' },
      { name: 'University of Freiburg', city: 'Freiburg', qs: 194, fields: ['Medicine', 'Environmental Sciences', 'Humanities'], link: 'https://www.uni-freiburg.de', scholarship: 'DAAD, Erasmus Mundus' },
      { name: 'TU Dresden', city: 'Dresden', qs: 298, fields: ['Engineering', 'Medicine', 'Natural Sciences'], link: 'https://www.tu-dresden.de', scholarship: 'DAAD, DeutschlandStipendium' },
      { name: 'University of Stuttgart', city: 'Stuttgart', qs: 318, fields: ['Aerospace', 'Engineering', 'Architecture'], link: 'https://www.uni-stuttgart.de', scholarship: 'DAAD' },
    ]
  },
  {
    id: 'uk', name: 'United Kingdom', flag: '🇬🇧', color: '#012169', accent: '#C8102E',
    light: '#f0f4ff', desc: 'Prestigious universities with strong alumni networks worldwide',
    universities: [
      { name: 'University of Oxford', city: 'Oxford', qs: 3, fields: ['All Disciplines', 'Medicine', 'Law'], link: 'https://www.ox.ac.uk', scholarship: 'Chevening, Rhodes' },
      { name: 'University of Cambridge', city: 'Cambridge', qs: 2, fields: ['All Disciplines', 'Engineering', 'Sciences'], link: 'https://www.cam.ac.uk', scholarship: 'Cambridge Trust, Gates' },
      { name: 'Imperial College London', city: 'London', qs: 8, fields: ['Engineering', 'Medicine', 'Business'], link: 'https://www.imperial.ac.uk', scholarship: 'President\'s PhD Scholarship' },
      { name: 'University College London', city: 'London', qs: 9, fields: ['Medicine', 'Architecture', 'Law'], link: 'https://www.ucl.ac.uk', scholarship: 'Chevening, Commonwealth' },
      { name: 'University of Edinburgh', city: 'Edinburgh', qs: 27, fields: ['Medicine', 'Veterinary', 'Arts'], link: 'https://www.ed.ac.uk', scholarship: 'Edinburgh Global, GREAT' },
      { name: 'University of Manchester', city: 'Manchester', qs: 32, fields: ['Business', 'Engineering', 'Social Sciences'], link: 'https://www.manchester.ac.uk', scholarship: 'GREAT, President\'s Award' },
      { name: 'King\'s College London', city: 'London', qs: 40, fields: ['Medicine', 'Law', 'Social Sciences'], link: 'https://www.kcl.ac.uk', scholarship: 'Chevening, Commonwealth' },
      { name: 'University of Glasgow', city: 'Glasgow', qs: 73, fields: ['Medicine', 'Engineering', 'Arts'], link: 'https://www.gla.ac.uk', scholarship: 'GREAT, Commonwealth' },
      { name: 'University of Birmingham', city: 'Birmingham', qs: 84, fields: ['Business', 'Engineering', 'Law'], link: 'https://www.birmingham.ac.uk', scholarship: 'Commonwealth, Chevening' },
      { name: 'University of Leeds', city: 'Leeds', qs: 86, fields: ['Business', 'Engineering', 'Arts'], link: 'https://www.leeds.ac.uk', scholarship: 'GREAT, Commonwealth' },
      { name: 'University of Southampton', city: 'Southampton', qs: 100, fields: ['Engineering', 'Ocean Sciences', 'Computer Science'], link: 'https://www.southampton.ac.uk', scholarship: 'Commonwealth' },
      { name: 'University of Warwick', city: 'Coventry', qs: 67, fields: ['Business', 'Engineering', 'Social Sciences'], link: 'https://www.warwick.ac.uk', scholarship: 'Chevening, Commonwealth' },
    ]
  },
  {
    id: 'usa', name: 'United States', flag: '🇺🇸', color: '#3C3B6E', accent: '#B22234',
    light: '#f0f0ff', desc: 'Top research universities with generous merit-based aid',
    universities: [
      { name: 'Massachusetts Institute of Technology', city: 'Cambridge, MA', qs: 1, fields: ['Engineering', 'Computer Science', 'Architecture'], link: 'https://www.mit.edu', scholarship: 'Fulbright, MIT Fellowship' },
      { name: 'Harvard University', city: 'Cambridge, MA', qs: 4, fields: ['Medicine', 'Law', 'Business'], link: 'https://www.harvard.edu', scholarship: 'Fulbright, Harvard Fellowship' },
      { name: 'Stanford University', city: 'Stanford, CA', qs: 6, fields: ['Engineering', 'Business', 'Medicine'], link: 'https://www.stanford.edu', scholarship: 'Fulbright, Knight-Hennessy' },
      { name: 'University of California Berkeley', city: 'Berkeley, CA', qs: 10, fields: ['Engineering', 'Law', 'Business'], link: 'https://www.berkeley.edu', scholarship: 'Fulbright, UC Berkeley Fellowship' },
      { name: 'Columbia University', city: 'New York, NY', qs: 12, fields: ['Journalism', 'Law', 'Business'], link: 'https://www.columbia.edu', scholarship: 'Fulbright' },
      { name: 'University of Chicago', city: 'Chicago, IL', qs: 21, fields: ['Economics', 'Law', 'Social Sciences'], link: 'https://www.uchicago.edu', scholarship: 'Fulbright, UChicago Fellowship' },
      { name: 'Johns Hopkins University', city: 'Baltimore, MD', qs: 25, fields: ['Medicine', 'Public Health', 'Engineering'], link: 'https://www.jhu.edu', scholarship: 'Fulbright' },
      { name: 'University of Michigan', city: 'Ann Arbor, MI', qs: 23, fields: ['Engineering', 'Business', 'Law'], link: 'https://umich.edu', scholarship: 'Fulbright, Rackham Fellowship' },
      { name: 'Cornell University', city: 'Ithaca, NY', qs: 13, fields: ['Agriculture', 'Engineering', 'Hotel Management'], link: 'https://www.cornell.edu', scholarship: 'Fulbright' },
      { name: 'University of Texas Austin', city: 'Austin, TX', qs: 67, fields: ['Engineering', 'Business', 'Law'], link: 'https://www.utexas.edu', scholarship: 'Fulbright, Humphrey' },
      { name: 'Arizona State University', city: 'Tempe, AZ', qs: 201, fields: ['Business', 'Engineering', 'Arts'], link: 'https://www.asu.edu', scholarship: 'ASU Graduate Fellowship' },
      { name: 'Purdue University', city: 'West Lafayette, IN', qs: 99, fields: ['Engineering', 'Agriculture', 'Computer Science'], link: 'https://www.purdue.edu', scholarship: 'Fulbright' },
    ]
  },
  {
    id: 'canada', name: 'Canada', flag: '🇨🇦', color: '#CC0000', accent: '#FF0000',
    light: '#fff5f5', desc: 'Post-study work permits, pathway to permanent residency',
    universities: [
      { name: 'University of Toronto', city: 'Toronto, ON', qs: 21, fields: ['Medicine', 'Engineering', 'Law'], link: 'https://www.utoronto.ca', scholarship: 'Vanier, Lester B. Pearson' },
      { name: 'University of British Columbia', city: 'Vancouver, BC', qs: 34, fields: ['Forestry', 'Medicine', 'Engineering'], link: 'https://www.ubc.ca', scholarship: 'Vanier, 4YF' },
      { name: 'McGill University', city: 'Montreal, QC', qs: 30, fields: ['Medicine', 'Law', 'Engineering'], link: 'https://www.mcgill.ca', scholarship: 'McGill Entrance Scholarship' },
      { name: 'University of Alberta', city: 'Edmonton, AB', qs: 111, fields: ['Engineering', 'Business', 'Agriculture'], link: 'https://www.ualberta.ca', scholarship: 'Alberta Graduate Excellence' },
      { name: 'University of Waterloo', city: 'Waterloo, ON', qs: 114, fields: ['Computer Science', 'Engineering', 'Mathematics'], link: 'https://uwaterloo.ca', scholarship: 'Vanier, Graduate Scholarship' },
      { name: 'Western University', city: 'London, ON', qs: 172, fields: ['Business', 'Medicine', 'Law'], link: 'https://www.uwo.ca', scholarship: 'Western Graduate Research' },
      { name: 'Queen\'s University', city: 'Kingston, ON', qs: 209, fields: ['Business', 'Law', 'Engineering'], link: 'https://www.queensu.ca', scholarship: 'Queen\'s Graduate Award' },
      { name: 'Simon Fraser University', city: 'Burnaby, BC', qs: 283, fields: ['Computing Science', 'Business', 'Social Sciences'], link: 'https://www.sfu.ca', scholarship: 'SFU Graduate Fellowship' },
      { name: 'Dalhousie University', city: 'Halifax, NS', qs: 298, fields: ['Medicine', 'Law', 'Engineering'], link: 'https://www.dal.ca', scholarship: 'Killam Fellowship' },
      { name: 'University of Ottawa', city: 'Ottawa, ON', qs: 237, fields: ['Law', 'Social Sciences', 'Medicine'], link: 'https://www.uottawa.ca', scholarship: 'Excellence Scholarship' },
    ]
  },
  {
    id: 'australia', name: 'Australia', flag: '🇦🇺', color: '#00008B', accent: '#FFCD00',
    light: '#f0f8ff', desc: 'Australia Awards scholarship, quality lifestyle, strong job market',
    universities: [
      { name: 'University of Melbourne', city: 'Melbourne, VIC', qs: 14, fields: ['Medicine', 'Law', 'Business'], link: 'https://www.unimelb.edu.au', scholarship: 'Australia Awards, Melbourne Research' },
      { name: 'University of Sydney', city: 'Sydney, NSW', qs: 18, fields: ['Medicine', 'Architecture', 'Business'], link: 'https://www.sydney.edu.au', scholarship: 'Australia Awards, Sydney Scholars' },
      { name: 'Australian National University', city: 'Canberra, ACT', qs: 34, fields: ['Policy', 'Sciences', 'Arts'], link: 'https://www.anu.edu.au', scholarship: 'Australia Awards, ANU PhD' },
      { name: 'University of Queensland', city: 'Brisbane, QLD', qs: 40, fields: ['Medicine', 'Engineering', 'Agriculture'], link: 'https://www.uq.edu.au', scholarship: 'Australia Awards, UQ Research' },
      { name: 'Monash University', city: 'Melbourne, VIC', qs: 42, fields: ['Business', 'Medicine', 'Engineering'], link: 'https://www.monash.edu', scholarship: 'Australia Awards, Monash Graduate' },
      { name: 'University of New South Wales', city: 'Sydney, NSW', qs: 19, fields: ['Engineering', 'Business', 'Law'], link: 'https://www.unsw.edu.au', scholarship: 'Australia Awards, UNSW Scientia' },
      { name: 'University of Western Australia', city: 'Perth, WA', qs: 72, fields: ['Medicine', 'Agriculture', 'Engineering'], link: 'https://www.uwa.edu.au', scholarship: 'Australia Awards' },
      { name: 'University of Adelaide', city: 'Adelaide, SA', qs: 109, fields: ['Engineering', 'Medicine', 'Agriculture'], link: 'https://www.adelaide.edu.au', scholarship: 'Australia Awards, Adelaide Scholarship' },
      { name: 'Macquarie University', city: 'Sydney, NSW', qs: 195, fields: ['Business', 'Law', 'Sciences'], link: 'https://www.mq.edu.au', scholarship: 'Australia Awards' },
      { name: 'University of Technology Sydney', city: 'Sydney, NSW', qs: 133, fields: ['Technology', 'Design', 'Business'], link: 'https://www.uts.edu.au', scholarship: 'UTS International Scholarship' },
    ]
  },
  {
    id: 'japan', name: 'Japan', flag: '🇯🇵', color: '#BC002D', accent: '#ffffff',
    light: '#fff5f7', desc: 'MEXT government scholarship, cutting-edge research, safe lifestyle',
    universities: [
      { name: 'University of Tokyo', city: 'Tokyo', qs: 28, fields: ['Engineering', 'Medicine', 'Law'], link: 'https://www.u-tokyo.ac.jp', scholarship: 'MEXT, UTokyo MERIT' },
      { name: 'Kyoto University', city: 'Kyoto', qs: 46, fields: ['Sciences', 'Medicine', 'Agriculture'], link: 'https://www.kyoto-u.ac.jp', scholarship: 'MEXT, Kyoto University Fellowship' },
      { name: 'Osaka University', city: 'Osaka', qs: 80, fields: ['Medicine', 'Engineering', 'Sciences'], link: 'https://www.osaka-u.ac.jp', scholarship: 'MEXT, OUSSEP' },
      { name: 'Tohoku University', city: 'Sendai', qs: 105, fields: ['Engineering', 'Sciences', 'Agriculture'], link: 'https://www.tohoku.ac.jp', scholarship: 'MEXT' },
      { name: 'Tokyo Institute of Technology', city: 'Tokyo', qs: 91, fields: ['Engineering', 'Computer Science', 'Sciences'], link: 'https://www.titech.ac.jp', scholarship: 'MEXT, TokyoTech Fellowship' },
      { name: 'Nagoya University', city: 'Nagoya', qs: 118, fields: ['Medicine', 'Engineering', 'Sciences'], link: 'https://www.nagoya-u.ac.jp', scholarship: 'MEXT' },
      { name: 'Kyushu University', city: 'Fukuoka', qs: 157, fields: ['Engineering', 'Medicine', 'Agriculture'], link: 'https://www.kyushu-u.ac.jp', scholarship: 'MEXT' },
      { name: 'Hokkaido University', city: 'Sapporo', qs: 187, fields: ['Agriculture', 'Medicine', 'Engineering'], link: 'https://www.hokudai.ac.jp', scholarship: 'MEXT' },
      { name: 'Keio University', city: 'Tokyo', qs: 198, fields: ['Business', 'Medicine', 'Law'], link: 'https://www.keio.ac.jp', scholarship: 'MEXT, Keio Scholarship' },
      { name: 'Waseda University', city: 'Tokyo', qs: 201, fields: ['Business', 'Engineering', 'Arts'], link: 'https://www.waseda.jp', scholarship: 'MEXT, Waseda Scholarship' },
    ]
  },
  {
    id: 'sweden', name: 'Sweden', flag: '🇸🇪', color: '#006AA7', accent: '#FECC02',
    light: '#f0f7ff', desc: 'Swedish Institute Scholarship, innovation-focused education',
    universities: [
      { name: 'Lund University', city: 'Lund', qs: 69, fields: ['Engineering', 'Medicine', 'Social Sciences'], link: 'https://www.lu.se', scholarship: 'SI Scholarship, Lund Global' },
      { name: 'KTH Royal Institute of Technology', city: 'Stockholm', qs: 89, fields: ['Engineering', 'Architecture', 'Computer Science'], link: 'https://www.kth.se', scholarship: 'SI Scholarship, KTH Scholarship' },
      { name: 'Uppsala University', city: 'Uppsala', qs: 97, fields: ['Medicine', 'Sciences', 'Humanities'], link: 'https://www.uu.se', scholarship: 'SI Scholarship' },
      { name: 'Stockholm University', city: 'Stockholm', qs: 165, fields: ['Social Sciences', 'Natural Sciences', 'Law'], link: 'https://www.su.se', scholarship: 'SI Scholarship, Stockholm Scholarship' },
      { name: 'Chalmers University of Technology', city: 'Gothenburg', qs: 183, fields: ['Engineering', 'Architecture', 'Computer Science'], link: 'https://www.chalmers.se', scholarship: 'SI Scholarship' },
      { name: 'Gothenburg University', city: 'Gothenburg', qs: 196, fields: ['Business', 'Social Sciences', 'Arts'], link: 'https://www.gu.se', scholarship: 'SI Scholarship' },
      { name: 'Karolinska Institutet', city: 'Stockholm', qs: 42, fields: ['Medicine', 'Health Sciences', 'Biomedical'], link: 'https://ki.se', scholarship: 'SI Scholarship, Karolinska Award' },
      { name: 'Linköping University', city: 'Linköping', qs: 336, fields: ['Engineering', 'Medicine', 'Social Sciences'], link: 'https://liu.se', scholarship: 'SI Scholarship' },
      { name: 'Umeå University', city: 'Umeå', qs: 306, fields: ['Medicine', 'Sciences', 'Social Sciences'], link: 'https://www.umu.se', scholarship: 'SI Scholarship' },
      { name: 'Örebro University', city: 'Örebro', qs: 501, fields: ['Business', 'Social Sciences', 'Engineering'], link: 'https://www.oru.se', scholarship: 'SI Scholarship' },
    ]
  },
  {
    id: 'netherlands', name: 'Netherlands', flag: '🇳🇱', color: '#AE1C28', accent: '#21468B',
    light: '#fff8f0', desc: 'Holland Scholarship, Orange Knowledge Programme, English-taught programs',
    universities: [
      { name: 'University of Amsterdam', city: 'Amsterdam', qs: 53, fields: ['Social Sciences', 'Law', 'Business'], link: 'https://www.uva.nl', scholarship: 'Holland Scholarship, Amsterdam Excellence' },
      { name: 'Delft University of Technology', city: 'Delft', qs: 47, fields: ['Engineering', 'Architecture', 'Computer Science'], link: 'https://www.tudelft.nl', scholarship: 'Holland Scholarship, Orange Knowledge' },
      { name: 'Leiden University', city: 'Leiden', qs: 128, fields: ['Law', 'Medicine', 'Social Sciences'], link: 'https://www.universiteitleiden.nl', scholarship: 'Leiden Excellence, Holland Scholarship' },
      { name: 'Wageningen University', city: 'Wageningen', qs: 164, fields: ['Agriculture', 'Life Sciences', 'Environmental'], link: 'https://www.wur.nl', scholarship: 'Wageningen Excellence, Orange Knowledge' },
      { name: 'Utrecht University', city: 'Utrecht', qs: 78, fields: ['Medicine', 'Veterinary', 'Law'], link: 'https://www.uu.nl', scholarship: 'Holland Scholarship, Utrecht Excellence' },
      { name: 'Erasmus University Rotterdam', city: 'Rotterdam', qs: 174, fields: ['Business', 'Law', 'Medicine'], link: 'https://www.eur.nl', scholarship: 'Erasmus Mundus, Holland Scholarship' },
      { name: 'Groningen University', city: 'Groningen', qs: 163, fields: ['Medicine', 'Engineering', 'Social Sciences'], link: 'https://www.rug.nl', scholarship: 'Holland Scholarship' },
      { name: 'Eindhoven University of Technology', city: 'Eindhoven', qs: 118, fields: ['Engineering', 'Computer Science', 'Industrial Design'], link: 'https://www.tue.nl', scholarship: 'Holland Scholarship, Orange Knowledge' },
      { name: 'Maastricht University', city: 'Maastricht', qs: 242, fields: ['Business', 'Law', 'Medicine'], link: 'https://www.maastrichtuniversity.nl', scholarship: 'Holland Scholarship' },
      { name: 'Vrije Universiteit Amsterdam', city: 'Amsterdam', qs: 224, fields: ['Business', 'Law', 'Sciences'], link: 'https://www.vu.nl', scholarship: 'Holland Scholarship' },
    ]
  },
  {
id: 'new_zealand',
name: 'New Zealand',
flag: '🇳🇿',
color: '#00247d',
accent: '#cc142b',
light: '#f0f4ff',
desc: 'Top-tier education in a safe, stunning environment with excellent post-study work and residency pathways.',
universities: [
{
name: 'University of Auckland',
city: 'Auckland',
qs: 65,
fields: ['Engineering', 'Computer Science', 'Medicine'],
link: '',
scholarship: 'International Student Excellence Scholarship, Manaaki New Zealand Scholarship',
},
{
name: 'University of Otago',
city: 'Dunedin, Otago',
qs: 197,
fields: ['Medicine', 'Natural Sciences', 'Pharmacy'],
link: '',
scholarship: 'International Doctoral Scholarship, Vice-Chancellor’s Scholarship',
},
{
name: 'Massey University',
city: 'Palmerston North',
qs: 230,
fields: ['Agriculture', 'Veterinary', 'Business'],
link: '',
scholarship: 'Manaaki New Zealand Scholarship, Massey University Excellence Award',
},
{
name: 'Victoria University of Wellington',
city: 'Wellington',
qs: 240,
fields: ['Law', 'Political Science', 'Arts'],
link: '',
scholarship: 'Tongarewa Scholarship, Wellington Master’s by Thesis Scholarship',
},
{
name: 'University of Canterbury',
city: 'Christchurch, Canterbury',
qs: 261,
fields: ['Engineering', 'Physics', 'Environmental Sciences'],
link: '',
scholarship: 'UC International First Year Scholarship, New Zealand Excellence Awards',
},
{
name: 'University of Waikato',
city: 'Hamilton, Waikato',
qs: 281,
fields: ['Computer Science', 'Education', 'Social Sciences'],
link: '',
scholarship: 'International Excellence Scholarship, Manaaki New Zealand Scholarship',
},
{
name: 'Lincoln University',
city: 'Lincoln, Canterbury',
qs: 407,
fields: ['Agriculture', 'Environmental Sciences', 'Economics'],
link: '',
scholarship: 'International Taught Postgraduate Merit Scholarship, Lincoln University Graduate Scholarship',
},
{
name: 'Auckland University of Technology',
city: 'Auckland',
qs: 410,
fields: ['Computer Science', 'Arts', 'Public Health'],
link: '',
scholarship: 'AUT International Student Scholarship, AUT Postgraduate Scholarship',
},
{
name: 'Unitec Institute of Technology',
city: 'Auckland',
qs: 999,
fields: ['Architecture', 'Computer Science', 'Arts'],
link: '',
scholarship: 'New Zealand Commonwealth Scholarship, International School Leaver Scholarship',
},
{
name: 'Otago Polytechnic',
city: 'Dunedin, Otago',
qs: 999,
fields: ['Arts', 'Engineering', 'Pharmacy'],
link: '',
scholarship: 'International Student Merit Scholarship, New Zealand Excellence Awards',
},
{
name: 'Ara Institute of Canterbury',
city: 'Christchurch, Canterbury',
qs: 999,
fields: ['Business', 'Engineering', 'Arts'],
link: '',
scholarship: 'International Excellence Scholarship, Manaaki New Zealand Scholarship',
},
{
name: 'Eastern Institute of Technology',
city: 'Napier, Hawke’s Bay',
qs: 999,
fields: ['Agriculture', 'Nursing', 'Business'],
link: '',
scholarship: 'International Student Scholarship, Manaaki New Zealand Scholarship',
},
{
name: 'Waikato Institute of Technology',
city: 'Hamilton, Waikato',
qs: 999,
fields: ['Engineering', 'Computer Science', 'Social Sciences'],
link: '',
scholarship: 'Wintec International Student Scholarship, New Zealand Excellence Awards',
}
]
},
  {
    id: 'malta',
    name: 'Malta',
    flag: '🇲🇹',
    color: '#CF2B36',
    accent: '#FFFFFF',
    light: '#FCE8EA',
    desc: 'English-speaking EU hub with affordable tuition & generous scholarships.',
    universities: [
      {
        name: 'University of Malta',
        city: 'Msida, Central Region',
        qs: 851,
        fields: ['Medicine', 'Engineering', 'Computer Science'],
        link: 'https://www.um.edu.mt',
        scholarship: 'UM International Scholarship, Maltese Government Scholarship for Developing Countries',
      },
      {
        name: 'Malta College of Arts, Science and Technology (MCAST)',
        city: 'Paola, Southern Region',
        qs: 999,
        fields: ['Engineering', 'Business', 'Computer Science'],
        link: 'https://www.mcast.edu.mt',
        scholarship: 'MCAST Scholarship Scheme, Erasmus+ Mobility Grants',
      },
      {
        name: 'American University of Malta',
        city: 'Bormla, South Eastern Region',
        qs: 999,
        fields: ['Business', 'Computer Science', 'Engineering'],
        link: 'https://www.aum.edu.mt',
        scholarship: 'AUM International Merit Scholarship, AUM Need-Based Award',
      },
      {
        name: 'Global College Malta',
        city: 'Pembroke, Northern Region',
        qs: 999,
        fields: ['Business', 'Hospitality', 'Computer Science'],
        link: 'https://www.globalcollegemalta.com',
        scholarship: 'GC Malta Excellence Scholarship, Early Bird Discount Grant',
      },
      {
        name: 'Institute of Tourism Studies Malta',
        city: 'Luqa, Southern Region',
        qs: 999,
        fields: ['Business', 'Hospitality', 'Social Sciences'],
        link: 'https://www.its.edu.mt',
        scholarship: 'ITS Scholarship for International Students, Hospitality Talent Grant',
      },
      {
        name: 'London School of Commerce Malta',
        city: 'Birkirkara, Central Region',
        qs: 999,
        fields: ['Business', 'Economics', 'Computer Science'],
        link: 'https://www.lscmalta.edu.mt',
        scholarship: 'LSC International Achievement Scholarship, Commonwealth Distance Grant',
      },
      {
        name: 'STC Higher Education',
        city: 'San Giljan, Central Region',
        qs: 999,
        fields: ['Computer Science', 'Business', 'Engineering'],
        link: 'https://www.stc-edu.com',
        scholarship: 'STC Tech Excellence Award, Women in STEM Scholarship',
      },
      {
        name: 'European Institute of Education',
        city: 'St. Julian’s, Central Region',
        qs: 999,
        fields: ['Education', 'Psychology', 'Social Sciences'],
        link: 'https://www.eie.edu.mt',
        scholarship: 'EIE Future Educators Grant, International Student Support Scholarship',
      },
      {
        name: 'Mediterranean Academy of Diplomatic Studies',
        city: 'Msida, Central Region',
        qs: 999,
        fields: ['Political Science', 'Law', 'Social Sciences'],
        link: 'https://www.um.edu.mt/medac',
        scholarship: 'MEDAC Scholarship for Developing Countries, Maltese MFA Grant',
      },
      {
        name: 'Arts & Media School Malta',
        city: 'Valletta, Southern Region',
        qs: 999,
        fields: ['Arts', 'Humanities', 'Computer Science'],
        link: 'https://www.artsmedia.edu.mt',
        scholarship: 'Creative Talent Scholarship, Digital Arts Fund',
      },
      {
        name: 'Business Institute of Malta',
        city: 'Sliema, Northern Region',
        qs: 999,
        fields: ['Business', 'Economics', 'Law'],
        link: 'https://www.bim.edu.mt',
        scholarship: 'BIM Leadership Award, Entrepreneurial Scholarship',
      },
      {
        name: 'Malta Maritime Academy',
        city: 'Marsaxlokk, South Eastern Region',
        qs: 999,
        fields: ['Engineering', 'Environmental Sciences', 'Natural Sciences'],
        link: 'https://www.um.edu.mt/mma',
        scholarship: 'MMA International Nautical Grant, Blue Economy Scholarship',
      },
      {
        name: 'Gozo University Campus',
        city: 'Xewkija, Gozo Region',
        qs: 999,
        fields: ['Agriculture', 'Environmental Sciences', 'Natural Sciences'],
        link: 'https://www.um.edu.mt/gozo',
        scholarship: 'Gozo Rural Development Scholarship, Sustainable Agriculture Fund',
      },
      {
        name: 'International Business School Malta',
        city: 'Qormi, Southern Region',
        qs: 999,
        fields: ['Business', 'Economics', 'Computer Science'],
        link: 'https://www.ibsmalta.com',
        scholarship: 'IBS Global Leader Award, Digital Economy Scholarship',
      }
    ]
  },
    {
    id: 'portugal',
    name: 'Portugal',
    flag: '🇵🇹',
    color: '#DA291C',
    accent: '#FFB612',
    light: '#FEF0E6',
    desc: 'Affordable EU country with top engineering & business programs.',
    universities: [
      {
        name: 'University of Lisbon',
        city: 'Lisbon, Lisbon District',
        qs: 266,
        fields: ['Engineering', 'Computer Science', 'Natural Sciences'],
        link: 'https://www.ulisboa.pt',
        scholarship: 'ULisboa International Scholarship, IILP Scholarship, Erasmus+ Grants',
      },
      {
        name: 'University of Porto',
        city: 'Porto, Norte Region',
        qs: 295,
        fields: ['Engineering', 'Medicine', 'Architecture'],
        link: 'https://www.up.pt',
        scholarship: 'UP Merit Scholarship for International Students, Santander Universidades Grant',
      },
      {
        name: 'University of Coimbra',
        city: 'Coimbra, Centro Region',
        qs: 351,
        fields: ['Law', 'Medicine', 'Humanities'],
        link: 'https://www.uc.pt',
        scholarship: 'UC International Student Scholarship, FCT Doctoral Grant',
      },
      {
        name: 'NOVA University Lisbon',
        city: 'Lisbon, Lisbon District',
        qs: 400,
        fields: ['Business', 'Economics', 'Public Health'],
        link: 'https://www.unl.pt',
        scholarship: 'NOVA Global Excellence Award, NOVA-ID Scholarship',
      },
      {
        name: 'University of Minho',
        city: 'Braga, Norte Region',
        qs: 581,
        fields: ['Engineering', 'Computer Science', 'Social Sciences'],
        link: 'https://www.uminho.pt',
        scholarship: 'UMinho International Scholar Grant, Erasmus Mundus Joint Master',
      },
      {
        name: 'University of Aveiro',
        city: 'Aveiro, Centro Region',
        qs: 601,
        fields: ['Environmental Sciences', 'Engineering', 'Natural Sciences'],
        link: 'https://www.ua.pt',
        scholarship: 'UA International Excellence Scholarship, CERN Grant',
      },
      {
        name: 'ISCTE — University Institute of Lisbon',
        city: 'Lisbon, Lisbon District',
        qs: 751,
        fields: ['Business', 'Political Science', 'Psychology'],
        link: 'https://www.iscte-iul.pt',
        scholarship: 'ISCTE Global Scholarship, Aga Khan Foundation Grant',
      },
      {
        name: 'University of Algarve',
        city: 'Faro, Algarve Region',
        qs: 901,
        fields: ['Marine Biology', 'Environmental Sciences', 'Tourism'],
        link: 'https://www.ualg.pt',
        scholarship: 'UALG Coastal Scholarship, Blue Bioeconomy Grant',
      },
      {
        name: 'University of Beira Interior',
        city: 'Covilhã, Centro Region',
        qs: 1001,
        fields: ['Engineering', 'Computer Science', 'Medicine'],
        link: 'https://www.ubi.pt',
        scholarship: 'UBI International Talent Scholarship, Interior Development Grant',
      },
      {
        name: 'Universidade Católica Portuguesa',
        city: 'Lisbon, Lisbon District',
        qs: 901,
        fields: ['Law', 'Business', 'Theology'],
        link: 'https://www.ucp.pt',
        scholarship: 'UCP Merit Scholarship for International Students, Caritas Grant',
      },
      {
        name: 'University of Trás-os-Montes and Alto Douro',
        city: 'Vila Real, Norte Region',
        qs: 1001,
        fields: ['Agriculture', 'Veterinary', 'Environmental Sciences'],
        link: 'https://www.utad.pt',
        scholarship: 'UTAD AgroScholarship, Douro Valley Grant',
      },
      {
        name: 'Porto Business School',
        city: 'Porto, Norte Region',
        qs: 999,
        fields: ['Business', 'Economics', 'Leadership'],
        link: 'https://www.pbs.up.pt',
        scholarship: 'PBS Women in Business Award, International Executive Grant',
      },
      {
        name: 'Lisbon School of Economics & Management (ISEG)',
        city: 'Lisbon, Lisbon District',
        qs: 999,
        fields: ['Economics', 'Business', 'Mathematics'],
        link: 'https://www.iseg.ulisboa.pt',
        scholarship: 'ISEG Merit International Scholarship, Data Science Grant',
      },
      {
        name: 'Instituto Politécnico do Porto',
        city: 'Porto, Norte Region',
        qs: 999,
        fields: ['Engineering', 'Computer Science', 'Arts'],
        link: 'https://www.ipp.pt',
        scholarship: 'IPP Tech Scholarship, Applied Research Grant',
      }
    ]
  },
    {
    id: 'finland',
    name: 'Finland',
    flag: '🇫🇮',
    color: '#003580',
    accent: '#FFFFFF',
    light: '#E8F0FE',
    desc: 'High-quality, innovative education with generous Finland Scholarships.',
    universities: [
      {
        name: 'University of Helsinki',
        city: 'Helsinki, Uusimaa',
        qs: 107,
        fields: ['Medicine', 'Environmental Sciences', 'Computer Science'],
        link: 'https://www.helsinki.fi',
        scholarship: 'Finland Scholarship, University of Helsinki Scholarship, EDUFI Fellowship',
      },
      {
        name: 'Aalto University',
        city: 'Espoo, Uusimaa',
        qs: 113,
        fields: ['Engineering', 'Business', 'Computer Science'],
        link: 'https://www.aalto.fi',
        scholarship: 'Aalto Excellence Scholarship, Finland Scholarship, Aalto University Grant',
      },
      {
        name: 'University of Turku',
        city: 'Turku, Southwest Finland',
        qs: 315,
        fields: ['Medicine', 'Education', 'Natural Sciences'],
        link: 'https://www.utu.fi',
        scholarship: 'UTU International Scholarship, Finland Scholarship, EDUFI Fellowship',
      },
      {
        name: 'University of Jyväskylä',
        city: 'Jyväskylä, Central Finland',
        qs: 346,
        fields: ['Education', 'Psychology', 'Computer Science'],
        link: 'https://www.jyu.fi',
        scholarship: 'JYU Scholarship, Finland Scholarship, Faculty-specific Grants',
      },
      {
        name: 'University of Oulu',
        city: 'Oulu, North Ostrobothnia',
        qs: 352,
        fields: ['Engineering', 'Information Technology', 'Natural Sciences'],
        link: 'https://www.oulu.fi',
        scholarship: 'University of Oulu International Scholarship, Finland Scholarship, EDUFI',
      },
      {
        name: 'Tampere University',
        city: 'Tampere, Pirkanmaa',
        qs: 370,
        fields: ['Engineering', 'Computer Science', 'Social Sciences'],
        link: 'https://www.tuni.fi',
        scholarship: 'Tampere University Scholarship Programme, Finland Scholarship, EDUFI',
      },
      {
        name: 'University of Eastern Finland',
        city: 'Kuopio / Joensuu, Eastern Finland',
        qs: 548,
        fields: ['Medicine', 'Pharmacy', 'Environmental Sciences'],
        link: 'https://www.uef.fi',
        scholarship: 'UEF Scholarship, Finland Scholarship, Forest Sciences Grant',
      },
      {
        name: 'Åbo Akademi University',
        city: 'Turku, Southwest Finland',
        qs: 601,
        fields: ['Chemistry', 'Chemical Engineering', 'Social Sciences'],
        link: 'https://www.abo.fi',
        scholarship: 'Åbo Akademi Scholarship, Finland Scholarship, Swedish-Finnish Grant',
      },
      {
        name: 'Lappeenranta-Lahti University of Technology (LUT)',
        city: 'Lappeenranta, South Karelia',
        qs: 621,
        fields: ['Engineering', 'Business', 'Energy Technology'],
        link: 'https://www.lut.fi',
        scholarship: 'LUT Scholarship, Finland Scholarship, Early Bird Discount',
      },
      {
        name: 'University of Vaasa',
        city: 'Vaasa, Ostrobothnia',
        qs: 1001,
        fields: ['Business', 'Economics', 'Computer Science'],
        link: 'https://www.uwasa.fi',
        scholarship: 'University of Vaasa Scholarship, Finland Scholarship, International Talent Grant',
      },
      {
        name: 'Hanken School of Economics',
        city: 'Helsinki / Vaasa, Uusimaa',
        qs: 451,
        fields: ['Business', 'Economics', 'Law'],
        link: 'https://www.hanken.fi',
        scholarship: 'Hanken Scholarship Programme, Finland Scholarship, Hanken Support Grant',
      },
      {
        name: 'Metropolia University of Applied Sciences',
        city: 'Helsinki, Uusimaa',
        qs: 999,
        fields: ['Engineering', 'Business', 'Health Care'],
        link: 'https://www.metropolia.fi',
        scholarship: 'Metropolia Scholarship, Finland Scholarship, Early Bird Grant',
      },
      {
        name: 'Tampere University of Applied Sciences',
        city: 'Tampere, Pirkanmaa',
        qs: 999,
        fields: ['Engineering', 'Computer Science', 'Media Arts'],
        link: 'https://www.tamk.fi',
        scholarship: 'TAMK International Scholarship, Finland Scholarship, Talent Boost Grant',
      },
      {
        name: 'Laurea University of Applied Sciences',
        city: 'Espoo / Vantaa, Uusimaa',
        qs: 999,
        fields: ['Business', 'Hospitality', 'Social Services'],
        link: 'https://www.laurea.fi',
        scholarship: 'Laurea Scholarship, Finland Scholarship, Laurea Excellence Award',
      },
      {
        name: 'Arcada University of Applied Sciences',
        city: 'Helsinki, Uusimaa',
        qs: 999,
        fields: ['Engineering', 'Business', 'Healthcare'],
        link: 'https://www.arcada.fi',
        scholarship: 'Arcada International Scholarship, Finland Scholarship, Swedish-Finnish Grant',
      }
    ]
  },
    {
    id: 'hungary',
    name: 'Hungary',
    flag: '🇭🇺',
    color: '#CD2A3E',
    accent: '#FFFFFF',
    light: '#FCE8EA',
    desc: 'Affordable EU hub with Stipendium Hungaricum full scholarships for Bangladeshis.',
    universities: [
      {
        name: 'Eötvös Loránd University',
        city: 'Budapest, Central Hungary',
        qs: 521,
        fields: ['Computer Science', 'Law', 'Psychology'],
        link: 'https://www.elte.hu',
        scholarship: 'Stipendium Hungaricum, ELTE Doctoral Scholarship, Visegrad Fund Grant',
      },
      {
        name: 'University of Szeged',
        city: 'Szeged, Csongrád-Csanád',
        qs: 601,
        fields: ['Medicine', 'Pharmacy', 'Biology'],
        link: 'https://www.u-szeged.hu',
        scholarship: 'Stipendium Hungaricum, University of Szeged Scholarship, Hungarian State Grant',
      },
      {
        name: 'Budapest University of Technology and Economics',
        city: 'Budapest, Central Hungary',
        qs: 701,
        fields: ['Engineering', 'Architecture', 'Computer Science'],
        link: 'https://www.bme.hu',
        scholarship: 'Stipendium Hungaricum, BME International Scholarship, MÖB Grant',
      },
      {
        name: 'University of Debrecen',
        city: 'Debrecen, Hajdú-Bihar',
        qs: 731,
        fields: ['Medicine', 'Engineering', 'Agriculture'],
        link: 'https://www.unideb.hu',
        scholarship: 'Stipendium Hungaricum, UD International Scholarship, Campus Mundi Grant',
      },
      {
        name: 'University of Pécs',
        city: 'Pécs, Baranya',
        qs: 751,
        fields: ['Medicine', 'Psychology', 'Law'],
        link: 'https://www.pte.hu',
        scholarship: 'Stipendium Hungaricum, PTE International Excellence Scholarship, Erasmus+',
      },
      {
        name: 'Corvinus University of Budapest',
        city: 'Budapest, Central Hungary',
        qs: 851,
        fields: ['Business', 'Economics', 'Social Sciences'],
        link: 'https://www.uni-corvinus.hu',
        scholarship: 'Stipendium Hungaricum, Corvinus Merit Scholarship, Hungarian Diaspora Grant',
      },
      {
        name: 'Óbuda University',
        city: 'Budapest, Central Hungary',
        qs: 1001,
        fields: ['Engineering', 'Computer Science', 'Applied Mathematics'],
        link: 'https://www.uni-obuda.hu',
        scholarship: 'Stipendium Hungaricum, ÓU Scholarship, ING Grant',
      },
      {
        name: 'University of Miskolc',
        city: 'Miskolc, Borsod-Abaúj-Zemplén',
        qs: 1001,
        fields: ['Engineering', 'Materials Science', 'Law'],
        link: 'https://www.uni-miskolc.hu',
        scholarship: 'Stipendium Hungaricum, UM International Grant, Visegrad Fund',
      },
      {
        name: 'Széchenyi István University',
        city: 'Győr, Győr-Moson-Sopron',
        qs: 1001,
        fields: ['Engineering', 'Business', 'Logistics'],
        link: 'https://www.sze.hu',
        scholarship: 'Stipendium Hungaricum, SZE Talent Scholarship, Automotive Grant',
      },
      {
        name: 'University of Pannonia',
        city: 'Veszprém, Veszprém',
        qs: 1001,
        fields: ['Chemistry', 'Environmental Sciences', 'Engineering'],
        link: 'https://www.uni-pannon.hu',
        scholarship: 'Stipendium Hungaricum, UP Green Scholarship, Erasmus+',
      },
      {
        name: 'Hungarian University of Agriculture and Life Sciences',
        city: 'Gödöllő, Pest',
        qs: 999,
        fields: ['Agriculture', 'Veterinary', 'Environmental Sciences'],
        link: 'https://www.uni-mate.hu',
        scholarship: 'Stipendium Hungaricum, MATE Scholarship, Hungarian Agrarian Grant',
      },
      {
        name: 'Semmelweis University',
        city: 'Budapest, Central Hungary',
        qs: 251,
        fields: ['Medicine', 'Pharmacy', 'Public Health'],
        link: 'https://www.semmelweis.hu',
        scholarship: 'Stipendium Hungaricum, Semmelweis International Grant, Erasmus+',
      },
      {
        name: 'Budapest Business School',
        city: 'Budapest, Central Hungary',
        qs: 999,
        fields: ['Business', 'Economics', 'Tourism'],
        link: 'https://www.uni-bge.hu',
        scholarship: 'Stipendium Hungaricum, BGE International Scholarship, Campus Mundi',
      },
      {
        name: 'Kodolányi János University',
        city: 'Budapest / Székesfehérvár, Central Hungary',
        qs: 999,
        fields: ['Arts', 'Humanities', 'Social Sciences'],
        link: 'https://www.kodolanyi.hu',
        scholarship: 'Stipendium Hungaricum, Kodolányi Creative Grant, Erasmus+',
      },
      {
        name: 'Andrássy University Budapest',
        city: 'Budapest, Central Hungary',
        qs: 999,
        fields: ['Political Science', 'Law', 'International Relations'],
        link: 'https://www.andrassyuni.eu',
        scholarship: 'Stipendium Hungaricum, AUB German-language Scholarship, DAAD Grant',
      }
    ]
  },
    {
    id: 'south_korea',
    name: 'South Korea',
    flag: '🇰🇷',
    color: '#00462A',
    accent: '#FFFFFF',
    light: '#E8F5E9',
    desc: 'Tech powerhouse offering full GKS scholarships & vibrant campus life.',
    universities: [
      {
        name: 'Seoul National University',
        city: 'Seoul, Gwanak-gu',
        qs: 41,
        fields: ['Engineering', 'Medicine', 'Computer Science'],
        link: 'https://en.snu.ac.kr',
        scholarship: 'GKS (KGSP), SNU Presidential Fellowship, SNU Global Scholarship',
      },
      {
        name: 'KAIST (Korea Advanced Institute of Science and Technology)',
        city: 'Daejeon, Yuseong-gu',
        qs: 56,
        fields: ['Engineering', 'Computer Science', 'Physics'],
        link: 'https://www.kaist.ac.kr',
        scholarship: 'GKS (KGSP), KAIST International Student Scholarship, KAIST Fellowship',
      },
      {
        name: 'Korea University',
        city: 'Seoul, Seongbuk-gu',
        qs: 79,
        fields: ['Business', 'Law', 'Engineering'],
        link: 'https://www.korea.edu',
        scholarship: 'GKS (KGSP), KU Global Scholarship, KU Brain Korea 21',
      },
      {
        name: 'Yonsei University',
        city: 'Seoul, Seodaemun-gu',
        qs: 85,
        fields: ['Medicine', 'Business', 'Engineering'],
        link: 'https://www.yonsei.ac.kr',
        scholarship: 'GKS (KGSP), Yonsei Global Leader Scholarship, Underwood International Scholarship',
      },
      {
        name: 'Pohang University of Science and Technology (POSTECH)',
        city: 'Pohang, North Gyeongsang',
        qs: 98,
        fields: ['Engineering', 'Materials Science', 'Chemistry'],
        link: 'https://www.postech.ac.kr',
        scholarship: 'GKS (KGSP), POSTECH International Scholarship, POSCO Fellowship',
      },
      {
        name: 'Sungkyunkwan University (SKKU)',
        city: 'Seoul / Suwon, Gyeonggi-do',
        qs: 145,
        fields: ['Engineering', 'Business', 'Medicine'],
        link: 'https://www.skku.edu',
        scholarship: 'GKS (KGSP), SKKU Global Leader Scholarship, Samsung Global Scholarship',
      },
      {
        name: 'Hanyang University',
        city: 'Seoul, Seongdong-gu',
        qs: 162,
        fields: ['Engineering', 'Architecture', 'Computer Science'],
        link: 'https://www.hanyang.ac.kr',
        scholarship: 'GKS (KGSP), Hanyang International Scholarship, HY-Welcome Scholarship',
      },
      {
        name: 'University of Ulsan',
        city: 'Ulsan, Nam-gu',
        qs: 701,
        fields: ['Engineering', 'Medicine', 'Automotive Technology'],
        link: 'https://www.ulsan.ac.kr',
        scholarship: 'GKS (KGSP), UOU International Excellence Scholarship, Hyundai Motor Grant',
      },
      {
        name: 'Kyung Hee University',
        city: 'Seoul / Suwon, Gyeonggi-do',
        qs: 328,
        fields: ['Medicine', 'Arts', 'Tourism'],
        link: 'https://www.khu.ac.kr',
        scholarship: 'GKS (KGSP), Kyung Hee Global Collaborative Scholarship, KHU Fellowship',
      },
      {
        name: 'Ewha Womans University',
        city: 'Seoul, Seodaemun-gu',
        qs: 398,
        fields: ['Humanities', 'Social Sciences', 'Natural Sciences'],
        link: 'https://www.ewha.ac.kr',
        scholarship: 'GKS (KGSP), Ewha Global Partnership Program, Ewha International Scholarship',
      },
      {
        name: 'Inha University',
        city: 'Incheon, Michuhol-gu',
        qs: 691,
        fields: ['Engineering', 'Logistics', 'Computer Science'],
        link: 'https://www.inha.ac.kr',
        scholarship: 'GKS (KGSP), Inha International Scholarship, Inha STEM Grant',
      },
      {
        name: 'Chung-Ang University',
        city: 'Seoul / Anseong, Gyeonggi-do',
        qs: 494,
        fields: ['Arts', 'Media Studies', 'Engineering'],
        link: 'https://www.cau.ac.kr',
        scholarship: 'GKS (KGSP), CAU Global Scholarship, Chung-Ang Fellowship',
      },
      {
        name: 'Pusan National University',
        city: 'Busan, Geumjeong-gu',
        qs: 551,
        fields: ['Engineering', 'Medicine', 'Marine Sciences'],
        link: 'https://www.pusan.ac.kr',
        scholarship: 'GKS (KGSP), PNU International Student Scholarship, Busan Metropolitan Grant',
      },
      {
        name: 'Sogang University',
        city: 'Seoul, Mapo-gu',
        qs: 501,
        fields: ['Economics', 'Computer Science', 'Business'],
        link: 'https://www.sogang.ac.kr',
        scholarship: 'GKS (KGSP), Sogang Global Scholarship, Sogang International Grant',
      },
      {
        name: 'Dongguk University',
        city: 'Seoul / Gyeongju, Gyeongsangbuk-do',
        qs: 671,
        fields: ['Pharmacy', 'Buddhist Studies', 'Engineering'],
        link: 'https://www.dongguk.edu',
        scholarship: 'GKS (KGSP), Dongguk International Student Scholarship, Seoul Global Grant',
      }
    ]
  },
    {
    id: 'lithuania',
    name: 'Lithuania',
    flag: '🇱🇹',
    color: '#006A44',
    accent: '#C1272D',
    light: '#E8F5E9',
    desc: 'Affordable EU nation with generous state scholarships & growing tech sector.',
    universities: [
      {
        name: 'Vilnius University',
        city: 'Vilnius, Vilnius County',
        qs: 446,
        fields: ['Medicine', 'Law', 'Computer Science'],
        link: 'https://www.vu.lt',
        scholarship: 'VU Tuition Fee Waiver (5 full waivers), Lithuanian State Scholarship, Grand Duchy of Lithuania Scholarship',
      },
      {
        name: 'Kaunas University of Technology',
        city: 'Kaunas, Kaunas County',
        qs: 741,
        fields: ['Engineering', 'Computer Science', 'Physics'],
        link: 'https://ktu.edu',
        scholarship: 'Lithuanian State Scholarship (short-term/full-time), KTU International Scholarship, Erasmus+ Grants',
      },
      {
        name: 'Vytautas Magnus University',
        city: 'Kaunas, Kaunas County',
        qs: 741,
        fields: ['Political Science', 'Agriculture', 'Humanities'],
        link: 'https://www.vdu.lt',
        scholarship: 'Lithuanian State Scholarship, VMU International Scholarship, Erasmus+ Mobility Grant',
      },
      {
        name: 'Vilnius Gediminas Technical University (VILNIUS TECH)',
        city: 'Vilnius, Vilnius County',
        qs: 851,
        fields: ['Engineering', 'Architecture', 'Civil Engineering'],
        link: 'https://vilniustech.lt',
        scholarship: 'VILNIUS TECH Full/Partial Scholarship (apply by April 20), Lithuanian State Grant',
      },
      {
        name: 'Lithuanian University of Health Sciences',
        city: 'Kaunas, Kaunas County',
        qs: 1001,
        fields: ['Medicine', 'Pharmacy', 'Public Health'],
        link: 'https://lsmu.lt',
        scholarship: 'Lithuanian State Scholarship, LUHS International Grant, Erasmus+',
      },
      {
        name: 'ISM University of Management and Economics',
        city: 'Vilnius / Kaunas, Vilnius County',
        qs: 999,
        fields: ['Business', 'Economics', 'Leadership'],
        link: 'https://www.ism.lt',
        scholarship: 'ISM International Merit Scholarship, Lithuanian State Scholarship, Need-based Aid',
      },
      {
        name: 'Mykolas Romeris University',
        city: 'Vilnius, Vilnius County',
        qs: 1001,
        fields: ['Law', 'Psychology', 'Public Administration'],
        link: 'https://www.mruni.eu',
        scholarship: 'MRU International Scholarship, Lithuanian State Grant, Erasmus+',
      },
      {
        name: 'LCC International University',
        city: 'Klaipėda, Klaipėda County',
        qs: 999,
        fields: ['Business', 'Psychology', 'Education'],
        link: 'https://lcc.lt',
        scholarship: 'Need-based Aid (10-80% tuition), Leadership Scholarship (70%), Peacemaker Scholarship (70%)',
      },
      {
        name: 'Klaipėda University',
        city: 'Klaipėda, Klaipėda County',
        qs: 999,
        fields: ['Marine Biology', 'Environmental Sciences', 'Engineering'],
        link: 'https://www.ku.lt',
        scholarship: 'Lithuanian State Scholarship, KU International Grant, Erasmus+',
      },
      {
        name: 'Šiauliai University',
        city: 'Šiauliai, Šiauliai County',
        qs: 999,
        fields: ['Education', 'Social Sciences', 'Arts'],
        link: 'https://www.su.lt',
        scholarship: 'Lithuanian State Scholarship, ŠU International Student Grant',
      },
      {
        name: 'Vilnius University of Applied Sciences',
        city: 'Vilnius, Vilnius County',
        qs: 999,
        fields: ['Engineering', 'Business', 'Information Technology'],
        link: 'https://www.viko.lt',
        scholarship: 'VIKO International Scholarship, Erasmus+ Grant, Lithuanian State Support',
      },
      {
        name: 'Kaunas University of Applied Sciences',
        city: 'Kaunas, Kaunas County',
        qs: 999,
        fields: ['Engineering', 'Technology', 'Business'],
        link: 'https://www.kaunokolegija.lt',
        scholarship: 'KUAS International Scholarship, Erasmus+ Mobility Grant',
      },
      {
        name: 'European Humanities University',
        city: 'Vilnius, Vilnius County',
        qs: 999,
        fields: ['Humanities', 'Social Sciences', 'Arts'],
        link: 'https://en.ehu.lt',
        scholarship: 'EHU Scholarship for International Students, Lithuanian State Grant',
      },
      {
        name: 'ISM University of Applied Sciences',
        city: 'Vilnius / Kaunas, Vilnius County',
        qs: 999,
        fields: ['Business', 'Economics', 'Communication'],
        link: 'https://www.ism.lt',
        scholarship: 'ISM Talent Scholarship, International Student Grant',
      }
    ]
  },
    {
    id: 'norway',
    name: 'Norway',
    flag: '🇳🇴',
    color: '#EF2B2D',
    accent: '#002868',
    light: '#FCE8E8',
    desc: 'Free tuition at public universities for all, including Bangladeshi students.',
    universities: [
      {
        name: 'University of Oslo',
        city: 'Oslo, Eastern Norway',
        qs: 119,
        fields: ['Medicine', 'Law', 'Humanities'],
        link: 'https://www.uio.no',
        scholarship: 'Norwegian Government Scholarship (Quota Scheme), UiO International Master Scholarship, Erasmus+',
      },
      {
        name: 'University of Bergen',
        city: 'Bergen, Western Norway',
        qs: 281,
        fields: ['Geology', 'Medicine', 'Marine Biology'],
        link: 'https://www.uib.no',
        scholarship: 'Norwegian Government Scholarship (Quota Scheme), UiB Global Grant, Erasmus+',
      },
      {
        name: 'Norwegian University of Science and Technology (NTNU)',
        city: 'Trondheim, Central Norway',
        qs: 292,
        fields: ['Engineering', 'Computer Science', 'Natural Sciences'],
        link: 'https://www.ntnu.edu',
        scholarship: 'Norwegian Government Scholarship (Quota Scheme), NTNU International Master Grant, Erasmus+',
      },
      {
        name: 'University of Tromsø – The Arctic University of Norway',
        city: 'Tromsø, Northern Norway',
        qs: 621,
        fields: ['Environmental Sciences', 'Biology', 'Physics'],
        link: 'https://en.uit.no',
        scholarship: 'Norwegian Government Scholarship (Quota Scheme), UiT Arctic Grant, Erasmus+',
      },
      {
        name: 'Norwegian University of Life Sciences (NMBU)',
        city: 'Ås, Eastern Norway',
        qs: 1001,
        fields: ['Agriculture', 'Veterinary', 'Environmental Sciences'],
        link: 'https://www.nmbu.no',
        scholarship: 'Norwegian Government Scholarship (Quota Scheme), NMBU International Fellowship, Erasmus+',
      },
      {
        name: 'University of Stavanger',
        city: 'Stavanger, Western Norway',
        qs: 721,
        fields: ['Petroleum Engineering', 'Business', 'Social Sciences'],
        link: 'https://www.uis.no',
        scholarship: 'Norwegian Government Scholarship (Quota Scheme), UiS International Grant, Erasmus+',
      },
      {
        name: 'University of Agder',
        city: 'Kristiansand / Grimstad, Southern Norway',
        qs: 801,
        fields: ['Engineering', 'Information Systems', 'Education'],
        link: 'https://www.uia.no',
        scholarship: 'Norwegian Government Scholarship (Quota Scheme), UiA Master Grant, Erasmus+',
      },
      {
        name: 'BI Norwegian Business School',
        city: 'Oslo, Eastern Norway',
        qs: 999,
        fields: ['Business', 'Economics', 'Leadership'],
        link: 'https://www.bi.edu',
        scholarship: 'BI Presidential Scholarship, BI International Scholarship, A. Wilhelmsen Foundation Grant',
      },
      {
        name: 'Oslo Metropolitan University',
        city: 'Oslo, Eastern Norway',
        qs: 1001,
        fields: ['Education', 'Social Sciences', 'Health Sciences'],
        link: 'https://www.oslomet.no',
        scholarship: 'OsloMet International Scholarship, Norwegian Government Grant, Erasmus+',
      },
      {
        name: 'Western Norway University of Applied Sciences',
        city: 'Bergen / Sogndal / Haugesund, Western Norway',
        qs: 999,
        fields: ['Engineering', 'Nursing', 'Maritime Studies'],
        link: 'https://www.hvl.no',
        scholarship: 'HVL International Scholarship, Erasmus+, Norwegian Quota Scheme (limited)',
      },
      {
        name: 'Nord University',
        city: 'Bodø / Levanger / Steinkjer, Northern Norway',
        qs: 999,
        fields: ['Biology', 'Business', 'Aquaculture'],
        link: 'https://www.nord.no',
        scholarship: 'Nord University International Grant, Norwegian Government Scholarship, Erasmus+',
      },
      {
        name: 'Inland Norway University of Applied Sciences',
        city: 'Lillehammer / Elverum / Hamar, Eastern Norway',
        qs: 999,
        fields: ['Film Studies', 'Education', 'Business'],
        link: 'https://www.inn.no',
        scholarship: 'INN University International Scholarship, Erasmus+, Norwegian State Grant',
      },
      {
        name: 'Molde University College',
        city: 'Molde, Western Norway',
        qs: 999,
        fields: ['Logistics', 'Business', 'Economics'],
        link: 'https://www.himolde.no',
        scholarship: 'Molde International Scholarship, Norwegian Quota Scheme (limited), Erasmus+',
      },
      {
        name: 'Norwegian School of Economics (NHH)',
        city: 'Bergen, Western Norway',
        qs: 301,
        fields: ['Economics', 'Business', 'Finance'],
        link: 'https://www.nhh.no',
        scholarship: 'NHH International Master Scholarship, Norwegian Government Scholarship, Erasmus+',
      }
    ]
  },
    {
    id: 'italy',
    name: 'Italy',
    flag: '🇮🇹',
    color: '#009246',
    accent: '#FFFFFF',
    light: '#E8F5E9',
    desc: 'Affordable tuition, rich culture, and MAECI scholarships for Bangladeshi students.',
    universities: [
      {
        name: 'Politecnico di Milano',
        city: 'Milan, Lombardy',
        qs: 123,
        fields: ['Engineering', 'Architecture', 'Design'],
        link: 'https://www.polimi.it',
        scholarship: 'MAECI Scholarship, Politecnico International Scholarship, DSU Regional Grant',
      },
      {
        name: 'University of Bologna',
        city: 'Bologna, Emilia-Romagna',
        qs: 167,
        fields: ['Law', 'Medicine', 'Humanities'],
        link: 'https://www.unibo.it',
        scholarship: 'MAECI Scholarship, Unibo Action 1 & 2 Grants, Erasmus+',
      },
      {
        name: 'Sapienza University of Rome',
        city: 'Rome, Lazio',
        qs: 171,
        fields: ['Classics', 'Physics', 'Engineering'],
        link: 'https://www.uniroma1.it',
        scholarship: 'MAECI Scholarship, Sapienza International Scholarship, Lazio Disco Grant',
      },
      {
        name: 'University of Padua',
        city: 'Padua, Veneto',
        qs: 219,
        fields: ['Medicine', 'Psychology', 'Physics'],
        link: 'https://www.unipd.it',
        scholarship: 'Padua International Excellence Scholarship, MAECI Scholarship, Galileo Scholarship',
      },
      {
        name: 'Politecnico di Torino',
        city: 'Turin, Piedmont',
        qs: 252,
        fields: ['Engineering', 'Computer Science', 'Architecture'],
        link: 'https://www.polito.it',
        scholarship: 'Politecnico International Scholarship, MAECI Scholarship, EDISU Grant',
      },
      {
        name: 'University of Milan',
        city: 'Milan, Lombardy',
        qs: 276,
        fields: ['Medicine', 'Veterinary', 'Natural Sciences'],
        link: 'https://www.unimi.it',
        scholarship: 'MAECI Scholarship, UNIMI Excellence Scholarship, DSU Lombardy Grant',
      },
      {
        name: 'University of Naples Federico II',
        city: 'Naples, Campania',
        qs: 335,
        fields: ['Medicine', 'Engineering', 'Agriculture'],
        link: 'https://www.unina.it',
        scholarship: 'MAECI Scholarship, Federico II International Grant, Erasmus+',
      },
      {
        name: 'University of Turin',
        city: 'Turin, Piedmont',
        qs: 371,
        fields: ['Economics', 'Law', 'Natural Sciences'],
        link: 'https://www.unito.it',
        scholarship: 'MAECI Scholarship, UNITO International Scholarship, EDISU Grant',
      },
      {
        name: 'University of Florence',
        city: 'Florence, Tuscany',
        qs: 421,
        fields: ['Architecture', 'Arts', 'Engineering'],
        link: 'https://www.unifi.it',
        scholarship: 'MAECI Scholarship, UNIFI International Excellence Scholarship, DSU Tuscany Grant',
      },
      {
        name: 'University of Pisa',
        city: 'Pisa, Tuscany',
        qs: 461,
        fields: ['Physics', 'Engineering', 'Mathematics'],
        link: 'https://www.unipi.it',
        scholarship: 'MAECI Scholarship, UniPi International Scholarship, DSU Tuscany Grant',
      },
      {
        name: 'University of Trento',
        city: 'Trento, Trentino-Alto Adige',
        qs: 481,
        fields: ['Computer Science', 'Engineering', 'Social Sciences'],
        link: 'https://www.unitn.it',
        scholarship: 'UNITN International Scholarship, MAECI Scholarship, Opera Universitaria Grant',
      },
      {
        name: 'University of Genoa',
        city: 'Genoa, Liguria',
        qs: 651,
        fields: ['Marine Engineering', 'Natural Sciences', 'Medicine'],
        link: 'https://unige.it',
        scholarship: 'MAECI Scholarship, UniGe International Scholarship, ALISEO Grant',
      },
      {
        name: 'University of Catania',
        city: 'Catania, Sicily',
        qs: 801,
        fields: ['Agriculture', 'Geology', 'Pharmacy'],
        link: 'https://www.unict.it',
        scholarship: 'MAECI Scholarship, UniCT International Scholarship, ERSU Catania Grant',
      },
      {
        name: 'University of Salerno',
        city: 'Fisciano, Campania',
        qs: 901,
        fields: ['Engineering', 'Economics', 'Pharmacy'],
        link: 'https://web.unisa.it',
        scholarship: 'MAECI Scholarship, UNISA International Grant, Erasmus+',
      },
      {
        name: 'University of Calabria',
        city: 'Rende, Calabria',
        qs: 1001,
        fields: ['Engineering', 'Computer Science', 'Economics'],
        link: 'https://www.unical.it',
        scholarship: 'MAECI Scholarship, UNICAL International Excellence Scholarship, Regional Grant',
      }
    ]
  },
    {
    id: 'denmark',
    name: 'Denmark',
    flag: '🇩🇰',
    color: '#C60C30',
    accent: '#FFFFFF',
    light: '#FCE8EA',
    desc: 'High-quality education, innovative culture, and Danish government scholarships available.',
    universities: [
      {
        name: 'University of Copenhagen',
        city: 'Copenhagen, Capital Region',
        qs: 79,
        fields: ['Medicine', 'Natural Sciences', 'Social Sciences'],
        link: 'https://www.ku.dk',
        scholarship: 'Danish Government Scholarship, UCPH International Master Scholarship, Erasmus+',
      },
      {
        name: 'Technical University of Denmark (DTU)',
        city: 'Kongens Lyngby, Capital Region',
        qs: 99,
        fields: ['Engineering', 'Computer Science', 'Physics'],
        link: 'https://www.dtu.dk',
        scholarship: 'DTU Tuition Fee Waiver & Grant, Danish Government Scholarship, Erasmus+',
      },
      {
        name: 'Aarhus University',
        city: 'Aarhus, Central Denmark',
        qs: 143,
        fields: ['Business', 'Engineering', 'Environmental Sciences'],
        link: 'https://www.au.dk',
        scholarship: 'Danish Government Scholarship, Aarhus University International Scholarship, Erasmus+',
      },
      {
        name: 'Aalborg University',
        city: 'Aalborg, North Denmark',
        qs: 306,
        fields: ['Engineering', 'Computer Science', 'Information Technology'],
        link: 'https://www.en.aau.dk',
        scholarship: 'Danish Government Scholarship, AAU International Scholarship, Erasmus+',
      },
      {
        name: 'University of Southern Denmark (SDU)',
        city: 'Odense, Southern Denmark',
        qs: 326,
        fields: ['Engineering', 'Medicine', 'Business'],
        link: 'https://www.sdu.dk',
        scholarship: 'Danish Government Scholarship, SDU International Scholarship, Erasmus+',
      },
      {
        name: 'Copenhagen Business School (CBS)',
        city: 'Copenhagen, Capital Region',
        qs: 346,
        fields: ['Business', 'Economics', 'Leadership'],
        link: 'https://www.cbs.dk',
        scholarship: 'Danish Government Scholarship, CBS International Scholarship, Erasmus+',
      },
      {
        name: 'IT University of Copenhagen',
        city: 'Copenhagen, Capital Region',
        qs: 999,
        fields: ['Computer Science', 'Digital Design', 'Data Science'],
        link: 'https://www.itu.dk',
        scholarship: 'ITU International Scholarship, Danish Government Grant, Erasmus+',
      },
      {
        name: 'Roskilde University',
        city: 'Roskilde, Zealand',
        qs: 1001,
        fields: ['Humanities', 'Social Sciences', 'Environmental Sciences'],
        link: 'https://www.ruc.dk',
        scholarship: 'Danish Government Scholarship, RUC International Talent Scholarship, Erasmus+',
      },
      {
        name: 'VIA University College',
        city: 'Aarhus / Horsens, Central Denmark',
        qs: 999,
        fields: ['Engineering', 'Education', 'Health Sciences'],
        link: 'https://www.via.dk',
        scholarship: 'VIA International Scholarship, Danish State Grant, Erasmus+',
      },
      {
        name: 'University College Copenhagen (KP)',
        city: 'Copenhagen, Capital Region',
        qs: 999,
        fields: ['Education', 'Nursing', 'Social Work'],
        link: 'https://www.kp.dk',
        scholarship: 'KP International Scholarship, Danish Government Grant, Erasmus+',
      },
      {
        name: 'University of the Faroe Islands',
        city: 'Tórshavn, Faroe Islands',
        qs: 999,
        fields: ['Natural Sciences', 'Humanities', 'Social Sciences'],
        link: 'https://www.setur.fo',
        scholarship: 'Danish Government Scholarship, UFI International Grant, Nordic Council Grant',
      },
      {
        name: 'Danish School of Media and Journalism (DMJX)',
        city: 'Copenhagen / Aarhus, Capital Region',
        qs: 999,
        fields: ['Arts', 'Communication', 'Journalism'],
        link: 'https://www.dmjx.dk',
        scholarship: 'DMJX International Scholarship, Danish Government Grant, Erasmus+',
      },
      {
        name: 'KEA - Copenhagen School of Design and Technology',
        city: 'Copenhagen, Capital Region',
        qs: 999,
        fields: ['Design', 'Engineering', 'Computer Science'],
        link: 'https://www.kea.dk',
        scholarship: 'KEA International Scholarship, Danish State Grant, Erasmus+',
      },
      {
        name: 'Business Academy Aarhus',
        city: 'Aarhus / Viby, Central Denmark',
        qs: 999,
        fields: ['Business', 'IT', 'Logistics'],
        link: 'https://www.baaa.dk',
        scholarship: 'BAAA International Scholarship, Danish Government Grant, Erasmus+',
      }
    ]
  },
    {
    id: 'singapore',
    name: 'Singapore',
    flag: '🇸🇬',
    color: '#EE2E3A',
    accent: '#FFFFFF',
    light: '#FCE8EA',
    desc: 'World-class Asian education hub with SINGA & MOE scholarships.',
    universities: [
      {
        name: 'National University of Singapore (NUS)',
        city: 'Queenstown, Central Region',
        qs: 8,
        fields: ['Engineering', 'Computer Science', 'Medicine'],
        link: 'https://www.nus.edu.sg',
        scholarship: 'SINGA Research Scholarship, MOE Fellowship, NUS International Scholarship',
      },
      {
        name: 'Nanyang Technological University (NTU)',
        city: 'Jurong West, West Region',
        qs: 26,
        fields: ['Engineering', 'Materials Science', 'Computer Science'],
        link: 'https://www.ntu.edu.sg',
        scholarship: 'NTU Research Scholarship, SINGA, ASEAN Undergraduate Scholarship',
      },
      {
        name: 'Singapore Management University (SMU)',
        city: 'Bras Basah, Central Region',
        qs: 545,
        fields: ['Business', 'Economics', 'Law'],
        link: 'https://www.smu.edu.sg',
        scholarship: 'SMU Global Impact Scholarship, SMU Merit Scholarship, ASEAN Scholarship',
      },
      {
        name: 'Singapore University of Technology and Design (SUTD)',
        city: 'Changi, East Region',
        qs: 429,
        fields: ['Engineering', 'Architecture', 'Design'],
        link: 'https://www.sutd.edu.sg',
        scholarship: 'SUTD Global Excellence Scholarship, SUTD Merit Scholarship, SINGA',
      },
      {
        name: 'Singapore Institute of Technology (SIT)',
        city: 'Dover, Central Region',
        qs: 999,
        fields: ['Engineering', 'Health Sciences', 'Computer Science'],
        link: 'https://www.singaporetech.edu.sg',
        scholarship: 'SIT Merit Scholarship, SIT International Grant, MOE Bursary',
      },
      {
        name: 'James Cook University Singapore',
        city: 'Sims Drive, Central Region',
        qs: 415,
        fields: ['Psychology', 'Business', 'Environmental Sciences'],
        link: 'https://www.jcu.edu.sg',
        scholarship: 'JCU International Student Scholarship, JCU Merit Grant, ASEAN Excellence Award',
      },
      {
        name: 'Curtin Singapore',
        city: 'Novena, Central Region',
        qs: 193,
        fields: ['Business', 'Computer Science', 'Mass Communication'],
        link: 'https://www.curtin.edu.sg',
        scholarship: 'Curtin Singapore Merit Scholarship, Curtin Excellence Award, Diploma to Degree Grant',
      },
      {
        name: 'INSEAD Asia Campus',
        city: 'Buona Vista, Central Region',
        qs: 999,
        fields: ['Business', 'Leadership', 'Economics'],
        link: 'https://www.insead.edu',
        scholarship: 'INSEAD Diversity Scholarship, INSEAD Need-based Grant, ASEAN Fellowship',
      },
      {
        name: 'ESSEC Business School Asia-Pacific',
        city: 'Boon Lay, West Region',
        qs: 999,
        fields: ['Business', 'Economics', 'Management'],
        link: 'https://www.essec.edu',
        scholarship: 'ESSEC Academic Excellence Scholarship, ESSEC Women in Business Grant, ASEAN Scholarship',
      },
      {
        name: 'Nanyang Academy of Fine Arts (NAFA)',
        city: 'Bencoolen, Central Region',
        qs: 999,
        fields: ['Arts', 'Design', 'Music'],
        link: 'https://www.nafa.edu.sg',
        scholarship: 'NAFA International Scholarship, NAFA Talent Development Grant, MOE Bursary',
      },
      {
        name: 'Lasalle College of the Arts',
        city: 'Mountbatten, Central Region',
        qs: 999,
        fields: ['Arts', 'Design', 'Media Arts'],
        link: 'https://www.lasalle.edu.sg',
        scholarship: 'Lasalle International Achievement Scholarship, Lasalle Merit Grant, City Hall Grant',
      },
      {
        name: 'Singapore University of Social Sciences (SUSS)',
        city: 'Clementi, West Region',
        qs: 999,
        fields: ['Social Sciences', 'Law', 'Psychology'],
        link: 'https://www.suss.edu.sg',
        scholarship: 'SUSS International Scholarship, SUSS Bursary, MOE Fellowship',
      },
      {
        name: 'PSB Academy',
        city: 'Marina, Central Region',
        qs: 999,
        fields: ['Business', 'Engineering', 'Computer Science'],
        link: 'https://www.psb-academy.edu.sg',
        scholarship: 'PSB Academic Excellence Award, PSB International Grant, Early Bird Discount',
      }
    ]
  },
  {
    id: 'malaysia',
    name: 'Malaysia',
    flag: '🇲🇾',
    color: '#0032A0',
    accent: '#FC0F42',
    light: '#E8F0FE',
    desc: 'Affordable English-speaking hub with MIS & ASEAN scholarships.',
    universities: [
      {
        name: 'University of Malaya (UM)',
        city: 'Kuala Lumpur, Federal Territory',
        qs: 65,
        fields: ['Medicine', 'Engineering', 'Computer Science'],
        link: 'https://www.um.edu.my',
        scholarship: 'Malaysia International Scholarship (MIS), UM Bright Spark Scholarship, ASEAN Scholarship',
      },
      {
        name: 'Universiti Kebangsaan Malaysia (UKM)',
        city: 'Bangi, Selangor',
        qs: 159,
        fields: ['Engineering', 'Social Sciences', 'Medicine'],
        link: 'https://www.ukm.my',
        scholarship: 'MIS, UKM International Scholarship, MTCP Scholarship',
      },
      {
        name: 'Universiti Sains Malaysia (USM)',
        city: 'George Town, Penang',
        qs: 146,
        fields: ['Engineering', 'Natural Sciences', 'Pharmacy'],
        link: 'https://www.usm.my',
        scholarship: 'MIS, USM Global Fellowship, ASEAN Undergraduate Scholarship',
      },
      {
        name: 'Universiti Putra Malaysia (UPM)',
        city: 'Serdang, Selangor',
        qs: 158,
        fields: ['Agriculture', 'Veterinary', 'Environmental Sciences'],
        link: 'https://www.upm.edu.my',
        scholarship: 'MIS, UPM International Scholarship, MTCP Grant',
      },
      {
        name: 'Universiti Teknologi Malaysia (UTM)',
        city: 'Johor Bahru, Johor',
        qs: 188,
        fields: ['Engineering', 'Computer Science', 'Physics'],
        link: 'https://www.utm.my',
        scholarship: 'MIS, UTM International Scholarship, Zamalah Grant',
      },
      {
        name: 'Taylor\'s University',
        city: 'Subang Jaya, Selangor',
        qs: 284,
        fields: ['Business', 'Hospitality', 'Computer Science'],
        link: 'https://www.taylors.edu.my',
        scholarship: 'Taylor\'s Excellence Award, Taylor\'s World Class Scholarship, ASEAN Grant',
      },
      {
        name: 'UCSI University',
        city: 'Cheras, Kuala Lumpur',
        qs: 300,
        fields: ['Medicine', 'Engineering', 'Music'],
        link: 'https://www.ucsiuniversity.edu.my',
        scholarship: 'UCSI Trust Scholarship, UCSI International Grant, ASEAN Scholarship',
      },
      {
        name: 'Universiti Teknologi Petronas (UTP)',
        city: 'Seri Iskandar, Perak',
        qs: 307,
        fields: ['Petroleum Engineering', 'Chemical Engineering', 'Computer Science'],
        link: 'https://www.utp.edu.my',
        scholarship: 'UTP Merit Scholarship, Petronas Education Grant, MIS',
      },
      {
        name: 'Monash University Malaysia',
        city: 'Bandar Sunway, Selangor',
        qs: 42,
        fields: ['Business', 'Engineering', 'Pharmacy'],
        link: 'https://www.monash.edu.my',
        scholarship: 'Monash High Achiever Award, Monash Equity Scholarship, ASEAN Grant',
      },
      {
        name: 'University of Nottingham Malaysia',
        city: 'Semenyih, Selangor',
        qs: 100,
        fields: ['Engineering', 'Environmental Sciences', 'Business'],
        link: 'https://www.nottingham.edu.my',
        scholarship: 'Nottingham International Scholarship, Nottingham Excellence Award, ASEAN Grant',
      },
      {
        name: 'Heriot-Watt University Malaysia',
        city: 'Putrajaya, Federal Territory',
        qs: 235,
        fields: ['Engineering', 'Business', 'Computer Science'],
        link: 'https://www.hw.edu.my',
        scholarship: 'Heriot-Watt Merit Scholarship, Heriot-Watt Sports Grant, ASEAN Scholarship',
      },
      {
        name: 'Newcastle University Medicine Malaysia',
        city: 'Iskandar Puteri, Johor',
        qs: 129,
        fields: ['Medicine', 'Biomedical Sciences', 'Public Health'],
        link: 'https://www.ncl.ac.uk/numed',
        scholarship: 'NUMed International Scholarship, NUMed High Achiever Grant, ASEAN Award',
      },
      {
        name: 'University of Reading Malaysia',
        city: 'Iskandar Puteri, Johor',
        qs: 202,
        fields: ['Law', 'Business', 'Real Estate'],
        link: 'https://www.reading.edu.my',
        scholarship: 'Reading International Scholarship, Reading Dean\'s Award, ASEAN Grant',
      },
      {
        name: 'Curtin University Malaysia',
        city: 'Miri, Sarawak',
        qs: 193,
        fields: ['Engineering', 'Business', 'Computer Science'],
        link: 'https://www.curtin.edu.my',
        scholarship: 'Curtin Malaysia Merit Scholarship, Curtin International Grant, ASEAN Excellence',
      },
      {
        name: 'Swinburne University of Technology Sarawak',
        city: 'Kuching, Sarawak',
        qs: 285,
        fields: ['Engineering', 'Business', 'Design'],
        link: 'https://www.swinburne.edu.my',
        scholarship: 'Swinburne International Excellence Award, Sarawak State Grant, ASEAN Scholarship',
      }
    ]
  },

  {
    id: 'china',
    name: 'China',
    flag: '🇨🇳',
    color: '#EE2E3A',
    accent: '#FFDE00',
    light: '#FCE8EA',
    desc: 'CSC full scholarships for Bangladeshis at world-class affordable universities.',
    universities: [
      {
        name: 'Tsinghua University',
        city: 'Beijing',
        qs: 25,
        fields: ['Engineering', 'Computer Science', 'Business'],
        link: 'https://www.tsinghua.edu.cn',
        scholarship: 'Chinese Government Scholarship (CSC), Beijing Government Scholarship, Schwarzman Scholarship',
      },
      {
        name: 'Peking University',
        city: 'Beijing',
        qs: 17,
        fields: ['Medicine', 'Law', 'Humanities'],
        link: 'https://www.pku.edu.cn',
        scholarship: 'CSC Scholarship, Beijing Government Scholarship, PKU International Grant',
      },
      {
        name: 'Fudan University',
        city: 'Shanghai',
        qs: 34,
        fields: ['Medicine', 'Business', 'Economics'],
        link: 'https://www.fudan.edu.cn',
        scholarship: 'CSC Scholarship, Shanghai Government Scholarship, Fudan International Grant',
      },
      {
        name: 'Shanghai Jiao Tong University',
        city: 'Shanghai',
        qs: 47,
        fields: ['Engineering', 'Medicine', 'Computer Science'],
        link: 'https://www.sjtu.edu.cn',
        scholarship: 'CSC Scholarship, SJTU International Scholarship, Shanghai Government Grant',
      },
      {
        name: 'Zhejiang University',
        city: 'Hangzhou',
        qs: 44,
        fields: ['Engineering', 'Agriculture', 'Computer Science'],
        link: 'https://www.zju.edu.cn',
        scholarship: 'CSC Scholarship, ZJU International Scholarship, Zhejiang Provincial Grant',
      },
      {
        name: 'University of Science and Technology of China',
        city: 'Hefei',
        qs: 93,
        fields: ['Physics', 'Chemistry', 'Computer Science'],
        link: 'https://www.ustc.edu.cn',
        scholarship: 'CSC Scholarship, USTC Fellowship, Anhui Government Grant',
      },
      {
        name: 'Nanjing University',
        city: 'Nanjing',
        qs: 131,
        fields: ['Natural Sciences', 'Humanities', 'Environmental Sciences'],
        link: 'https://www.nju.edu.cn',
        scholarship: 'CSC Scholarship, Nanjing Government Scholarship, Jiangsu Presidential Grant',
      },
      {
        name: 'Wuhan University',
        city: 'Wuhan',
        qs: 194,
        fields: ['Law', 'Engineering', 'Medicine'],
        link: 'https://www.whu.edu.cn',
        scholarship: 'CSC Scholarship, Wuhan University Scholarship, Hubei Government Grant',
      },
      {
        name: 'Harbin Institute of Technology',
        city: 'Harbin',
        qs: 217,
        fields: ['Engineering', 'Aerospace', 'Computer Science'],
        link: 'https://www.hit.edu.cn',
        scholarship: 'CSC Scholarship, HIT International Scholarship, Heilongjiang Grant',
      },
      {
        name: 'Tongji University',
        city: 'Shanghai',
        qs: 216,
        fields: ['Architecture', 'Engineering', 'Environmental Sciences'],
        link: 'https://www.tongji.edu.cn',
        scholarship: 'CSC Scholarship, Tongji International Scholarship, Shanghai Government Grant',
      },
      {
        name: 'Beijing Institute of Technology',
        city: 'Beijing',
        qs: 340,
        fields: ['Engineering', 'Management', 'Information Technology'],
        link: 'https://www.bit.edu.cn',
        scholarship: 'CSC Scholarship (Fully Funded: tuition + accommodation + 2500-3500 RMB/month) [citation:1]',
      },
      {
        name: 'Sun Yat-sen University',
        city: 'Guangzhou',
        qs: 323,
        fields: ['Medicine', 'Business', 'Marine Sciences'],
        link: 'https://www.sysu.edu.cn',
        scholarship: 'CSC Scholarship, Guangdong Government Scholarship, SYSU International Grant',
      },
      {
        name: 'Xi\'an Jiaotong University',
        city: 'Xi\'an',
        qs: 302,
        fields: ['Engineering', 'Energy', 'Materials Science'],
        link: 'https://www.xjtu.edu.cn',
        scholarship: 'CSC Scholarship, XJTU International Scholarship, Shaanxi Government Grant',
      },
      {
        name: 'Huazhong University of Science and Technology',
        city: 'Wuhan',
        qs: 296,
        fields: ['Engineering', 'Medicine', 'Computer Science'],
        link: 'https://www.hust.edu.cn',
        scholarship: 'CSC Scholarship, HUST International Scholarship, Hubei Provincial Grant',
      }
    ]
  },
  {
    id: 'spain',
    name: 'Spain',
    flag: '🇪🇸',
    color: '#C60C30',
    accent: '#FFC400',
    light: '#FCE8EA',
    desc: 'Sunny EU nation with affordable tuition and growing English-taught programs.',
    universities: [
      {
        name: 'University of Barcelona',
        city: 'Barcelona, Catalonia',
        qs: 165,
        fields: ['Medicine', 'Biology', 'Humanities'],
        link: 'https://www.ub.edu',
        scholarship: 'Spanish Government Scholarships (MAECI-equivalent), Erasmus+, UB International Grant',
      },
      {
        name: 'Universidad Autónoma de Madrid',
        city: 'Madrid',
        qs: 199,
        fields: ['Law', 'Economics', 'Natural Sciences'],
        link: 'https://www.uam.es',
        scholarship: 'UAM International Scholarship, Erasmus+, Spanish Government Grant',
      },
      {
        name: 'Complutense University of Madrid',
        city: 'Madrid',
        qs: 212,
        fields: ['Medicine', 'Journalism', 'Political Science'],
        link: 'https://www.ucm.es',
        scholarship: 'UCM International Excellence Scholarship, Erasmus+, Spanish MAECI Grant',
      },
      {
        name: 'University of Pompeu Fabra',
        city: 'Barcelona, Catalonia',
        qs: 269,
        fields: ['Economics', 'Business', 'Social Sciences'],
        link: 'https://www.upf.edu',
        scholarship: 'UPF International Scholarship, Erasmus+, Catalan Government Grant',
      },
      {
        name: 'University of Navarra',
        city: 'Pamplona, Navarre',
        qs: 280,
        fields: ['Business', 'Law', 'Communication'],
        link: 'https://www.unav.edu',
        scholarship: 'University of Navarra Scholarship, ISSA Grant, Erasmus+',
      },
      {
        name: 'Polytechnic University of Catalonia',
        city: 'Barcelona, Catalonia',
        qs: 347,
        fields: ['Engineering', 'Architecture', 'Computer Science'],
        link: 'https://www.upc.edu',
        scholarship: 'UPC International Excellence Scholarship, Erasmus+, Spanish Government Grant',
      },
      {
        name: 'University of Granada',
        city: 'Granada, Andalusia',
        qs: 403,
        fields: ['Humanities', 'Computer Science', 'Pharmacy'],
        link: 'https://www.ugr.es',
        scholarship: 'UGR International Scholarship, Erasmus+, Andalusian Government Grant',
      },
      {
        name: 'University of Valencia',
        city: 'Valencia',
        qs: 451,
        fields: ['Medicine', 'Natural Sciences', 'Education'],
        link: 'https://www.uv.es',
        scholarship: 'UV International Scholarship, Erasmus+, Spanish Government Grant',
      },
      {
        name: 'University of the Balearic Islands',
        city: 'Palma, Mallorca',
        qs: 999,
        fields: ['Computer Science', 'Environmental Sciences', 'Tourism'],
        link: 'https://www.uib.eu',
        scholarship: 'Erasmus Mundus Scholarship (€49,000 full funding), UIB International Grant [citation:2]',
      },
      {
        name: 'IE University',
        city: 'Madrid / Segovia',
        qs: 999,
        fields: ['Business', 'Law', 'Architecture'],
        link: 'https://www.ie.edu',
        scholarship: 'IE International Scholarship, IE Women in Business Grant, IE Excellence Award',
      },
      {
        name: 'University of Seville',
        city: 'Seville, Andalusia',
        qs: 651,
        fields: ['Engineering', 'Architecture', 'Social Sciences'],
        link: 'https://www.us.es',
        scholarship: 'US International Scholarship, Erasmus+, Andalusian Government Grant',
      },
      {
        name: 'University of Zaragoza',
        city: 'Zaragoza, Aragon',
        qs: 801,
        fields: ['Engineering', 'Medicine', 'Chemistry'],
        link: 'https://www.unizar.es',
        scholarship: 'Unizar International Grant, Erasmus+, Spanish MAECI',
      },
      {
        name: 'University of Alcalá',
        city: 'Alcalá de Henares, Madrid',
        qs: 1001,
        fields: ['Humanities', 'Pharmacy', 'Engineering'],
        link: 'https://www.uah.es',
        scholarship: 'UAH International Scholarship, Erasmus+, Comunidad de Madrid Grant',
      },
      {
        name: 'Rovira i Virgili University',
        city: 'Tarragona, Catalonia',
        qs: 951,
        fields: ['Chemistry', 'Engineering', 'Business'],
        link: 'https://www.urv.cat',
        scholarship: 'URV International Grant, Erasmus+, Catalan Government Scholarship',
      }
    ]
  },
   {
    id: 'france',
    name: 'France',
    flag: '🇫🇷',
    color: '#002395',
    accent: '#FFFFFF',
    light: '#E8F0FE',
    desc: 'Low tuition (€170-€600/year) + Eiffel & Charpak scholarships for Bangladeshis [citation:3].',
    universities: [
      {
        name: 'Université PSL (Paris Sciences et Lettres)',
        city: 'Paris, Île-de-France',
        qs: 24,
        fields: ['Engineering', 'Physics', 'Business'],
        link: 'https://psl.eu',
        scholarship: 'Eiffel Excellence Scholarship, Charpak Scholarship, Erasmus+ [citation:3]',
      },
      {
        name: 'Sorbonne University',
        city: 'Paris, Île-de-France',
        qs: 59,
        fields: ['Medicine', 'Arts', 'Natural Sciences'],
        link: 'https://www.sorbonne-universite.fr',
        scholarship: 'Eiffel Excellence, Sorbonne International Scholarship, Campus France Grants [citation:3]',
      },
      {
        name: 'Université Paris-Saclay',
        city: 'Paris / Orsay, Île-de-France',
        qs: 71,
        fields: ['Physics', 'Engineering', 'Computer Science'],
        link: 'https://www.universite-paris-saclay.fr',
        scholarship: 'IDEX International Scholarship, Eiffel Excellence, Erasmus+',
      },
      {
        name: 'École Polytechnique',
        city: 'Palaiseau, Île-de-France',
        qs: 38,
        fields: ['Engineering', 'Mathematics', 'Physics'],
        link: 'https://www.polytechnique.edu',
        scholarship: 'Eiffel Excellence, Polytechnique International Scholarship, Charpak Grant',
      },
      {
        name: 'Sciences Po',
        city: 'Paris, Île-de-France',
        qs: 259,
        fields: ['Political Science', 'International Relations', 'Law'],
        link: 'https://www.sciencespo.fr',
        scholarship: 'Émile Boutmy Scholarship, Eiffel Excellence, Charpak Grant [citation:3]',
      },
      {
        name: 'HEC Paris',
        city: 'Jouy-en-Josas, Île-de-France',
        qs: 999,
        fields: ['Business', 'Economics', 'Management'],
        link: 'https://www.hec.edu',
        scholarship: 'HEC Foundation Scholarship, Eiffel Excellence, MBA Diversity Grant [citation:3]',
      },
      {
        name: 'INSEAD',
        city: 'Fontainebleau, Île-de-France',
        qs: 999,
        fields: ['Business', 'Leadership', 'Economics'],
        link: 'https://www.insead.edu',
        scholarship: 'INSEAD Diversity Scholarship, INSEAD Need-based Grant, Eiffel [citation:3]',
      },
      {
        name: 'University of Strasbourg',
        city: 'Strasbourg, Grand Est',
        qs: 421,
        fields: ['Chemistry', 'Medicine', 'Law'],
        link: 'https://www.unistra.fr',
        scholarship: 'Eiffel Excellence, Unistra International Scholarship, Erasmus+',
      },
      {
        name: 'Aix-Marseille University',
        city: 'Marseille, Provence-Alpes-Côte d\'Azur',
        qs: 521,
        fields: ['Environmental Sciences', 'Medicine', 'Physics'],
        link: 'https://www.univ-amu.fr',
        scholarship: 'AMU International Scholarship, Eiffel Excellence, Erasmus+',
      },
      {
        name: 'University of Montpellier',
        city: 'Montpellier, Occitanie',
        qs: 601,
        fields: ['Medicine', 'Biology', 'Environmental Sciences'],
        link: 'https://www.umontpellier.fr',
        scholarship: 'Eiffel Excellence, MUSE Scholarship, Erasmus+',
      },
      {
        name: 'Grenoble Alpes University',
        city: 'Grenoble, Auvergne-Rhône-Alpes',
        qs: 601,
        fields: ['Engineering', 'Physics', 'Computer Science'],
        link: 'https://www.univ-grenoble-alpes.fr',
        scholarship: 'IDEX International Scholarship, Eiffel Excellence, Erasmus+',
      },
      {
        name: 'University of Lille',
        city: 'Lille, Hauts-de-France',
        qs: 701,
        fields: ['Medicine', 'Engineering', 'Social Sciences'],
        link: 'https://www.univ-lille.fr',
        scholarship: 'Eiffel Excellence, Université de Lille Scholarship, Erasmus+',
      },
      {
        name: 'University of Bordeaux',
        city: 'Bordeaux, Nouvelle-Aquitaine',
        qs: 801,
        fields: ['Natural Sciences', 'Law', 'Political Science'],
        link: 'https://www.u-bordeaux.fr',
        scholarship: 'Eiffel Excellence, UB International Grant, Erasmus+',
      },
      {
        name: 'University of Toulouse',
        city: 'Toulouse, Occitanie',
        qs: 801,
        fields: ['Aerospace Engineering', 'Economics', 'Medicine'],
        link: 'https://www.univ-toulouse.fr',
        scholarship: 'Eiffel Excellence, Université Fédérale Scholarship, Erasmus+',
      }
    ]
  },
  {
    id: 'kazakhstan',
    name: 'Kazakhstan',
    flag: '🇰🇿',
    color: '#00AFCA',
    accent: '#F2C100',
    light: '#E8F5F9',
    desc: '550 govt scholarships annually for int\'l students (Bachelor\'s/Master\'s/PhD) [citation:4].',
    universities: [
      {
        name: 'Al-Farabi Kazakh National University (KazNU)',
        city: 'Almaty',
        qs: 231,
        fields: ['Medicine', 'Engineering', 'Natural Sciences'],
        link: 'https://www.kaznu.kz',
        scholarship: 'Kazakh Government Scholarship (550 grants/year), Bolashak Program, University Merit Grant [citation:4]',
      },
      {
        name: 'L.N. Gumilyov Eurasian National University',
        city: 'Astana',
        qs: 351,
        fields: ['Engineering', 'International Relations', 'Computer Science'],
        link: 'https://www.enu.kz',
        scholarship: 'Kazakh Government Scholarship, ENU International Grant, Bolashak [citation:4]',
      },
      {
        name: 'Kazakh-British Technical University (KBTU)',
        city: 'Almaty',
        qs: 481,
        fields: ['Engineering', 'Business', 'Information Technology'],
        link: 'https://www.kbtu.kz',
        scholarship: 'KBTU Merit Scholarship, Kazakh Government Grant, Bolashak [citation:4]',
      },
      {
        name: 'Astana IT University',
        city: 'Astana',
        qs: 999,
        fields: ['Computer Science', 'Data Science', 'Cybersecurity'],
        link: 'https://astanait.edu.kz',
        scholarship: 'Kazakh Government Scholarship, AITU Tech Grant, Bolashak [citation:4]',
      },
      {
        name: 'Satbayev University',
        city: 'Almaty',
        qs: 801,
        fields: ['Mining Engineering', 'Geology', 'Metallurgy'],
        link: 'https://satbayev.university',
        scholarship: 'Satbayev International Scholarship, Kazakh Government Grant, Industry Sponsorship',
      },
      {
        name: 'Narxoz University',
        city: 'Almaty',
        qs: 999,
        fields: ['Business', 'Economics', 'Law'],
        link: 'https://narxoz.kz',
        scholarship: 'Narxoz International Scholarship, Kazakh Government Grant, Bolashak',
      },
      {
        name: 'Karaganda Buketov University',
        city: 'Karaganda',
        qs: 1001,
        fields: ['Medicine', 'Chemistry', 'Biology'],
        link: 'https://buketov.edu.kz',
        scholarship: 'Kazakh Government Scholarship, University Merit Grant, Regional Scholarship',
      },
      {
        name: 'South Kazakhstan Medical Academy',
        city: 'Shymkent',
        qs: 999,
        fields: ['Medicine', 'Pharmacy', 'Dentistry'],
        link: 'https://www.skma.edu.kz',
        scholarship: 'SKMA International Scholarship, Kazakh Government Grant, WHO Sponsorship',
      },
      {
        name: 'Kazakh National Medical University',
        city: 'Almaty',
        qs: 1001,
        fields: ['Medicine', 'Public Health', 'Pharmacy'],
        link: 'https://kaznmu.kz',
        scholarship: 'KazNMU International Scholarship, Kazakh Government Grant, Bolashak',
      },
      {
        name: 'S.Seifullin Kazakh Agrotechnical University',
        city: 'Astana',
        qs: 999,
        fields: ['Agriculture', 'Veterinary', 'Environmental Sciences'],
        link: 'https://www.kazatu.edu.kz',
        scholarship: 'Kazakh Government Scholarship, Agricultural Development Grant, Bolashak',
      },
      {
        name: 'Almaty University of Power Engineering and Telecommunications',
        city: 'Almaty',
        qs: 999,
        fields: ['Engineering', 'Telecommunications', 'Energy'],
        link: 'https://www.aues.kz',
        scholarship: 'AUPET International Grant, Kazakh Government Scholarship, Industry Sponsorship',
      },
      {
        name: 'Kazakh National University of Arts',
        city: 'Astana',
        qs: 999,
        fields: ['Arts', 'Music', 'Theatre'],
        link: 'https://www.kaznuakz.edu.kz',
        scholarship: 'KazNUA Talent Scholarship, Kazakh Government Grant, Cultural Exchange Fund',
      },
      {
        name: 'Kokshetau University',
        city: 'Kokshetau',
        qs: 999,
        fields: ['Education', 'Business', 'Computer Science'],
        link: 'https://ku.kz',
        scholarship: 'Kokshetau International Scholarship, Kazakh Government Grant, Regional Sponsorship',
      }
    ]
  },
   {
    id: 'turkey',
    name: 'Turkey',
    flag: '🇹🇷',
    color: '#E30A17',
    accent: '#FFFFFF',
    light: '#FCE8EA',
    desc: 'Türkiye Burslari full scholarships + low living costs for Bangladeshis.',
    universities: [
      {
        name: 'Istanbul Technical University',
        city: 'Istanbul, Marmara',
        qs: 401,
        fields: ['Engineering', 'Architecture', 'Maritime'],
        link: 'https://www.itu.edu.tr',
        scholarship: 'Türkiye Burslari (Turkish Government), ITU International Scholarship, Research Grant',
      },
      {
        name: 'Koç University',
        city: 'Istanbul, Marmara',
        qs: 451,
        fields: ['Medicine', 'Engineering', 'Social Sciences'],
        link: 'https://www.ku.edu.tr',
        scholarship: 'Koç University International Scholarship, Türkiye Burslari, Koç Foundation Grant',
      },
      {
        name: 'Sabancı University',
        city: 'Istanbul, Marmara',
        qs: 501,
        fields: ['Engineering', 'Natural Sciences', 'Business'],
        link: 'https://www.sabanciuniv.edu',
        scholarship: 'Sabancı International Excellence Scholarship, Türkiye Burslari, SU Graduate Fellowship',
      },
      {
        name: 'Bilkent University',
        city: 'Ankara, Central Anatolia',
        qs: 551,
        fields: ['Engineering', 'Physics', 'Computer Science'],
        link: 'https://www.bilkent.edu.tr',
        scholarship: 'Bilkent International Scholarship, Türkiye Burslari, Bilkent Graduate Grant',
      },
      {
        name: 'Middle East Technical University (ODTÜ)',
        city: 'Ankara, Central Anatolia',
        qs: 601,
        fields: ['Engineering', 'Physics', 'Architecture'],
        link: 'https://www.metu.edu.tr',
        scholarship: 'Türkiye Burslari, METU International Scholarship, TÜBİTAK Grant',
      },
      {
        name: 'Boğaziçi University',
        city: 'Istanbul, Marmara',
        qs: 801,
        fields: ['Engineering', 'Economics', 'Political Science'],
        link: 'https://www.boun.edu.tr',
        scholarship: 'Türkiye Burslari, Boğaziçi International Scholarship, Turkish State Grant',
      },
      {
        name: 'Istanbul University',
        city: 'Istanbul, Marmara',
        qs: 801,
        fields: ['Medicine', 'Law', 'Pharmacy'],
        link: 'https://www.istanbul.edu.tr',
        scholarship: 'Türkiye Burslari, Istanbul University Scholarship, Turkish Government Grant',
      },
      {
        name: 'Ankara University',
        city: 'Ankara, Central Anatolia',
        qs: 951,
        fields: ['Medicine', 'Veterinary', 'Political Science'],
        link: 'https://www.ankara.edu.tr',
        scholarship: 'Türkiye Burslari, Ankara University International Grant, TÜBİTAK',
      },
      {
        name: 'Atatürk University',
        city: 'Erzurum, Eastern Anatolia',
        qs: 1001,
        fields: ['Medicine', 'Engineering', 'Agriculture'],
        link: 'https://www.atauni.edu.tr',
        scholarship: 'Türkiye Burslari, Atatürk University Poverty Alleviation Grant (tuition + housing + meal) [citation:5]',
      },
      {
        name: 'Ege University',
        city: 'Izmir, Aegean',
        qs: 1001,
        fields: ['Medicine', 'Agriculture', 'Fisheries'],
        link: 'https://ege.edu.tr',
        scholarship: 'Türkiye Burslari, Ege University International Scholarship, Turkish Government Grant',
      },
      {
        name: 'Gazi University',
        city: 'Ankara, Central Anatolia',
        qs: 1001,
        fields: ['Education', 'Engineering', 'Medicine'],
        link: 'https://www.gazi.edu.tr',
        scholarship: 'Türkiye Burslari, Gazi University International Scholarship, TÜBİTAK',
      },
      {
        name: 'Çukurova University',
        city: 'Adana, Mediterranean',
        qs: 1001,
        fields: ['Agriculture', 'Medicine', 'Engineering'],
        link: 'https://www.cu.edu.tr',
        scholarship: 'Türkiye Burslari, Çukurova International Grant, Turkish Government Scholarship',
      },
      {
        name: 'Yıldız Technical University',
        city: 'Istanbul, Marmara',
        qs: 1001,
        fields: ['Engineering', 'Architecture', 'Computer Science'],
        link: 'https://www.yildiz.edu.tr',
        scholarship: 'Türkiye Burslari, YTU International Scholarship, Istanbul Metropolitan Grant',
      },
      {
        name: 'Marmara University',
        city: 'Istanbul, Marmara',
        qs: 1001,
        fields: ['Business', 'Economics', 'Law'],
        link: 'https://www.marmara.edu.tr',
        scholarship: 'Türkiye Burslari, Marmara International Scholarship, Turkish State Grant',
      }
    ]
  },
  {
    id: 'uae',
    name: 'UAE',
    flag: '🇦🇪',
    color: '#00732F',
    accent: '#FFFFFF',
    light: '#E8F5E9',
    desc: 'Top-ranked branch campuses & merit scholarships for Bangladeshi students.',
    universities: [
      {
        name: 'United Arab Emirates University',
        city: 'Al Ain, Abu Dhabi',
        qs: 290,
        fields: ['Medicine', 'Engineering', 'Business'],
        link: 'https://www.uaeu.ac.ae',
        scholarship: 'UAEU International Scholarship, Sheikh Mohamed bin Zayed Grant, MOHESR Scholarship',
      },
      {
        name: 'Khalifa University',
        city: 'Abu Dhabi',
        qs: 181,
        fields: ['Engineering', 'Computer Science', 'Petroleum'],
        link: 'https://www.ku.ac.ae',
        scholarship: 'Khalifa University Graduate Scholarship (Full tuition + stipend), KU International Grant',
      },
      {
        name: 'University of Sharjah',
        city: 'Sharjah',
        qs: 451,
        fields: ['Medicine', 'Engineering', 'Communication'],
        link: 'https://www.sharjah.ac.ae',
        scholarship: 'University of Sharjah Scholarship, Sharjah Government Grant, Merit-based Award',
      },
      {
        name: 'American University of Sharjah',
        city: 'Sharjah',
        qs: 999,
        fields: ['Engineering', 'Business', 'Architecture'],
        link: 'https://www.aus.edu',
        scholarship: 'AUS International Scholarship, Chancellor\'s Scholarship, Sharjah Government Grant',
      },
      {
        name: 'New York University Abu Dhabi',
        city: 'Abu Dhabi',
        qs: 39,
        fields: ['Arts', 'Engineering', 'Social Sciences'],
        link: 'https://nyuad.nyu.edu',
        scholarship: 'NYUAD Global Scholarship (Full tuition + housing + travel), Leader of Tomorrow Award',
      },
      {
        name: 'University of Dubai',
        city: 'Dubai',
        qs: 999,
        fields: ['Business', 'Law', 'Information Technology'],
        link: 'https://www.ud.ac.ae',
        scholarship: 'UD International Scholarship, Dubai Chamber Grant, Merit-based Award',
      },
      {
        name: 'University of Wollongong in Dubai',
        city: 'Dubai',
        qs: 167,
        fields: ['Business', 'Engineering', 'Computer Science'],
        link: 'https://www.uowdubai.ac.ae',
        scholarship: 'UOWD International Scholarship, Vice-Chancellor\'s Award, Faculty Merit Grant',
      },
      {
        name: 'Murdoch University Dubai',
        city: 'Dubai',
        qs: 434,
        fields: ['Business', 'Communication', 'Computer Science'],
        link: 'https://www.murdochuniversitydubai.com',
        scholarship: 'Murdoch International Excellence Scholarship, Dubai Campus Grant, Early Bird Discount',
      },
      {
        name: 'Middlesex University Dubai',
        city: 'Dubai',
        qs: 751,
        fields: ['Business', 'Law', 'Computer Science'],
        link: 'https://www.mdx.ac.ae',
        scholarship: 'MDX International Merit Award, Chancellor\'s Scholarship, Dubai Academic Excellence Grant',
      },
      {
        name: 'Heriot-Watt University Dubai',
        city: 'Dubai',
        qs: 235,
        fields: ['Engineering', 'Business', 'Computer Science'],
        link: 'https://www.hw.ac.uk/dubai',
        scholarship: 'Heriot-Watt Merit Scholarship, Dubai Campus International Award, Family Discount',
      },
      {
        name: 'University of Birmingham Dubai',
        city: 'Dubai',
        qs: 84,
        fields: ['Business', 'Computer Science', 'Engineering'],
        link: 'https://www.birmingham.ac.uk/dubai',
        scholarship: 'Birmingham Dubai International Scholarship, Global Achievement Award, Chancellor\'s Grant',
      },
      {
        name: 'Horizon University College',
        city: 'Dubai',
        qs: 999,
        fields: ['Business', 'Computer Science', 'Engineering'],
        link: 'https://www.hu.ac.ae',
        scholarship: 'HUC Merit Scholarship, Need-based Grant (77% students receive aid), Monthly Payment Plan [citation:6]',
      }
    ]
  },
  {
    id: 'russia',
    name: 'Russia',
    flag: '🇷🇺',
    color: '#0039A6',
    accent: '#FFFFFF',
    light: '#E8F0FE',
    desc: '124 govt scholarships yearly for Bangladeshis; tuition-free + low living costs [citation:7].',
    universities: [
      {
        name: 'Lomonosov Moscow State University',
        city: 'Moscow',
        qs: 87,
        fields: ['Physics', 'Mathematics', 'Medicine'],
        link: 'https://www.msu.ru',
        scholarship: 'Russian Government Scholarship (124 seats/year for Bangladeshis), MSU Fellowship, Open Doors Grant [citation:7]',
      },
      {
        name: 'Saint Petersburg State University',
        city: 'Saint Petersburg',
        qs: 270,
        fields: ['Law', 'Economics', 'International Relations'],
        link: 'https://spbu.ru',
        scholarship: 'Russian Government Scholarship, SPbU International Grant, Open Doors Olympiad',
      },
      {
        name: 'Novosibirsk State University',
        city: 'Novosibirsk, Siberia',
        qs: 317,
        fields: ['Physics', 'Biology', 'Computer Science'],
        link: 'https://www.nsu.ru',
        scholarship: 'Russian Government Scholarship, NSU International Grant, Siberian Branch Scholarship',
      },
      {
        name: 'Bauman Moscow State Technical University',
        city: 'Moscow',
        qs: 351,
        fields: ['Engineering', 'Robotics', 'Aerospace'],
        link: 'https://bmstu.ru',
        scholarship: 'Russian Government Scholarship, BMSTU International Grant, Technical Excellence Award',
      },
      {
        name: 'National Research University Higher School of Economics',
        city: 'Moscow / Saint Petersburg',
        qs: 342,
        fields: ['Economics', 'Business', 'Social Sciences'],
        link: 'https://www.hse.ru',
        scholarship: 'HSE International Scholarship, Russian Government Grant, Open Doors Olympiad',
      },
      {
        name: 'Moscow Institute of Physics and Technology (MIPT)',
        city: 'Dolgoprudny, Moscow Oblast',
        qs: 391,
        fields: ['Physics', 'Mathematics', 'Computer Science'],
        link: 'https://mipt.ru',
        scholarship: 'MIPT International Scholarship, Russian Government Grant, Open Doors Olympiad',
      },
      {
        name: 'Tomsk State University',
        city: 'Tomsk, Siberia',
        qs: 401,
        fields: ['Chemistry', 'Physics', 'Geology'],
        link: 'https://www.tsu.ru',
        scholarship: 'Russian Government Scholarship, TSU Global Grant, Siberian Scholarship',
      },
      {
        name: 'Kazan Federal University',
        city: 'Kazan, Tatarstan',
        qs: 451,
        fields: ['Medicine', 'Geology', 'Chemistry'],
        link: 'https://kpfu.ru',
        scholarship: 'Russian Government Scholarship, KFU International Grant, Tatarstan Government Grant',
      },
      {
        name: 'NUST MISIS (National University of Science and Technology)',
        city: 'Moscow',
        qs: 801,
        fields: ['Materials Science', 'Metallurgy', 'Engineering'],
        link: 'https://misis.ru',
        scholarship: 'Russian Government Scholarship, MISIS International Scholarship, Open Doors Grant [citation:7]',
      },
      {
        name: 'Peoples\' Friendship University of Russia (RUDN)',
        city: 'Moscow',
        qs: 601,
        fields: ['Medicine', 'International Relations', 'Law'],
        link: 'https://www.rudn.ru',
        scholarship: 'Russian Government Scholarship, RUDN International Grant, BRICS Scholarship',
      },
      {
        name: 'Ural Federal University',
        city: 'Yekaterinburg, Urals',
        qs: 801,
        fields: ['Engineering', 'Physics', 'Natural Sciences'],
        link: 'https://urfu.ru',
        scholarship: 'Russian Government Scholarship, UrFU International Grant, Ural Scholarship',
      },
      {
        name: 'Far Eastern Federal University',
        city: 'Vladivostok, Far East',
        qs: 801,
        fields: ['Marine Biology', 'International Relations', 'Engineering'],
        link: 'https://www.dvfu.ru',
        scholarship: 'Russian Government Scholarship, FEFU International Grant, Asia-Pacific Scholarship',
      },
      {
        name: 'ITMO University',
        city: 'Saint Petersburg',
        qs: 365,
        fields: ['Computer Science', 'Photonics', 'Information Technology'],
        link: 'https://itmo.ru',
        scholarship: 'ITMO International Scholarship, Russian Government Grant, Open Doors Olympiad',
      },
      {
        name: 'Sechenov University',
        city: 'Moscow',
        qs: 1001,
        fields: ['Medicine', 'Pharmacy', 'Public Health'],
        link: 'https://www.sechenov.ru',
        scholarship: 'Russian Government Scholarship, Sechenov International Grant, WHO Sponsorship',
      }
    ]
  },
    {
    id: 'croatia',
    name: 'Croatia',
    flag: '🇭🇷',
    color: '#005B9F',
    accent: '#FFFFFF',
    light: '#E8F0FE',
    desc: 'Affordable EU member with English-taught programs & growing scholarship options.',
    universities: [
      {
        name: 'University of Zagreb',
        city: 'Zagreb',
        qs: 751,
        fields: ['Medicine', 'Engineering', 'Computer Science'],
        link: 'https://www.unizg.hr',
        scholarship: 'Erasmus+ Grants, CEEPUS Scholarship, University-specific Excellence Awards',
      },
      {
        name: 'University of Split',
        city: 'Split, Dalmatia',
        qs: 1001,
        fields: ['Marine Biology', 'Engineering', 'Medicine'],
        link: 'https://www.unist.hr',
        scholarship: 'University of Split Scholarship, Erasmus+, Croatian Government Grant',
      },
      {
        name: 'University of Rijeka',
        city: 'Rijeka, Primorje-Gorski Kotar',
        qs: 1001,
        fields: ['Medicine', 'Cognitive Sciences', 'Engineering'],
        link: 'https://www.uniri.hr',
        scholarship: 'Scholarship for Excellence, Faculty Scholarship for Underrepresented Students, Erasmus+ [citation:7]',
      },
      {
        name: 'University of Osijek',
        city: 'Osijek, Slavonia',
        qs: 1201,
        fields: ['Agriculture', 'Medicine', 'Law'],
        link: 'https://www.unios.hr',
        scholarship: 'Erasmus+, CEEPUS Scholarship, Croatian Government Grant',
      },
      {
        name: 'University of Zadar',
        city: 'Zadar, Dalmatia',
        qs: 999,
        fields: ['Maritime Studies', 'Humanities', 'Tourism'],
        link: 'https://www.unizd.hr',
        scholarship: 'Erasmus+, University of Zadar Scholarship, Croatian Government Grant',
      },
      {
        name: 'University of Dubrovnik',
        city: 'Dubrovnik, Dalmatia',
        qs: 999,
        fields: ['Maritime Affairs', 'Economics', 'Computer Science'],
        link: 'https://www.unidu.hr',
        scholarship: 'Erasmus+, University Scholarship, Croatian Government Grant',
      },
      {
        name: 'University North',
        city: 'Koprivnica / Varaždin, Northern Croatia',
        qs: 999,
        fields: ['Engineering', 'Business', 'Computer Science'],
        link: 'https://www.unin.hr',
        scholarship: 'University North Scholarship, Erasmus+, CEEPUS',
      },
      {
        name: 'Libertas International University',
        city: 'Zagreb',
        qs: 999,
        fields: ['Business', 'International Relations', 'Tourism'],
        link: 'https://www.univ-libertas.hr',
        scholarship: 'Libertas Merit Scholarship, Erasmus+, Croatian Government Grant',
      },
      {
        name: 'Algebra University',
        city: 'Zagreb',
        qs: 999,
        fields: ['Computer Science', 'Design', 'Multimedia'],
        link: 'https://www.algebra.university',
        scholarship: 'Algebra International Scholarship, Erasmus+, Excellence Award',
      },
      {
        name: 'Zagreb School of Economics and Management',
        city: 'Zagreb',
        qs: 999,
        fields: ['Business', 'Economics', 'Management'],
        link: 'https://www.zsem.hr',
        scholarship: 'ZSEM International Scholarship, Merit-based Grant, Erasmus+',
      },
      {
        name: 'University of Pula',
        city: 'Pula, Istria',
        qs: 999,
        fields: ['Economics', 'Marine Sciences', 'Tourism'],
        link: 'https://www.unipu.hr',
        scholarship: 'Erasmus+, University Scholarship, Croatian Government Grant',
      },
      {
        name: 'Catholic University of Croatia',
        city: 'Zagreb',
        qs: 999,
        fields: ['Theology', 'Social Sciences', 'Psychology'],
        link: 'https://www.unicath.hr',
        scholarship: 'University Merit Scholarship, Erasmus+, Croatian Government Grant',
      }
    ]
  },
  {
    id: 'poland',
    name: 'Poland',
    flag: '🇵🇱',
    color: '#DC143C',
    accent: '#FFFFFF',
    light: '#FCE8EA',
    desc: 'NAWA & Banach full scholarships + affordable high-quality education.',
    universities: [
      {
        name: 'University of Warsaw',
        city: 'Warsaw, Masovia',
        qs: 262,
        fields: ['Political Science', 'Economics', 'Computer Science'],
        link: 'https://www.uw.edu.pl',
        scholarship: 'Banach NAWA Scholarship (PLN 1,800/month), Polish Government Scholarship, University Merit Grant [citation:3]',
      },
      {
        name: 'Jagiellonian University',
        city: 'Kraków, Lesser Poland',
        qs: 303,
        fields: ['Medicine', 'Law', 'Humanities'],
        link: 'https://www.uj.edu.pl',
        scholarship: 'Banach NAWA Scholarship, Rector\'s Scholarship for International Students, Erasmus+ [citation:3]',
      },
      {
        name: 'Warsaw University of Technology',
        city: 'Warsaw, Masovia',
        qs: 571,
        fields: ['Engineering', 'Computer Science', 'Architecture'],
        link: 'https://www.pw.edu.pl',
        scholarship: 'Banach NAWA Scholarship, Polish Government Scholarship, University Merit Grant [citation:3]',
      },
      {
        name: 'AGH University of Science and Technology',
        city: 'Kraków, Lesser Poland',
        qs: 801,
        fields: ['Engineering', 'Computer Science', 'Geology'],
        link: 'https://www.agh.edu.pl',
        scholarship: 'Banach NAWA Scholarship, AGH International Scholarship, Erasmus+ [citation:3]',
      },
      {
        name: 'Adam Mickiewicz University',
        city: 'Poznań, Greater Poland',
        qs: 801,
        fields: ['Biology', 'Chemistry', 'Education'],
        link: 'https://amu.edu.pl',
        scholarship: 'Banach NAWA Scholarship, AMU International Grant, Polish Government Grant [citation:3]',
      },
      {
        name: 'Wrocław University of Science and Technology',
        city: 'Wrocław, Lower Silesia',
        qs: 851,
        fields: ['Engineering', 'Computer Science', 'Chemistry'],
        link: 'https://pwr.edu.pl',
        scholarship: 'Banach NAWA Scholarship, NAWA Scholarship Holders Support, University Merit Grant [citation:3][citation:8]',
      },
      {
        name: 'Gdańsk University of Technology',
        city: 'Gdańsk, Pomerania',
        qs: 851,
        fields: ['Engineering', 'Computer Science', 'Architecture'],
        link: 'https://pg.edu.pl',
        scholarship: 'Banach NAWA Scholarship, Polish Government Scholarship, Erasmus+ [citation:3]',
      },
      {
        name: 'Nicolaus Copernicus University',
        city: 'Toruń, Kuyavia-Pomerania',
        qs: 901,
        fields: ['Medicine', 'Astronomy', 'Law'],
        link: 'https://www.umk.pl',
        scholarship: 'Banach NAWA Scholarship, NCU International Scholarship, Polish Government Grant [citation:3]',
      },
      {
        name: 'University of Łódź',
        city: 'Łódź, Łódź Voivodeship',
        qs: 951,
        fields: ['Economics', 'Business', 'Social Sciences'],
        link: 'https://www.uni.lodz.pl',
        scholarship: 'Banach NAWA Scholarship, University of Łódź International Scholarship, Erasmus+ [citation:3]',
      },
      {
        name: 'University of Silesia',
        city: 'Katowice, Silesia',
        qs: 1001,
        fields: ['Natural Sciences', 'Chemistry', 'Physics'],
        link: 'https://us.edu.pl',
        scholarship: 'Banach NAWA Scholarship, Rector\'s Scholarship, Polish Government Grant [citation:3]',
      },
      {
        name: 'Poznań University of Technology',
        city: 'Poznań, Greater Poland',
        qs: 1001,
        fields: ['Engineering', 'Computer Science', 'Architecture'],
        link: 'https://www.put.poznan.pl',
        scholarship: 'Banach NAWA Scholarship, PUT International Scholarship, Erasmus+ [citation:3]',
      },
      {
        name: 'Medical University of Warsaw',
        city: 'Warsaw, Masovia',
        qs: 999,
        fields: ['Medicine', 'Pharmacy', 'Public Health'],
        link: 'https://www.wum.edu.pl',
        scholarship: 'Banach NAWA Scholarship, MUW International Scholarship, Polish Government Grant [citation:3]',
      },
      {
        name: 'Vistula University',
        city: 'Warsaw, Masovia',
        qs: 999,
        fields: ['Business', 'Computer Science', 'International Relations'],
        link: 'https://www.vistula.edu.pl',
        scholarship: 'Vistula International Scholarship, Banach NAWA Scholarship, Merit-based Grant [citation:3]',
      },
      {
        name: 'University of Wrocław',
        city: 'Wrocław, Lower Silesia',
        qs: 1001,
        fields: ['Chemistry', 'Biology', 'Political Science'],
        link: 'https://uwr.edu.pl',
        scholarship: 'Banach NAWA Scholarship, UWr International Scholarship, Polish Government Grant [citation:3]',
      },
      {
        name: 'Cracow University of Technology',
        city: 'Kraków, Lesser Poland',
        qs: 1001,
        fields: ['Architecture', 'Engineering', 'Civil Engineering'],
        link: 'https://www.pk.edu.pl',
        scholarship: 'Banach NAWA Scholarship, CUT International Grant, Erasmus+ [citation:3]',
      }
    ]
  },
  {
    id: 'austria',
    name: 'Austria',
    flag: '🇦🇹',
    color: '#ED2939',
    accent: '#FFFFFF',
    light: '#FCE8EA',
    desc: 'Low tuition (€363/semester) + Erhard Busek & ADC scholarships.',
    universities: [
      {
        name: 'University of Vienna',
        city: 'Vienna',
        qs: 150,
        fields: ['Humanities', 'Natural Sciences', 'Law'],
        link: 'https://www.univie.ac.at',
        scholarship: 'Erhard Busek Grant (€1,300/month), Austrian Development Cooperation (ADC) Scholarship, Merit-based Grant [citation:9]',
      },
      {
        name: 'TU Wien (Vienna University of Technology)',
        city: 'Vienna',
        qs: 184,
        fields: ['Engineering', 'Computer Science', 'Physics'],
        link: 'https://www.tuwien.at',
        scholarship: 'Erhard Busek Grant, TU Wien Merit-based Scholarship (€750-€1,500), Supportive Scholarship [citation:4][citation:9]',
      },
      {
        name: 'University of Innsbruck',
        city: 'Innsbruck, Tyrol',
        qs: 308,
        fields: ['Physics', 'Medicine', 'Chemistry'],
        link: 'https://www.uibk.ac.at',
        scholarship: 'Erhard Busek Grant, ADC Scholarship, University Merit Grant [citation:9]',
      },
      {
        name: 'Graz University of Technology',
        city: 'Graz, Styria',
        qs: 401,
        fields: ['Engineering', 'Computer Science', 'Architecture'],
        link: 'https://www.tugraz.at',
        scholarship: 'Erhard Busek Grant, TU Graz International Scholarship, ADC Scholarship [citation:9]',
      },
      {
        name: 'University of Graz',
        city: 'Graz, Styria',
        qs: 501,
        fields: ['Social Sciences', 'Medicine', 'Environmental Sciences'],
        link: 'https://www.uni-graz.at',
        scholarship: 'Erhard Busek Grant, ADC Scholarship, University International Grant [citation:9]',
      },
      {
        name: 'Johannes Kepler University Linz',
        city: 'Linz, Upper Austria',
        qs: 601,
        fields: ['Business', 'Engineering', 'Computer Science'],
        link: 'https://www.jku.at',
        scholarship: 'Erhard Busek Grant, JKU International Scholarship, ADC Scholarship [citation:9]',
      },
      {
        name: 'University of Natural Resources and Life Sciences (BOKU)',
        city: 'Vienna',
        qs: 701,
        fields: ['Agriculture', 'Environmental Sciences', 'Natural Sciences'],
        link: 'https://boku.ac.at',
        scholarship: 'Erhard Busek Grant, BOKU International Scholarship, ADC Scholarship [citation:9]',
      },
      {
        name: 'Medical University of Vienna',
        city: 'Vienna',
        qs: 801,
        fields: ['Medicine', 'Dentistry', 'Public Health'],
        link: 'https://www.meduniwien.ac.at',
        scholarship: 'Erhard Busek Grant, MedUni Vienna Scholarship, ADC Scholarship [citation:9]',
      },
      {
        name: 'University of Salzburg',
        city: 'Salzburg',
        qs: 1001,
        fields: ['Law', 'Social Sciences', 'Biology'],
        link: 'https://www.plus.ac.at',
        scholarship: 'Erhard Busek Grant, Paris Lodron Scholarship, ADC Scholarship [citation:9]',
      },
      {
        name: 'Alpen-Adria-Universität Klagenfurt',
        city: 'Klagenfurt, Carinthia',
        qs: 1001,
        fields: ['Computer Science', 'Media Studies', 'Economics'],
        link: 'https://www.aau.at',
        scholarship: 'Erhard Busek Grant, AAU International Scholarship, ADC Scholarship [citation:9]',
      },
      {
        name: 'University of Leoben',
        city: 'Leoben, Styria',
        qs: 999,
        fields: ['Materials Science', 'Mining Engineering', 'Metallurgy'],
        link: 'https://www.unileoben.ac.at',
        scholarship: 'Erhard Busek Grant, Montanuniversität Scholarship, ADC Scholarship [citation:9]',
      },
      {
        name: 'Vienna University of Economics and Business (WU)',
        city: 'Vienna',
        qs: 801,
        fields: ['Business', 'Economics', 'Finance'],
        link: 'https://www.wu.ac.at',
        scholarship: 'Erhard Busek Grant, WU International Excellence Scholarship, ADC Scholarship [citation:9]',
      },
      {
        name: 'FH Campus Wien (University of Applied Sciences)',
        city: 'Vienna',
        qs: 999,
        fields: ['Health Sciences', 'Engineering', 'Social Sciences'],
        link: 'https://www.fh-campuswien.ac.at',
        scholarship: 'Erhard Busek Grant, FH Campus International Scholarship, ADC Scholarship [citation:9]',
      },
      {
        name: 'IMC University of Applied Sciences Krems',
        city: 'Krems, Lower Austria',
        qs: 999,
        fields: ['Business', 'Health Sciences', 'Information Technology'],
        link: 'https://www.imc.ac.at',
        scholarship: 'Erhard Busek Grant, IMC International Scholarship, ADC Scholarship [citation:9]',
      }
    ]
  },
    {
    id: 'luxembourg',
    name: 'Luxembourg',
    flag: '🇱🇺',
    color: '#00A1DE',
    accent: '#FFFFFF',
    light: '#E8F5FB',
    desc: 'Multilingual EU hub with free tuition & generous government scholarships.',
    universities: [
      {
        name: 'University of Luxembourg',
        city: 'Esch-sur-Alzette / Belval / Luxembourg City',
        qs: 721,
        fields: ['Computer Science', 'Law', 'Finance'],
        link: 'https://www.uni.lu',
        scholarship: 'Luxembourg Government Scholarship (€1,100-€2,400/year), Uni.lu Merit Grant, Erasmus+',
      },
      {
        name: 'Luxembourg School of Business',
        city: 'Luxembourg City',
        qs: 999,
        fields: ['Business', 'Management', 'Marketing'],
        link: 'https://www.luxsb.lu',
        scholarship: 'LSB International Scholarship (up to 50% tuition), Women in Leadership Grant, Early Bird Discount',
      },
      {
        name: 'Sacred Heart University Luxembourg',
        city: 'Luxembourg City',
        qs: 999,
        fields: ['Business', 'Computer Science', 'Psychology'],
        link: 'https://www.shu.lu',
        scholarship: 'SHU International Merit Scholarship, Need-based Grant, Academic Excellence Award',
      },
      {
        name: 'Miami University Dolibois European Center',
        city: 'Luxembourg City',
        qs: 999,
        fields: ['Political Science', 'History', 'International Relations'],
        link: 'https://miamioh.edu/global/mudec',
        scholarship: 'MUDEC Scholarship, Ohio Regents Grant, Miami International Award',
      },
      {
        name: 'European Institute of Public Administration',
        city: 'Luxembourg City',
        qs: 999,
        fields: ['Political Science', 'Law', 'Public Administration'],
        link: 'https://www.eipa.eu',
        scholarship: 'EIPA Scholarship for Developing Countries, Erasmus+ Grant',
      },
      {
        name: 'Luxembourg Institute of Science and Technology',
        city: 'Esch-sur-Alzette',
        qs: 999,
        fields: ['Environmental Sciences', 'Materials Science', 'Information Technology'],
        link: 'https://www.list.lu',
        scholarship: 'LIST Doctoral Scholarship (fully funded), Marie Skłodowska-Curie Grant',
      },
      {
        name: 'International University of Monaco Luxembourg Campus',
        city: 'Luxembourg City',
        qs: 999,
        fields: ['Business', 'Finance', 'Luxury Management'],
        link: 'https://www.monaco.edu',
        scholarship: 'IUM International Excellence Scholarship, Monaco Government Grant',
      }
    ]
  },
  {
    id: 'latvia',
    name: 'Latvia',
    flag: '🇱🇻',
    color: '#9E3039',
    accent: '#FFFFFF',
    light: '#FCE8EA',
    desc: 'Affordable EU nation with state scholarships & low living costs.',
    universities: [
      {
        name: 'University of Latvia',
        city: 'Riga, Vidzeme',
        qs: 751,
        fields: ['Medicine', 'Law', 'Computer Science'],
        link: 'https://www.lu.lv',
        scholarship: 'Latvian State Scholarship (€500/month), UL International Scholarship, Erasmus+',
      },
      {
        name: 'Riga Technical University',
        city: 'Riga, Vidzeme',
        qs: 751,
        fields: ['Engineering', 'Architecture', 'Computer Science'],
        link: 'https://www.rtu.lv',
        scholarship: 'Latvian State Scholarship, RTU International Grant, Erasmus+',
      },
      {
        name: 'Riga Stradiņš University',
        city: 'Riga, Vidzeme',
        qs: 1001,
        fields: ['Medicine', 'Public Health', 'Pharmacy'],
        link: 'https://www.rsu.lv',
        scholarship: 'Latvian State Scholarship, RSU International Scholarship, Erasmus+',
      },
      {
        name: 'Vidzeme University of Applied Sciences',
        city: 'Valmiera, Vidzeme',
        qs: 999,
        fields: ['Business', 'Communication', 'Information Technology'],
        link: 'https://www.va.lv',
        scholarship: 'Latvian State Scholarship, ViA International Grant, Erasmus+',
      },
      {
        name: 'Daugavpils University',
        city: 'Daugavpils, Latgale',
        qs: 999,
        fields: ['Education', 'Natural Sciences', 'Humanities'],
        link: 'https://www.du.lv',
        scholarship: 'Latvian State Scholarship, DU International Scholarship, Erasmus+',
      },
      {
        name: 'Liepāja University',
        city: 'Liepāja, Kurzeme',
        qs: 999,
        fields: ['Education', 'Music', 'Engineering'],
        link: 'https://www.liepu.lv',
        scholarship: 'Latvian State Scholarship, LiepU International Grant, Erasmus+',
      },
      {
        name: 'BA School of Business and Finance',
        city: 'Riga, Vidzeme',
        qs: 999,
        fields: ['Business', 'Finance', 'Economics'],
        link: 'https://www.ba.lv',
        scholarship: 'BA Merit Scholarship, Latvian State Grant, Erasmus+',
      },
      {
        name: 'Turība University',
        city: 'Riga, Vidzeme',
        qs: 999,
        fields: ['Business', 'Law', 'Tourism'],
        link: 'https://www.turiba.lv',
        scholarship: 'Turība International Scholarship, Latvian State Grant, Erasmus+',
      },
      {
        name: 'Ventspils University of Applied Sciences',
        city: 'Ventspils, Kurzeme',
        qs: 999,
        fields: ['Computer Science', 'Engineering', 'Business'],
        link: 'https://www.venta.lv',
        scholarship: 'Latvian State Scholarship, Ventspils International Grant, Erasmus+',
      },
      {
        name: 'Baltic International Academy',
        city: 'Riga, Vidzeme',
        qs: 999,
        fields: ['Business', 'Psychology', 'Law'],
        link: 'https://www.bsa.edu.lv',
        scholarship: 'BIA International Scholarship, Latvian State Grant, Erasmus+',
      },
      {
        name: 'ISMA University of Applied Sciences',
        city: 'Riga, Vidzeme',
        qs: 999,
        fields: ['Information Technology', 'Business', 'Engineering'],
        link: 'https://www.isma.lv',
        scholarship: 'ISMA International Merit Award, Latvian State Scholarship, Erasmus+',
      },
      {
        name: 'Rezekne Academy of Technologies',
        city: 'Rēzekne, Latgale',
        qs: 999,
        fields: ['Engineering', 'Education', 'Natural Sciences'],
        link: 'https://www.rta.lv',
        scholarship: 'Latvian State Scholarship, RTA International Grant, Erasmus+',
      }
    ]
  },
  {
    id: 'greece',
    name: 'Greece',
    flag: '🇬🇷',
    color: '#0D5EAF',
    accent: '#FFFFFF',
    light: '#E8F0FE',
    desc: 'Low-cost EU education with history & scholarships for int\'l students.',
    universities: [
      {
        name: 'National and Kapodistrian University of Athens',
        city: 'Athens, Attica',
        qs: 351,
        fields: ['Medicine', 'Law', 'Philosophy'],
        link: 'https://en.uoa.gr',
        scholarship: 'Greek Government Scholarship (IKY), Erasmus+, University Merit Grant',
      },
      {
        name: 'Aristotle University of Thessaloniki',
        city: 'Thessaloniki, Central Macedonia',
        qs: 451,
        fields: ['Engineering', 'Medicine', 'Agriculture'],
        link: 'https://www.auth.gr',
        scholarship: 'IKY Scholarship, Erasmus+, AUTH International Grant',
      },
      {
        name: 'National Technical University of Athens',
        city: 'Athens, Attica',
        qs: 451,
        fields: ['Engineering', 'Architecture', 'Mechanical Engineering'],
        link: 'https://www.ntua.gr',
        scholarship: 'IKY Scholarship, NTUA International Excellence Grant, Erasmus+',
      },
      {
        name: 'University of Crete',
        city: 'Rethymnon / Heraklion, Crete',
        qs: 501,
        fields: ['Medicine', 'Physics', 'Biology'],
        link: 'https://www.uoc.gr',
        scholarship: 'IKY Scholarship, University of Crete International Grant, Erasmus+',
      },
      {
        name: 'Athens University of Economics and Business',
        city: 'Athens, Attica',
        qs: 551,
        fields: ['Economics', 'Business', 'Statistics'],
        link: 'https://www.aueb.gr',
        scholarship: 'IKY Scholarship, AUEB International Excellence Award, Erasmus+',
      },
      {
        name: 'University of Patras',
        city: 'Patras, Western Greece',
        qs: 701,
        fields: ['Engineering', 'Medicine', 'Environmental Sciences'],
        link: 'https://www.upatras.gr',
        scholarship: 'IKY Scholarship, UPAT International Grant, Erasmus+',
      },
      {
        name: 'University of Ioannina',
        city: 'Ioannina, Epirus',
        qs: 851,
        fields: ['Medicine', 'Natural Sciences', 'Chemistry'],
        link: 'https://www.uoi.gr',
        scholarship: 'IKY Scholarship, UOI International Scholarship, Erasmus+',
      },
      {
        name: 'University of Thessaly',
        city: 'Volos / Larissa, Thessaly',
        qs: 851,
        fields: ['Veterinary', 'Engineering', 'Agriculture'],
        link: 'https://www.uth.gr',
        scholarship: 'IKY Scholarship, UTH International Grant, Erasmus+',
      },
      {
        name: 'University of the Aegean',
        city: 'Mytilene / Rhodes / Chios, Aegean Islands',
        qs: 1001,
        fields: ['Marine Sciences', 'Geography', 'Cultural Studies'],
        link: 'https://www.aegean.gr',
        scholarship: 'IKY Scholarship, Aegean International Grant, Erasmus+',
      },
      {
        name: 'University of Peloponnese',
        city: 'Tripoli / Corinth / Kalamata, Peloponnese',
        qs: 1001,
        fields: ['Political Science', 'Sports Science', 'History'],
        link: 'https://www.uop.gr',
        scholarship: 'IKY Scholarship, UOP International Scholarship, Erasmus+',
      },
      {
        name: 'Hellenic Open University',
        city: 'Patras, Western Greece',
        qs: 999,
        fields: ['Humanities', 'Business', 'Education'],
        link: 'https://www.eap.gr',
        scholarship: 'IKY Distance Learning Scholarship, Erasmus+, HOU Grant',
      },
      {
        name: 'International Hellenic University',
        city: 'Thessaloniki, Central Macedonia',
        qs: 1001,
        fields: ['Business', 'Engineering', 'Economics'],
        link: 'https://www.ihu.gr',
        scholarship: 'IKY Scholarship, IHU International Excellence Award, Erasmus+',
      },
      {
        name: 'University of West Attica',
        city: 'Athens, Attica',
        qs: 999,
        fields: ['Engineering', 'Public Health', 'Social Sciences'],
        link: 'https://www.uniwa.gr',
        scholarship: 'IKY Scholarship, UniWA International Grant, Erasmus+',
      },
      {
        name: 'University of Macedonia',
        city: 'Thessaloniki, Central Macedonia',
        qs: 1001,
        fields: ['Economics', 'Business', 'International Relations'],
        link: 'https://www.uom.edu.gr',
        scholarship: 'IKY Scholarship, UOM International Scholarship, Erasmus+',
      }
    ]
  },
  {
    id: 'czech_republic',
    name: 'Czech Republic',
    flag: '🇨🇿',
    color: '#11457E',
    accent: '#D7141A',
    light: '#E8F0FE',
    desc: 'Low tuition & government scholarships for Bangladeshi students.',
    universities: [
      {
        name: 'Charles University',
        city: 'Prague, Bohemia',
        qs: 248,
        fields: ['Medicine', 'Law', 'Humanities'],
        link: 'https://cuni.cz',
        scholarship: 'Czech Government Scholarship (MŠMT), Charles University Grant, Erasmus+',
      },
      {
        name: 'Czech Technical University in Prague',
        city: 'Prague, Bohemia',
        qs: 421,
        fields: ['Engineering', 'Computer Science', 'Architecture'],
        link: 'https://www.cvut.cz',
        scholarship: 'Czech Government Scholarship, CTU International Grant, Erasmus+',
      },
      {
        name: 'Masaryk University',
        city: 'Brno, Moravia',
        qs: 451,
        fields: ['Medicine', 'Social Sciences', 'Natural Sciences'],
        link: 'https://www.muni.cz',
        scholarship: 'Czech Government Scholarship, MUNI International Scholarship, Erasmus+',
      },
      {
        name: 'Palacký University Olomouc',
        city: 'Olomouc, Moravia',
        qs: 601,
        fields: ['Medicine', 'Education', 'Theology'],
        link: 'https://www.upol.cz',
        scholarship: 'Czech Government Scholarship, UP International Grant, Erasmus+',
      },
      {
        name: 'University of Chemistry and Technology, Prague',
        city: 'Prague, Bohemia',
        qs: 801,
        fields: ['Chemistry', 'Chemical Engineering', 'Food Science'],
        link: 'https://www.vscht.cz',
        scholarship: 'Czech Government Scholarship, VSCHT International Grant, Erasmus+',
      },
      {
        name: 'University of Pardubice',
        city: 'Pardubice, Bohemia',
        qs: 1001,
        fields: ['Chemistry', 'Engineering', 'Economics'],
        link: 'https://www.upce.cz',
        scholarship: 'Czech Government Scholarship, UPCE International Grant, Erasmus+',
      },
      {
        name: 'Technical University of Liberec',
        city: 'Liberec, Bohemia',
        qs: 1001,
        fields: ['Engineering', 'Textile Science', 'Nanotechnology'],
        link: 'https://www.tul.cz',
        scholarship: 'Czech Government Scholarship, TUL International Grant, Erasmus+',
      },
      {
        name: 'University of West Bohemia',
        city: 'Plzeň, Bohemia',
        qs: 1001,
        fields: ['Engineering', 'Computer Science', 'Design'],
        link: 'https://www.zcu.cz',
        scholarship: 'Czech Government Scholarship, ZCU International Scholarship, Erasmus+',
      },
      {
        name: 'University of Ostrava',
        city: 'Ostrava, Moravia',
        qs: 1001,
        fields: ['Medicine', 'Education', 'Social Sciences'],
        link: 'https://www.osu.cz',
        scholarship: 'Czech Government Scholarship, OSU International Grant, Erasmus+',
      },
      {
        name: 'Brno University of Technology',
        city: 'Brno, Moravia',
        qs: 851,
        fields: ['Engineering', 'Architecture', 'Information Technology'],
        link: 'https://www.vutbr.cz',
        scholarship: 'Czech Government Scholarship, BUT International Grant, Erasmus+',
      },
      {
        name: 'University of South Bohemia',
        city: 'České Budějovice, Bohemia',
        qs: 1001,
        fields: ['Biology', 'Fisheries', 'Agriculture'],
        link: 'https://www.jcu.cz',
        scholarship: 'Czech Government Scholarship, USB International Grant, Erasmus+',
      },
      {
        name: 'Mendel University in Brno',
        city: 'Brno, Moravia',
        qs: 1001,
        fields: ['Agriculture', 'Forestry', 'Landscape Architecture'],
        link: 'https://mendelu.cz',
        scholarship: 'Czech Government Scholarship, MENDELU International Grant, Erasmus+',
      },
      {
        name: 'University of Hradec Králové',
        city: 'Hradec Králové, Bohemia',
        qs: 999,
        fields: ['Education', 'Computer Science', 'Medicine'],
        link: 'https://www.uhk.cz',
        scholarship: 'Czech Government Scholarship, UHK International Grant, Erasmus+',
      },
      {
        name: 'Jan Evangelista Purkyně University',
        city: 'Ústí nad Labem, Bohemia',
        qs: 999,
        fields: ['Education', 'Social Sciences', 'Environmental Sciences'],
        link: 'https://www.ujep.cz',
        scholarship: 'Czech Government Scholarship, UJEP International Grant, Erasmus+',
      },
      {
        name: 'Silesian University in Opava',
        city: 'Opava / Karviná, Silesia',
        qs: 999,
        fields: ['Business', 'Computer Science', 'Mathematics'],
        link: 'https://www.slu.cz',
        scholarship: 'Czech Government Scholarship, SU International Grant, Erasmus+',
      }
    ]
  },
    {
    id: 'cyprus',
    name: 'Cyprus',
    flag: '🇨🇾',
    color: '#D5A021',
    accent: '#005A3C',
    light: '#FDF5E6',
    desc: 'English-speaking EU island with low tuition & generous merit scholarships.',
    universities: [
      {
        name: 'University of Cyprus',
        city: 'Nicosia, Nicosia District',
        qs: 451,
        fields: ['Computer Science', 'Medicine', 'Economics'],
        link: 'https://www.ucy.ac.cy',
        scholarship: 'UCY International Scholarship, Cypriot Government Grant, Erasmus+',
      },
      {
        name: 'University of Nicosia',
        city: 'Nicosia, Nicosia District',
        qs: 1001,
        fields: ['Medicine', 'Business', 'Computer Science'],
        link: 'https://www.unic.ac.cy',
        scholarship: 'UNIC International Scholarship (up to 50% tuition), Greek Diaspora Grant, Erasmus+',
      },
      {
        name: 'Cyprus University of Technology',
        city: 'Limassol, Limassol District',
        qs: 801,
        fields: ['Engineering', 'Environmental Sciences', 'Geomatics'],
        link: 'https://www.cut.ac.cy',
        scholarship: 'CUT International Excellence Scholarship, Cypriot Government Grant, Erasmus+',
      },
      {
        name: 'European University Cyprus',
        city: 'Nicosia, Nicosia District',
        qs: 999,
        fields: ['Medicine', 'Dentistry', 'Business'],
        link: 'https://euc.ac.cy',
        scholarship: 'EUC International Merit Award (20-50% tuition), EUC Excellence Scholarship, Erasmus+',
      },
      {
        name: 'Frederick University',
        city: 'Nicosia / Limassol, Nicosia District',
        qs: 999,
        fields: ['Engineering', 'Architecture', 'Maritime Studies'],
        link: 'https://www.frederick.ac.cy',
        scholarship: 'Frederick International Scholarship, Merit-based Grant (up to 40% tuition), Erasmus+',
      },
      {
        name: 'Neapolis University Pafos',
        city: 'Paphos, Paphos District',
        qs: 999,
        fields: ['Law', 'Business', 'Psychology'],
        link: 'https://www.nup.ac.cy',
        scholarship: 'Neapolis International Scholarship, Academic Excellence Award, Erasmus+',
      },
      {
        name: 'Open University of Cyprus',
        city: 'Nicosia, Nicosia District',
        qs: 999,
        fields: ['Business', 'Humanities', 'Computer Science'],
        link: 'https://www.ouc.ac.cy',
        scholarship: 'OUC Distance Learning Grant, Cypriot Government Scholarship, Erasmus+',
      },
      {
        name: 'American University of Cyprus',
        city: 'Larnaca, Larnaca District',
        qs: 999,
        fields: ['Business', 'Computer Science', 'International Relations'],
        link: 'https://www.auc.ac.cy',
        scholarship: 'AUC International Excellence Award, Merit-based Scholarship, Early Bird Discount',
      },
      {
        name: 'Cyprus West University',
        city: 'Paphos, Paphos District',
        qs: 999,
        fields: ['Engineering', 'Business', 'Health Sciences'],
        link: 'https://www.cwu.ac.cy',
        scholarship: 'CWU International Grant, Merit Scholarship, Erasmus+',
      },
      {
        name: 'UCLan Cyprus',
        city: 'Larnaca, Larnaca District',
        qs: 999,
        fields: ['Law', 'Business', 'Computer Science'],
        link: 'https://www.uclancyprus.ac.cy',
        scholarship: 'UCLan Cyprus International Scholarship (up to 50%), Vice-Chancellor\'s Award, Erasmus+',
      },
      {
        name: 'The Cyprus Institute',
        city: 'Nicosia, Nicosia District',
        qs: 999,
        fields: ['Environmental Sciences', 'Computational Sciences', 'Archaeology'],
        link: 'https://www.cyi.ac.cy',
        scholarship: 'CyI Graduate Fellowship (fully funded), Marie Skłodowska-Curie Grant, Erasmus+',
      },
      {
        name: 'LEDA University',
        city: 'Larnaca, Larnaca District',
        qs: 999,
        fields: ['Business', 'Tourism', 'Hospitality'],
        link: 'https://www.leda.ac.cy',
        scholarship: 'LEDA International Scholarship, Hospitality Excellence Grant, Erasmus+',
      },
      {
        name: 'Saint George\'s University of London at University of Nicosia',
        city: 'Nicosia, Nicosia District',
        qs: 999,
        fields: ['Medicine', 'Public Health', 'Biomedical Sciences'],
        link: 'https://www.sgul.ac.uk',
        scholarship: 'SGUL-UNIC Medical Scholarship, International Student Grant, Erasmus+',
      }
    ]
  },
  {
    id: 'croatia',
    name: 'Croatia',
    flag: '🇭🇷',
    color: '#005B9F',
    accent: '#FFFFFF',
    light: '#E8F0FE',
    desc: 'Affordable EU member with English-taught programs & growing scholarship options.',
    universities: [
      {
        name: 'University of Zagreb',
        city: 'Zagreb',
        qs: 751,
        fields: ['Medicine', 'Engineering', 'Computer Science'],
        link: 'https://www.unizg.hr',
        scholarship: 'Erasmus+ Grants, CEEPUS Scholarship, University-specific Excellence Awards',
      },
      {
        name: 'University of Split',
        city: 'Split, Dalmatia',
        qs: 1001,
        fields: ['Marine Biology', 'Engineering', 'Medicine'],
        link: 'https://www.unist.hr',
        scholarship: 'University of Split Scholarship, Erasmus+, Croatian Government Grant',
      },
      {
        name: 'University of Rijeka',
        city: 'Rijeka, Primorje-Gorski Kotar',
        qs: 1001,
        fields: ['Medicine', 'Cognitive Sciences', 'Engineering'],
        link: 'https://www.uniri.hr',
        scholarship: 'Scholarship for Excellence, Faculty Scholarship for Underrepresented Students, Erasmus+',
      },
      {
        name: 'University of Osijek',
        city: 'Osijek, Slavonia',
        qs: 1201,
        fields: ['Agriculture', 'Medicine', 'Law'],
        link: 'https://www.unios.hr',
        scholarship: 'Erasmus+, CEEPUS Scholarship, Croatian Government Grant',
      },
      {
        name: 'University of Zadar',
        city: 'Zadar, Dalmatia',
        qs: 999,
        fields: ['Maritime Studies', 'Humanities', 'Tourism'],
        link: 'https://www.unizd.hr',
        scholarship: 'Erasmus+, University of Zadar Scholarship, Croatian Government Grant',
      },
      {
        name: 'University of Dubrovnik',
        city: 'Dubrovnik, Dalmatia',
        qs: 999,
        fields: ['Maritime Affairs', 'Economics', 'Computer Science'],
        link: 'https://www.unidu.hr',
        scholarship: 'Erasmus+, University Scholarship, Croatian Government Grant',
      },
      {
        name: 'University North',
        city: 'Koprivnica / Varaždin, Northern Croatia',
        qs: 999,
        fields: ['Engineering', 'Business', 'Computer Science'],
        link: 'https://www.unin.hr',
        scholarship: 'University North Scholarship, Erasmus+, CEEPUS',
      },
      {
        name: 'Libertas International University',
        city: 'Zagreb',
        qs: 999,
        fields: ['Business', 'International Relations', 'Tourism'],
        link: 'https://www.univ-libertas.hr',
        scholarship: 'Libertas Merit Scholarship, Erasmus+, Croatian Government Grant',
      },
      {
        name: 'Algebra University',
        city: 'Zagreb',
        qs: 999,
        fields: ['Computer Science', 'Design', 'Multimedia'],
        link: 'https://www.algebra.university',
        scholarship: 'Algebra International Scholarship, Erasmus+, Excellence Award',
      },
      {
        name: 'Zagreb School of Economics and Management',
        city: 'Zagreb',
        qs: 999,
        fields: ['Business', 'Economics', 'Management'],
        link: 'https://www.zsem.hr',
        scholarship: 'ZSEM International Scholarship, Merit-based Grant, Erasmus+',
      },
      {
        name: 'University of Pula',
        city: 'Pula, Istria',
        qs: 999,
        fields: ['Economics', 'Marine Sciences', 'Tourism'],
        link: 'https://www.unipu.hr',
        scholarship: 'Erasmus+, University Scholarship, Croatian Government Grant',
      },
      {
        name: 'Catholic University of Croatia',
        city: 'Zagreb',
        qs: 999,
        fields: ['Theology', 'Social Sciences', 'Psychology'],
        link: 'https://www.unicath.hr',
        scholarship: 'University Merit Scholarship, Erasmus+, Croatian Government Grant',
      },
      {
        name: 'Rochester Institute of Technology Croatia',
        city: 'Zagreb',
        qs: 999,
        fields: ['Engineering', 'Computer Science', 'Business'],
        link: 'https://www.rit.edu/croatia',
        scholarship: 'RIT Croatia Merit Scholarship, International Student Grant, RIT Global Scholarship',
      }
    ]
  },
  {
    id: 'bulgaria',
    name: 'Bulgaria',
    flag: '🇧🇬',
    color: '#00966E',
    accent: '#D62612',
    light: '#E8F5E9',
    desc: 'Low-cost EU education with government scholarships & English medical programs.',
    universities: [
      {
        name: 'Sofia University "St. Kliment Ohridski"',
        city: 'Sofia, Sofia City Province',
        qs: 801,
        fields: ['Medicine', 'Law', 'Computer Science'],
        link: 'https://www.uni-sofia.bg',
        scholarship: 'Bulgarian Government Scholarship, Erasmus+, Sofia University Merit Grant',
      },
      {
        name: 'Medical University of Sofia',
        city: 'Sofia, Sofia City Province',
        qs: 999,
        fields: ['Medicine', 'Dentistry', 'Pharmacy'],
        link: 'https://www.mu-sofia.bg',
        scholarship: 'Bulgarian Government Scholarship, MU Sofia International Grant, Erasmus+',
      },
      {
        name: 'Plovdiv University "Paisii Hilendarski"',
        city: 'Plovdiv, Plovdiv Province',
        qs: 1001,
        fields: ['Biology', 'Chemistry', 'Economics'],
        link: 'https://www.uni-plovdiv.bg',
        scholarship: 'Bulgarian Government Scholarship, PU International Grant, Erasmus+',
      },
      {
        name: 'Technical University of Sofia',
        city: 'Sofia, Sofia City Province',
        qs: 1001,
        fields: ['Engineering', 'Computer Science', 'Electrical Engineering'],
        link: 'https://www.tu-sofia.bg',
        scholarship: 'Bulgarian Government Scholarship, TU Sofia Merit Award, Erasmus+',
      },
      {
        name: 'Medical University of Plovdiv',
        city: 'Plovdiv, Plovdiv Province',
        qs: 999,
        fields: ['Medicine', 'Dentistry', 'Public Health'],
        link: 'https://www.mu-plovdiv.bg',
        scholarship: 'MUP International Scholarship, Bulgarian Government Grant, Erasmus+',
      },
      {
        name: 'University of National and World Economy (UNWE)',
        city: 'Sofia, Sofia City Province',
        qs: 1001,
        fields: ['Economics', 'Business', 'Finance'],
        link: 'https://www.unwe.bg',
        scholarship: 'UNWE International Scholarship, Bulgarian Government Grant, Erasmus+',
      },
      {
        name: 'Medical University of Varna',
        city: 'Varna, Varna Province',
        qs: 999,
        fields: ['Medicine', 'Dentistry', 'Maritime Medicine'],
        link: 'https://www.mu-varna.bg',
        scholarship: 'MU Varna International Excellence Award, Bulgarian Government Scholarship, Erasmus+',
      },
      {
        name: 'University of Chemical Technology and Metallurgy (UCTM)',
        city: 'Sofia, Sofia City Province',
        qs: 999,
        fields: ['Chemical Engineering', 'Metallurgy', 'Materials Science'],
        link: 'https://www.uctm.edu',
        scholarship: 'UCTM International Scholarship, Bulgarian Government Grant, Erasmus+',
      },
      {
        name: 'University of Architecture, Civil Engineering and Geodesy (UACEG)',
        city: 'Sofia, Sofia City Province',
        qs: 999,
        fields: ['Architecture', 'Civil Engineering', 'Geodesy'],
        link: 'https://www.uacg.bg',
        scholarship: 'UACEG International Merit Scholarship, Bulgarian Government Grant, Erasmus+',
      },
      {
        name: 'Trakia University',
        city: 'Stara Zagora, Stara Zagora Province',
        qs: 999,
        fields: ['Veterinary', 'Agriculture', 'Medicine'],
        link: 'https://www.uni-sz.bg',
        scholarship: 'Trakia University International Scholarship, Bulgarian Government Grant, Erasmus+',
      },
      {
        name: 'University of Food Technologies (UFT)',
        city: 'Plovdiv, Plovdiv Province',
        qs: 999,
        fields: ['Food Science', 'Biotechnology', 'Agriculture'],
        link: 'https://www.uft-plovdiv.bg',
        scholarship: 'UFT International Scholarship, Bulgarian Government Grant, Erasmus+',
      },
      {
        name: 'South-West University "Neofit Rilski"',
        city: 'Blagoevgrad, Blagoevgrad Province',
        qs: 999,
        fields: ['Law', 'Education', 'Computer Science'],
        link: 'https://www.swu.bg',
        scholarship: 'SWU International Merit Award, Bulgarian Government Scholarship, Erasmus+',
      },
      {
        name: 'Varna University of Management',
        city: 'Varna, Varna Province',
        qs: 999,
        fields: ['Business', 'Tourism', 'Hospitality'],
        link: 'https://www.vum.bg',
        scholarship: 'VUM International Scholarship (up to 50% tuition), Merit-based Grant, Erasmus+',
      },
      {
        name: 'American University in Bulgaria',
        city: 'Blagoevgrad, Blagoevgrad Province',
        qs: 999,
        fields: ['Business', 'Political Science', 'Computer Science'],
        link: 'https://www.aubg.edu',
        scholarship: 'AUBG Global Scholarship (need-based, up to full tuition), Presidential Scholarship, Erasmus+',
      }
    ]
  }

]

// ── Featured (10 countries shown as big cards) ──
const FEATURED_IDS = ['usa', 'uk', 'canada', 'australia', 'germany', 'japan', 'south_korea', 'italy', 'denmark', 'new_zealand']
const FEATURED = COUNTRIES.filter(c => FEATURED_IDS.includes(c.id))
  .sort((a,b) => FEATURED_IDS.indexOf(a.id) - FEATURED_IDS.indexOf(b.id))
const MORE = COUNTRIES.filter(c => !FEATURED_IDS.includes(c.id))
  .sort((a,b) => a.name.localeCompare(b.name))

export default function UniversitiesPage() {
  const [active, setActive]           = useState(null)
  const [moreVal, setMoreVal]         = useState('')
  const [search, setSearch]           = useState('')
  const [fieldFilter, setFieldFilter] = useState('')
  const [animKey, setAnimKey]         = useState(0)
  const listRef = useRef(null)

  const totalUniversities = COUNTRIES.reduce((a, c) => a + c.universities.length, 0)
  const country = active ? COUNTRIES.find(c => c.id === active) : null

  const filtered = country ? country.universities.filter(u => {
    const q = search.toLowerCase()
    const ms = !search || u.name.toLowerCase().includes(q) ||
               u.city.toLowerCase().includes(q) ||
               u.scholarship.toLowerCase().includes(q)
    const mf = !fieldFilter ||
               u.fields.some(f => f.toLowerCase().includes(fieldFilter.toLowerCase()))
    return ms && mf
  }) : []

  const allFields = country
    ? [...new Set(country.universities.flatMap(u => u.fields))].sort()
    : []

  function pick(id) {
    setActive(id)
    setMoreVal('')
    setSearch('')
    setFieldFilter('')
    setAnimKey(k => k + 1)
    setTimeout(() => listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
  }

  return (
    <div className="min-h-screen" style={{ background: '#f7f8fc' }}>

      {/* ── HERO ── */}
      <div style={{
        background: 'linear-gradient(135deg, #0f2444 0%, #1a3a6b 60%, #0f2444 100%)',
        paddingTop: '64px', paddingBottom: '64px', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position:'absolute', top:-60, right:-60, width:300, height:300, border:'1px solid rgba(255,255,255,.07)', borderRadius:'50%' }} />
        <div style={{ position:'absolute', bottom:-80, left:-40, width:240, height:240, border:'1px solid rgba(255,255,255,.05)', borderRadius:'50%' }} />

        <div className="container" style={{ position:'relative', zIndex:1 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
            <div style={{ width:4, height:32, background:'#22c55e', borderRadius:4 }} />
            <span style={{ fontSize:13, fontWeight:700, color:'rgba(255,255,255,.5)', textTransform:'uppercase', letterSpacing:'.1em' }}>
              Global Universities
            </span>
          </div>
          <h1 style={{ fontSize:'clamp(28px,5vw,48px)', fontWeight:900, color:'#fff', lineHeight:1.1, marginBottom:14, maxWidth:640 }}>
            Find Your Dream University
          </h1>
          <p style={{ fontSize:15, color:'rgba(255,255,255,.6)', maxWidth:520, lineHeight:1.7 }}>
            {COUNTRIES.length} countries · {totalUniversities}+ universities — official links, scholarships &amp; key programs for Bangladeshi students.
          </p>
        </div>
      </div>

      {/* ── FEATURED COUNTRY CARDS ── */}
      <div className="container" style={{ padding:'0 16px' }}>
        {/* Cards float up over hero */}
        <div style={{ marginTop:-36, position:'relative', zIndex:10 }}>
          <div style={{
            display:'grid',
            gridTemplateColumns:'repeat(auto-fill, minmax(min(100%, 150px), 1fr))',
            gap:12,
          }}>
            {FEATURED.map(c => {
              const isOn = active === c.id
              return (
                <button
                  key={c.id}
                  onClick={() => pick(c.id)}
                  style={{
                    background: isOn
                      ? `linear-gradient(145deg, ${c.color}, ${c.accent || c.color}bb)`
                      : '#fff',
                    border: isOn ? '2px solid transparent' : '1.5px solid #e2e8f0',
                    borderRadius:18, padding:'20px 12px 16px',
                    cursor:'pointer', textAlign:'center',
                    transition:'all .22s cubic-bezier(.16,1,.3,1)',
                    transform: isOn ? 'translateY(-6px)' : 'translateY(0)',
                    boxShadow: isOn
                      ? `0 20px 48px ${c.color}45`
                      : '0 2px 12px rgba(0,0,0,.07)',
                    position:'relative', overflow:'hidden',
                  }}
                  onMouseEnter={e => {
                    if (!isOn) {
                      e.currentTarget.style.transform = 'translateY(-4px)'
                      e.currentTarget.style.boxShadow = `0 12px 32px rgba(0,0,0,.12)`
                      e.currentTarget.style.borderColor = c.color + '55'
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isOn) {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,.07)'
                      e.currentTarget.style.borderColor = '#e2e8f0'
                    }
                  }}
                >
                  {isOn && (
                    <div style={{
                      position:'absolute', inset:0,
                      backgroundImage:'radial-gradient(circle at 80% 10%, rgba(255,255,255,.18) 0%, transparent 60%)'
                    }} />
                  )}
                  <div style={{ fontSize:40, marginBottom:10, lineHeight:1, position:'relative', zIndex:1 }}>
                    {c.flag}
                  </div>
                  <div style={{
                    fontSize:12, fontWeight:800, lineHeight:1.3,
                    color: isOn ? '#fff' : '#0f172a',
                    position:'relative', zIndex:1,
                  }}>{c.name}</div>
                  <div style={{
                    marginTop:8, fontSize:10, fontWeight:700,
                    display:'inline-block', padding:'3px 10px', borderRadius:20,
                    background: isOn ? 'rgba(255,255,255,.22)' : '#f1f5f9',
                    color: isOn ? '#fff' : '#64748b',
                    position:'relative', zIndex:1,
                  }}>
                    {c.universities.length} unis
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* ── MORE COUNTRIES BAR ── */}
        {MORE.length > 0 && (
          <div style={{
            marginTop:16, background:'#fff',
            border:'1.5px solid #e2e8f0', borderRadius:16,
            padding:'16px 20px',
            display:'flex', alignItems:'center', gap:14, flexWrap:'wrap',
          }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, flexShrink:0 }}>
              <span style={{ fontSize:20 }}>🌍</span>
              <div>
                <div style={{ fontSize:13, fontWeight:800, color:'#0f172a' }}>More Countries</div>
                <div style={{ fontSize:10, color:'#94a3b8' }}>{MORE.length} more available</div>
              </div>
            </div>
            <select
              value={moreVal}
              onChange={e => { setMoreVal(e.target.value); if(e.target.value) pick(e.target.value) }}
              style={{
                flex:1, minWidth:200, padding:'10px 14px',
                border:'1.5px solid #e2e8f0', borderRadius:10,
                fontSize:13, fontWeight:600, outline:'none',
                background: '#f8faff', cursor:'pointer', color:'#0f172a',
              }}
            >
              <option value="">— Select a country —</option>
              {MORE.map(c => (
                <option key={c.id} value={c.id}>
                  {c.flag}  {c.name}  ({c.universities.length} universities)
                </option>
              ))}
            </select>
            {/* Quick pills for first few extra countries */}
            <div style={{ display:'flex', flexWrap:'wrap', gap:6, flexShrink:0 }}>
              {MORE.slice(0, 6).map(c => (
                <button
                  key={c.id}
                  onClick={() => pick(c.id)}
                  style={{
                    fontSize:12, padding:'6px 12px', borderRadius:20,
                    border: active===c.id ? 'none' : '1px solid #e2e8f0',
                    background: active===c.id ? c.color : '#f8faff',
                    color: active===c.id ? '#fff' : '#475569',
                    fontWeight:700, cursor:'pointer', transition:'all .15s',
                    display:'flex', alignItems:'center', gap:5,
                  }}
                >
                  <span style={{ fontSize:16 }}>{c.flag}</span>
                  {c.name}
                </button>
              ))}
              {MORE.length > 6 && (
                <span style={{ fontSize:11, color:'#94a3b8', alignSelf:'center', fontWeight:600 }}>
                  +{MORE.length - 6} more in dropdown ↑
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ── UNIVERSITY LIST ── */}
      <div ref={listRef} style={{ scrollMarginTop: 80 }}>
        {!country ? (
          /* Empty state — nothing selected yet */
          <div className="container" style={{ textAlign:'center', padding:'64px 16px 48px' }}>
            <div style={{ fontSize:64, marginBottom:18 }}>🌍</div>
            <div style={{ fontSize:22, fontWeight:900, color:'#0f172a', marginBottom:8 }}>
              Select a country to get started
            </div>
            <div style={{ fontSize:14, color:'#94a3b8', maxWidth:340, margin:'0 auto' }}>
              Click any featured country card above, or choose from the dropdown to browse universities
            </div>
          </div>
        ) : (
          <>
            {/* Country band */}
            <div style={{
              background: country.light || '#f8faff',
              borderBottom: `3px solid ${country.color}`,
              padding:'16px 0', marginTop:16,
            }}>
              <div className="container" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
                <div style={{ display:'flex', alignItems:'center', gap:14 }}>
                  <span style={{ fontSize:40 }}>{country.flag}</span>
                  <div>
                    <div style={{ fontSize:20, fontWeight:900, color: country.color }}>{country.name}</div>
                    <div style={{ fontSize:13, color:'#64748b', marginTop:2 }}>{country.desc}</div>
                  </div>
                </div>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  <input
                    placeholder="Search universities..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{
                      padding:'9px 14px', border:'1.5px solid #e2e8f0', borderRadius:10,
                      fontSize:13, outline:'none', minWidth:200, background:'#fff'
                    }}
                  />
                  <select
                    value={fieldFilter}
                    onChange={e => setFieldFilter(e.target.value)}
                    style={{
                      padding:'9px 14px', border:'1.5px solid #e2e8f0', borderRadius:10,
                      fontSize:13, outline:'none', background:'#fff', cursor:'pointer'
                    }}
                  >
                    <option value="">All Fields</option>
                    {allFields.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Grid */}
            <div className="container" style={{ padding:'28px 16px 32px' }}>
              <div style={{ marginBottom:16, fontSize:13, color:'#94a3b8', fontWeight:600 }}>
                {filtered.length} universities in {country.name}
                {(search || fieldFilter) && (
                  <button
                    onClick={() => { setSearch(''); setFieldFilter('') }}
                    style={{ marginLeft:10, color:'#3b82f6', background:'none', border:'none', cursor:'pointer', fontSize:12, fontWeight:700 }}
                  >
                    Clear filters ×
                  </button>
                )}
              </div>

              <div key={animKey} style={{
                display:'grid',
                gridTemplateColumns:'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
                gap:16
              }}>
                {filtered.map((u, i) => (
                  <div
                    key={u.name}
                    style={{
                      background:'#fff', borderRadius:16,
                      border:'1px solid #e2e8f0', padding:'20px',
                      transition:'all .2s', position:'relative', overflow:'hidden',
                      animation:`fadeUp .4s ease ${i * 0.04}s both`,
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform='translateY(-3px)'
                      e.currentTarget.style.boxShadow=`0 12px 32px rgba(15,36,68,.1)`
                      e.currentTarget.style.borderColor=country.color
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform=''
                      e.currentTarget.style.boxShadow=''
                      e.currentTarget.style.borderColor='#e2e8f0'
                    }}
                  >
                    {/* Top row: flag + badge */}
                    <div style={{ display:'flex', alignItems:'start', justifyContent:'space-between', gap:8, marginBottom:12 }}>
                      <div style={{ fontSize:32, flexShrink:0 }}>{country.flag}</div>
                      <span style={{
                        fontSize:11, fontWeight:800, padding:'3px 9px', borderRadius:20, flexShrink:0,
                        background: u.qs<=50?'#fef9c3':u.qs<=200?'#f0fdf4':'#f0f9ff',
                        color: u.qs<=50?'#854d0e':u.qs<=200?'#166534':'#0369a1',
                        border:`1px solid ${u.qs<=50?'#fde68a':u.qs<=200?'#bbf7d0':'#bae6fd'}`,
                      }}>
                        QS #{u.qs >= 999 ? '999+' : u.qs}
                      </span>
                    </div>

                    <p style={{ fontSize:10, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'.07em', marginBottom:6 }}>
                      📍 {u.city}
                    </p>
                    <h3 style={{ fontSize:15, fontWeight:800, color:'#0f172a', lineHeight:1.3, marginBottom:10 }}>{u.name}</h3>

                    {/* Fields */}
                    <div style={{ display:'flex', flexWrap:'wrap', gap:5, marginBottom:12 }}>
                      {u.fields.map(f => (
                        <span key={f} style={{
                          fontSize:10, fontWeight:700, padding:'3px 9px', borderRadius:20,
                          background: country.light || '#f8fafc',
                          color: country.color,
                          border:`1px solid ${country.color}30`,
                        }}>{f}</span>
                      ))}
                    </div>

                    {/* Scholarship */}
                    <div style={{
                      background:'#f0fdf4', border:'1px solid #bbf7d0',
                      borderRadius:9, padding:'8px 12px', marginBottom:14, fontSize:12
                    }}>
                      <span style={{ fontWeight:700, color:'#166534' }}>🎓 Scholarships: </span>
                      <span style={{ color:'#166534' }}>{u.scholarship}</span>
                    </div>

                    {/* Link */}
                    <a
                      href={u.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display:'flex', alignItems:'center', justifyContent:'center', gap:6,
                        padding:'10px 16px', background: country.color, color:'#fff',
                        borderRadius:10, textDecoration:'none', fontSize:13, fontWeight:700,
                        transition:'opacity .15s', width:'100%'
                      }}
                      onMouseEnter={e => e.currentTarget.style.opacity='.85'}
                      onMouseLeave={e => e.currentTarget.style.opacity='1'}
                    >
                      🌐 Visit Official Website
                      <span style={{ fontSize:12 }}>→</span>
                    </a>
                  </div>
                ))}
              </div>

              {filtered.length === 0 && (
                <div style={{ textAlign:'center', padding:'60px 20px', color:'#94a3b8' }}>
                  <div style={{ fontSize:48, marginBottom:12 }}>🔍</div>
                  <div style={{ fontSize:16, fontWeight:700, color:'#475569', marginBottom:6 }}>No universities match</div>
                  <button onClick={() => { setSearch(''); setFieldFilter('') }}
                    style={{ marginTop:8, padding:'9px 18px', background:'#f1f5f9', border:'none', borderRadius:9, fontSize:13, fontWeight:700, cursor:'pointer', color:'#475569' }}>
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* ── BOTTOM CTA ── */}
      <div style={{ background:'#0f2444', padding:'48px 16px', textAlign:'center' }}>
        <div className="container">
          <div style={{ fontSize:28, fontWeight:900, color:'#fff', marginBottom:10 }}>
            Ready to apply? We handle everything.
          </div>
          <div style={{ fontSize:15, color:'rgba(255,255,255,.6)', marginBottom:28, maxWidth:480, margin:'0 auto 28px' }}>
            SOP writing, document preparation, and full guidance for any university on this list.
          </div>
          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
            <a href="/services" style={{
              padding:'13px 28px', background:'#22c55e', color:'#fff',
              borderRadius:12, textDecoration:'none', fontSize:14, fontWeight:800
            }}>🚀 View Our Packages</a>
            <a href={`https://wa.me/8801889700879?text=${encodeURIComponent('Hi! I want to apply to a university and need help.')}`}
              target="_blank" rel="noreferrer"
              style={{
                padding:'13px 28px', background:'rgba(255,255,255,.1)', color:'#fff',
                border:'1px solid rgba(255,255,255,.2)',
                borderRadius:12, textDecoration:'none', fontSize:14, fontWeight:800
              }}>💬 WhatsApp Us</a>
          </div>
        </div>
      </div>

      <style>{\`
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(16px) }
          to   { opacity:1; transform:translateY(0) }
        }
      \`}</style>
    </div>
  )
}
