export type Chapter = {
  id: number;
  title: string;
  subtitle: string;
  available: boolean;
};

// All 20 traditional chapters — titles taken verbatim from the "##
// अध्याय N: Title" headings in Ashtavakra-Gita-Sampoorna-Vyakhya.md
// (chapter 18's four "(भाग N — श्लोक ...)" parts are merged into one
// chapter by scripts/generate-ashtavakra-content.js; its title here has
// that part-suffix stripped). All 20 are complete, unlike the sibling
// Bhagwad Gita site.
export const chapters: Chapter[] = [
  { id: 1, title: 'आत्मज्ञान का उपदेश', subtitle: 'अध्याय १', available: true },
  { id: 2, title: 'आत्मानुभव का आनन्द', subtitle: 'अध्याय २', available: true },
  { id: 3, title: 'आत्मज्ञान की परीक्षा', subtitle: 'अध्याय ३', available: true },
  { id: 4, title: 'आत्मज्ञान की महिमा', subtitle: 'अध्याय ४', available: true },
  { id: 5, title: 'विलय के चार मार्ग', subtitle: 'अध्याय ५', available: true },
  { id: 6, title: 'उच्चतर ज्ञान', subtitle: 'अध्याय ६', available: true },
  { id: 7, title: 'आत्मज्ञान का स्वभाव', subtitle: 'अध्याय ७', available: true },
  { id: 8, title: 'बंधन और मुक्ति', subtitle: 'अध्याय ८', available: true },
  { id: 9, title: 'वैराग्य', subtitle: 'अध्याय ९', available: true },
  { id: 10, title: 'शान्ति', subtitle: 'अध्याय १०', available: true },
  { id: 11, title: 'विवेक-ज्ञान', subtitle: 'अध्याय ११', available: true },
  { id: 12, title: 'आत्मा में स्थिति', subtitle: 'अध्याय १२', available: true },
  { id: 13, title: 'सुख', subtitle: 'अध्याय १३', available: true },
  { id: 14, title: 'शान्ति', subtitle: 'अध्याय १४', available: true },
  { id: 15, title: 'आत्म-ज्ञान', subtitle: 'अध्याय १५', available: true },
  { id: 16, title: 'विशेष उपदेश', subtitle: 'अध्याय १६', available: true },
  { id: 17, title: 'सच्चा ज्ञानी', subtitle: 'अध्याय १७', available: true },
  { id: 18, title: 'परम शान्ति', subtitle: 'अध्याय १८', available: true },
  { id: 19, title: 'आत्मा में विश्राम', subtitle: 'अध्याय १९', available: true },
  { id: 20, title: 'जीवन-मुक्ति', subtitle: 'अध्याय २०', available: true },
];

export function getChapterById(id: number): Chapter | undefined {
  return chapters.find((c) => c.id === id);
}
