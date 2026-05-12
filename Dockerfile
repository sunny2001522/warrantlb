FROM nginx:1.27-alpine

# Replace default config with our SPA config (listens on 8080 = Cloud Run default PORT)
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Ship pre-built static assets at root
COPY dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
