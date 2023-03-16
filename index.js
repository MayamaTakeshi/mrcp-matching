const data_matching = require('data-matching')
const mrcp = require('mrcp')

module.exports = (expected) => {
    var expected2 = data_matching.matchify_strings(expected)
    var f = (s, dict, throw_matching_error, path) => {
        var received = mrcp.parser.parse_msg(s)
        var keys = Object.keys(expected2)
        return keys.every(key => {
            var val = expected2[key]
            if(val == data_matching.absent && received[key]) {
                if(throw_matching_error) {
                    throw Error(`key ${path}.${key} expected to be absent`)
                }
                return false
            }
            var full_match = false
            return data_matching.match(val, received[key], dict, full_match , throw_matching_error, `${path}.${key}`)
        })
    }
    f.__original_data__ = expected
    f.__name__ = 'mrcp_msg'
    return f
}
