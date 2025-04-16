FROM nginx:1.20
COPY nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /app
#tiene que estar echo el build!
COPY dist /app/front-end/
RUN chown -R nginx:nginx /app
EXPOSE 80
# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
