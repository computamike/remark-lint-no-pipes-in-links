'use strict';
const plugin = require('./index')
const remark = require('remark');

const processMarkdown = (md, opts) => {
  return remark()
    .use(plugin, opts)
    .process(md);
};

test.each([
  ["one pipe", ` * [This is a title with a | in](https://unifiedjs.com/)`, 1],
  ["two pipes",` * [This is a title | with 2 | in](https://unifiedjs.com/)`, 2],
  ["Pipe - no space",` * [This is a title with a|in](https://unifiedjs.com/)`, 1],
])('%s', async (name, markdown, number) => {
  var res = await processMarkdown(markdown)
  expect(res.messages.length).toBe(number)
});
 


test.each([
  ["No Pipe returns ok",` * [This title has no pipe](https://unifiedjs.com)`],
  ["Escaped Pipe returns ok",` * [This title has an escaped /| pipe](https://unifiedjs.com)`],  
  ])('%s',async (name, markdown) => {
 
  var res = await processMarkdown(markdown)
  expect(res.messages.length).toBe(0)

})


test('Find Pipes in a  multiple Links ',async () => {
 
  var res = await processMarkdown(` 
  * [This is a title with a | in](https://unifiedjs.com/)
  Spacer line.
  * [This is second title with a | in](https://unifiedjs.com/)
  `)
  expect(res.messages.length).toBe(2)
  expect(res.messages[0].constructor.name).toBe("Error")
  expect(res.messages[0].line).toBe(2)
  expect(res.messages[1].constructor.name).toBe("Error")
  expect(res.messages[1].line).toBe(4)
})