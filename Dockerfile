FROM nginx:alpine
COPY dist/ /usr/share/nginx/html/
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

LABEL "com.aragost.service"="todo-web"
