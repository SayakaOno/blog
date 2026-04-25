import { ICONS } from '../constants';

const getIcon = (name: string) => {
  const icon = {
    github: ICONS.GITHUB,
    contact: ICONS.EMAIL,
    email: ICONS.EMAIL,
    rss: ICONS.RSS,
    linkedin: ICONS.LINKEDIN,
    portfolio: ICONS.PORTFOLIO,
    search: ICONS.SEARCH,
    about: ICONS.PERSON,
    category: ICONS.FOLDER,
    tag: ICONS.TAG,
    update: ICONS.UPDATE,
    leftarrow: ICONS.LEFTARROW,
    rightarrow: ICONS.RIGHTARROW,
  }[name];

  return icon || {};
};

export default getIcon;
