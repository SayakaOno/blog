---
title: 'Contact me'
template: 'page'
---

<svg class="contact-page bottom" viewBox="0 0 141.732 141.732"><path d="M135.657,88.47H6.078V5.204h129.58L135.657,88.47L135.657,88.47z M141.054,91.072L141.054,91.072V2.604   c0-1.438-1.209-2.604-2.697-2.604H3.378c-1.491,0.001-2.7,1.166-2.7,2.604v88.469c0,1.438,1.209,2.604,2.7,2.604h51.291v15.609   H33.073c-1.491,0-2.7,1.165-2.7,2.604c0,1.437,1.209,2.602,2.7,2.602h0.001h75.585c1.49,0,2.699-1.165,2.699-2.602   c0-1.438-1.209-2.604-2.699-2.604H87.064V93.674h51.291C139.845,93.674,141.054,92.511,141.054,91.072"></path></svg>
[Portfolio website](https://sayaka-ono.com)<br />
<svg class="contact-page" viewBox="0 0 26 28"><path d="M10 19c0 1.141-0.594 3-2 3s-2-1.859-2-3 0.594-3 2-3 2 1.859 2 3zM20 19c0 1.141-0.594 3-2 3s-2-1.859-2-3 0.594-3 2-3 2 1.859 2 3zM22.5 19c0-2.391-1.453-4.5-4-4.5-1.031 0-2.016 0.187-3.047 0.328-0.812 0.125-1.625 0.172-2.453 0.172s-1.641-0.047-2.453-0.172c-1.016-0.141-2.016-0.328-3.047-0.328-2.547 0-4 2.109-4 4.5 0 4.781 4.375 5.516 8.188 5.516h2.625c3.813 0 8.188-0.734 8.188-5.516zM26 16.25c0 1.734-0.172 3.578-0.953 5.172-2.063 4.172-7.734 4.578-11.797 4.578-4.125 0-10.141-0.359-12.281-4.578-0.797-1.578-0.969-3.437-0.969-5.172 0-2.281 0.625-4.438 2.125-6.188-0.281-0.859-0.422-1.766-0.422-2.656 0-1.172 0.266-2.344 0.797-3.406 2.469 0 4.047 1.078 5.922 2.547 1.578-0.375 3.203-0.547 4.828-0.547 1.469 0 2.953 0.156 4.375 0.5 1.859-1.453 3.437-2.5 5.875-2.5 0.531 1.062 0.797 2.234 0.797 3.406 0 0.891-0.141 1.781-0.422 2.625 1.5 1.766 2.125 3.938 2.125 6.219z"></path></svg>
[GitHub](https://github.com/SayakaOno)<br />
<svg class="contact-page" viewBox="0 0 100 100"><path d="M95,59.727V93H75.71V61.955c0-7.799-2.79-13.121-9.771-13.121   c-5.331,0-8.503,3.587-9.898,7.057c-0.509,1.24-0.64,2.967-0.64,4.703V93H36.104c0,0,0.26-52.58,0-58.028h19.294v8.225   c-0.039,0.062-0.09,0.128-0.127,0.188h0.127v-0.188c2.563-3.948,7.142-9.588,17.389-9.588C85.482,33.609,95,41.903,95,59.727    M15.919,7C9.318,7,5,11.33,5,17.024c0,5.57,4.193,10.031,10.663,10.031h0.129c6.729,0,10.914-4.46,10.914-10.031   C26.579,11.33,22.521,7,15.919,7 M6.146,93h19.289V34.972H6.146V93z"></path></svg>
[LinkedIn](https://www.linkedin.com/in/sayakaono/)

<style>
  svg.contact-page {
    display: inline-block;
    width: 1em;
    height: 1em;
    fill: currentColor;
    vertical-align: text-top;
    margin-right: .2em;
  }
  svg.contact-page.bottom {
    vertical-align: text-bottom;
  }
  form.form {
    margin-top: 40px;
  }
  .field {
    margin-bottom: 15px;
  }
  input, textarea {
    box-sizing: border-box;
    width: 100%;
    max-width: 450px;
    padding: .5rem .75rem;
    font-size: 1rem;
    color: #464a4c;
    border: 1px solid rgba(0,0,0,.15);
    border-radius: .25rem;
    outline: none;
  }
  .button {
    width: 100px;
    background-color: rgba(0,0,0,.15);
    border: none;
  }
  .button:hover {
    cursor: pointer;
  }
</style>

<form class="form" id="contactform" action="https://formspree.io/f/xpzezkew" method="POST">
  <div class="field">
    <label class="label" for="name"><div class="label-content">name</div></label>
    <input class="input" type="text" name="name" id="name" required>
  </div>
  <div class="field">
    <label class="label" for="_replyto"><div class="label-content">email</div></label>
    <input class="input" type="email" name="_replyto" id="_replyto" required>
  </div>
  <div class="field">
    <label class="label" for="message"><div class="label-content">message</div></label>
    <textarea class="input" name="message" rows="5" id="message" required></textarea>
  </div>
  <input class="hidden" type="text" name="_gotcha" style="display:none">
  <input class="hidden" type="hidden" name="_subject" value="Message via Blog">
  <div class="field">
    <input class="button submit" type="submit" value="Send">
  </div>
</form>
