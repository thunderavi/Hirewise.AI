index.ts:117  Uncaught GroqError: It looks like you're running in a browser-like environment.

This is disabled by default, as it risks exposing your secret API credentials to attackers.
If you understand the risks and have appropriate mitigations in place,
you can set the `dangerouslyAllowBrowser` option to `true`, e.g.,

new Groq({ apiKey, dangerouslyAllowBrowser: true })
    at new Groq (index.ts:117:13)
    at HelperBot.jsx:7:14
Groq @ index.ts:117
(anonymous) @ HelperBot.jsx:7
Show 1 more frame
Show less