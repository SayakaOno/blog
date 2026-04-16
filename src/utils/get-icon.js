// @flow
import { ICONS } from '../constants';

const getIcon = (name: string) => {
  let icon;

  switch (name) {
    case 'twitter':
      icon = ICONS.TWITTER;
      break;
    case 'github':
      icon = ICONS.GITHUB;
      break;
    case 'vkontakte':
      icon = ICONS.VKONTAKTE;
      break;
    case 'telegram':
      icon = ICONS.TELEGRAM;
      break;
    case 'contact':
    case 'email':
      icon = ICONS.EMAIL;
      break;
    case 'rss':
      icon = ICONS.RSS;
      break;
    case 'linkedin':
      icon = ICONS.LINKEDIN;
      break;
    case 'portfolio':
      icon = ICONS.PORTFOLIO;
      break;
    case 'instagram':
      icon = ICONS.INSTAGRAM;
      break;
    case 'search':
      icon = ICONS.SEARCH;
      break;
    case 'about':
      icon = ICONS.PERSON;
      break;
    case 'home':
      icon = ICONS.HOME;
      break;
    case 'category':
      icon = ICONS.FOLDER;
      break;
    case 'tag':
      icon = ICONS.TAG;
      break;
    case 'update':
      icon = ICONS.UPDATE;
      break;
    case 'leftarrow':
      icon = ICONS.LEFTARROW;
      break;
    case 'rightarrow':
      icon = ICONS.RIGHTARROW;
      break;
    default:
      icon = {};
      break;
  }

  return icon;
};

export default getIcon;
