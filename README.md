# remark-link-escape
Warn when a link has a pipe within a link.
see [free-programming-books issue 5176](https://github.com/EbookFoundation/free-programming-books/issues/5176) 
 
  ## Example
  ###### In
   ```markdown
   [This is a link | with a pipe](https://unifiedjs.com/)
   ```
  
  ###### Out

   ```text
    1:1  warning  link contains an unescaped |              link-escape       remark-lint
   ```
 
  ###### In
   ```markdown
   [This is a link /| with a pipe](https://unifiedjs.com/)
   ```
  
  ###### Out

   ```text
    no messages
   ```
