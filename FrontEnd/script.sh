#!/bin/sh

# Replace environment variables
cd /usr/share/nginx/html/
for i in main*; do sed -i "s|#{serverAuthentication}#|$serverAuthentication|g" $i; done;
for i in main*; do sed -i "s|#{serverAddBook}#|$serverAddBook|g" $i; done;
for i in main*; do sed -i "s|#{serverEditBook}#|$serverEditBook|g" $i; done;
for i in main*; do sed -i "s|#{serverViewBooks}#|$serverViewBooks|g" $i; done;
for i in main*; do sed -i "s|#{serverCatalogo}#|$serverCatalogo|g" $i; done;
for i in main*; do sed -i "s|#{serverCompras}#|$serverCompras|g" $i; done;
for i in main*; do sed -i "s|#{serverEditorial}#|$serverEditorial|g" $i; done;

# Start nginx
/usr/sbin/nginx -g 'daemon off;'
