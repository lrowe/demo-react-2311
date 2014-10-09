Static test page demonstrating facebook/react#2311
--------------------------------------------------

Static page from ENCODE-DCC/encoded@09fc82e444 with minification disabled and react patch not applied. Javascript is bundled into static/build/bundle.js

To run:

    python -m SimpleHTTPServer

Then visit http://localhost:8000/test-section/ from IE8 and observe the `Unknown runtime error` at [bundle.js line 26947 character 9](static/build/bundle.js#L26947).
