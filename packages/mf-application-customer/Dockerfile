FROM nginx

RUN rm -f /etc/nginx/conf.d/default.conf
RUN rm -f /usr/share/nginx/html/*

COPY dist/ /usr/share/nginx/html/
COPY nginx/default.conf /etc/nginx/conf.d/
