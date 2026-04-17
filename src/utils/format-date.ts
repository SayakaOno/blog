export const formatDate = (dateStr: string, language: string): string =>
  new Intl.DateTimeFormat(language === 'ja' ? 'ja-JP' : 'en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  }).format(new Date(dateStr));

// en: "January 1, 2019"  ja: "2019/01/01"
export const formatDateShort = (dateStr: string, language: string): string => {
  if (language === 'ja') {
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric', month: '2-digit', day: '2-digit',
    }).format(new Date(dateStr));
  }
  return formatDate(dateStr, language);
};

// en: "Jan 2019"  ja: "2019年1月"
export const formatDateMonth = (dateStr: string, language: string): string =>
  new Intl.DateTimeFormat(language === 'ja' ? 'ja-JP' : 'en-US', {
    year: 'numeric', month: 'short',
  }).format(new Date(dateStr));

// ISO date for <time datetime=""> attributes
export const formatDateMachine = (dateStr: string): string =>
  new Date(dateStr).toISOString().slice(0, 10);
