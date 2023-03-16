const mrcp_matcher = require('../index.js')
const m = require('data-matching')

test('matched', () => {
    const s = `MRCP/2.0 91 SPEAK 1
content-type: application/xml
content-length: 17

<root>test</root>`.replace(/\n/g, "\r\n")

    const matcher = mrcp_matcher({
      type: m.collect('type'),
      version: m.collect('version'),
      method: m.collect('method'),
      request_id: m.collect('request_id'),
      headers: m.collect('headers'),
      body: m.collect('body'),
    })

    const store = {}

    expect(matcher(s, store)).toBe(true)

    expect(store.type).toBe('request')
    expect(store.method == 'SPEAK')
    expect(store.request_id = 1)
    expect(store.headers).toMatchObject({ 'content-type': 'application/xml', 'content-length': '17' })
    expect(store.body).toBe('<root>test</root>')
})


