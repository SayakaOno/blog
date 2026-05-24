---
title: My Understanding of the SAP Supply Chain Attack
date: '2026-05-24T04:00:00.000Z'
updatedDate: ''
template: 'post'
language: 'en'
draft: false
slug: '/posts/sap-supply-chainattack'
link: '/posts/sap-supply-chainattack/ja'
category: 'Tech'
tags:
  - 'Security'
description: 'A plain breakdown of the SAP supply chain attack, explained for developers who are not familiar with npm publishing processes like me.'
---

Yet another supply chain attack happened on April 29, 2026 - Mini Shai Hulud where SAP packages were compromised.

Supply chain attacks are not easy to understand for someone not familiar with npm package publish process etc. like me; however, all of us developers need to protect our projects. I believe security practices only make sense once you understand what you are defending against. This post is what I compiled after finally understanding what happened after hours (longer than you would expect) of reading [SafeDep's post](https://safedep.io/mini-shai-hulud-and-sap-compromise/) and discussing with Claude. I hope this helps someone else.

## What happened

1. SAP developer's GitHub account was compromised.
2. The attacker used the stolen account and:
   - Modified a CI workflow to:
     - trigger it on pushes to update/releases branch
     - print the npm OIDC token, which grants permission to publish to npm, in the logs
   - Pushed the changes to update/releases → The npm OIDC token was logged
3. The attacker grabbed the npm OIDC token from the logs and used it to publish malicious versions of 3 SAP packages to npm directly from their own machine. (One package that used an older, less secure static token publishing method also got compromised)

## What did the compromised SAP packages do when installed?

- Stole your credentials (GitHub tokens, npm tokens, AWS keys, Azure/GCP credentials etc.)
- Planted malicious files in `.vscode/` and `.claude/` using the stolen GitHub tokens
- Published malicious versions of your own packages using the stolen npm tokens
  - This is what makes it a worm — every victim could have become a new distributor

## What did the planted malicious files do?

These malicious files were committed to your repositories' branches (up to 50!). Anyone who checked out those branches and opened them in VS Code or started a Claude Code session could have their secrets stolen too, without ever running `npm install`. Ignoring scripts, which feels very effective in supply chain attacks, would not have saved you this time.

## Why did this happen?
- The attacker was able to get the npm OIDC token via the workflow because there were no restrictions on which workflow of which branch was trusted
- One of the four repos used a publishing flow that only requires an npm token, which is less secure

## npm publishing configuration
The loose npm publishing configuration led to this incident. I wonder if the npm registry could step up and warn maintainers for insecure configurations. The good news is, they enabled "[staged publishing](https://docs.npmjs.com/staged-publishing)", where `npm stage publish` submits a package for review, requiring maintainer approval with 2FA before it is published. Though this is an opt-in feature, and it will not prevent the situation like SAP's, where compromised versions were published directly to npm. I hope for further improvements.
<br /><br /><br />
I was almost impressed by the series of techniques. My biggest takeaway was when reviewing PRs, I need to check the changed files first before checking out to the branch.

Please let me know if there are any mistakes in my understanding.<br />
Thank you for reading!

Reference:
- https://safedep.io/mini-shai-hulud-and-sap-compromise/
- https://docs.npmjs.com/staged-publishing

