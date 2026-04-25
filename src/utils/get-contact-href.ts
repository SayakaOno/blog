const getContactHref = (name: string, contact: string) => {
  const href = {
    twitter: `https://www.twitter.com/${contact}`,
    github: `https://github.com/${contact}`,
    email: `mailto:${contact}`,
  }[name]

  return href || contact
}

export default getContactHref
