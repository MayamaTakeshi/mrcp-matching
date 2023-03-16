# mrcp-matching
Permits to match and collect data from MRCP (Media Resource Control Protocol).

Example:
```
const m = require('data-matching')
const mrcp = require('mrcp')
const mrcp_matcher = require('./index.js')
const assert = require('assert')

const s = `MRCP/2.0 91 SPEAK 1
content-type: application/xml
content-length: 17

<root>test</root>`.replace(/\n/g, "\r\n")

var matcher = mrcp_matcher({
  type: m.collect('type'),
  version: m.collect('version'),
  method: m.collect('method'),
  request_id: m.collect('request_id'),
  headers: m.collect('headers'),
  body: m.collect('body'),
})

var store = {}

assert(matcher(s, store) == true)

assert(store.type == 'request')
assert(store.method == 'SPEAK')
assert(store.request_id = 1)
assert(JSON.stringify(store.headers) == JSON.stringify({ 'content-type': 'application/xml', 'content-length': '17' }))
assert(store.body == '<root>test</root>')

console.log("success")
```
